angular
	.module('sej')
	.controller('escuelas-cursos',function($scope,$location,$http,$session,$routeParams){
		
		$scope.e_numero = $routeParams.e_numero;

		$scope.init = function(){
			$http.get('models/escuelas.cursos.get.php?e_numero='+$scope.e_numero)
				.success(function(json){
					$scope.cursos = json;
					$scope.formGrid = true;
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.escuelaInit = function(){
			$http.get('models/escuela.get.php?numero='+$scope.e_numero)
				.success(function(json){
					$scope.escuela = json;
				})
				.error(function(){
					$session.destroy();
				});
		}

		$scope.cursoslInit = function(){
			$http.get('models/cursos.get.php')
				.success(function(json){
					$scope.cursosl = json;
					$scope.c_codigo = json[0].c_codigo;
					console.log($scope.c_codigo);
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.nuevo = function(){
			json = {
				e_numero : $scope.e_numero,
				c_codigo : $scope.c_codigo
			};
			$http.post('models/escuelas.cursos.post.php',json)
				.success(function(json){
					if(eval(json.result)){
						$scope.init();
					}
				})
				.error(function(){
					$session.destroy();
				});
		};

		$scope.eliminar = function(c_codigo){
			if(confirm('¿Esta seguro que desea eliminar este registro?')){
				$http.delete('models/escuelas.cursos.delete.php?e_numero='+$scope.e_numero+'&c_codigo='+c_codigo)
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
			$location.path('/escuelas');
		}

		$session.autorize(function(){
			$session.mainmenu();
			$scope.escuelaInit();
			$scope.cursoslInit();
			$scope.init();
		});

	});