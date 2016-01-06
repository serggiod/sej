angular
	.module('sej')
	.controller('login',function($scope,$location,$http,$session){

		// Ocultar loading.
		$('.loading').hide();

		$scope.alert    = {
			color:'green lighten-4',
			text:'Complete el siguiente formulario con sus datos pesonales.'
		};

		// Usuario y password.
		$scope.usuario = '';
		$scope.password = '';

		// Reaizar login.
		$scope.login = function(){
			
			if($scope.usuario.length>=1 && $scope.password.length>=1){

				//pass:CryptoJS.MD5($scope.password).toString()
				json ={
					usuario:$scope.usuario,
					password:$scope.password
				}


				$http.post('models/login.post.php/',json)
				
				.success(function(json){
					if(json.result){

						$scope.alert.color = 'green lighten-3';
						$scope.alert.text  = 'Ha ingresado en forma correcta.';

						// Iniciar session.
						$session.start(JSON.stringify(json.user));
						$session.mainmenu();
						$location.path('/mdi');					

					} 

					else {

						$scope.alert.color = 'red lighten-4';
						$scope.alert.text  = 'El servidor informa que este usuario no existe.';

					}
				})
				
				.error(function(){
					$scope.alert.color = 'red lighten-4';
					$scope.alert.text  = 'El servidor informa que este usuario no existe.';
				});
				
			} 

			else {
				$scope.alert.color='red lighten-4';
				$scope.alert.text='Todos los campos son obligatorios.';
			}

		}

	});