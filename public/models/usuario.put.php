<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='PUT'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$u_codigo = filter_var($data->u_codigo ,FILTER_SANITIZE_NUMBER_INT);
		$u_nombre = filter_var($data->u_nombre ,FILTER_SANITIZE_STRING);
		$u_clave  = filter_var($data->u_clave  ,FILTER_SANITIZE_STRING);
		$u_correo = filter_var($data->u_correo ,FILTER_SANITIZE_STRING);
		$u_nivseg = filter_var($data->u_nivseg ,FILTER_SANITIZE_NUMBER_INT);
		$u_tipo   = filter_var($data->u_tipo   ,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("update usuario set u_nombre='$u_nombre',u_clave='$u_clave',u_correo='$u_correo',u_nivseg='$u_nivseg',u_tipo ='$u_tipo' where u_codigo='$u_codigo';");
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