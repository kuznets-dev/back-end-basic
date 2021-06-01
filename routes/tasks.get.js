import { Router } from "express";
import fs from 'fs';

const router = Router();

router.get('/tasks', async(req, res) => {
    try {
        fs.readFile('tasks.json', (err, data) => {
            const tasks = JSON.parse(data);
            res.send(tasks);
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
})

export default router;