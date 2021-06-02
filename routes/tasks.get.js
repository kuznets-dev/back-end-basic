import { Router } from "express";
import fs from 'fs';
import { query, validationResult } from 'express-validator';

const router = Router();

router.get('/tasks', 
    query('filterBy').isString().optional({ checkFalsy: true }),
    query('orderBy').isString().optional({ checkFalsy: true }),
    (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }
    
    fs.readFile('tasks.json', (err, data) => {
        
        if (err) {return res.send(err)};

        const { filterBy, orderBy } = req.query;
        const tasks = JSON.parse(data);

        let newTasks = tasks;

        if (filterBy) {
            newTasks = tasks.filter(task => filterBy ? task.done.toString() === filterBy : task);
        }

        if (orderBy) {
            newTasks = newTasks.sort((a, b) => orderBy === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt);
        }

        res.send(newTasks);
    })
});

export default router;