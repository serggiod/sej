<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='POST'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$a_docume = filter_var($data->a_docume,FILTER_SANITIZE_NUMBER_INT);
		$t_docume = filter_var($data->t_docume,FILTER_SANITIZE_NUMBER_INT);
		$e_numero = filter_var($data->e_numero,FILTER_SANITIZE_NUMBER_INT);
		$c_codigo = filter_var($data->c_codigo,FILTER_SANITIZE_NUMBER_INT);
		$a_nombre = filter_var($data->a_nombre,FILTER_SANITIZE_STRING);
		$a_nacion = filter_var($data->a_nacion,FILTER_SANITIZE_STRING);
		$a_nacimi = filter_var($data->a_nacimi,FILTER_SANITIZE_STRING);
		$a_cuil = filter_var($data->a_cuil,FILTER_SANITIZE_NUMBER_INT);
		$a_domici = filter_var($data->a_domici,FILTER_SANITIZE_STRING);
		$a_barrio = filter_var($data->a_barrio,FILTER_SANITIZE_STRING);
		$a_correo = filter_var($data->a_correo,FILTER_SANITIZE_EMAIL);
		$a_idioma = filter_var($data->a_idioma,FILTER_SANITIZE_STRING);
		$a_telefo = filter_var($data->a_telefo,FILTER_SANITIZE_NUMBER_INT);
		$a_condic = filter_var($data->a_condic,FILTER_SANITIZE_STRING);
		$a_faltas = filter_var($data->a_faltas,FILTER_SANITIZE_NUMBER_INT);
		$a_promed = filter_var($data->a_promed,FILTER_SANITIZE_NUMBER_FLOAT);
		$a_celula = filter_var($data->a_celula,FILTER_SANITIZE_NUMBER_INT);
		$a_fechai = filter_var($data->a_fechai,FILTER_SANITIZE_STRING);
		$a_fechaf = filter_var($data->a_fechaf,FILTER_SANITIZE_STRING);
		$a_titulo = filter_var($data->a_titulo,FILTER_SANITIZE_STRING);
		$a_copdni = filter_var($data->a_copdni,FILTER_SANITIZE_STRING);
		$a_copnac = filter_var($data->a_copnac,FILTER_SANITIZE_STRING);
		$a_coppri = filter_var($data->a_coppri,FILTER_SANITIZE_STRING);
		$a_copbol = filter_var($data->a_copbol,FILTER_SANITIZE_STRING);
		$a_copecg = filter_var($data->a_copecg,FILTER_SANITIZE_STRING);
		$a_copsal = filter_var($data->a_copsal,FILTER_SANITIZE_STRING);
		$a_copmed = filter_var($data->a_copmed,FILTER_SANITIZE_STRING);
		$a_copcuil = filter_var($data->a_copcuil,FILTER_SANITIZE_STRING);
		$a_fotoca = filter_var($data->a_fotoca,FILTER_SANITIZE_STRING);
		$a_egreso = filter_var($data->a_egreso,FILTER_SANITIZE_STRING);
		$a_conreg = filter_var($data->a_conreg,FILTER_SANITIZE_NUMBER_INT);
		$a_conapr = filter_var($data->a_conapr,FILTER_SANITIZE_NUMBER_INT);
		$a_croqui = filter_var($data->a_croqui,FILTER_SANITIZE_STRING);
		$affect    = $db->exec("insert into alumno values('$a_docume','$t_docume','$e_numero','$c_codigo','$a_nombre','$a_nacion','$a_nacimi','$a_cuil','$a_domici','$a_barrio','$a_correo','$a_idioma','$a_telefo','$a_condic','$a_faltas','$a_promed','$a_celula','$a_fechai','$a_fechaf','$a_titulo','$a_copdni','$a_copnac','$a_coppri','$a_copbol','$a_copecg','$a_copsal','$a_copmed','$a_copcuil','$a_fotoca','$a_egreso','$a_conreg','$a_conapr','$a_croqui');");
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