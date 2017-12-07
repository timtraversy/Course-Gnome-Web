<?php
	
	$query = "";
  	
  	$courseName = $_GET['courseName'];	  	
	$crn = $_GET['crn'];
	$courseNumber1 = $_GET['courseNumber1'];
	$courseNumber2 = $_GET['courseNumber2'];
	$department = $_GET['department'];
	$instructor = $_GET['instructor'];
	$courseAttribute = $_GET['courseAttribute'];
	$credit = $_GET['credit'];
	$open = $_GET['open'];
	$closed = $_GET['closed'];
	$waitlist = $_GET['waitlist'];
	$wid = $_GET['wid'];
	$deans = $_GET['deans'];
	$startTime = $_GET['startTime'];
	$endTime = $_GET['endTime'];
	$m = $_GET['m'];
	$t = $_GET['t'];
	$w = $_GET['w'];
	$th = $_GET['th'];
	$f = $_GET['f'];
	
	$nothing = 0;
	
	$servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
	$username = "timtraversy";
	$password = "rockyroad200";
	$dbname = "seasonalCourseData";
	
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	mysqli_set_charset( $conn, 'utf8'); 
	
	$query = "SELECT * FROM offerings WHERE cid IN
	(SELECT cid FROM courses WHERE courseName LIKE \"%$courseName%\")";
	
	if ($crn != '') {
		$nothing = 1;
		$query = $query . " AND crn = $crn";
	}
	
	if ($courseNumber1 != '') {
		$nothing = 1;
		if ($courseNumber2 != '') {
			$query = $query . " AND cid IN 
			(SELECT cid FROM courses WHERE subjectNumber >= $courseNumber1 AND subjectNumber <= $courseNumber2)";
		}
		$query = $query . " AND cid IN 
		(SELECT cid FROM courses WHERE subjectNumber = $courseNumber1)";
	}
	
	if ($department != '') {
		$nothing = 1;
		$query = $query . " AND cid IN
		(SELECT cid FROM courses WHERE subjectName = \"$department\")";
	}
	
	if ($instructor != '') {
		$nothing = 1;
		$query = $query . " AND oid IN
		(SELECT oid FROM instructors
		WHERE name = '$instructor')";
	}
	
	if ($courseAttribute != '') {
		$nothing = 1;
		$query = $query . " AND oid IN
		(SELECT oid FROM courseAttributes
		WHERE attributeName = '$courseAttribute')";
	}
	
	if ($credit != '') {
		$nothing = 1;
		$query = $query . " AND cid IN
		(SELECT cid FROM courses WHERE credit = $credit)";
	}
	
	if ($open == 1) {
		$nothing = 1;
		$query = $query . " AND (status = 'Open'";
		if ($closed == 1) {
			$query = $query . " OR status = 'Closed'";
			if ($waitlist == 1) {
				$query = $query . " OR status = 'Waitlist')";
			} else {
				$query = $query . ")";
			}
		} else {
			$query = $query . ")";
		}
	} else if ($closed == 1) {
		$nothing = 1;
		$query = $query . " AND (status = 'Closed'";
		if ($waitlist == 1) {
			$query = $query . " OR status = 'Waitlist')";
		} else {
			$query = $query . ")";
		}
	} else if ($waitlist == 1) {
		$nothing = 1;
		$query = $query . " AND status = 'Waitlist'";
	}
	
	if ($wid == 1) {
		$nothing = 1;
		$query = $query . " AND cid IN
		(SELECT cid FROM courses WHERE subjectNumber LIKE '%W%')";
	}
	
	if ($deans == 1) {
		$nothing = 1;
		$query = $query . " AND comment LIKE '%Dean%'";
	}
	
	if ($startTime != '') {
		$nothing = 1;
		$convertedStartUNIX = strtotime($startTime);
		$convertedStartTime = gmdate("H:i:s", $convertedStartUNIX);
		$query = $query . " AND oid IN
		(SELECT oid FROM offeringMeets WHERE startTime >= '$convertedStartTime')";
	}
	
	
	if ($endTime != '') {
		$nothing = 1;
		$convertedEndUNIX = strtotime($endTime);
		$convertedEndTime = gmdate("H:i:s", $convertedEndUNIX);
		$query = $query . " AND oid IN
		(SELECT oid FROM offeringMeets WHERE endTime >= '$convertedEndTime')";
	}
	
	if ($m == 1) {
		$query = $query . " AND oid IN
		(SELECT oid FROM offeringMeets WHERE m = 1)";
	}
	
	if ($t == 1) {
		$query = $query . " AND oid IN
		(SELECT oid FROM offeringMeets WHERE t = 1)";
	}
	
	if ($w == 1) {
		$query = $query . " AND oid IN
		(SELECT oid FROM offeringMeets WHERE w = 1)";
	}
	
	if ($th == 1) {
		$query = $query . " AND oid IN
		(SELECT oid FROM offeringMeets WHERE r = 1)";
	}
	
	if ($f == 1) {
		$query = $query . " AND oid IN
		(SELECT oid FROM offeringMeets WHERE f = 1)";
	}
	
	if ($courseName == '' && $nothing == 0) {
		$query = "SELECT oid FROM offerings WHERE oid = -1";
	}

/*
	$testQuery = "SELECT * FROM offerings WHERE cid IN (SELECT cid FROM courses WHERE subjectAcronym LIKE 'SMPA' AND courseName LIKE '%%');
*/
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
