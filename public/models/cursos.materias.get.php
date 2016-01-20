<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$c_codigo = filter_input(INPUT_GET,'c_codigo',FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select * from cur_mate inner join materia on materia.m_numero=cur_mate.m_numero where cur_mate.c_codigo=$c_codigo order by materia.m_nombre asc;");
		$json  = $query->fetchAll(PDO::FETCH_OBJ);
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