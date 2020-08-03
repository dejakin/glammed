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

// GET to api/posts/:username. Returns all posts for a specific user
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

// DELETE to /api/posts/:id. Removes a post from DB
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(400).json({ msg: 'Post not found' });
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch(err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
}); 

// PUT to /api/posts/like/:id. Adds a like to the specified post
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Post already liked" });
        }

        post.likes.unshift({ user: req.user.id, username: req.user.username });
        await post.save();

        res.json(post.likes)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT to /api/posts/unlike/:id. Adds a like to the specified post
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post has already been liked by user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post has not yet been liked" });
        }

        // Get element index to be removed
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();

        res.json(post.likes)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;