const router = require('express').Router();
const { Blog } = require('../../../models');


// ROUTE for new post
router.post('/dashboard', async (req, res) => {
    console.log(req.body.newBlog)
    try {
        const newBlog = await Blog.create(req.body.newBlog)

    if (!newBlog) {
        res.status(500).json('Please enter subject or body of the blog')
    }
    res.status(200).json('New BLog Post')
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/homepage', async (req, res) => {
    try {
      const existingBlog = await Blog.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!existingBlog) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
      res.status(200).json(existingBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/homepage', async (req, res) => {
    try {
      const existingBlog = await Blog.update(req.body.newBlog);
      if (!existingBlog) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
      res.status(200).json(existingBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;