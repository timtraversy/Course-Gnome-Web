<?php

  $query = "";
  
  $autoCompleteText = $_GET['autoCompleteText'];

  $servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
  $username = "timtraversy";
  $password = "rockyroad200";
  $dbname = "seasonalCourseData";

  $conn = mysqli_connect($servername, $username, $password, $dbname);

  mysqli_set_charset( $conn, 'utf8');

  $query = "
  
(SELECT CONCAT (nameResult, ' (',count,')') as result FROM

((SELECT CONCAT ('DEPARTMENT: ', subjectName) AS nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM courses 
WHERE subjectName LIKE '$autoCompleteText%' OR subjectAcronym LIKE '$autoCompleteText%'
GROUP BY subjectName
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('STATUS: ', status) AS nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM offerings 
WHERE status LIKE '$autoCompleteText%'
GROUP BY status
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('COURSE ATTRIBUTE: ', attributeName) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM courseAttributes 
WHERE attributeName LIKE '$autoCompleteText%'
GROUP BY attributeName
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('INSTRUCTOR: ', name) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM instructors 
WHERE name LIKE '$autoCompleteText%' AND name NOT LIKE 'None listed'
GROUP BY name
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('CRN: ', crn) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM offerings 
WHERE crn LIKE '$autoCompleteText%'
GROUP BY crn
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('COURSE NUMBER: ', subjectNumber) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM courses 
WHERE subjectNumber LIKE '$autoCompleteText%'
GROUP BY subjectNumber)

ORDER BY priority, count DESC) AS Y)

UNION

(SELECT CONCAT (nameResult, ' (',count,')') as result FROM

((SELECT CONCAT ('DEPARTMENT: ', subjectName) AS nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM courses 
WHERE subjectName LIKE '%$autoCompleteText%' OR subjectAcronym LIKE '%$autoCompleteText%'
GROUP BY subjectName
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('STATUS: ', status) AS nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM offerings 
WHERE status LIKE '%$autoCompleteText%'
GROUP BY status
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('COURSE ATTRIBUTE: ', attributeName) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM courseAttributes 
WHERE attributeName LIKE '%$autoCompleteText%'
GROUP BY attributeName
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('INSTRUCTOR: ', name) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM instructors 
WHERE name LIKE '%$autoCompleteText%'AND name NOT LIKE 'None listed'
GROUP BY name
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('CRN: ', crn) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM offerings 
WHERE crn LIKE '%$autoCompleteText%'
GROUP BY crn
ORDER BY Count(*) DESC)

UNION

(SELECT CONCAT ('COURSE NUMBER: ', subjectNumber) as nameResult, Count(*) AS count, CONCAT ('1') AS priority
FROM courses 
WHERE subjectNumber LIKE '%$autoCompleteText%'
GROUP BY subjectNumber)

ORDER BY priority, count DESC) AS Y)

UNION

(SELECT CONCAT ('COURSE NAME: ', courseName) as result
FROM courses 
WHERE courseName LIKE '$autoCompleteText%')

UNION

(SELECT CONCAT ('COURSE NAME: ', courseName) as result
FROM courses 
WHERE courseName LIKE '%$autoCompleteText%')
			
			";
			  
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
