const router = require('express').Router();
const { Blog } = require('../../../models');


// ROUTE for new post
router.post('/dashboard', async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)

    if (!newBlog) {
        res.status(500).json('Please enter subject or body of the blog')
    }
    res.status(200).json('New BLog Post')
    }
    catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;