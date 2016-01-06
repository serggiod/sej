<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	$json = array(
		'result' => false
	);
	if(is_array($_SESSION) && (count($_SESSION) >= 3)){
		if($_SESSION['loggedin']){
			$date = new DateTime();
			$diff = ($date->getTimestamp() - intval($_SESSION['loggeddate'])) /1000;
			error_log($diff);
			if($diff<=3600){
				$_SESSION['loggeddate'] = $date->getTimestamp();
				$json['result'] = true;
				echo json_encode($json,JSON_FORCE_OBJECT);
			}
			else {
				error404();
			}
		}
		else{
			error404();
		}
	}
	else {
		error404();
	}
}
else {
	error404();
}

?>