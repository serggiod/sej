<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='POST'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$m_numero = filter_var($data->m_numero ,FILTER_SANITIZE_NUMBER_INT);
		$d_docume = filter_var($data->d_docume ,FILTER_SANITIZE_NUMBER_INT);
		$m_nombre = filter_var($data->m_nombre ,FILTER_SANITIZE_STRING);
		$m_progra = filter_var($data->m_progra ,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("insert into materia values('$m_numero','$d_docume','$m_nombre','$m_progra');");
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