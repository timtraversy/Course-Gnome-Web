<?php
	
	$query = "";
  		
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$id = $_POST['userID'];
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$email = $_POST['email'];
	
	$query = "SELECT userID FROM userInfo WHERE userID = $id";
	
	$result = $conn->query($query);
	
	while ($row = $result->fetch_assoc()) {
		$courses[] = $row;
	}
	
	if (count($courses)==0) {
		$query1 = "INSERT INTO userInfo (userID, firstName, lastName, email) VALUES ($id, '$firstName', '$lastName', '$email')";
		$query2 = "INSERT INTO userChoices (userID, optionNumber) VALUES ($id, 1)";
		$conn->query($query1);
		$conn->query($query2);
		echo 'added';
	} else {
		echo 'already in';
	}
	
  

?>