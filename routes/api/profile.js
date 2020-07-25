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
    const profileFields = {};
    profileFields.user = req.user.id;
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

    try {
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

module.exports = router;  