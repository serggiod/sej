<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$query = $db->query("select materia.m_numero,materia.m_nombre,alumno.a_nombre,libreta.l_promed from libreta inner join materia on materia.m_numero=libreta.m_numero inner join alumno on alumno.a_docume=libreta.a_docume order by materia.m_nombre desc;");
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