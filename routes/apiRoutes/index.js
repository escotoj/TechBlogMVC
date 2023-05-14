const router = require('express').Router();
const blogRoutes = require('./dashboardRoutes');
const userRoutes = require('./userRoutes');


router.use('/users', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;