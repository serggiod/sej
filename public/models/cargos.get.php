<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$query = $db->query("select docente.d_nombre, escuela.e_nombre, cargo.dc_cargo, cargo.d_docume from cargo inner join docente on docente.d_docume=cargo.d_docume inner join escuela on escuela.e_numero=cargo.e_numero order by docente.d_nombre desc;");
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