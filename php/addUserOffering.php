<?php
	
	$query = "";
  		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$userID = $_GET['userID'];
	$oid = $_GET['oid'];
	$optionNumber = $_GET['optionNumber'];
	$color = $_GET['color'];
	
	$query = "SELECT scheduleChoice FROM userChoices WHERE userID = $userID AND optionNumber = $optionNumber";
	$result = $conn->query($query);
	$row = $result->fetch_assoc();
    $choice = $row["scheduleChoice"];
    
	$query = "INSERT INTO offeringsInChoice (oid, scheduleChoice, color) VALUES ($oid, $choice, '$color')";
	$result = $conn->query($query);
	if ($result) {
		echo 'added offering';
	}

?>