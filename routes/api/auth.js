const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// Send user details back to client
router.get('/', auth, async (req, res) => {
    try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(400).send('Server error');
    }
});

// Authenticate user upon login and issue token
router.post('/', [
    check('email', 'Please provide a valid email address').isEmail(),
    check('password', 'Please enter your password').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid login details. Please try again' }] });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid login details. Please try again' }] });
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };

        // If error exists, control will be passed to catch block along with the thrown error object
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;