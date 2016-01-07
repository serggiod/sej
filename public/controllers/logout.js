angular
	.module('sej')
	.controller('logout',function($scope,$location,$http,$session){
		
		$session.autorize(function(){
			$session.mainmenu();	
		})

		$scope.cancelar = function(){
			$location.path('/mdi');
		}

		$scope.aceptar = function(){
			$session.destroy();
		}
	})