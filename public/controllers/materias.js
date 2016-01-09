angular
	.module('sej')
	.controller('materias',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/materias.get.php')
				.success(function(json){
					$scope.materias = json;
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
			$scope.m_numero = '';
			$scope.d_docume = '';
			$scope.m_nombre = '';
			$scope.m_progra = '';
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
			if($scope.m_numero) {
				json = {
					m_numero:$scope.m_numero,
					d_docume:$scope.d_docume,
					m_nombre:$scope.m_nombre,
					m_progra:$scope.m_progra
				};
				$http.post('models/materia.post.php',json)
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
		$scope.visualizar = function(m_numero){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/materia.get.php?m_numero='+m_numero)
					.success(function(json){
						$scope.m_numero = parseInt(json.m_numero);
						$scope.d_docume = parseInt(json.d_docume);
						$scope.m_nombre = json.m_nombre;
						$scope.m_progra = json.m_progra;
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
		$scope.modificar = function(m_numero){
			if(confirm('¿Esta seguro que desea modificar este registro?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/materia.get.php?m_numero='+m_numero)
						.success(function(json){
							$scope.m_numero = parseInt(json.m_numero);
							$scope.d_docume = parseInt(json.d_docume);
							$scope.m_nombre = json.m_nombre;
							$scope.m_progra = json.m_progra;
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
					m_numero:$scope.m_numero,
					d_docume:$scope.d_docume,
					m_nombre:$scope.m_nombre,
					m_progra:$scope.m_progra
				};
				$http.put('models/materia.put.php',json)
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

		$scope.eliminar = function(m_numero){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$session.autorize(function(){
					$http.delete('models/materia.delete.php?m_numero='+m_numero)
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