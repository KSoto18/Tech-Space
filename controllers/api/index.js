const router = require('express').Router();

const userRoutes = require('./userroutes');
const blogRoutes = require('./blogroutes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;