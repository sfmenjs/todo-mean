var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.modal', 'ui.bootstrap.tpls']);

app.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('Home', {
		url: '/',
		templateUrl: 'views/home.html'
	}).state('Create', {
		url: '/Create',
		templateUrl: 'views/CreateToDo.html'
	});
}]);