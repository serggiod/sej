<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='PUT'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$e_numero  = filter_var($data->numero,FILTER_SANITIZE_NUMBER_INT);
		$e_nombre  = filter_var($data->nombre,FILTER_SANITIZE_STRING);
		$e_direcc  = filter_var($data->direccion,FILTER_SANITIZE_STRING);
		$e_telefo  = filter_var($data->telefono,FILTER_SANITIZE_STRING);
		$e_croqui  = filter_var($data->croqui,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("update escuela set e_nombre='$e_nombre', e_direcc='$e_direcc', e_telefo='$e_telefo', e_croqui='$e_croqui' where e_numero='$e_numero';");
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