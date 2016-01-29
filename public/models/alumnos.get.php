<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){
		$json = json_decode($_GET['json']);

		$filtros = array();
		$filtros['documento'] = filter_var($json->filtros->documento,FILTER_SANITIZE_NUMBER_INT);
		$filtros['nombre'] = filter_var($json->filtros->nombre,FILTER_SANITIZE_STRING);
		$filtros['tutor'] = filter_var($json->filtros->tutor,FILTER_SANITIZE_STRING);

		$select = "select * ";
		$from   = "from alumno  ";
		$inner  = "inner join tutor on tutor.t_docume=alumno.t_docume ";
		$where  = "where 0=0 ";

		if($filtros['documento']>=1) $where .= " and alumno.a_docume like '%".$filtros['documento']."%' ";
		if(strlen($filtros['nombre'])) $where .= " and alumno.a_nombre like '%".$filtros['nombre']."%' ";
		if(strlen($filtros['tutor'])) $where .= " and tutor.t_nombre like '%".$filtros['tutor']."%' ";

		$orderby= "order by alumno.a_docume desc ";
		$limit  = ";"; 
		$query = $db->query($select.$from.$inner.$where.$orderby.$limit);
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