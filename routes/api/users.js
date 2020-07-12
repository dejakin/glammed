const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Endpoint for registering a user (/api/users)
router.post('/', [
    check('forename', 'Forename is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('email', 'Please provide a valid email address').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
});

module.exports = router;