const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const utils = require("../../utils");
const withAuth = require("../../utils/auth");

// routes for dashboard, login, signup and home.
router.get("/login", (req, res) => {
  res.render("login", {
    sentence: "",
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    sentence: "",
  });
});

router.get("/", async (req, res) => {
  const blogData = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  });
  const username = req.session.user_name;
  // console.log("htmlRoutes.js ln:30 username --", username);
  console.log("htmlRoutes.js ln:30 REQ.SESSION", req.session);
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  console.log("HOME", blogs);
  res.render("homepage", {
    blogs,
    username,
    loggedIn: req.session.loggedIn,
    pathPrefix: ".",
  });
});

// WHERE ALL BLOGS ARE VIEWED
router.get("/homepage", async (req, res) => {
  const blogData = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  });
  const username = req.session.user_name;
  // console.log("htmlRoutes.js ln:30 username --", username);
  console.log("htmlRoutes.js ln:30 REQ.SESSION", req.session);
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  console.log("HOME", blogs);
  res.render("homepage", {
    blogs,
    username,
    loggedIn: req.session.loggedIn,
    pathPrefix: ".",
  });
});

// individial blog page 
router.get("/dashboard/:id", async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Comment,
        attributes: ['text'],
        include: [
          {
            model: User
            // grab user name through atributes
          }
        ]
      },
    ],
  });
  
  const username = req.session.user_name;
  const userId = req.session.userId
  // console.log("req.session.useriD ---", req.session.userId);
  const blog = blogData.get({ plain: true });
  // console.log("BLOG.creator_id --", blog.creator_id);
  const creator_id = blog.creator_id
  console.log("BLOG!!!!!", blog);
  const userComments = blog.comments
  console.log("userComments!!!!!", userComments);
  res.render("blog", {
    blog,
    username,
    loggedIn: req.session.loggedIn,
    userId,
    creator_id,
    userComments
  });
});

// using withAuth to display dashboard only if loggedin.
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    console.log(req.session);
    const { user_name } = req.session;
    console.log("USERNAME ", user_name);
    const userData = await User.findByPk(req.session.userId, {
      include: [
        {
          model: Blog,
        },
      ],
    });
    const user = userData.get({ plain: true });
    const blogs = user.blogs;
    console.log(blogs);
    res.render("dashboard", {
      user,
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
