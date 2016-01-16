<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$query = $db->query("select licencia.l_numero,licencia.l_causa,docente.d_nombre from licencia inner join docente on docente.d_docume=licencia.d_docume order by licencia.l_numero desc;");
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