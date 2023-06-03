const router = require('express').Router();
const { Blog } = require('../../../models');


// ROUTE for new post
router.post('/dashboard', async (req, res) => {
  console.log("NEWBLOG", req.session)
    console.log("NEWBLOG", req.body.newBlog)
    try {
        const newBlog = await Blog.create({
          title: req.body.newBlog.title,
          content: req.body.newBlog.content,
          creator_id: req.session.userId
        })

    if (!newBlog) {
        res.status(500).json('Please enter subject or body of the blog')
    }
    res.status(200).json('New BLog Post')
    }
    catch (err) {
        res.status(500).json(err)
    }
});

  // UPDATE /api/dashboard/:id
router.put('/dashboard/:id', async (req, res) => {
  try {
      await Blog.update({
          title: req.body.title,
          content: req.body.content,
      },
      {
          where: {
              id: req.params.id,
          },
      });
      res.json({ message: 'blog updated!' });
  } catch (err) {
      res.status(500).json({ err });
  }
});

// DELETE /api/blog/dashboard/:id
router.delete('/dashboard/:id', async (req, res) => {
  try {
      await Blog.destroy({ where: { id: req.params.id } });
      res.json({ message: 'blog deleted!' });
  } catch (err) {
      res.status(500).json({ err });
  }
});

module.exports = router;