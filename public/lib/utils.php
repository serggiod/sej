<?php

	function error404(){
		header("Status: 404 Not Found",true);
		header('HTTP/1.0 404 Not Found',true);
		header('Conection: close',true);
		die;
	}
	
?>