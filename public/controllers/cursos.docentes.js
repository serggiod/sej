angular
	.module('sej')
	.controller('cursos-docentes',function($scope,$location,$http,$session,$routeParams){
		
		$scope.c_codigo = $routeParams.c_codigo;

		$scope.init = function(){
			$http.get('models/cursos.docentes.get.php?c_codigo='+$scope.c_codigo)
				.success(function(json){
					$scope.docentes = json;
					$scope.formGrid = true;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.cursoInit = function(){
			$http.get('models/curso.get.php?c_codigo='+$scope.c_codigo)
				.success(function(json){
					$scope.curso = json;
				})
				.error(function(){
					$session.destroy();
				});
		}

		$scope.docenteslInit = function(){
			$http.get('models/docentes.get.php')
				.success(function(json){
					$scope.docentesl = json;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.nuevo = function(){
			json = {
				d_docume : $scope.d_docume,
				c_codigo : $scope.c_codigo
			};
			$http.post('models/cursos.docentes.post.php',json)
				.success(function(json){
					if(eval(json.result)){
						$scope.init();
					}
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.eliminar = function(d_docume){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$http.delete('models/cursos.docentes.delete.php?d_docume='+$scope.d_docume+'&c_codigo='+c_codigo)
					.success(function(json){
						if(eval(json.result)){
							$scope.init();
						}
					})
					.error(function(){
						$session.destroy();
					});
			}
		}

		$scope.volver = function(){
			$location.path('/cursos');
		}

		$session.autorize(function(){
			$session.mainmenu();
			$scope.docenteslInit();
			$scope.cursoInit();
			$scope.init();
		});

	});