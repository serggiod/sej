angular
	.module('sej')
	.controller('cursos',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/cursos.get.php')
				.success(function(json){
					$scope.cursos = json;
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
			$scope.c_codigo = '';
			$scope.c_anio   = '';
			$scope.c_divisi = '';
			$scope.c_turno  = '';
			$scope.c_descri = '';
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
			if($scope.c_codigo) {
				json = {
					c_codigo : $scope.c_codigo,
					c_anio   : $scope.c_anio,
					c_divisi : $scope.c_divisi,
					c_turno  : $scope.c_turno,
					c_descri : $scope.c_descri
				};
				$http.post('models/curso.post.php',json)
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
		$scope.visualizar = function(c_codigo){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/curso.get.php?c_codigo='+c_codigo)
					.success(function(json){
						$scope.c_codigo = parseInt(json.c_codigo);
						$scope.c_anio   = parseInt(json.c_anio);
						$scope.c_divisi = parseInt(json.c_divisi);
						$scope.c_turno  = json.c_turno ;
						$scope.c_descri = json.c_descri;
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
		$scope.modificar = function(c_codigo){
			if(confirm('¿Esta seguro que desea modificar este registro?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/curso.get.php?c_codigo='+c_codigo)
						.success(function(json){
							$scope.c_codigo = parseInt(json.c_codigo);
							$scope.c_anio   = parseInt(json.c_anio);
							$scope.c_divisi = parseInt(json.c_divisi);
							$scope.c_turno  = json.c_turno ;
							$scope.c_descri = json.c_descri;
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
					c_codigo : $scope.c_codigo,
					c_anio   : $scope.c_anio,
					c_divisi : $scope.c_divisi,
					c_turno  : $scope.c_turno,
					c_descri : $scope.c_descri
				};
				$http.put('models/curso.put.php',json)
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

		$scope.eliminar = function(c_codigo){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$session.autorize(function(){
					$http.delete('models/curso.delete.php?c_codigo='+c_codigo)
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

		$scope.materias = function(c_codigo){
			$location.path('/cursos-materias/'+c_codigo);
		};

		$scope.docentes = function(c_codigo){
			$location.path('/cursos-docentes/'+c_codigo);
		};

		$session.autorize(function(){
			$session.mainmenu();
			$scope.init();
		});

	});