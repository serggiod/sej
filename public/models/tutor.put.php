<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='PUT'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$t_docume = filter_var($data->t_docume ,FILTER_SANITIZE_STRING);
		$t_nombre = filter_var($data->t_nombre ,FILTER_SANITIZE_STRING);
		$t_domici = filter_var($data->t_domici ,FILTER_SANITIZE_NUMBER_INT);
		$t_telefo = filter_var($data->t_telefo ,FILTER_SANITIZE_NUMBER_INT);
		$u_codigo = filter_var($data->u_codigo ,FILTER_SANITIZE_STRING);
		$t_barrio = filter_var($data->t_barrio ,FILTER_SANITIZE_NUMBER_INT);
		$t_cuil   = filter_var($data->t_cuil   ,FILTER_SANITIZE_NUMBER_INT);
		$t_nacion = filter_var($data->t_nacion ,FILTER_SANITIZE_STRING);
		$t_nacimi = date('Y-m-d',strtotime(filter_var($data->t_nacimi ,FILTER_SANITIZE_STRING)));
		$t_celula = filter_var($data->t_celula ,FILTER_SANITIZE_NUMBER_INT);
		$t_telalt = filter_var($data->t_telalt ,FILTER_SANITIZE_NUMBER_INT);
		$t_ocupac = filter_var($data->t_ocupac ,FILTER_SANITIZE_STRING);
		$t_dirtra = filter_var($data->t_dirtra ,FILTER_SANITIZE_STRING);
		$t_teltra = filter_var($data->t_teltra ,FILTER_SANITIZE_NUMBER_INT);
		$t_croqui = filter_var($data->t_croqui ,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("update tutor set t_nombre='$t_nombre',t_domici='$t_domici',t_telefo='$t_telefo',u_codigo='$u_codigo',t_barrio='$t_barrio',t_cuil  ='$t_cuil ',t_nacion='$t_nacion',t_nacimi='$t_nacimi',t_celula='$t_celula',t_telalt='$t_telalt',t_ocupac='$t_ocupac',t_dirtra='$t_dirtra',t_teltra='$t_teltra',t_croqui='$t_croqui' where t_docume='$t_docume';");
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