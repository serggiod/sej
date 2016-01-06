angular
	.module('sej')
	.controller('password',function($scope,$location,$http,$session){

		$scope.init = function(){
			$session.autorize(function(){
				$scope.password   = '';
				$scope.repassword = '';
				$scope.alert = {
					color:'green lighten-4',
					text:'Complete el siguiente formulario para cambiar el password.'
				};
			});
		};

		$scope.aceptar = function(){
			if(($scope.password.length>=4) && ($scope.repassword.length>=1)){
				if($scope.password===$scope.repassword){
					$session.autorize(function(){
						json = $session.getUser();
						json.password = $scope.password;
						$http.put('models/login.put.password.php',json)
						.success(function(json){
							if(json.result){
								$scope.alert.color='green lighten-4';
								$scope.alert.text='El password se ha modificado en forma correcta.';
							}
							else {
								$scope.alert.color='red lighten-4';
								$scope.alert.text='No se pudo modificar el password.';
							}
						})
						.error(function(){
							$session.destroy();
						});
					});
				}
				else{
					$scope.alert.color='red lighten-4';
					$scope.alert.text='Todos los campos deben ser idénticos.';
				}
			}
			else {
				$scope.alert.color='red lighten-4';
				$scope.alert.text='Todos los campos son obligatorios.';
			}
		};

		$scope.cancelar = function(){
			$location.path('/mdi');
		};

		$session.mainmenu();
		$scope.init();
	});