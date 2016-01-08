<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$d_docume  = filter_var($_GET['d_docume'],FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select * from cargo where d_docume='$d_docume';");
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