angular
	.module('sej')
	.controller('escuelas',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/escuelas.get.php')
				.success(function(json){
					$scope.escuelas = json;
					$scope.formTablaShow = true;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.formsHide = function(){
			$scope.formTablaShow = false;
			$scope.formNuevoShow = false;
			$scope.formVisualizarShow = false;
			$scope.formModificarShow = false;
			$scope.numero = '';
			$scope.nombre = '';
			$scope.direccion = '';
			$scope.telefono = '';
			$scope.croqui = '';
			$scope.alertColor = 'green';
			$scope.alertText  = 'Complete el siguiente formulario.';
		};

		// Para el formulario Nuevo.
		$scope.nuevo = function(){
			$scope.formsHide();
			$scope.formNuevoShow = true;
		}
		$scope.nuevoCancelar = function(){
			$scope.formsHide();
			$scope.formTablaShow=true;
		};
		$scope.nuevoAceptar = function(){
			if(($scope.nombre.length>=1) && ($scope.direccion.length>=1) && ($scope.telefono.length>=1) && ($scope.croqui.length>=1)) {
				json = {
					numero:$scope.numero,
					nombre:$scope.nombre,
					direccion:$scope.direccion,
					telefono:$scope.telefono,
					croqui:$scope.croqui
				};
				$http.post('models/escuela.post.php',json)
					.success(function(json){
						if(eval(json.result)){
							$scope.alertColor = 'green';
							$scope.alertText  = 'La escuela se ingreso con éxito.';
							$scope.init();
						}
						else {
							$scope.alertColor = 'red';
							$scope.alertText  = 'Se descto un error.';
						}
					})
					.error(function(){
						$session.destroy();
					});
			}
			else {
				$scope.alertColor = 'red';
				$scope.alertText  = 'Todos los campos son obligatorios.';
			}
		};

		// Para el formulario Visualizar.
		$scope.visualizar = function(numero){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/escuela.get.php?numero='+numero)
					.success(function(json){
						$scope.numero = json.numero;
						$scope.nombre = json.nombre;
						$scope.direccion = json.direccion;
						$scope.telefono = json.telefono;
						$scope.croqui = json.croqui;
						$scope.alertColor = 'blue';
						$scope.alertText  = 'Visualizando información de la escurla '+json.nombre+'.';
						$scope.formVisualizarShow = true;
					})
					.error(function(){
						$session.destroy();
					});
			});
		};
		$scope.visualizarCancelar = function(){
			$scope.formsHide();
			$scope.formTablaShow=true;
		};

		// Para el formulario modificar.
		$scope.modificar = function(numero){
			if(confirm('¿Esta seguro que desea modificar esta escuela?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/escuela.get.php?numero='+numero)
						.success(function(json){
							$scope.numero = json.numero;
							$scope.nombre = json.nombre;
							$scope.direccion = json.direccion;
							$scope.telefono = json.telefono;
							$scope.croqui = json.croqui;
							$scope.alertColor = 'yellow';
							$scope.alertText  = 'Modificando información de la escurla '+json.nombre+'.';
							$scope.formModificarShow = true;
						})
						.error(function(){
							$session.destroy();
						});
				});
			}
		};
		$scope.modificarCancelar = function(){
			$scope.formsHide();
			$scope.formTablaShow=true;
		};
		$scope.modificarAceptar = function(){
			$session.autorize(function(){
				json = {
					numero:$scope.numero,
					nombre:$scope.nombre,
					direccion:$scope.direccion,
					telefono:$scope.telefono,
					croqui:$scope.croqui
				};
				$http.put('models/escuela.put.php',json)
					.success(function(json){
						if(eval(json.result)){
							$scope.alertColor = 'green';
							$scope.alertText  = 'La escuela se modifico con éxito.';
							$scope.init();
						}
						else {
							$scope.alertColor = 'red';
							$scope.alertText  = 'Se descto un error.';
						}
					})
					.error(function(){
						$session.destroy();
					});
			});
		};

		$scope.eliminar = function(numero){
			if(confirm('¿Esta seguro que desea eliminar esta escuela?')){
				$session.autorize(function(){
					$http.delete('models/escuela.delete.php?numero='+numero)
						.success(function(json){
							if(eval(json.result)){
								$scope.init();
							}
						})
						.error(function(){
							$session.destroy();
						});	
				});
			}
		};

		$session.autorize(function(){
			$session.mainmenu();
			$scope.init();
		});

	});