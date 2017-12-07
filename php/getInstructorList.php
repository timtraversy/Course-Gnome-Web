<?php
	
	$query = "";
  		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$json = $_POST['listed'];
	$input = $_POST['input'];
	$obj = json_decode($json); 
	
	if (count($obj)==0) {
		$query = "SELECT CONCAT (name, ' (', Count(*), ')') AS result FROM instructors WHERE name LIKE '%$input%' AND name NOT LIKE 'None listed' GROUP BY name";
	} else {

		$name = $obj[0]->name;
	
		$query = "SELECT CONCAT (name, ' (', Count(*), ')') AS result FROM instructors WHERE (name = '$name'";
		
		
		for ($i=1;$i<count($obj);++$i) {
			
			$name = $obj[$i]->name;
			
			$query = $query . " OR name = '$name'";
		  
		}
		
		
		$query = $query . ") AND name LIKE '%$input%' AND name NOT LIKE 'None listed' GROUP BY name";
	}
								  
	$result = $conn->query($query);
	
	while ($row = $result->fetch_assoc()) {
		$courses[] = $row["result"];
	}
			
	if ($courses === null) {
	  echo json_encode([]);
	} else {
	  echo json_encode($courses);
	}

?>