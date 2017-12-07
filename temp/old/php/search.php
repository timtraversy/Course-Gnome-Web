<?php
	
// 	$curl = curl_init('http://testcURL.com');
	
  $fitQuery = "";

  if ($_GET['c1'] == 1){
    $selectedCourses = json_decode($_GET['selectedCourses']);

    $fitQuery = " AND ((";
    for ($i=0;$i<count($selectedCourses);++$i) {

      if ($selectedCourses[$i]->days1 != null) {

        $startTime = $selectedCourses[$i]->startTime1;
        $startTime = date("H:i:s", strtotime("$startTime -10 minute"));
        $endTime = $selectedCourses[$i]->endTime1;
        $endTime = date("H:i:s", strtotime("$endTime +10 minute"));

        if ($i==0) {
          $fitQuery = $fitQuery . " NOT ( ( (startTime1<'$startTime' AND endTime1>'$startTime')OR(endTime1>'$endTime' AND startTime1<'$endTime')OR(startTime1>'$startTime' AND endTime1<'$endTime') ) AND (";
        } else {
          $fitQuery = $fitQuery . " AND NOT ( ( (startTime1<'$startTime' AND endTime1>'$startTime')OR(endTime1>'$endTime' AND startTime1<'$endTime')OR(startTime1>'$startTime' AND endTime1<'$endTime') ) AND (";
        }

        for ($j=0;$j<strlen($selectedCourses[$i]->days1);++$j){
          $day = (($selectedCourses[$i]->days1){$j});
          $fitQuery = $fitQuery . "days1 LIKE '%$day%' OR ";
        }
        $fitQuery = substr ($fitQuery, 0, strlen($fitQuery)-4);
        $fitQuery = $fitQuery . "))";
      }

      if ($selectedCourses[$i]->days2 != null) {

        $startTime = $selectedCourses[$i]->startTime2;
        $startTime = date("H:i:s", strtotime("$startTime -10 minute"));
        $endTime = $selectedCourses[$i]->endTime2;
        $endTime = date("H:i:s", strtotime("$endTime +10 minute"));

        $fitQuery = $fitQuery . " AND NOT ( ( (startTime1<'$startTime' AND endTime1>'$startTime')OR(endTime1>'$endTime' AND startTime1<'$endTime')OR(startTime1>'$startTime' AND endTime1<'$endTime') ) AND (";

        for ($j=0;$j<strlen($selectedCourses[$i]->days2);++$j){
          array_push($selectedCoursesArray[$i][0]['days'],(($selectedCourses[$i]->days2){$j}));
          $day = (($selectedCourses[$i]->days1){$j});
          $fitQuery = $fitQuery . "days1 LIKE '%$day%' OR ";
        }
        $fitQuery = substr ($fitQuery, 0, strlen($fitQuery)-4);
        $fitQuery = $fitQuery . "))";
      }
      if ($selectedCourses[$i]->days3 != null) {
        $selectedCoursesArray[$i][2] = [
          'startTime'=>$selectedCourses[$i]->startTime3,
          'endTime'=>$selectedCourses[$i]->endTime3,
          'days'=>[]
        ];

        $startTime = $selectedCourses[$i]->startTime3;
        $startTime = date("H:i:s", strtotime("$startTime -10 minute"));
        $endTime = $selectedCourses[$i]->endTime3;
        $endTime = date("H:i:s", strtotime("$endTime +10 minute"));

        $fitQuery = $fitQuery . " AND NOT ( ( (startTime1<'$startTime' AND endTime1>'$startTime')OR(endTime1>'$endTime' AND startTime1<'$endTime')OR(startTime1>'$startTime' AND endTime1<'$endTime') ) AND (";

        for ($j=0;$j<strlen($selectedCourses[$i]->days3);++$j){
          array_push($selectedCoursesArray[$i][0]['days'],(($selectedCourses[$i]->days3){$j}));
          $day = (($selectedCourses[$i]->days1){$j});
          $fitQuery = $fitQuery . "days1 LIKE '%$day%' OR ";
        }
        $fitQuery = substr ($fitQuery, 0, strlen($fitQuery)-4);
        $fitQuery = $fitQuery . "))";
      }
    }
    $fitQuery = $fitQuery . ")";
    for ($j=0;$selectedCourses[$j]!=null;++$j){
      $x = $selectedCourses[$j]->id;
      $fitQuery = $fitQuery . " OR ID = $x";
    }
    $fitQuery = $fitQuery . ")";
    // echo $fitQuery;
    // exit();
  }

  if ($_GET['c2'] == 1) {
    $onlyOpen = 'OPEN';
  } else {
    $onlyOpen = '%%';
  }

  $courseName = $_GET['courseName'];

  $department = $_GET['subjectName'];
  if ($department == '') {
    $departmentQuery = "";
  } else {
    $departmentQuery = " AND subjectName LIKE '%$department%'";
  }

  $courseAttribute = $_GET['courseAttribute'];
  if ($courseAttribute == '') {
    $courseAttributeQuery = " AND ((courseAttributes IS NULL) OR (courseAttributes LIKE '%%'))";
  } else {
    $courseAttributeQuery = " AND courseAttributes LIKE '%$courseAttribute%'";
  }

  $courseNumberOne = $_GET['courseNumberOne'];
  $courseNumberTwo = $_GET['courseNumberTwo'];
  if ($courseNumberOne == '') {
    if ($courseNumberTwo == '') {
      $courseNumberQuery = "";
    } else {
      $courseNumberQuery = " AND subjectNumber < $courseNumberTwo";
    }
  } else if ($courseNumberTwo == '') {
    $courseNumberQuery = " AND subjectNumber > $courseNumberOne";
  } else {
    $courseNumberQuery = " AND subjectNumber BETWEEN $courseNumberOne AND $courseNumberTwo";
  }

  $crn = $_GET['crn'];
  if ($crn == ''){
    $CRNQuery = "";
  } else {
    $CRNQuery = " AND crn LIKE '%$crn%'";
  }

  $instructor = $_GET['instructor'];

  $nodays = false;

  if ($_GET['sunday'] == '1') {
    $sunday = '%U%';
    $nodays = true;
  }
  if ($_GET['monday'] == '1') {
    $monday = '%M%';
    $nodays = true;
  }
  if ($_GET['tuesday'] == '1') {
    $tuesday = '%T%';
    $nodays = true;
  }
  if ($_GET['wednesday'] == '1') {
    $wednesday = '%W%';
    $nodays = true;
  }
  if ($_GET['thursday'] == '1') {
    $thursday = '%R%';
    $nodays = true;
  }
  if ($_GET['friday'] == '1') {
    $friday = '%F%';
    $nodays = true;
  }
  if ($_GET['saturday'] == '1') {
    $saturday = '%S%';
    $nodays = true;
  }

  if (!$nodays) {
    $daysQuery = "";
  } else {
    $daysQuery = "AND ((days1 LIKE '$sunday' OR days1 LIKE '$monday' OR days1 LIKE '$tuesday'
    OR days1 LIKE '$wednesday' OR days1 LIKE '$thursday' OR days1 LIKE '$friday' OR days1 LIKE '$saturday')
    OR (days2 LIKE '$sunday' OR days2 LIKE '$monday' OR days2 LIKE '$tuesday' OR days2 LIKE '$wednesday'
    OR days2 LIKE '$thursday' OR days2 LIKE '$friday' OR days2 LIKE '$saturday')
    OR (days3 LIKE '$sunday' OR days3 LIKE '$monday' OR days3 LIKE '$tuesday' OR days3 LIKE '$wednesday'
    OR days3 LIKE '$thursday' OR days3 LIKE '$friday' OR days3 LIKE '$saturday'))";
  }

  $WID = $_GET['wid'];
  if ($WID == '1') {
    $WIDQuery = " AND comment LIKE '%WID%'";
  }
  $deanSeminar = $_GET['deanSeminar'];
  if ($deanSeminar == '1') {
    $DeansQuery = " AND comment LIKE '%s Seminar%'";
  }

  $servername = "seasonalcoursedata.cfdh8unjcuqk.us-east-1.rds.amazonaws.com";
  $username = "timtraversy";
  $password = "rockyroad200";
  $dbname = "seasonalCourseData";

  $conn = mysqli_connect($servername, $username, $password, $dbname);

  mysqli_set_charset( $conn, 'utf8');

  $query = "SELECT * FROM fall2017 WHERE courseName LIKE '%$courseName%'
  AND instructor LIKE '%$instructor%'
  AND status LIKE '$onlyOpen'"
  . $courseAttributeQuery
  . $departmentQuery
  . $daysQuery
  . $courseNumberQuery
  . $CRNQuery
  . $WIDQuery
  . $DeansQuery
  . $onlyFit
  . $fitQuery;

  $result = $conn->query($query);

  while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
  }

  echo json_encode($courses);

?>
