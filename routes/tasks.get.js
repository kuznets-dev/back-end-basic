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

            const tasks = await Task.findAll();
            return res.json(tasks);
        } catch (err) {
            return res.status(400).send(errors.array());
        }
});

module.exports = router;