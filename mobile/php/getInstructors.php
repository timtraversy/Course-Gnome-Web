<?php
	
	$query = "";
  		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	$oid = $obj[0]->oid;
	
	$query = "SELECT * FROM instructors WHERE (oid = $oid";
	
	for ($i=1;$i<count($obj);++$i) {
		
		$oid = $obj[$i]->oid;
		
		$query = $query . " OR oid = $oid";
	  
	}
	
	$query = $query . ")";
						  
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