<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$e_numero = filter_input(INPUT_GET,'e_numero',FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select * from esc_curs inner join curso on curso.c_codigo=esc_curs.c_codigo where esc_curs.e_numero=$e_numero order by curso.c_codigo desc;");
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