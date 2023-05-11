const router = require('express').Router();
const {User} = require('../../models');

// here we will write the routes for dashboard, login and home.
router.get('/users', (req, res) => {
  res.render('users', {
    sentence: 'this will be the users login?'
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
        res.render('user_profile', {
          user,
          settings,
        });
      } catch (error) {
        res.status(500).json({error});
      }
});

module.exports = router;