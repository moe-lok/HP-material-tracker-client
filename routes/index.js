const router = require('express').Router();
const taskRoutes = require('./tasks');

router.use('/api/tasks', taskRoutes);

module.exports = router;