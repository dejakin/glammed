const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Retrieve token from request header
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Decode retrieved token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Identify user sending the request
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });        
    }
}