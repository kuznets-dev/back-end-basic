require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../error');

module.exports = (req, res, next) => {
    if (req === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new ErrorHandler(400, 'User is not logged in');
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                throw new ErrorHandler(400, 'Something was wrong');
            }
            
            res.locals.user = decoded;
        })
        next();
    } catch (err) {
        next(err);
    }
}