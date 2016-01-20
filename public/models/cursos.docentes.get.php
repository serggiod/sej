<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$c_codigo = filter_input(INPUT_GET,'c_codigo',FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select * from curs_doc inner join docente on docente.d_docume=curs_doc.d_docume where curs_doc.c_codigo=$c_codigo order by docente.d_nombre asc; ");
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