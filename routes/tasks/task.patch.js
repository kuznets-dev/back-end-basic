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
        const user_uuid = res.locals.user.uuid;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, 'Invalid request', errors.array());
            }
            
            const exestingTask = await Task.findOne({
                where: { uuid, user_uuid }
            });

            if (!exestingTask) {
                throw new ErrorHandler(422, 'Task not found');
            }

            await Task.update({ name, done }, { where: { uuid, user_uuid } })

            return res.send({ message: 'Task was changed!' });
        } catch (err) {
            next(err);
        }
})

module.exports = router;