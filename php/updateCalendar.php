<?php
	
	$query = "";
  		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$userID = $_GET['userID'];
	$optionNumber = $_GET['optionNumber'];
	
	$query = "SELECT DISTINCT courses.cid, offerings.oid, startTime, endTime, m, w, t, r, f, courseName, subjectAcronym, color FROM courses, offerings, offeringMeets, offeringsInChoice
WHERE courses.cid = offerings.cid AND offeringsInChoice.oid = offerings.oid AND offerings.oid = offeringMeets.oid AND offerings.oid IN (
SELECT oid FROM offeringsInChoice WHERE scheduleChoice IN (
SELECT scheduleChoice FROM userChoices WHERE userID = $userID AND optionNumber = $optionNumber))";

// echo $query;/*
	
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