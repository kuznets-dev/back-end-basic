const { Router } = require('express');
const { User } = require('../../models');
const { body, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');
const bcrypt = require('bcryptjs');

const router = Router();

router.post('/registration',
    body('name').isString().isLength({ min: 4 }).withMessage('Username must be at least 4 chars long'),
    body('password').isString().isLength({ min: 4 }).withMessage('Password must be at least 4 chars long'),
    async (req, res, next) => {

        const { name, password } = req.body;

        try {
            const errors = validationResult(req);
            
            if  (!errors.isEmpty()) {
                const extractedErrors = [];
                errors.array().map(err => extractedErrors.push(err.msg))
                throw new ErrorHandler(400, `${extractedErrors}`, errors.array());
            }

            const existingUser = await User.findOne({ 
                where: { name }
            })

            if (existingUser) {
                throw new ErrorHandler(400, 'User with this same exists')
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const user = await User.create({ name, password: hashPassword });

            return res.json(user);
        } catch (err) {
            next(err);
        }
    }
)

module.exports = router;