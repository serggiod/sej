<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$m_numero  = filter_var($_GET['m_numero'],FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select * from materia where m_numero='$m_numero';");
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