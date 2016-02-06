<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){

		$json = json_decode($_GET['json']);

		$filtros = array();
		$filtros['docente'] = filter_var($json->filtros->docente,FILTER_SANITIZE_STRING);
		$filtros['escuela'] = filter_var($json->filtros->escuela,FILTER_SANITIZE_STRING);
		$filtros['cargo']   = filter_var($json->filtros->cargo,FILTER_SANITIZE_STRING);

		$select="select docente.d_nombre, escuela.e_nombre, cargo.dc_cargo, cargo.d_docume ";
		$from  = "from cargo ";
		$join  = "inner join docente on docente.d_docume=cargo.d_docume inner join escuela on escuela.e_numero=cargo.e_numero ";
		$where = "where 0=0 ";
		
		if(strlen($filtros['docente'])) $where .= " and docente.d_nombre like '%".$filtros['docente']."%' ";
		if(strlen($filtros['escuela'])) $where .= " and escuela.e_nombre like '%".$filtros['escuela']."%' ";
		if(strlen($filtros['cargo']))   $where .= " and cargo.dc_cargo like '%".$filtros['cargo']."%' ";

		$order = "order by docente.d_nombre desc ";
		$limit = ";";
		
		$query = $db->query($select.$from.$join.$where.$order.$limit);
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