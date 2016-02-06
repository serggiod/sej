<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='GET'){
	if(sessionStatus()){

		$json = json_decode($_GET['json']);

		$filtros = array();
		$filtros['numero'] = filter_var($json->filtros->numero,FILTER_SANITIZE_NUMBER_INT);
		$filtros['docente'] = filter_var($json->filtros->docente,FILTER_SANITIZE_STRING);
		$filtros['materia'] = filter_var($json->filtros->materia,FILTER_SANITIZE_STRING);
		

		$select="select materia.m_numero,materia.m_nombre,docente.d_nombre ";
		$from  = "from materia ";
		$join  = "inner join docente on docente.d_docume=materia.d_docume ";
		$where = "where 0=0 ";

		if($filtros['numero']>=1) $where .= " and materia.m_numero like '%".$filtros['numero']."%' ";
		if(strlen($filtros['docente'])) $where .= " and docente.d_nombre like '%".$filtros['docente']."%' ";
		if(strlen($filtros['materia'])) $where .= " and materia.m_nombre like '%".$filtros['materia']."%' ";

		$order = "order by materia.m_numero desc ";
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