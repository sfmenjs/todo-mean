app.factory('ToDoFactory', ['$http', '$q', function($http, $q){
	var o = {
		todos: []
	}
	o.ToDo = function(title, desc) {
		this.title = title;
		this.desc = desc;
		this.created = new Date();
		this.deleted = null;
	}
	o.addToDo = function(title, desc) {
		var todo = new o.ToDo(title, desc);
		$http({
			method: 'POST',
			data: todo,
			url: '/api/v2/ToDo'
		}).success(function(data) {
			todo._id = data._id;
			todo.created = data.created;
			o.todos.push(todo);
		});
	};

	o.editToDo = function(editT, t) {
		$http({
			method: 'PUT',
			data: editT,
			url: '/api/v2/ToDo/' + t._id
		}).success(function(data) {
			o.todos[o.todos.indexOf(t)] = angular.copy(editT);
		});
	};

	o.deleteToDo = function(todo) {
		$http({
			method: 'DELETE',
			url: '/api/v2/ToDo/' + todo._id
		}).success(function(data) {
			o.todos.splice(o.todos.indexOf(todo), 1);
		});
	};

	var getTodos = function() {
		$http({
			method: 'GET',
			url: '/api/v2/ToDo'
		}).success(function(data) {
			o.todos.length = 0;
			for(var i = 0; i < data.length; i++) {
				o.todos[i] = data[i];
			}
		});
	};

	getTodos();

	return o;
}]);