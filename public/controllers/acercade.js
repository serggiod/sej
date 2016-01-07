angular
	.module('sej')
	.controller('acercade',function($scope,$location,$http,$session){
		
		$session.autorize(function(){
			$session.mainmenu();
		});

		$scope.aceptar = function(){
			$location.path('/mdi');
		};
	});