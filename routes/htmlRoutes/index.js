const router = require('express').Router();
const {User, Blog} = require('../../models');
const utils = require('../../utils');
const withAuth = require('../../utils/auth')

// here we will write the routes for dashboard, login and home.
router.get('/login', (req, res) => {
  res.render('login', {
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
  const blogData = await Blog.findAll({
    include: [
        {
            model: User,
            attributes: ['id', 'username'],
        },
    ]
});
  
  const username = req.session.user_name;
  console.log("HOME", username)
  const blogs = blogData.map(blog => blog.get({plain: true}));
  console.log("HOME", blogs)
  res.render('homepage', {
    blogs,
    username,
    loggedIn: req.session.loggedIn,
    pathPrefix: '.',
  })
})

router.get('/blog/:id', async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id,{
    include: [
        {
            model: User,
            attributes: ['id', 'username'],
        },
    ]
});
  
  const username = req.session.user_name;
  console.log("HOME", username)
  const blog = blogData.get({plain: true});
  console.log("HOME", blog)
  res.render('single-blog', {
    blog,
    username,
    loggedIn: req.session.loggedIn,
    pathPrefix: '.',
  })
})

// GET ALL POST MADE BY USERS
// router.get('/login', async(req, res) => {
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


// dashboard is where they post and view their own blog
// BREAKING HERE WHEN READING USERDATA as NULL
router.get('/dashboard', withAuth, async (req, res) => {
try {
  console.log(req.session)
  const {user_name} = req.session;  
  console.log('USERNAME ', user_name)
  const userData = await User.findByPk(req.session.userId,
     {
    include: [
      {
      model: Blog,
      }
    ]
  }
  )
  // BREAK
  const user = userData.get({ plain: true });
  const blogs = user.blogs;
  console.log(blogs);

//  const users = userData.get({ plain: true });
  res.render('dashboard', {
    user,
    blogs
  });
} catch (err) {
  res.status(500).json(err);
}
})

router.get('/homepage/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




//DASH route once logged in

// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Blog }],
//     });

//     const user = userData.get({ plain: true });
// console.log(userData)
//     res.render('dashboard', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;
