const { Router } = require ('express');
const { User } = require ('../../models');
const { body, validationResult } = require ('express-validator');
const { ErrorHandler } = require('../../error');

const router = Router();

router.post('/registration',
    body('name').isString().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 4 }),
    async (req, res, next) => {

        const { name, password } = req.body;

        try {
            const errors = validationResult(req);
            
            if  (!errors.isEmpty()) {
                throw new ErrorHandler(400, errors.array());
            }

            const userName = await User.findOne({
                where: { name }
            })

            if (userName) {
                throw new ErrorHandler(400, 'User with this same exists')
            }

            const user = await User.create({ name, password });

            return res.json(user);
        } catch (err) {
            next(err);
        }
    }
)

module.exports = router;