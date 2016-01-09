<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='PUT'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$l_numero = filter_var($data->l_numero ,FILTER_SANITIZE_NUMBER_INT);
		$d_docume = filter_var($data->d_docume ,FILTER_SANITIZE_NUMBER_INT);
		$l_causa  = filter_var($data->l_causa  ,FILTER_SANITIZE_STRING);
		$l_desde  = filter_var($data->l_desde  ,FILTER_SANITIZE_STRING);
		$l_hasta  = filter_var($data->l_hasta  ,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("update licencia set d_docume='$d_docume',l_causa='$l_causa',l_desde='$l_desde',l_hasta='$l_hasta' where l_numero='$l_numero';");
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