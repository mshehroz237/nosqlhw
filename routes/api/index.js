const router = require('express').Router();

const userRoutes = require('./user-routes');

const thoughtRoutes = require('./thoughts-routes');

// making the route 
router.use('/users', userRoutes);

router.use('/thoughts', thoughtRoutes);

module.exports = router;