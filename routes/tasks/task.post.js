const { Router } = require ('express');
const { Task } = require ('../../models');
const { body, validationResult } = require ('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middleware/authMiddleware');

const router = Router();

router.post('/task',
    authMiddleware,
    body('name').isString().isLength({ min: 1 }),
    body('done').isBoolean(),
    async (req, res, next) => {
        
        const { name, done } = req.body;
        const user_uuid = res.locals.user.uuid;
    
        try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, 'Task is empty', errors.array());
        }
        
        const taskName = await Task.findOne({
            where: { user_uuid, name }
        })
        
        if (taskName) {
            throw new ErrorHandler(400, 'A task with this name exists');
        }
        
        const task = await Task.create({ name, done, user_uuid });

        return res.send(task); 
    } catch (err) {
        next(err);
    }
})

module.exports = router;