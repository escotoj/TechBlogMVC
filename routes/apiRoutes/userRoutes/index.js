const router = require("express").Router();
const sequelize = require("../../../config/connection");
const bcrypt = require("bcrypt");
const { User } = require("../../../models");
// const withAuth = require("../../../utils/auth");

router.get("/login", async (req, res) => {
  try {
    const userData = await User.findAll({})
    res.status(200).json(userData)
  } catch(err) {
    res.status(500).json(err)
    console.log(err)
  }
})


router.post('/signup', async (req, res) => {
  try {
      const userData = await User.create(req.body);

      req.session.save(() => {
        // req.session.user_id = userData.id;
          req.session.user = userData;
          req.session.loggedIn = true;
          res.json({ message: 'You are signed up!' });
          // console.log(userData.id)
          console.log(userData)
      });
  } catch (err) {
      res.status(500).json({ err });
  }
});



router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // if (!userData) {
    //   res
    //     .status(400)
    //     .json({ message: "Incorrect email or password. Please try again!" });
    //   return;
    // }
    // const validPassword = userData.checkPassword(req.body.password);
    // if (!validPassword) {
    //   res
    //     .status(400)
    //     .json({ message: "Incorrect email or password. Please try again!" });
    //   return;
    // }
   
    req.session.save(() => {
      req.session.user_name = req.body.username;
      req.session.userId = userData.id
      req.session.loggedIn = true;
      res.status(200).json(userData)
      console.log(req.session)
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});




module.exports = router;
