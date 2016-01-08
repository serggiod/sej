<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$e_numero  = filter_var($_GET['numero'],FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select e_numero numero, e_nombre nombre, e_direcc direccion, e_telefo telefono, e_croqui croqui from escuela where e_numero='$e_numero';");
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