// Tasks.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	empId: {
		type: String,
		required: true
	},
	barcode: {
		type: String,
		required: true
	},
	mc: {
		type: String,
		required: true
	},
	qtyIn: {
		type: String,
		required: true
	},
	qtyOut: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	timeIn: {
		type: String,
		required: true
	},
	timeOut: {
		type: String,
		required: true
	},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;