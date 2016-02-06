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
		$filtros['usuario'] = filter_var($json->filtros->usuario,FILTER_SANITIZE_STRING);
		
		$select="select docente.d_docume, docente.d_nombre, usuario.u_nombre ";
		$from  = "from docente ";
		$join  = "inner join usuario on usuario.u_codigo=docente.u_codigo ";
		$where = "where 0=0 ";

		if($filtros['documento']>=1) $where .= " and docente.d_docume='".$filtros['documento']."' ";
		if(strlen($filtros['nombre'])) $where .= " and docente.d_nombre like '%".$filtros['nombre']."%' ";
		if(strlen($filtros['usuario'])) $where .= " and usuario.u_nombre like '%".$filtros['usuario']."%' ";

		$order = "order by docente.d_docume desc";
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