<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='POST'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$c_codigo = filter_var($data->c_codigo,FILTER_SANITIZE_NUMBER_INT);
		$e_numero = filter_var($data->e_numero,FILTER_SANITIZE_NUMBER_INT);
		$affect    = $db->exec("insert into esc_curs values('$e_numero','$c_codigo');");
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