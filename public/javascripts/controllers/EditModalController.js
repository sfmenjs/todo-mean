app.controller('EditModalController',[ '$scope', '$modalInstance', 'todo', function($scope, $modalInstance, todo) {
	$scope.todo = todo;

	$scope.editToDo = function() {
		$modalInstance.close($scope.todo);
	}
}])