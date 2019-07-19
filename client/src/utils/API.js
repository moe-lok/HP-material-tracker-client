import axios from 'axios';

export default {
	// Gets all tasks
	getTasks: function() {
		return axios.get('/api/task_log');
	},
	// Gets the task with the given id
	getTask: function(id) {
		return axios.get('/api/task_log/' + id);
	},
	// Deletes the task with the given id
	deleteTask: function(id) {
		return axios.delete('/api/task_log/' + id);
	},
	// Saves a task to the database
	saveTask: function(taskData) {
		return axios.post('/api/task_log', taskData);
	}
};