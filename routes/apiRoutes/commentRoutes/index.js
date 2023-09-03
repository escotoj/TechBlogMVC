const router = require('express').Router();
const { Comment } = require('../../../models');

// POST to homePage.js - Good
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const comment = {
            text: req.body.comment,
            blog_id: req.body.id,
            blogger_id: req.session.userId
        }
        const commentData = await Comment.create(comment);
        res.json(commentData);
        console.log('LN:13 COMMENT ROUTE', comment)
    } catch (err) {
        console.log('LN16 commentRoute server side err', err)
        res.status(500).json({ err })
    }
})


module.exports = router;