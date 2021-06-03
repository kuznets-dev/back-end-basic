const { Router } = require ("express");
const { Task } = require ('../models');
const { query, validationResult } = require ('express-validator');

const router = Router();

router.get('/tasks', 
    query('filterBy').isString().optional({ checkFalsy: true }),
    query('orderBy').isString().optional({ checkFalsy: true }),
    query('page').isInt().optional({ checkFalsy: true }),
    query('limit').isInt().optional({ checkFalsy: true }),
    async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send(errors.array());
            }

            const { filterBy = '', orderBy = 'desc', page = 1, limit = 5 } = req.query;

            const filteredTasks = { 'true': true, 'false': false, '': [true, false] };
            const sorteredTasks = { 'asc': 'ASC', 'desc': 'DESC' };
            
            const tasks = await Task.findAll({
                where: {
                    done: filteredTasks[filterBy]
                },
                order: [['createdAt', sorteredTasks[orderBy]]]
            });
            
            return res.json(tasks);
        } catch (err) {
            return res.status(400).send(err);
        }
});

module.exports = router;