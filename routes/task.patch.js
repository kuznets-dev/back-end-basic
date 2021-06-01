import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.patch('/task/:id', (req, res) => {
    fs.readFile('tasks.json', (err, data) => {

        if (err) {return res.status(400).send('Task not created')};

        const id = req.params.id;
        const task = req.body;
        const tasks = JSON.parse(data);
        const index = tasks.findIndex(task => task.uuid === id);
        tasks[index] = { ...tasks[index], name: task.name, done: task.done };

        fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
        res.send({ msg: 'Task was changed' });
    })
})

export default router;