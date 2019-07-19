const router = require('express').Router();
const taskRoutes = require('./tasks');
const path = require('path');

// API routes
router.use('/api/task_log', taskRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;