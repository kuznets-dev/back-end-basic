import { Router } from 'express';
import fs from 'fs';
import { body, validationResult } from 'express-validator';

const router = Router();

router.patch('/task/:id',
    body('name').isString().isLength({ min: 1 }),
    body('done').isBoolean(),
    (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).send(errors.array());
    }
        
    const id = req.params.id;

    fs.readFile('tasks.json', (err, data) => {
        const task = req.body;
        const tasks = JSON.parse(data);

        const index = tasks.findIndex(task => task.uuid === id);
        
        if (index === -1) {return res.status(400).send('Task not found')};

        tasks[index] = { ...tasks[index], name: task.name, done: task.done };

        fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
        res.send({ msg: 'Task was changed' });
    })
})

export default router;