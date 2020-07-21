const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// Endpoint for registering a user (/api/users)
router.post('/', [
    check('forename', 'Forename is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please provide a valid email address').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { forename, surname, email, password, username } = req.body;

    try {
        const emailFound = await User.findOne({ email });
        const usernameFound = await User.findOne({ username }); 

        /* If any conditional is true, function will finish as a result 
        of return statement within block. Only 1 res.send will run */
        if(emailFound && usernameFound) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'A user with this email already exists'}, { msg: 'A user with this username already exists'}] });
        }
        if(emailFound) {
            return res.status(400).json({ errors: [{ msg: 'A user with this email address already exists'}] });
        }
        if(usernameFound) {
            return res.status(400).json({ errors: [{ msg: 'A user with this username already exists'}] });
        }
 
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            forename,
            surname,
            username,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
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