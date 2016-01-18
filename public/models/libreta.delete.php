<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='DELETE'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$m_numero  = filter_var($_GET['m_numero'],FILTER_SANITIZE_NUMBER_INT);
		$affect    = $db->exec("delete from libreta where m_numero='$m_numero';");
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