<?php
	
	$query = "";
  		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$timeOrString = $_GET['timeOrString'];
	
	if ($timeOrString == 'time') {
		$query = "SELECT updateTime FROM JSON";
		$result = $conn->query($query);
		$row = $result->fetch_assoc();
		echo $row["updateTime"];
	} else {
		$query = "SELECT jsonString FROM JSON";
		$result = $conn->query($query);
		$row = $result->fetch_assoc();
		echo str_replace(["u0026","u0027"],["&","'"],$row["jsonString"]);
	}
		
?>