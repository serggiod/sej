angular
	.module('sej')
	.controller('usuarios',function($scope,$location,$http,$session){

		$scope.filtros = {
			codigo: '',
			nombre: '',
			correo: ''
		};

		$scope.init = function(){
			$scope.formsHide();
			json = {filtros:$scope.filtros};
			$http.get('models/usuarios.get.php?json='+JSON.stringify(json))
				.success(function(json){
					$scope.filtros = json.filtros;
					$scope.filtros.codigo = parseInt($scope.filtros.codigo);
					$scope.usuarios = json.registros;
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
			$scope.u_codigo = '';
			$scope.u_nombre = '';
			$scope.u_clave  = '';
			$scope.u_correo = '';
			$scope.u_nivseg = '';
			$scope.u_tipo   = '';
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
			if($scope.u_codigo) {
				json = {
					u_codigo : $scope.u_codigo,
					u_nombre : $scope.u_nombre,
					u_clave  : $scope.u_clave ,
					u_correo : $scope.u_correo,
					u_nivseg : $scope.u_nivseg,
					u_tipo   : $scope.u_tipo
				};
				$http.post('models/usuario.post.php',json)
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
		$scope.visualizar = function(u_codigo){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/usuario.get.php?u_codigo='+u_codigo)
					.success(function(json){
						$scope.u_codigo = parseInt(json.u_codigo);
						$scope.u_nombre = json.u_nombre;
						$scope.u_clave  = json.u_clave;
						$scope.u_correo = json.u_correo;
						$scope.u_nivseg = parseInt(json.u_nivseg);
						$scope.u_tipo   = json.u_tipo;
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
		$scope.modificar = function(u_codigo){
			if(confirm('¿Esta seguro que desea modificar este registro?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/usuario.get.php?u_codigo='+u_codigo)
						.success(function(json){
							$scope.u_codigo = parseInt(json.u_codigo);
							$scope.u_nombre = json.u_nombre;
							$scope.u_clave  = json.u_clave;
							$scope.u_correo = json.u_correo;
							$scope.u_nivseg = parseInt(json.u_nivseg);
							$scope.u_tipo   = json.u_tipo;
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
					u_codigo : $scope.u_codigo,
					u_nombre : $scope.u_nombre,
					u_clave  : $scope.u_clave ,
					u_correo : $scope.u_correo,
					u_nivseg : $scope.u_nivseg,
					u_tipo   : $scope.u_tipo
				};
				$http.put('models/usuario.put.php',json)
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

		$scope.eliminar = function(u_codigo){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$session.autorize(function(){
					$http.delete('models/usuario.delete.php?u_codigo='+u_codigo)
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

		$scope.filtrar = function(){
			$scope.init();
		};

		$scope.nofiltrar = function(){
			$scope.filtros = {
				codigo: '',
				nombre: '',
				correo: ''
			};
			$scope.init();
		};

		$session.autorize(function(){
			$session.mainmenu();
			$scope.init();
		});

	});