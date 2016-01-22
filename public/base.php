<?php

// Iniciar o continuar una session.
session_start();

// Chequear si el modulo pdo esta cargado.
if(!extension_loaded('PDO')){
	echo 'Necesita ejecutar php5enmod pdo.';
	die;
}

// Chequear si el modulo pdo_mysql esta cargado.
if(!extension_loaded('pdo_mysql')){
	echo 'Necesita ejecutar php5enmod pdo_mysql.';
	die;
}

// Crear un enlace a la base de datos.
// MySQl: $db = new PDO('mysql:host=localhost;dbname=testsej','test','test');
// PostgreSQL $db = new PDO('postgres:host=localhost;dbname=testsej','test','test');
$db = new PDO('mysql:host=localhost;dbname=testsej','test','test');

// Autocarga de funciones.
$libs = scandir('lib');
unset($libs[0]);
unset($libs[1]);
sort($libs);
foreach($libs as $lib) {
	require_once 'lib/'.$lib;
}

?>