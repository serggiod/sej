<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='PUT'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$d_docume = filter_var($data->d_docume ,FILTER_SANITIZE_NUMBER_INT);
		$e_numero = filter_var($data->e_numero ,FILTER_SANITIZE_NUMBER_INT);
		$dc_cargo = filter_var($data->dc_cargo ,FILTER_SANITIZE_STRING);
		$dc_alta  = date('Y-m-d',strtotime(filter_var($data->dc_alta  ,FILTER_SANITIZE_STRING)));
		$dc_hora  = filter_var($data->dc_hora  ,FILTER_SANITIZE_NUMBER_INT);
		$dc_decr  = filter_var($data->dc_decr  ,FILTER_SANITIZE_NUMBER_INT);
		$dc_baja  = date('Y-m-d',strtotime(filter_var($data->dc_baja  ,FILTER_SANITIZE_STRING)));
		$dc_causa = filter_var($data->dc_causa ,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("update cargo set e_numero='$e_numero',dc_cargo='$dc_cargo',dc_alta='$dc_alta',dc_hora='$dc_hora',dc_decr='$dc_decr',dc_baja='$dc_baja',dc_causa='$dc_causa' where d_docume='$d_docume';");
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