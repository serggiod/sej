<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='PUT'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$d_docume = filter_var($data->d_docume ,FILTER_SANITIZE_NUMBER_INT);
		$d_nombre = filter_var($data->d_nombre ,FILTER_SANITIZE_STRING);
		$d_domici = filter_var($data->d_domici ,FILTER_SANITIZE_STRING);
		$d_telefo = filter_var($data->d_telefo ,FILTER_SANITIZE_NUMBER_INT);
		$d_barrio = filter_var($data->d_barrio ,FILTER_SANITIZE_STRING);
		$d_cuil   = filter_var($data->d_cuil   ,FILTER_SANITIZE_STRING);
		$d_nacion = filter_var($data->d_nacion ,FILTER_SANITIZE_STRING);
		$d_nacimi = date('Y-m-d',strtotime(filter_var($data->d_nacimi ,FILTER_SANITIZE_STRING)));
		$d_celula = filter_var($data->d_celula ,FILTER_SANITIZE_NUMBER_INT);
		$d_titulo = filter_var($data->d_titulo ,FILTER_SANITIZE_STRING);
		$u_codigo = filter_var($data->u_codigo ,FILTER_SANITIZE_NUMBER_INT);
		$d_ecivil = filter_var($data->d_ecivil ,FILTER_SANITIZE_STRING);
		$d_decjur = filter_var($data->d_decjur ,FILTER_SANITIZE_NUMBER_INT);
		$d_copnac = filter_var($data->d_copnac ,FILTER_SANITIZE_STRING);
		$d_copdni = filter_var($data->d_copdni ,FILTER_SANITIZE_STRING);
		$d_coppla = filter_var($data->d_coppla ,FILTER_SANITIZE_STRING);
		$d_copleg = filter_var($data->d_copleg ,FILTER_SANITIZE_STRING);
		$d_copper = filter_var($data->d_copper ,FILTER_SANITIZE_STRING);
		$d_copdap = filter_var($data->d_copdap ,FILTER_SANITIZE_STRING);
		$d_copcse = filter_var($data->d_copcse ,FILTER_SANITIZE_STRING);
		$d_copcui = filter_var($data->d_copcui ,FILTER_SANITIZE_STRING);
		$d_copsou = filter_var($data->d_copsou ,FILTER_SANITIZE_STRING);
		$d_croqui = filter_var($data->d_croqui ,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("update docente set d_nombre='$d_nombre',d_domici='$d_domici',d_telefo='$d_telefo',d_barrio='$d_barrio',d_cuil='$d_cuil',d_nacion='$d_nacion',d_nacimi='$d_nacimi',d_celula='$d_celula',d_titulo='$d_titulo',u_codigo='$u_codigo',d_ecivil='$d_ecivil',d_decjur='$d_decjur',d_copnac='$d_copnac',d_copdni='$d_copdni',d_coppla='$d_coppla',d_copleg='$d_copleg',d_copper='$d_copper',d_copdap='$d_copdap',d_copcse='$d_copcse',d_copcui='$d_copcui',d_copsou='$d_copsou',d_croqui='$d_croqui' where d_docume='$d_docume';");
		if($affect) $json['result'] = true;
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