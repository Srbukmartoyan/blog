const jwt = require('jsonwebtoken');
const { Author } = require('../models');

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: 'Please authenticate using a valid token' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;
        
        const user = await Author.findByPk(userId);
        if (!user) {
            return res.status(401).send({ errors: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ errors: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchUser;
