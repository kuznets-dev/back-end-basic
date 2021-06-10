const { Router } = require ('express');
const { Task } = require ('../../models');
const { param, validationResult } = require ('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middleware/authMiddleware');

const router = Router();

router.delete('/task/:uuid',
    authMiddleware,
    param('uuid').isUUID(),
    async (req, res, next) => {

        const uuid = req.params.uuid;
        
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, errors.array());
            }

            const user_uuid = res.locals.user.uuid;

            const exestingTask = await Task.findOne({
                where: { uuid, user_uuid }
            });

            if (!exestingTask) {
                throw new ErrorHandler(400, 'Task not found'); 
            }

            await exestingTask.destroy({
                where: { uuid, user_uuid }
            });

            return res.send({ message: 'Task was deleted!' });
        } catch (err) {
            next(err);
        }
});

module.exports = router;