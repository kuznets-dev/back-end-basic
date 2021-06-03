const { Router } = require ('express');
const { Task } = require ('../models');
const { body, param, validationResult } = require ('express-validator');

const router = Router();

router.patch('/task/:uuid',
    body('name').isString().isLength({ min: 1 }),
    body('done').isBoolean(),
    param('uuid').isUUID(),
    async (req, res) => {

        const uuid = req.params.uuid;
        const { name, done } = req.body;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send(errors.array());
            }

            const task = await Task.findOne({ where: {uuid} });

            task.name = name;
            task.done = done;

            await task.save();

            return res.send({ message: 'Task was changed!' });

        } catch (err) {
            return res.status(404).send({ error: 'Task not found!' });
        }
})

module.exports = router;