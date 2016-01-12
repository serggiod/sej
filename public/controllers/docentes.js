angular
	.module('sej')
	.controller('docentes',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/docentes.get.php')
				.success(function(json){
					$scope.docentes = json;
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
			$scope.d_docume = '';
			$scope.d_nombre = '';
			$scope.d_domici = '';
			$scope.d_telefo = '';
			$scope.d_barrio = '';
			$scope.d_cuil   = '';
			$scope.d_nacion = '';
			$scope.d_nacimid = 1;
			$scope.d_nacimim = 1;
			$scope.d_nacimiY = 1980;
			$scope.d_celula = '';
			$scope.d_titulo = '';
			$scope.u_codigo = '';
			$scope.d_ecivil = '';
			$scope.d_decjur = '';
			$scope.d_copnac = '';
			$scope.d_copdni = '';
			$scope.d_coppla = '';
			$scope.d_copleg = '';
			$scope.d_copper = '';
			$scope.d_copdap = '';
			$scope.d_copcse = '';
			$scope.d_copcui = '';
			$scope.d_copsou = '';
			$scope.d_croqui = '';
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
			if($scope.d_docume) {
				json = {
					d_docume : $scope.d_docume,
					d_nombre : $scope.d_nombre,
					d_domici : $scope.d_domici,
					d_telefo : $scope.d_telefo,
					d_barrio : $scope.d_barrio,
					d_cuil   : $scope.d_cuil  ,
					d_nacion : $scope.d_nacion,
					d_nacimi : $scope.d_nacimiY+'-'+$scope.d_nacimim+'-'+$scope.d_nacimid,
					d_celula : $scope.d_celula,
					d_titulo : $scope.d_titulo,
					u_codigo : $scope.u_codigo,
					d_ecivil : $scope.d_ecivil,
					d_decjur : $scope.d_decjur,
					d_copnac : $scope.d_copnac,
					d_copdni : $scope.d_copdni,
					d_coppla : $scope.d_coppla,
					d_copleg : $scope.d_copleg,
					d_copper : $scope.d_copper,
					d_copdap : $scope.d_copdap,
					d_copcse : $scope.d_copcse,
					d_copcui : $scope.d_copcui,
					d_copsou : $scope.d_copsou,
					d_croqui : $scope.d_croqui
				};
				$http.post('models/docente.post.php',json)
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
		$scope.visualizar = function(d_docume){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/docente.get.php?d_docume='+d_docume)
					.success(function(json){
						d_nacimi = json.d_nacimi.split('-');
						$scope.d_docume = parseInt(json.d_docume);
						$scope.d_nombre = json.d_nombre;
						$scope.d_domici = json.d_domici;
						$scope.d_telefo = parseInt(json.d_telefo);
						$scope.d_barrio = json.d_barrio;
						$scope.d_cuil   = parseInt(json.d_cuil  );
						$scope.d_nacion = json.d_nacion;
						$scope.d_nacimid = parseInt(d_nacimi[2]);
						$scope.d_nacimim = parseInt(d_nacimi[1]);
						$scope.d_nacimiY = parseInt(d_nacimi[0]);
						$scope.d_celula = parseInt(json.d_celula);
						$scope.d_titulo = json.d_titulo;
						$scope.u_codigo = parseInt(json.u_codigo);
						$scope.d_ecivil = json.d_ecivil;
						$scope.d_decjur = parseInt(json.d_decjur);
						$scope.d_copnac = json.d_copnac;
						$scope.d_copdni = json.d_copdni;
						$scope.d_coppla = json.d_coppla;
						$scope.d_copleg = json.d_copleg;
						$scope.d_copper = json.d_copper;
						$scope.d_copdap = json.d_copdap;
						$scope.d_copcse = json.d_copcse;
						$scope.d_copcui = json.d_copcui;
						$scope.d_copsou = json.d_copsou;
						$scope.d_croqui = json.d_croqui;
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
		$scope.modificar = function(d_docume){
			if(confirm('¿Esta seguro que desea modificar este registro?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/docente.get.php?d_docume='+d_docume)
						.success(function(json){
							d_nacimi = json.d_nacimi.split('-');
							$scope.d_docume = parseInt(json.d_docume);
							$scope.d_nombre = json.d_nombre;
							$scope.d_domici = json.d_domici;
							$scope.d_telefo = parseInt(json.d_telefo);
							$scope.d_barrio = json.d_barrio;
							$scope.d_cuil   = parseInt(json.d_cuil  );
							$scope.d_nacion = json.d_nacion;
							$scope.d_nacimid = parseInt(d_nacimi[2]);
							$scope.d_nacimim = parseInt(d_nacimi[1]);
							$scope.d_nacimiY = parseInt(d_nacimi[0]);
							$scope.d_celula = parseInt(json.d_celula);
							$scope.d_titulo = json.d_titulo;
							$scope.u_codigo = parseInt(json.u_codigo);
							$scope.d_ecivil = json.d_ecivil;
							$scope.d_decjur = parseInt(json.d_decjur);
							$scope.d_copnac = json.d_copnac;
							$scope.d_copdni = json.d_copdni;
							$scope.d_coppla = json.d_coppla;
							$scope.d_copleg = json.d_copleg;
							$scope.d_copper = json.d_copper;
							$scope.d_copdap = json.d_copdap;
							$scope.d_copcse = json.d_copcse;
							$scope.d_copcui = json.d_copcui;
							$scope.d_copsou = json.d_copsou;
							$scope.d_croqui = json.d_croqui;
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
					d_docume : $scope.d_docume,
					d_nombre : $scope.d_nombre,
					d_domici : $scope.d_domici,
					d_telefo : $scope.d_telefo,
					d_barrio : $scope.d_barrio,
					d_cuil   : $scope.d_cuil  ,
					d_nacion : $scope.d_nacion,
					d_nacimi : $scope.d_nacimiY+'-'+$scope.d_nacimim+'-'+$scope.d_nacimid,
					d_celula : $scope.d_celula,
					d_titulo : $scope.d_titulo,
					u_codigo : $scope.u_codigo,
					d_ecivil : $scope.d_ecivil,
					d_decjur : $scope.d_decjur,
					d_copnac : $scope.d_copnac,
					d_copdni : $scope.d_copdni,
					d_coppla : $scope.d_coppla,
					d_copleg : $scope.d_copleg,
					d_copper : $scope.d_copper,
					d_copdap : $scope.d_copdap,
					d_copcse : $scope.d_copcse,
					d_copcui : $scope.d_copcui,
					d_copsou : $scope.d_copsou,
					d_croqui : $scope.d_croqui
				};
				$http.put('models/docente.put.php',json)
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

		$scope.eliminar = function(d_docume){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$session.autorize(function(){
					$http.delete('models/docente.delete.php?d_docume='+d_docume)
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