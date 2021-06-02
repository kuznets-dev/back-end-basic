import { Router } from 'express';
import fs from 'fs';
import { param, validationResult } from 'express-validator';

const router = Router();

router.delete('/task/:id',
    param('id').isUUID(),
    (req, res) => {

    const errors = validationResult(req);
    const id = req.params.id;

    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }

    fs.readFile('tasks.json', (err, data) => {

        if (err) {return res.status(404).send('Task not found')};

        const tasks = JSON.parse(data);
        const index = tasks.findIndex(task => task.uuid === id);
        const deletedTask = tasks[index];
        const newTasks = tasks.filter(task => task.uuid !== id);

        fs.writeFileSync('tasks.json', JSON.stringify(newTasks, null, 2));
        res.send({ msg: 'Task was deleted', deletedTask });
    });
});

export default router;