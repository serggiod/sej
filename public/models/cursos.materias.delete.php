<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='DELETE'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$m_numero  = filter_var($_GET['m_numero'],FILTER_SANITIZE_NUMBER_INT);
		$c_codigo  = filter_var($_GET['c_codigo'],FILTER_SANITIZE_NUMBER_INT);
		$affect    = $db->exec("delete from cur_mate where m_numero=$m_numero and c_codigo=$c_codigo;");
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