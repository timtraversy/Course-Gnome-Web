<?php
	
	$query = "";
  		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$query = "SELECT * FROM linkedInstructors";
	
	$result = $conn->query($query);
 
	while ($row = $result->fetch_assoc()) {
		$courses[] = $row;
	}
	
	if ($courses === null) {
		echo json_encode([]);
	} else {
		echo json_encode($courses);
	}


?>