angular
	.module('sej')
	.controller('alumnos',function($scope,$location,$http,$session){
		
		$scope.init = function(){
			$scope.formsHide();
			$http.get('models/alumnos.get.php')
				.success(function(json){
					$scope.alumnos = json;
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
			$scope.a_docume = '';
			$scope.t_docume = '';
			$scope.e_numero = '';
			$scope.c_codigo = '';
			$scope.a_nombre = '';
			$scope.a_nacion = '';
			$scope.a_nacimi = '';
			$scope.a_cuil   = '';
			$scope.a_domici = '';
			$scope.a_barrio = '';
			$scope.a_correo = '';
			$scope.a_idioma = '';
			$scope.a_telefo = '';
			$scope.a_condic = '';
			$scope.a_faltas = '';
			$scope.a_promed = '';
			$scope.a_celula = '';
			$scope.a_fechai = '';
			$scope.a_fechaf = '';
			$scope.a_titulo = '';
			$scope.a_copdni = '';
			$scope.a_copnac = '';
			$scope.a_coppri = '';
			$scope.a_copbol = '';
			$scope.a_copecg = '';
			$scope.a_copsal = '';
			$scope.a_copmed = '';
			$scope.a_copcuil = '';
			$scope.a_fotoca = '';
			$scope.a_egreso = '';
			$scope.a_conreg = '';
			$scope.a_conapr = '';
			$scope.a_croqui = '';
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
					a_docume:$scope.a_docume,
					t_docume:$scope.t_docume,
					e_numero:$scope.e_numero,
					c_codigo:$scope.c_codigo,
					a_nombre:$scope.a_nombre,
					a_nacion:$scope.a_nacion,
					a_nacimi:$scope.a_nacimi,
					a_cuil:$scope.a_cuil,
					a_domici:$scope.a_domici,
					a_barrio:$scope.a_barrio,
					a_correo:$scope.a_correo,
					a_idioma:$scope.a_idioma,
					a_telefo:$scope.a_telefo,
					a_condic:$scope.a_condic,
					a_faltas:$scope.a_faltas,
					a_promed:$scope.a_promed,
					a_celula:$scope.a_celula,
					a_fechai:$scope.a_fechai,
					a_fechaf:$scope.a_fechaf,
					a_titulo:$scope.a_titulo,
					a_copdni:$scope.a_copdni,
					a_copnac:$scope.a_copnac,
					a_coppri:$scope.a_coppri,
					a_copbol:$scope.a_copbol,
					a_copecg:$scope.a_copecg,
					a_copsal:$scope.a_copsal,
					a_copmed:$scope.a_copmed,
					a_copcuil:$scope.a_copcuil,
					a_fotoca:$scope.a_fotoca,
					a_egreso:$scope.a_egreso,
					a_conreg:$scope.a_conreg,
					a_conapr:$scope.a_conapr,
					a_croqui:$scope.a_croqui
				};
				$http.post('models/alumno.post.php',json)
					.success(function(json){
						if(eval(json.result)){
							$scope.alertColor = 'green';
							$scope.alertText  = 'El alumno se ingreso con éxito.';
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
		$scope.visualizar = function(a_docume){
			$scope.formsHide();
			$session.autorize(function(){
				$http.get('models/alumno.get.php?a_docume='+a_docume)
					.success(function(json){
						console.log(json);
						$scope.a_docume = parseInt(json.a_docume);
						$scope.t_docume = parseInt(json.t_docume);
						$scope.e_numero = parseInt(json.e_numero);
						$scope.c_codigo = parseInt(json.c_codigo);
						$scope.a_nombre = json.a_nombre;
						$scope.a_nacion = json.a_nacion;
						$scope.a_nacimi = json.a_nacimi;
						$scope.a_cuil   = parseInt(json.a_cuil);
						$scope.a_domici = json.a_domici;
						$scope.a_barrio = json.a_barrio;
						$scope.a_correo = json.a_correo;
						$scope.a_idioma = json.a_idioma;
						$scope.a_telefo = parseInt(json.a_telefo);
						$scope.a_condic = json.a_condic;
						$scope.a_faltas = parseInt(json.a_faltas);
						$scope.a_promed = parseFloat(json.a_promed);
						$scope.a_celula = parseInt(json.a_celula);
						$scope.a_fechai = json.a_fechai;
						$scope.a_fechaf = json.a_fechaf;
						$scope.a_titulo = json.a_titulo;
						$scope.a_copdni = json.a_copdni;
						$scope.a_copnac = json.a_copnac;
						$scope.a_coppri = json.a_coppri;
						$scope.a_copbol = json.a_copbol;
						$scope.a_copecg = json.a_copecg;
						$scope.a_copsal = json.a_copsal;
						$scope.a_copmed = json.a_copmed;
						$scope.a_copcuil =json.a_copcuil;
						$scope.a_fotoca = json.a_fotoca;
						$scope.a_egreso = json.a_egreso;
						$scope.a_conreg = parseInt(json.a_conreg);
						$scope.a_conapr = parseInt(json.a_conapr);
						$scope.a_croqui = json.a_croqui;
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
		$scope.modificar = function(a_docume){
			if(confirm('¿Esta seguro que desea modificar este alumno?')){
				$scope.formsHide();
				$session.autorize(function(){
					$http.get('models/alumno.get.php?a_docume='+a_docume)
						.success(function(json){
							$scope.a_docume = parseInt(json.a_docume);
							$scope.t_docume = parseInt(json.t_docume);
							$scope.e_numero = parseInt(json.e_numero);
							$scope.c_codigo = parseInt(json.c_codigo);
							$scope.a_nombre = json.a_nombre;
							$scope.a_nacion = json.a_nacion;
							$scope.a_nacimi = json.a_nacimi;
							$scope.a_cuil   = parseInt(json.a_cuil);
							$scope.a_domici = json.a_domici;
							$scope.a_barrio = json.a_barrio;
							$scope.a_correo = json.a_correo;
							$scope.a_idioma = json.a_idioma;
							$scope.a_telefo = parseInt(json.a_telefo);
							$scope.a_condic = json.a_condic;
							$scope.a_faltas = parseInt(json.a_faltas);
							$scope.a_promed = parseFloat(json.a_promed);
							$scope.a_celula = parseInt(json.a_celula);
							$scope.a_fechai = json.a_fechai;
							$scope.a_fechaf = json.a_fechaf;
							$scope.a_titulo = json.a_titulo;
							$scope.a_copdni = json.a_copdni;
							$scope.a_copnac = json.a_copnac;
							$scope.a_coppri = json.a_coppri;
							$scope.a_copbol = json.a_copbol;
							$scope.a_copecg = json.a_copecg;
							$scope.a_copsal = json.a_copsal;
							$scope.a_copmed = json.a_copmed;
							$scope.a_copcuil =json.a_copcuil;
							$scope.a_fotoca = json.a_fotoca;
							$scope.a_egreso = json.a_egreso;
							$scope.a_conreg = parseInt(json.a_conreg);
							$scope.a_conapr = parseInt(json.a_conapr);
							$scope.a_croqui = json.a_croqui;
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
					a_docume:$scope.a_docume,
					t_docume:$scope.t_docume,
					e_numero:$scope.e_numero,
					c_codigo:$scope.c_codigo,
					a_nombre:$scope.a_nombre,
					a_nacion:$scope.a_nacion,
					a_nacimi:$scope.a_nacimi,
					a_cuil:$scope.a_cuil,
					a_domici:$scope.a_domici,
					a_barrio:$scope.a_barrio,
					a_correo:$scope.a_correo,
					a_idioma:$scope.a_idioma,
					a_telefo:$scope.a_telefo,
					a_condic:$scope.a_condic,
					a_faltas:$scope.a_faltas,
					a_promed:$scope.a_promed,
					a_celula:$scope.a_celula,
					a_fechai:$scope.a_fechai,
					a_fechaf:$scope.a_fechaf,
					a_titulo:$scope.a_titulo,
					a_copdni:$scope.a_copdni,
					a_copnac:$scope.a_copnac,
					a_coppri:$scope.a_coppri,
					a_copbol:$scope.a_copbol,
					a_copecg:$scope.a_copecg,
					a_copsal:$scope.a_copsal,
					a_copmed:$scope.a_copmed,
					a_copcuil:$scope.a_copcuil,
					a_fotoca:$scope.a_fotoca,
					a_egreso:$scope.a_egreso,
					a_conreg:$scope.a_conreg,
					a_conapr:$scope.a_conapr,
					a_croqui:$scope.a_croqui,
				};
				$http.put('models/alumno.put.php',json)
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

		$scope.eliminar = function(a_docume){
			if(confirm('¿Esta seguro que desea eliminar este alumno?')){
				$session.autorize(function(){
					$http.delete('models/alumno.delete.php?a_docume='+a_docume)
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