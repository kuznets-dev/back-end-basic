import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/task', (req, res) => {
    
    if (!req.body) return res.status(400).send('Something wrong');

    const body = req.body
    const task = {uuid: uuidv4(), ...body , createdAt: Date.now()};

    fs.readFile('tasks.json', (err, data) => {
        
        if (err) {return res.status(400).send(err)}

        const tasks = JSON.parse(data);
        tasks.push(task);
        fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    });
    
    res.send({ msg: 'New task was created', body });
})

export default router;