angular
	.module('sej')
	.controller('cargos',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/cargos.get.php')
				.success(function(json){
					$scope.cargos = json;
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
			$scope.d_docume   = '';
			$scope.e_numero   = '';
			$scope.dc_cargo   = '';
			$scope.dc_alta    = '';
			$scope.dc_hora    = '';
			$scope.dc_decr    = '';
			$scope.dc_baja    = '';
			$scope.dc_causa   = '';
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
			if(($scope.a_docume)) {
				json = {
					d_docume:$scope.d_docume,
					e_numero:$scope.e_numero,
					dc_cargo:$scope.dc_cargo,
					dc_alta :$scope.dc_alta ,
					dc_hora :$scope.dc_hora ,
					dc_decr :$scope.dc_decr ,
					dc_baja :$scope.dc_baja ,
					dc_causa:$scope.dc_causa
				};
				$http.post('models/cargo.post.php',json)
					.success(function(json){
						if(eval(json.result)){
							$scope.alertColor = 'green';
							$scope.alertText  = 'El cargo se ingreso con éxito.';
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
				$scope.alertText  = 'EL primer campo es obligatorio.';
			}
		};

		// Para el formulario Visualizar.
		$scope.visualizar = function(d_docume){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/cargo.get.php?d_docume='+d_docume)
					.success(function(json){
						$scope.d_docume	  = parseInt(json.d_docume);
						$scope.e_numero	  = parseInt(json.e_numero);
						$scope.dc_cargo	  = json.dc_cargo;
						$scope.dc_alta 	  = json.dc_alta ;
						$scope.dc_hora 	  = parseInt(json.dc_hora) ;
						$scope.dc_decr 	  = parseInt(json.dc_decr) ;
						$scope.dc_baja 	  = json.dc_baja ;
						$scope.dc_causa	  = json.dc_causa;
						$scope.alertColor = 'blue';
						$scope.alertText  = 'Visualizando información de un alumno.';
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
		$scope.modificar = function(d_docume){
			if(confirm('¿Esta seguro que desea modificar este cargo?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/cargo.get.php?d_docume='+d_docume)
						.success(function(json){
							$scope.d_docume   = parseInt(json.d_docume);
							$scope.e_numero   = parseInt(json.e_numero);
							$scope.dc_cargo   = json.dc_cargo;
							$scope.dc_alta    = json.dc_alta ;
							$scope.dc_hora    = parseInt(json.dc_hora) ;
							$scope.dc_decr    = parseInt(json.dc_decr) ;
							$scope.dc_baja    = json.dc_baja ;
							$scope.dc_causa   = json.dc_causa;
							$scope.alertColor = 'yellow';
							$scope.alertText  = 'Modificando información de un alumno.';
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
					d_docume:$scope.d_docume,
					e_numero:$scope.e_numero,
					dc_cargo:$scope.dc_cargo,
					dc_alta :$scope.dc_alta ,
					dc_hora :$scope.dc_hora ,
					dc_decr :$scope.dc_decr ,
					dc_baja :$scope.dc_baja ,
					dc_causa:$scope.dc_causa
				};
				$http.put('models/cargo.put.php',json)
					.success(function(json){
						if(eval(json.result)){
							$scope.alertColor = 'green';
							$scope.alertText  = 'El alumno se modifico con éxito.';
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

		$scope.eliminar = function(d_docume){
			if(confirm('¿Esta seguro que desea eliminar este cargo?')){
				$session.autorize(function(){
					$http.delete('models/cargo.delete.php?d_docume='+d_docume)
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