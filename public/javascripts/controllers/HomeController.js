app.controller('HomeController', ['$scope', 'ToDoFactory', '$state', '$modal', function($scope, ToDoFactory, $state, $modal) {
	$scope.todos = ToDoFactory.todos;
	$scope.addToDo = function() {
		ToDoFactory.addToDo($scope.newTitle, $scope.newDesc);
		$state.go('Home');
	};
	$scope.deleteToDo = function(todo) {
		console.log(todo);
		ToDoFactory.deleteToDo(todo);
	};

	$scope.openEdit = function (t) {
		var instance = $modal.open({
			controller: 'EditModalController',
			templateUrl: './../views/modal.html',
			resolve: {
				todo: function() {
					return angular.copy(t);
				}
			}
		});
		instance.result.then(function(editT) {
			ToDoFactory.editToDo(editT, t);
		}, function() {
			console.log("inside of the result");
		});
	};

}]);