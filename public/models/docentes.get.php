<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$u_codigo  = filter_var($_GET['u_codigo'],FILTER_SANITIZE_NUMBER_INT);
		$query = $db->query("select docente.d_docume, docente.d_nombre, usuario.u_nombre from docente inner join usuario on usuario.u_codigo=docente.u_codigo order by docente.d_docume desc;");
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