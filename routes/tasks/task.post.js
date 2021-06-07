const { Router } = require ('express');
const { Task } = require ('../../models');
const { body, validationResult } = require ('express-validator');
const { ErrorHandler } = require('../../error');

const router = Router();

router.post('/task',
    body('name').isString().isLength({ min: 1 }),
    body('done').isBoolean(),
    async (req, res, next) => {
        
        const { name, done } = req.body;
    
        try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, errors.array());
        }
        
        const taskName = await Task.findOne({
            where: { name }
        })
        
        if (taskName) {
            throw new ErrorHandler(400, 'A task with this name exists');
        }
        
        const task = await Task.create({ name, done });

        return res.json(task); 
    } catch (err) {
        next(err);
    }
})

module.exports = router;