const { Router } = require ('express');
const { Task } = require ('../models');
const { param, validationResult } = require ('express-validator');

const router = Router();

router.delete('/task/:uuid',
    param('uuid').isUUID(),
    async (req, res) => {

        const uuid = req.params.uuid;
        
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send(errors.array());
            }

            const task = await Task.findOne({ where: { uuid } });

            await task.destroy();

            return res.send({ message: 'Task was deleted!' });

        } catch (err) {
            return res.status(404).send({ error: 'Task not found!' });
        }
});

module.exports = router;