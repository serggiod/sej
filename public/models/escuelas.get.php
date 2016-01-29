<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$json = json_decode($_GET['json']);

		$filtros = array();
		$filtros['nombre'] = filter_var($json->filtros->nombre,FILTER_SANITIZE_STRING);
		$filtros['numero'] = filter_var($json->filtros->numero,FILTER_SANITIZE_NUMBER_INT);

		$select="select * ";
		$from  = "from escuela ";
		$where = "where 0=0 ";

		if(strlen($filtros['nombre'])) $where .= " and e_nombre like '%".$filtros['nombre']."%' ";
		if($filtros['numero']>=1) $where .= " and e_numero='".$filtros['numero']."' ";

		$ordeby= "order by e_numero desc ";
		$limit = ";";

		$query = $db->query($select.$from.$where.$ordeby.$limit);
		$registros = $query->fetchAll(PDO::FETCH_OBJ);

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