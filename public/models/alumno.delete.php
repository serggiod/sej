<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='DELETE'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$a_docume  = filter_var($_GET['a_docume'],FILTER_SANITIZE_NUMBER_INT);
		$affect    = $db->exec("delete from alumno where a_docume='$a_docume';");
		if($affect) $json['result'] = true;
		echo json_encode($json,JSON_FORCE_OBJECT);
	}
	else {
		error404();
	}
}

else {
	error404();
}
?>