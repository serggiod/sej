<?php

	function error404(){
		header("Status: 404 Not Found",true);
		header('HTTP/1.0 404 Not Found',true);
		header('Conection: close',true);
		die;
	}

	function sessionStatus(){
		if(is_array($_SESSION) && (count($_SESSION) >= 3)){
			if($_SESSION['loggedin']){
				$date = new DateTime();
				$diff = ($date->getTimestamp() - intval($_SESSION['loggeddate'])) /1000;
				if($diff<=3600){
					return true;
				}
				else {
					return false;
				}
			}
			else{
				return false;
			}
		}
		else {
			return false;
		}
	}
	
?>