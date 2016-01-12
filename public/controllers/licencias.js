angular
	.module('sej')
	.controller('licencias',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/licencias.get.php')
				.success(function(json){
					$scope.licencias = json;
					$scope.formTablaShow = true;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.formsHide = function(){
			date = new Date();
			$scope.formTablaShow = false;
			$scope.formNuevoShow = false;
			$scope.formVisualizarShow = false;
			$scope.formModificarShow = false;
			$scope.l_numero = '';
			$scope.d_docume = '';
			$scope.l_causa  = '';
			$scope.l_desded  = parseInt(date.getDate());
			$scope.l_desdem  = parseInt(date.getMonth() +1);
			$scope.l_desdeY  = parseInt(date.getFullYear());
			$scope.l_hastad  = parseInt(date.getDate());
			$scope.l_hastam  = parseInt(date.getMonth() +1);
			$scope.l_hastaY  = parseInt(date.getFullYear());
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
			if($scope.l_numero) {
				json = {
					l_numero : $scope.l_numero,
					d_docume : $scope.d_docume,
					l_causa  : $scope.l_causa ,
					l_desde  : $scope.l_desdeY+'-'+$scope.l_desdem+'-'+$scope.l_desded ,
					l_hasta  : $scope.l_hastaY+'-'+$scope.l_hastam+'-'+$scope.l_hastad
				};
				$http.post('models/licencia.post.php',json)
					.success(function(json){
						if(eval(json.result)){
							$scope.alertColor = 'green';
							$scope.alertText  = 'El registro se ingreso con éxito.';
							$scope.init();
						}
						else {
							$scope.alertColor = 'red';
							$scope.alertText  = 'Se detecto un error.';
						}
					})
					.error(function(){
						$session.destroy();
					});
			}
			else {
				$scope.alertColor = 'red';
				$scope.alertText  = 'EL primer campo es obligatorio.';
			}
		};

		// Para el formulario Visualizar.
		$scope.visualizar = function(l_numero){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/licencia.get.php?l_numero='+l_numero)
					.success(function(json){
						l_desde = json.l_desde.split('-');
						l_hasta = json.l_hasta.split('-');
						$scope.l_numero = parseInt(json.l_numero);
						$scope.d_docume = parseInt(json.d_docume);
						$scope.l_causa  = json.l_causa;
						$scope.l_desded  = parseInt(l_desde[2]);
						$scope.l_desdem  = parseInt(l_desde[1]);
						$scope.l_desdeY  = parseInt(l_desde[0]);
						$scope.l_hastad  = parseInt(l_hasta[2]);
						$scope.l_hastam  = parseInt(l_hasta[1]);
						$scope.l_hastaY  = parseInt(l_hasta[0]);
						$scope.alertColor = 'blue';
						$scope.alertText  = 'Visualizando información de un registro.';
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
		$scope.modificar = function(l_numero){
			if(confirm('¿Esta seguro que desea modificar este registro?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/licencia.get.php?l_numero='+l_numero)
						.success(function(json){
							l_desde = json.l_desde.split('-');
							l_hasta = json.l_hasta.split('-');
							$scope.l_numero = parseInt(json.l_numero);
							$scope.d_docume = parseInt(json.d_docume);
							$scope.l_causa  = json.l_causa;
							$scope.l_desded  = parseInt(l_desde[2]);
							$scope.l_desdem  = parseInt(l_desde[1]);
							$scope.l_desdeY  = parseInt(l_desde[0]);
							$scope.l_hastad  = parseInt(l_hasta[2]);
							$scope.l_hastam  = parseInt(l_hasta[1]);
							$scope.l_hastaY  = parseInt(l_hasta[0]);
							$scope.alertColor = 'yellow';
							$scope.alertText  = 'Modificando información de un registro.';
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
					l_numero : $scope.l_numero,
					d_docume : $scope.d_docume,
					l_causa  : $scope.l_causa ,
					l_desde  : $scope.l_desdeY+'-'+$scope.l_desdem+'-'+$scope.l_desded ,
					l_hasta  : $scope.l_hastaY+'-'+$scope.l_hastam+'-'+$scope.l_hastad
				};
				$http.put('models/licencia.put.php',json)
					.success(function(json){
						if(eval(json.result)){
							$scope.alertColor = 'green';
							$scope.alertText  = 'El curso se modifico con éxito.';
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

		$scope.eliminar = function(l_numero){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$session.autorize(function(){
					$http.delete('models/licencia.delete.php?l_numero='+l_numero)
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