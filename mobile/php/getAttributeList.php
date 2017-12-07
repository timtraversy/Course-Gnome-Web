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
		$query = "SELECT CONCAT (attributeName, ' (', Count(*), ')') AS result FROM courseAttributes WHERE attributeName LIKE '%$input%' OR attributeAcronym LIKE '%$input%' GROUP BY attributeName";
	} else {
		$oid = $obj[0]->oid;
	
		$query = "SELECT CONCAT (attributeName, ' (', Count(*), ')') AS result FROM courseAttributes WHERE (oid = $oid";
		
		for ($i=1;$i<count($obj);++$i) {
			
			$oid = $obj[$i]->oid;
			
			$query = $query . " OR oid = $oid";
		  
		}
		
		$query = $query . ") AND (attributeName LIKE '%$input%' OR attributeAcronym LIKE '%$input%') GROUP BY attributeName";
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