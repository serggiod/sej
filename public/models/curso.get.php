<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$c_codigo  = filter_var($_GET['c_codigo'],FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select * from curso where c_codigo='$c_codigo';");
		$json  = $query->fetch(PDO::FETCH_OBJ);
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