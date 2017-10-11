<?php
$mysqli = new mysqli("35.199.63.1", "bain", "password", "bain");
if ($mysqli->connect_error) {
	die('Connect Error (' . $this->mysqli->connect_errno . ') ' . $this->mysqli->connect_error);
}

$file = array_slice(explode("\n", trim(file_get_contents("bain.csv"))), 1);

function uploadBatch($batch, $mysqli){
	if(!$mysqli->query("insert into provider values ". implode(",", $batch))){
	    die("Errormessage: ".$mysqli->error);
	}
}

$batch = [];

foreach($file as $row){
	$values = array_slice(str_getcsv($row), 1);
	$size = sizeof($values);
	for($i=0; $i<$size; $i++){
		$values[$i] = mysqli_real_escape_string($mysqli, $values[$i]);
	}
	for($i=$size - 3; $i<$size; $i++){
		$values[$i] = str_replace("$", "", $values[$i]);
	}
	$batch[] = "('".implode("','", $values)."')";
	if(sizeof($batch) > 10000) {
		uploadBatch($batch, $mysqli);
		$batch = [];
	}
}
if(sizeof($batch) > 0) uploadBatch($batch, $mysqli);
