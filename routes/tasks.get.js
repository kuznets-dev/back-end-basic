const { Router } = require ("express");
const { Task } = require ('../models');
const { ErrorHandler } = require ('../error')
const { query, validationResult } = require ('express-validator');

const router = Router();

router.get('/tasks', 
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

            const { filterBy = '', orderBy = 'desc', page = 1, limit = 5 } = req.query;

            const filteredTasks = { 'true': true, 'false': false, '': [true, false] };
            const sorteredTasks = { 'asc': 'ASC', 'desc': 'DESC' };

            if (filteredTasks[filterBy] === undefined || sorteredTasks[orderBy] === undefined) {
                throw new ErrorHandler(400, 'Something went wrong...');
            }
            
            const tasks = await Task.findAll({
                where: {
                    done: filteredTasks[filterBy]
                },
                order: [['createdAt', sorteredTasks[orderBy]]]
            });
            
            return res.json(tasks);
        } catch (err) {
            next(err);
        }
});

module.exports = router;