<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){

		$json = json_decode($_GET['json']);

		$filtros = array();
		$filtros['codigo'] = filter_var($json->filtros->codigo,FILTER_SANITIZE_NUMBER_INT);
		$filtros['division'] = filter_var($json->filtros->division,FILTER_SANITIZE_NUMBER_INT);
		$filtros['anio'] = filter_var($json->filtros->anio,FILTER_SANITIZE_NUMBER_INT);

		$select="select * ";
		$from  = "from  curso ";
		$where = "where 0=0 ";

		if($filtros['codigo']>=1)   $where .= " and c_codigo='".$filtros['codigo']."' ";
		if($filtros['division']>=1) $where .= " and c_divisi='".$filtros['division']."' ";
		if($filtros['anio']>=1)     $where .= " and c_anio='".$filtros['anio']."' ";

		$order = "order by c_codigo desc ";
		$limit = ";";

		$query = $db->query($select.$from.$where.$order.$limit);
		$registros  = $query->fetchAll(PDO::FETCH_OBJ);

		$json = array(
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