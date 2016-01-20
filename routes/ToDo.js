var express = require('express');
var router = express.Router();
var date = require('../app_modules/date.js');
var mongoose = require('mongoose');
var ToDo = mongoose.model('ToDo');

router.param('todo', function(req, res, next, id) {
	ToDo.findOne({ _id : id}, '_id desc deleted created title', function(err, todo) {
		if(err) return next(err);
		req.todo = todo;
		next();
	});
});

router.post('/', function(req, res, next) {
	var created = date();
	var todo = new ToDo(req.body);
	todo.created = created;
	todo.save(function(err, todo) {
		if(err) return next(err);
		res.json({_id: todo._id, created: created});
	})
});

router.get('/', function(req, res, next) {
	var query = ToDo.find({deleted: null});
	query.exec(function(err, todos) {
		if(err) return next(err);
		res.json(todos);
	})
});

router.delete('/:todo', function(req, res, next) {
	ToDo.update({_id: req.todo._id}, {deleted: date()}, {multi: false}, function callback(err, numAffected) {
		if(err) return next(err);
		else if (numAffected.nModified > 1) res.status(400).send("TOO MANY TODOS UPDATED!!!!");
		else if (numAffected.nModified !== 1) res.status(400).send("No todos updated");
		else res.status(200).send("Good to go!");
	});
});

router.put('/:todo', function(req, res, next) {
	ToDo.update({_id : req.todo._id}, req.body, {multi: false}, function callback(err, numAffected) {
		if(err) return next(err);
		else if (numAffected.nModified > 1) res.status(400).send("TOO MANY TODOS UPDATED!!!!");
		else if (numAffected.nModified !== 1) res.status(400).send("No todos updated");
		else res.status(200).send("Good to go!");
	});
});

module.exports = router;