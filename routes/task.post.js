const { Router } = require ('express');
const { Task } = require ('../models');
const { body, validationResult } = require ('express-validator');

const router = Router();

router.post('/task',
    body('name').isString().isLength({ min: 1 }),
    body('done').isBoolean(),
    async (req, res) => {
        
        const { name, done } = req.body;
    
        try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const task = await Task.create({ name, done });
        return res.json(task); 
        
    } catch (err) {
        return res.status(400).send(err);
    }
})

module.exports = router;