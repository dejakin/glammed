const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// GET to api/profile/myprofile. Returns logged in user's profile
router.get('/myprofile', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['username', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST to api/profile. Creates new profile in DB

router.post('/', [ auth, [
    check('bio', 'Please enter a bio').not().isEmpty(),
    check('location', 'Please enter your location').not().isEmpty(),
    check('services', 'Please enter a minimum of 1 service that you provide').not().isEmpty(),
    check('instagram', 'Please enter your Instagram name').not().isEmpty()
] ], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        bio,
        location,
        services,
        email,
        youtube,
        twitter,
        instagram,
        facebook,
    } = req.body;

    // Build profile object as not all fields are mandatory (as per validation checks)
    try {
        const profileFields = {};

        const targetUser = await User.findOne({ _id: req.user.id });
        const username = targetUser.username;

        profileFields.user = req.user.id;
        profileFields.username = username;
        if(bio) profileFields.bio = bio;
        if(location)profileFields.location = location;
        if(services) {
            profileFields.services = services.split(',').map(service => service.trim());
        }
        if(email) profileFields.email = email;

        // Social object creation
        profileFields.social = {}
        if(instagram) profileFields.social.instagram = instagram;
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
    
        let profile = await Profile.findOne({ user: req.user.id });

        // Update profile if found in DB
        if(profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true },
            );
            return res.json({ profile });
        }

        // Create profile if no profile found
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET to api/profile/all. Retrieves all profiles
router.get('/all', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['username', 'avatar']);
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// // GET to api/profile/user/:username. Retrieves user by username
router.get('/user/:username', async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ username: req.params.username })
            .populate('user', ['avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'Profile not found' });
        }     

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/', auth, async (req, res) => {
    try {
        // Remove user profile from database
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user from database
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User account deleted' });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;  