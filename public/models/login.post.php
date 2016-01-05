<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='POST'){
	
	// Obtener datos de la entrada estandard.
	$data = json_decode(file_get_contents('php://input'));

	// Sanitizar datos.
	$u_nombre = filter_var($data->usuario,FILTER_SANITIZE_STRING);
	$u_clave  = filter_var($data->password,FILTER_SANITIZE_STRING);

	// Validar datos
	if(is_string($u_nombre) && is_string($u_clave)){

		$json = array(
			'result'=>false,
			'user'=>null
		);

		$query = $db->query("select u_codigo codigo, u_nombre nombre, u_correo correo from usuario where u_nombre='$u_nombre' and u_clave='$u_clave';");
		$usuario = $query->fetch(PDO::FETCH_OBJ);
		
		if(is_numeric($usuario->codigo)){
			
			$json['result'] = true;
			$json['user'] = array(
				'id' => $usuario->codigo,
				'nombre' => $usuario->nombre
			);

		} 

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