<?php

// Cambiar de directorio.
chdir('..');

require_once 'base.php';

if($_SERVER['REQUEST_METHOD']==='POST'){
	if(sessionStatus()){
		$json = array('result'=>false);
		$data = json_decode(file_get_contents('php://input'));
		$m_numero  = filter_var($data->m_numero ,FILTER_SANITIZE_NUMBER_INT);
		$a_docume  = filter_var($data->a_docume ,FILTER_SANITIZE_NUMBER_INT);
		$l_nota1   = filter_var($data->l_nota1  ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_nota2   = filter_var($data->l_nota2  ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_nota3   = filter_var($data->l_nota3  ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_promed  = filter_var($data->l_promed ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_recup1  = filter_var($data->l_recup1 ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_recup2  = filter_var($data->l_recup2 ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_recup3  = filter_var($data->l_recup3 ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_notafi  = filter_var($data->l_notafi ,FILTER_SANITIZE_NUMBER_FLOAT,array('flags'=>FILTER_FLAG_ALLOW_FRACTION));
		$l_observ  = filter_var($data->l_observ ,FILTER_SANITIZE_STRING);
		$l_coplib  = filter_var($data->l_coplib ,FILTER_SANITIZE_STRING);
		
		error_log($l_nota1 );
		error_log($l_nota2 );
		error_log($l_nota3 );
		error_log($l_promed);
		error_log($l_recup1);
		error_log($l_recup2);
		error_log($l_recup3);
		error_log($l_notafi);


		$affect    = $db->exec("insert into libreta values('$m_numero','$a_docume','$l_nota1','$l_nota2','$l_nota3','$l_promed','$l_recup1','$l_recup2','$l_recup3','$l_notafi','$l_observ','$l_coplib');");
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