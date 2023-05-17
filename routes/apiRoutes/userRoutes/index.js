const router = require('express').Router();
const sequelize = require('../../../config/connection');
const bcrypt = require('bcrypt');
const { User } = require('../../../models');

router.post('/signup', async (req, res) => {
  console.log(req.body)
    try {
        const userData = await User.create(req.body.data)

    if (!userData) {
        res.status(500).json('Error creating user')
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    res.status(200).json('user created')
    }); } 
    catch (err) {
        res.status(500).json(err)
    }
});


router.post('/', async (req, res) => {
  console.log(req.body);
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
      req.session.save(() => {
        req.session.loggedIn = true;
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


module.exports = router;