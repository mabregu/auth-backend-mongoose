const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const secret = process.env.SECRET || 'secret';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        const decoded = await jwt.verify(token, secret);
        
        const user = await User.findOne({ _id: decoded.userId });
        
        if (!user) {
            throw new Error();
        }
        
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Not authorized' });
    }
}

module.exports = auth;