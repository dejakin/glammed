const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// POST to api/posts. Creates post in DB
router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            username: user.username,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET to /api/posts. Returns all posts in DB
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}); 

// GET to api/posts/:username. Finds all posts for a specific user
router.get('/:username', auth, async (req, res) => {
    try {
        const posts = await Post.find({ username: req.params.username }).sort({ date: -1 });
        const userExists = await User.findOne({ username: req.params.username });

        if(!userExists) {
           return res.status(400).json({ msg: 'Profile not found' });
        }

        if(posts.length == 0) {
           return res.status(400).json({ msg: 'This user has no posts' });
        }

        res.json(posts);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}); 

module.exports = router;