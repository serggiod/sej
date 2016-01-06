<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='PUT'){
	if(sessionStatus()){
		$json = array(
			'result' => false
		);

		// Obtener datos de la entrada estandard.
		$data = json_decode(file_get_contents('php://input'));

		// Sanitizar datos.
		$u_codigo = filter_var($data->id,FILTER_SANITIZE_NUMBER_INT);
		$u_clave  = filter_var($data->password,FILTER_SANITIZE_STRING);

		$query = $db->prepare("update usuario set u_clave='$u_clave' where u_codigo='$u_codigo';");

		if($query->execute()){
			$json['result'] = true;	
		}

		echo json_encode($json,JSON_FORCE_OBJECT);

	}
	else{
		error404();
	}
}
else {
	error404();
}

?>