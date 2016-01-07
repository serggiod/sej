angular
	.module('sej')
	.controller('mdi',function($scope,$location,$http,$session){

		$session.autorize(function(){
			$session.mainmenu();
		});		

	});