<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){

		$json = json_decode($_GET['json']);

		$filtros = array();
		$filtros['documento'] = filter_var($json->filtros->documento,FILTER_SANITIZE_NUMBER_INT);
		$filtros['telefono'] = filter_var($json->filtros->telefono,FILTER_SANITIZE_NUMBER_INT);
		$filtros['nombre'] = filter_var($json->filtros->nombre,FILTER_SANITIZE_STRING);
		

		$select="select t_docume,t_nombre,t_telefo ";
		$from  = "from  tutor ";
		$where = "where 0=0 ";

		if($filtros['documento']>=1) $where .= " and t_docume like '%".$filtros['documento']."%' ";
		if($filtros['telefono']>=1) $where .= " and t_telefo like '%".$filtros['telefono']."%' ";
		if(strlen($filtros['nombre'])) $where .= " and t_nombre like '%".$filtros['nombre']."%' ";

		$order = "order by t_docume desc";
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