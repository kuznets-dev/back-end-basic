const { Router } = require('express');
const { Task } = require('../../models');
const { body, param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middleware/authMiddleware');

const router = Router();

router.patch('/dnd', 
    authMiddleware,
    body('source').isInt(),
    body('destination').isInt(),
    async (req, res, next) => {
        const { source, destination } = req.body;
        console.log(source, destination);

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, 'Invalid request', errors.array());
            }


            
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
)

module.exports = router;