angular
	.module('sej',['ngRoute'])
	.config(function($routeProvider){
	    $routeProvider
		    .when('/',{
		        templateUrl:'views/login.html',
		        controller:'login'
		    })
		    .when('/mdi',{
		        templateUrl:'views/mdi.html',
		        controller:'mdi'
		    })
		    .when('/login',{
		        templateUrl:'views/login.html',
		        controller:'login'
		    })
		    .otherwise({redirectTo:'/'});
	});