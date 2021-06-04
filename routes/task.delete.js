const { Router } = require ('express');
const { Task } = require ('../models');
const { param, validationResult } = require ('express-validator');
const { ErrorHandler } = require('../error');

const router = Router();

router.delete('/task/:uuid',
    param('uuid').isUUID(),
    async (req, res, next) => {

        const uuid = req.params.uuid;
        
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, errors.array());
            }

            const task = await Task.findOne({
                where: { uuid }
            });

            if (!task) {
                throw new ErrorHandler(400, 'Id not found');
            }

            await task.destroy();

            return res.send({ message: 'Task was deleted!' });
        } catch (err) {
            next(err);
        }
});

module.exports = router;