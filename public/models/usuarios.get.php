<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){

		$json = json_decode($_GET['json']);

		$filtros = array();
		$filtros['codigo'] = filter_var($json->filtros->codigo,FILTER_SANITIZE_NUMBER_INT);
		$filtros['nombre'] = filter_var($json->filtros->nombre,FILTER_SANITIZE_STRING);
		$filtros['correo'] = filter_var($json->filtros->correo,FILTER_SANITIZE_STRING);

		$select="select * ";
		$from  = "from  usuario ";
		$where = "where 0=0 ";

		if($filtros['codigo']>=1) $where .= " and u_codigo like '%".$filtros['codigo']."%' ";
		if(strlen($filtros['nombre'])) $where .= " and u_nombre like '%".$filtros['nombre']."%' ";
		if(strlen($filtros['correo'])) $where .= " and u_correo like '%".$filtros['correo']."%' ";
		

		$order = "order by u_codigo desc ";
		$limit = ";";

		$query = $db->query($select.$from.$where.$order.$limit);
		$registros = $query->fetchAll(PDO::FETCH_OBJ);

		$json  = array(
			'filtros' => $filtros,
			'registros' => $registros
		);

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