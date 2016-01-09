<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='POST'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$c_codigo = filter_var($data->c_codigo ,FILTER_SANITIZE_NUMBER_INT);
		$c_anio   = filter_var($data->c_anio   ,FILTER_SANITIZE_NUMBER_INT);
		$c_divisi = filter_var($data->c_divisi ,FILTER_SANITIZE_NUMBER_INT);
		$c_turno  = filter_var($data->c_turno  ,FILTER_SANITIZE_STRING);
		$c_descri = filter_var($data->c_descri ,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("insert into curso values('$c_codigo','$c_anio','$c_divisi','$c_turno','$c_descri');");
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