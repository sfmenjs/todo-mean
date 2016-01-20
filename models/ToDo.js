var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
	title: String,
	desc: String,
	created: mongoose.Schema.Types.Mixed,
	deleted: mongoose.Schema.Types.Mixed
})

mongoose.model('ToDo', ToDoSchema);