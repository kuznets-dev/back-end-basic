const { Router } = require ("express");
const { Task } = require ('../../models');
const { ErrorHandler } = require ('../../error')
const { query, validationResult } = require ('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');

const router = Router();

router.get('/tasks',
    authMiddleware,
    query('filterBy').isString().optional({ checkFalsy: true }),
    query('orderBy').isString().optional({ checkFalsy: true }),
    query('page').isInt().optional({ checkFalsy: true }),
    query('limit').isInt().optional({ checkFalsy: true }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, errors.array());
            }

            const user_uuid = res.locals.user.uuid;

            const { filterBy = '', orderBy = 'asc', page = 1, limit = 5 } = req.query;

            const filteredTasks = { 'true': true, 'false': false, '': [true, false] };
            const sorteredTasks = { 'asc': 'ASC', 'desc': 'DESC' };

            if (filteredTasks[filterBy] === undefined || sorteredTasks[orderBy] === undefined) {
                throw new ErrorHandler(400, 'Something went wrong...');
            }

            const {count, rows} = await Task.findAndCountAll({
                where: {
                    user_uuid: user_uuid,
                    done: filteredTasks[filterBy]
                },
                order: [['createdAt', sorteredTasks[orderBy]]],
                limit: limit,
                offset: (page - 1) * limit
            })
            const pageCount =  Math.ceil(count / limit);
            
            return res.send({pageCount, rows});
        } catch (err) {
            console.log(err)
            // next(err);
        }
});

module.exports = router;