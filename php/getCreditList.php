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
		$query = "SELECT CONCAT (credit, ' (', Count(*), ')') AS result FROM courses WHERE credit LIKE '%$input%' GROUP BY credit";
	} else {
		$cid = $obj[0]->cid;
	
		$query = "SELECT CONCAT (credit, ' (', Count(*), ')') AS result FROM courses WHERE (cid = $cid";
		
		for ($i=1;$i<count($obj);++$i) {
			
			$cid = $obj[$i]->cid;
			
			$query = $query . " OR cid = $cid";
		  
		}
		
		$query = $query . ") AND credit LIKE '%$input%' GROUP BY credit";
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