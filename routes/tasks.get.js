import { Router } from "express";
import fs from 'fs';

const router = Router();

router.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', (err, data) => {
        if(err){
            throw err;
        }
        const tasks = JSON.parse(data)
        res.send(tasks  )
    })
})


export default router;