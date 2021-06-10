require('dotenv').config();
const { Router } = require ('express');
const { User } = require ('../../models');
const { body, validationResult } = require ('express-validator');
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../../error');

const router = Router();

router.post('/login', 
    body('name').isString().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 4 }),
    async (req, res, next) => {
        const { name, password } = req.body;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, 'Enter login and password', errors.array());
            }

            const existingName = await User.findOne({
                where: { name }
            })

            if (!existingName) {
                throw new ErrorHandler(400, 'User not found!')
            }

            const existingPassword = await User.findOne({
                where: { name, password }
            })

            if (!existingPassword) {
                throw new ErrorHandler(400, 'Password is wrong')
            }

            const uuid = existingPassword.dataValues.uuid;
            const token = jwt.sign({ uuid }, process.env.SECRET, { expiresIn: '24h' });

            return res.json({token});
        } catch (err) {
            next(err);
        }
    }
)

module.exports = router;