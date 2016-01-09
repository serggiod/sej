angular
	.module('sej',['ngRoute'])
	.config(function($routeProvider){
	    $routeProvider
		    .when('/',{
		        templateUrl:'views/login.html',
		        controller:'login'
		    })
		    .when('/password',{
		    	templateUrl:'views/password.html',
		    	controller:'password'
		    })
		    .when('/logout',{
		    	templateUrl:'views/logout.html',
		    	controller:'logout'
		    })
		    .when('/acercade',{
		    	templateUrl:'views/acercade.html',
		    	controller:'acercade'
		    })
		    .when('/mdi',{
		        templateUrl:'views/mdi.html',
		        controller:'mdi'
		    })
		    .when('/login',{
		        templateUrl:'views/login.html',
		        controller:'login'
		    })
		    .when('/escuelas',{
		    	templateUrl:'views/escuelas.html',
		    	controller:'escuelas'
		    })
		    .when('/alumnos',{
		    	templateUrl:'views/alumnos.html',
		    	controller:'alumnos'
		    })
		    .when('/cargos',{
		    	templateUrl:'views/cargos.html',
		    	controller:'cargos'
		    })
		    .when('/cursos',{
		    	templateUrl:'views/cursos.html',
		    	controller:'cursos'
		    })
		    .when('/licencias',{
		    	templateUrl:'views/licencias.html',
		    	controller:'licencias'
		    })
		    .otherwise({redirectTo:'/login'});
	});