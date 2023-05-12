const router = require('express').Router();
const { User } = require('../../../models');

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body)

    if (!userData) {
        res.status(500).json('Error creating user')
    }
    res.status(200).json('user created')
    }
    catch (err) {
        res.status(500).json(err)
    }
} )



module.exports = router;