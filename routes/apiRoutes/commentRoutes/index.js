const router = require('express').Router();
const { Comment } = require('../../../models');

// POST to homePage.js - BAD
router.post('/', async (req, res) => {
    try {
        const comment = {
            // WHERE THE ERR IS COMING FROM BC REQ is not being passed
            text: req.body.comment,
            blog_id: req.body.id,
            blogger_id: req.userData.id
        }
        const commentData = await Comment.create(comment);
        res.json(commentData);
        console.log('LN:13 COMMENT ROUTE', comment)
    } catch (err) {
        res.status(500).json({ err })
        console.log('LN16 commentRoute server side err')
    }
})

module.exports = router;