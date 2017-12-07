<?php
		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$input = $_GET['input'];
	
	$query = "SELECT DISTINCT subjectName FROM courses WHERE subjectAcronym = '$input'";
	
	$result = $conn->query($query);
	
	$row = $result->fetch_assoc();
	echo json_encode($row["subjectName"]);

?>
