angular
	.module('sej')
	.controller('escuelas',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$http.get('models/escuelas.get.php')
				.success(function(json){
					$scope.escuelas = json;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$session.autorize(function(){
			$session.mainmenu();
			$scope.init();
		});

	});