const router = require('express').Router();
const { Comment } = require('../../../models');

router.post('/', async (req, res) => {
    try {
        const comment = {
            text: req.body.comment,
            blog_id: req.body.id,
            blogger_id: req.userData.id
        }
        const commentData = await Comment.create(comment);
        res.json(commentData);
    } catch (err) {
        res.status(500).json({ err })
        console.log('server side err')
    }
})

module.exports = router;