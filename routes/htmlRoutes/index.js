const router = require('express').Router();
const {User, Blog} = require('../../models');

// here we will write the routes for dashboard, login and home.
router.get('/', (req, res) => {
  res.render('welcome', {
    sentence: ''
  })
})

router.get('/signup', (req, res) => {
  res.render('signup', {
    sentence: ''
  })
})

// WHERE ALL BLOGS ARE VIEWED 
router.get('/homepage', async (req, res) => {
  const blogData = await Blog.findAll();
  const blogs = blogData.map(blog => blog.get({plain: true}));
  res.render('homepage', {
    blogs
  })
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    sentence: 'here is where we start a blogpost',
    subject: ''
  })
})


//homepage route once logged in
router.get('/users/:userId', async(req, res) => {
    try {
        const {userId} = req.params;
        const userData = await User.findByPk(userId, {
        //   include: [
        //     {
        //       model: Blog,
        //       attributes: ['id', 'title',],
        //     }
        //   ]
        });
        const user = userData.get({plain: true});
        
        const settings = {
          isCool: true,
          isHungry: false,
        };
        res.render('user.profile', {
          user,
          settings,
        });
      } catch (error) {
        res.status(500).json({error});
      }
});

module.exports = router;