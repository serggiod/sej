angular
	.module('sej')
	.controller('tutores',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/tutores.get.php')
				.success(function(json){
					$scope.tutores = json;
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
			$scope.t_docume = '';
			$scope.t_nombre = '';
			$scope.t_domici = '';
			$scope.t_telefo = '';
			$scope.u_codigo = '';
			$scope.t_barrio = '';
			$scope.t_cuil   = '';
			$scope.t_nacion = '';
			$scope.t_nacimi = '';
			$scope.t_celula = '';
			$scope.t_telalt = '';
			$scope.t_ocupac = '';
			$scope.t_dirtra = '';
			$scope.t_teltra = '';
			$scope.t_croqui = '';
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
			if($scope.t_docume) {
				json = {
					t_docume:$scope.t_docume,
					t_nombre:$scope.t_nombre,
					t_domici:$scope.t_domici,
					t_telefo:$scope.t_telefo,
					u_codigo:$scope.u_codigo,
					t_barrio:$scope.t_barrio,
					t_cuil  :$scope.t_cuil  ,
					t_nacion:$scope.t_nacion,
					t_nacimi:$scope.t_nacimi,
					t_celula:$scope.t_celula,
					t_telalt:$scope.t_telalt,
					t_ocupac:$scope.t_ocupac,
					t_dirtra:$scope.t_dirtra,
					t_teltra:$scope.t_teltra,
					t_croqui:$scope.t_croqui
				};
				$http.post('models/tutor.post.php',json)
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
		$scope.visualizar = function(t_docume){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/tutor.get.php?t_docume='+t_docume)
					.success(function(json){
						$scope.t_docume = parseInt(json.t_docume);
						$scope.t_nombre = json.t_nombre;
						$scope.t_domici = json.t_domici;
						$scope.t_telefo = parseInt(json.t_telefo);
						$scope.u_codigo = parseInt(json.u_codigo);
						$scope.t_barrio = json.t_barrio;
						$scope.t_cuil   = parseInt(json.t_cuil)  ;
						$scope.t_nacion = json.t_nacion;
						$scope.t_nacimi = json.t_nacimi;
						$scope.t_celula = parseInt(json.t_celula);
						$scope.t_telalt = parseInt(json.t_telalt);
						$scope.t_ocupac = json.t_ocupac;
						$scope.t_dirtra = json.t_dirtra;
						$scope.t_teltra = parseInt(json.t_teltra);
						$scope.t_croqui = json.t_croqui;
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
		$scope.modificar = function(t_docume){
			if(confirm('¿Esta seguro que desea modificar este registro?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/tutor.get.php?t_docume='+t_docume)
						.success(function(json){
							$scope.t_docume = parseInt(json.t_docume);
							$scope.t_nombre = json.t_nombre;
							$scope.t_domici = json.t_domici;
							$scope.t_telefo = parseInt(json.t_telefo);
							$scope.u_codigo = parseInt(json.u_codigo);
							$scope.t_barrio = json.t_barrio;
							$scope.t_cuil   = parseInt(json.t_cuil)  ;
							$scope.t_nacion = json.t_nacion;
							$scope.t_nacimi = json.t_nacimi;
							$scope.t_celula = parseInt(json.t_celula);
							$scope.t_telalt = parseInt(json.t_telalt);
							$scope.t_ocupac = json.t_ocupac;
							$scope.t_dirtra = json.t_dirtra;
							$scope.t_teltra = parseInt(json.t_teltra);
							$scope.t_croqui = json.t_croqui;
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
					t_docume:$scope.t_docume,
					t_nombre:$scope.t_nombre,
					t_domici:$scope.t_domici,
					t_telefo:$scope.t_telefo,
					u_codigo:$scope.u_codigo,
					t_barrio:$scope.t_barrio,
					t_cuil  :$scope.t_cuil  ,
					t_nacion:$scope.t_nacion,
					t_nacimi:$scope.t_nacimi,
					t_celula:$scope.t_celula,
					t_telalt:$scope.t_telalt,
					t_ocupac:$scope.t_ocupac,
					t_dirtra:$scope.t_dirtra,
					t_teltra:$scope.t_teltra,
					t_croqui:$scope.t_croqui
				};
				$http.put('models/tutor.put.php',json)
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

		$scope.eliminar = function(t_docume){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$session.autorize(function(){
					$http.delete('models/tutor.delete.php?t_docume='+t_docume)
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