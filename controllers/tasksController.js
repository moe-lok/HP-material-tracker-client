// tasksControllers.js
const Task = require('../models/Tasks');

// Defining all methods and business logic for routes

module.exports = {
	findAll: function(req, res) {
		Task.find(req.query)
			.then(tasks => res.json(tasks))
			.catch(err => res.status(422).json(err));
	},
	findById: function(req, res) {
		Task.findById(req.params.id)
			.then(task => res.json(task))
			.catch(err => res.status(422).json(err));
	},
	create: function(req, res) {
		Task.create(req.body)
			.then(newTask => res.json(newTask))
			.catch(err => res.status(422).json(err));
	},
	update: function(req, res) {
		Task.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(task => res.json(task))
			.catch(err => res.status(422).json(err));
	},
	remove: function(req, res) {
		Task.findById({ _id: req.params.id })
			.then(task => task.remove())
			.then(alltasks => res.json(alltasks))
			.catch(err => res.status(422).json(err));
	}
};