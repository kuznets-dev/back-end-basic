import { Router } from "express";
import fs from 'fs';

const router = Router();

router.get('/tasks', (req, res) => {

    fs.readFile('tsks.json', (err, data) => {
        if (err) {return res.status(400).send(err)}

        const tasks = JSON.parse(data);
        res.send(tasks);
    })
});

export default router;