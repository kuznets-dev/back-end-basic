const { Router } = require ('express');
const { Task } = require ('../../models');
const { body, param, validationResult } = require ('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middleware/authMiddleware');

const router = Router();

router.patch('/task/:uuid',
    authMiddleware,
    body('name').isString().isLength({ min: 1 }),
    body('done').isBoolean(),
    param('uuid').isUUID(),
    async (req, res, next) => {

        const uuid = req.params.uuid;
        const { name, done } = req.body;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, errors.array());
            }

            const user_uuid = res.locals.user.uuid;

            const task = await Task.findOne({
                where: { uuid, user_uuid }
            });

            if (!task) {
                throw new ErrorHandler(422, 'Task not found');
            }

            task.name = name;
            task.done = done;

            await task.save();

            return res.send({ message: 'Task was changed!' });
        } catch (err) {
            next(err);
        }
})

module.exports = router;