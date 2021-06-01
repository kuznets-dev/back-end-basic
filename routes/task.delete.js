import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.delete('/task/:id', (req, res) => {

    fs.readFile('tasks.json', (err, data) => {

        if (err) {return res.status(404).send('Task not found')};

        const id = req.params.id;
        const tasks = JSON.parse(data);
        const index = tasks.findIndex(task => task.uuid === id);
        const deletedTask = tasks[index];

        const newTasks = tasks.filter(task => task.uuid !== id);

        data = JSON.stringify(newTasks, null, 2);
        fs.writeFileSync('tasks.json', data);
        res.send(deletedTask);
    });
});

export default router;