const router = require("express").Router();
const { User } = require("../../../models");

// LOGIN route to get userdata
router.get("/loggedinUser", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: {exclude: ["password"]}
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// CREATE NEW USER
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      // req.session.user_id = userData.id;
// NEW ---------
      req.session.user_name = req.body.username;
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      console.log(req.session);
      res.status(200).json(userData);
// OLD _______
      // req.session.user = userData;
      // req.session.loggedIn = true;
      // res.json({ message: "You are signed up!" });
      // console.log(userData);
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// LOGIN EXISTING USER
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // CODE BELOW IS CRASHING THE ROUTE
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_name = req.body.username;
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      console.log(req.session);
      res.status(200).json(userData);
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
