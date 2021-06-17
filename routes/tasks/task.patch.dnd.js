const { Router } = require('express');
const { Op } = require("sequelize");
const { Task } = require('../../models');
const { body, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middleware/authMiddleware');

const router = Router();

router.patch('/dnd',
    authMiddleware,
    body('source').isObject(),
    body('destination').isObject(),
    async (req, res, next) => {
        const { source, destination } = req.body;
        const user_uuid = res.locals.user.uuid;
        const desIndex = destination.index
        const sourIndex = source.index
        const sourUUID = source.uuid

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, 'Invalid request', errors.array());
            }

            if (sourIndex < desIndex) {
                const betweenTasks = await Task.findAll({
                    where: {
                        user_uuid,
                        index: { [Op.between]: [sourIndex, desIndex] }
                    }
                })
                await betweenTasks.map(task => Task.update({ index: task.index - 1 }, { where: { uuid: task.uuid, user_uuid } }));
            } else {
                const betweenTasks = await Task.findAll({
                    where: {
                        user_uuid,
                        index: { [Op.between]: [desIndex, sourIndex] }
                    }
                })
                await betweenTasks.map(task => Task.update({ index: task.index + 1 }, { where: { uuid: task.uuid, user_uuid } }))
            }

            await Task.update({ index: desIndex }, { where: { uuid: sourUUID, user_uuid } })
            return res.send();
        } catch (err) {
            next(err);
        }
    }
)

module.exports = router;