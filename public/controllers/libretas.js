angular
	.module('sej')
	.controller('libretas',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/libretas.get.php')
				.success(function(json){
					$scope.libretas = json;
					$scope.formGrid = true;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.materiasInit = function(){
			$http.get('models/materias.get.php')
				.success(function(json){
					$scope.materias = json;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.alumnosInit = function(){
			$http.get('models/alumnos.get.php')
				.success(function(json){
					$scope.alumnos = json;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.formsHide = function(){
			$scope.formGrid = false;
			$scope.formFields = false;
			$scope.formTitle = '';
			$scope.formModificarShow = false;
			$scope.primarykey = false;
			$scope.readonly = false;
			$scope.m_numero   = '';
			$scope.a_docume   = '';
			$scope.l_nota1_1  = 1;
			$scope.l_nota1_2  = 0;
			$scope.l_nota2_1  = 1;
			$scope.l_nota2_2  = 0;
			$scope.l_nota3_1  = 1;
			$scope.l_nota3_2  = 0;
			$scope.l_promed_1 = 1;
			$scope.l_promed_2 = 0;
			$scope.l_recup1_1 = 1;
			$scope.l_recup1_2 = 0;
			$scope.l_recup2_1 = 1;
			$scope.l_recup2_2 = 0;
			$scope.l_recup3_1 = 1;
			$scope.l_recup3_2 = 0;
			$scope.l_notafi_1 = 1;
			$scope.l_notafi_2 = 0;
			$scope.l_observ   = '';
			$scope.l_coplib   = '';
			$scope.croqui = '';
			$scope.alertColor = 'green';
			$scope.alertText  = 'Complete el siguiente formulario.';
			$scope.visualizarButtons = false;
			$scope.nuevoButtons = false;
			$scope.modificarButtons = false;
		};

		// Para el formulario Nuevo.
		$scope.nuevo = function(){
			$scope.formsHide();
			$scope.formTitle = 'Nuevo';
			$scope.formFields = true;
			$scope.nuevoButtons = true;
		}
		$scope.nuevoCancelar = function(){
			$scope.formsHide();
			$scope.formGrid=true;
		};
		$scope.nuevoAceptar = function(){
			if($scope.m_numero) {
				json = {
					m_numero : $scope.m_numero,
					a_docume : $scope.a_docume,
					l_nota1  : $scope.l_nota1_1 +'.'+$scope.l_nota1_2,
					l_nota2  : $scope.l_nota2_1 +'.'+$scope.l_nota2_2,
					l_nota3  : $scope.l_nota3_1 +'.'+$scope.l_nota3_2,
					l_promed : $scope.l_promed_1 +'.'+$scope.l_promed_2,
					l_recup1 : $scope.l_recup1_1 +'.'+$scope.l_recup1_2,
					l_recup2 : $scope.l_recup2_1 +'.'+$scope.l_recup2_2,
					l_recup3 : $scope.l_recup3_1 +'.'+$scope.l_recup3_2,
					l_notafi : $scope.l_notafi_1 +'.'+$scope.l_notafi_2,
					l_observ : $scope.l_observ,
					l_coplib : $scope.l_coplib
				};
				$http.post('models/libreta.post.php',json)
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
		$scope.visualizar = function(m_numero){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/libreta.get.php?m_numero='+m_numero)
					.success(function(json){
						l_nota1  = json.l_nota1.split('.');
						l_nota2  = json.l_nota2.split('.');
						l_nota3  = json.l_nota3.split('.');
						l_promed = json.l_promed.split('.');
						l_recup1 = json.l_recup1.split('.');
						l_recup2 = json.l_recup2.split('.');
						l_recup3 = json.l_recup3.split('.');
						l_notafi = json.l_notafi.split('.');
						$scope.m_numero = json.m_numero;
						$scope.a_docume = json.a_docume;
						$scope.l_nota1_1  = parseInt(l_nota1[0]);
						$scope.l_nota1_2  = parseInt(l_nota1[1]);
						$scope.l_nota2_1  = parseInt(l_nota2[0]);
						$scope.l_nota2_2  = parseInt(l_nota2[1]);
						$scope.l_nota3_1  = parseInt(l_nota3[0]);
						$scope.l_nota3_2  = parseInt(l_nota3[1]);
						$scope.l_promed_1 = parseInt(l_promed[0]);
						$scope.l_promed_2 = parseInt(l_promed[1]);
						$scope.l_recup1_1 = parseInt(l_recup1[0]);
						$scope.l_recup1_2 = parseInt(l_recup1[1]);
						$scope.l_recup2_1 = parseInt(l_recup2[0]);
						$scope.l_recup2_2 = parseInt(l_recup2[1]);
						$scope.l_recup3_1 = parseInt(l_recup3[0]);
						$scope.l_recup3_2 = parseInt(l_recup3[1]);
						$scope.l_notafi_1 = parseInt(l_notafi[0]);
						$scope.l_notafi_2 = parseInt(l_notafi[1]);
						$scope.l_observ = json.l_observ;
						$scope.l_coplib = json.l_coplib;
						$scope.formTitle = ' Visualizar';
						$scope.primarykey = true;
						$scope.readonly = true;
						$scope.visualizarButtons = true;
						$scope.formFields = true;
					})
					.error(function(){
						$session.destroy();
					});
			});
		};
		$scope.visualizarCancelar = function(){
			$scope.formsHide();
			$scope.formGrid=true;
		};

		// Para el formulario modificar.
		$scope.modificar = function(m_numero){
			if(confirm('¿Esta seguro que desea modificar este registro?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/libreta.get.php?m_numero='+m_numero)
						.success(function(json){
							l_nota1  = json.l_nota1.split('.');
							l_nota2  = json.l_nota2.split('.');
							l_nota3  = json.l_nota3.split('.');
							l_promed = json.l_promed.split('.');
							l_recup1 = json.l_recup1.split('.');
							l_recup2 = json.l_recup2.split('.');
							l_recup3 = json.l_recup3.split('.');
							l_notafi = json.l_notafi.split('.');
							$scope.m_numero = json.m_numero;
							$scope.a_docume = json.a_docume;
							$scope.l_nota1_1  = parseInt(l_nota1[0]);
							$scope.l_nota1_2  = parseInt(l_nota1[1]);
							$scope.l_nota2_1  = parseInt(l_nota2[0]);
							$scope.l_nota2_2  = parseInt(l_nota2[1]);
							$scope.l_nota3_1  = parseInt(l_nota3[0]);
							$scope.l_nota3_2  = parseInt(l_nota3[1]);
							$scope.l_promed_1 = parseInt(l_promed[0]);
							$scope.l_promed_2 = parseInt(l_promed[1]);
							$scope.l_recup1_1 = parseInt(l_recup1[0]);
							$scope.l_recup1_2 = parseInt(l_recup1[1]);
							$scope.l_recup2_1 = parseInt(l_recup2[0]);
							$scope.l_recup2_2 = parseInt(l_recup2[1]);
							$scope.l_recup3_1 = parseInt(l_recup3[0]);
							$scope.l_recup3_2 = parseInt(l_recup3[1]);
							$scope.l_notafi_1 = parseInt(l_notafi[0]);
							$scope.l_notafi_2 = parseInt(l_notafi[1]);
							$scope.l_observ = json.l_observ;
							$scope.l_coplib = json.l_coplib;
							$scope.formTitle = 'Modificar';
							$scope.primarykey = true;
							$scope.modificarButtons = true;
							$scope.formFields = true;
						})
						.error(function(){
							$session.destroy();
						});
				});
			}
		};
		$scope.modificarCancelar = function(){
			$scope.formsHide();
			$scope.formGrid=true;
		};
		$scope.modificarAceptar = function(){
			$session.autorize(function(){
				json = {
					m_numero : $scope.m_numero,
					a_docume : $scope.a_docume,
					l_nota1  : $scope.l_nota1_1 +'.'+$scope.l_nota1_2,
					l_nota2  : $scope.l_nota2_1 +'.'+$scope.l_nota2_2,
					l_nota3  : $scope.l_nota3_1 +'.'+$scope.l_nota3_2,
					l_promed : $scope.l_promed_1 +'.'+$scope.l_promed_2,
					l_recup1 : $scope.l_recup1_1 +'.'+$scope.l_recup1_2,
					l_recup2 : $scope.l_recup2_1 +'.'+$scope.l_recup2_2,
					l_recup3 : $scope.l_recup3_1 +'.'+$scope.l_recup3_2,
					l_notafi : $scope.l_notafi_1 +'.'+$scope.l_notafi_2,
					l_observ : $scope.l_observ,
					l_coplib : $scope.l_coplib
				};
				$http.put('models/libreta.put.php',json)
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

		$scope.eliminar = function(m_numero){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$session.autorize(function(){
					$http.delete('models/libreta.delete.php?m_numero='+m_numero)
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
			$scope.materiasInit();
			$scope.alumnosInit();
			$scope.init();
		});

	});