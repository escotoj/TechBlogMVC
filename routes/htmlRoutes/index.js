const router = require('express').Router();
const {User, Blog} = require('../../models');

// here we will write the routes for dashboard, login and home.
router.get('/welcome', (req, res) => {
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

// GET ALL POST MADE BY USERS
// router.get('/welcome', async(req, res) => {
//   try {
//  const userData = await User.findByPk(res.session.user_id, {
//   attributes: {exclude: ["password"]}
//   // include: [{model: Blog}]
//  })
//  console.log(res.session.user_id)

//  const user = userData.get({plain: true})

//  res.render('dashboard', {
//    ...user,
//    logged_in: true
//  })

//   } catch(err) {
//     res.status(500).json(err)

//   }
// })



// BREAKING HERE WHEN READING USERDATA as NULL
router.get('/dashboard', async (req, res) => {
try {
  console.log(req.session)
  const {user_name} = req.session;  
  console.log('USERNAME ', user_name)
  const userData = await User.findByPk(user_name, {
    include: [
      {
      model: User,
      attributes: ['user_id']
      }
    ]
  })
  // BREAK
  console.log(userData)

 const users = userData.get({ plain: true });
  res.render('dashboard', {
    users,
  });
} catch (err) {
  res.status(500).json(err);
}
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