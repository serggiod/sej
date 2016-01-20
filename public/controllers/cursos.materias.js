angular
	.module('sej')
	.controller('cursos-materias',function($scope,$location,$http,$session,$routeParams){
		
		$scope.c_codigo = $routeParams.c_codigo;

		$scope.init = function(){
			$http.get('models/cursos.materias.get.php?c_codigo='+$scope.c_codigo)
				.success(function(json){
					$scope.materias = json;
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

		$scope.materiaslInit = function(){
			$http.get('models/materias.get.php')
				.success(function(json){
					$scope.materiasl = json;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.nuevo = function(){
			json = {
				c_codigo : $scope.c_codigo,
				m_numero : $scope.m_numero
			};
			$http.post('models/cursos.materias.post.php',json)
				.success(function(json){
					if(eval(json.result)){
						$scope.init();
					}
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.eliminar = function(m_numero){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$http.delete('models/cursos.materias.delete.php?m_numero='+$scope.m_numero+'&c_codigo='+c_codigo)
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
			$scope.materiaslInit();
			$scope.cursoInit();
			$scope.init();
		});

	});