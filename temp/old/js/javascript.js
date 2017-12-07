function getScroll(){
  var elmnt = document.getElementById("calendar");
  var x = elmnt.scrollLeft;
  var y = elmnt.scrollTop;
  document.getElementById('hours').style.marginTop = -y;
  document.getElementById('dayList').scrollLeft = x;
}

var app = angular.module ("gnomeApp", []);

app.filter('unsafe', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  };
});

app.filter('toTime', function() {
  return function (input) {
    var date = input.substring(0,5);
    if (date.charAt(0)=='0'){
      date = date.substring(1,5);
      return date;
    }
    var time = parseInt(date.substring(0,2));
    if (time>12) {
      time -= 12;
      var date2 = time.toString();
      date2 = date2.concat(date.substring(2,5));
      return date2;
    } else {
      return date;
    }
  }
});

app.controller('gnomeController', ['$scope','$http', function($scope, $http) {
	
	$scope.fitButtonBool = 0;
	
	$scope.fitButton = function () {
		if ($scope.fitButtonBool == 0) {
			document.getElementById('fitButton').style.backgroundColor = 'E12B23';
	    	document.getElementById('fitButton').style.color = 'white';
	    	$scope.fitButtonBool = 1;
		} else {
	    	document.getElementById('fitButton').style.backgroundColor = 'E5E5E5';
	    	document.getElementById('fitButton').style.color = 'E12B23';
	    	$scope.fitButtonBool = 0;
    	}
    }
    
    $scope.openButtonBool = 0;
    
    $scope.openButton = function () {
		if ($scope.openButtonBool == 0) {
			document.getElementById('openButton').style.backgroundColor = '459436';
	    	document.getElementById('openButton').style.color = 'white';
	    	$scope.openButtonBool = 1;
		} else {
	    	document.getElementById('openButton').style.backgroundColor = 'E5E5E5';
	    	document.getElementById('openButton').style.color = '459436';
	    	$scope.openButtonBool = 0;
    	}
    }
    
    $scope.WIDButtonBool = 0;
    
    $scope.WIDButton = function () {
		if ($scope.WIDButtonBool == 0) {
			document.getElementById('WIDButton').style.backgroundColor = 'E12B23';
	    	document.getElementById('WIDButton').style.color = 'white';
	    	$scope.WIDButtonBool = 1;
		} else {
	    	document.getElementById('WIDButton').style.backgroundColor = 'E5E5E5';
	    	document.getElementById('WIDButton').style.color = 'E12B23';
	    	$scope.WIDButtonBool = 0;
    	}
    }
    
    $scope.DeansButtonBool = 0;
    
    $scope.DeansButton = function () {
		if ($scope.DeansButtonBool == 0) {
			document.getElementById('DeansButton').style.backgroundColor = 'E12B23';
	    	document.getElementById('DeansButton').style.color = 'white';
	    	$scope.DeansButtonBool = 1;
		} else {
	    	document.getElementById('DeansButton').style.backgroundColor = 'E5E5E5';
	    	document.getElementById('DeansButton').style.color = 'E12B23';
	    	$scope.DeansButtonBool = 0;
    	}
    }
    
    $scope.sunday = 0;
	$scope.monday = 0;
	$scope.tuesday = 0;
	$scope.wednesday = 0;
	$scope.thursday = 0;
	$scope.friday = 0;
	$scope.saturday = 0;
    
    $scope.dayButton = function (day) {
		if ($scope[day] == 0) {
			$scope[day] = 1;
			document.getElementById(day).style.backgroundColor = 'E12B23';
	    	document.getElementById(day).style.color = 'white';
		} else {
	    	document.getElementById(day).style.backgroundColor = 'E5E5E5';
	    	document.getElementById(day).style.color = 'E12B23';
	    	$scope[day] = 0;
    	}
    }
    
    $scope.testScope = 'x';

  $scope.noCourses = 1;
  $scope.selectedCourses = [];
  $scope.loadLimit = 50;

  $scope.clearAll = function () {
    $scope.selectedCourses = [];
  }

  $scope.getStyle = function(course, day) {
    if (day == 'U' || day == 'M' || day == 'T' || day == 'W') {
      document.getElementById('calendar').scrollLeft = 0;
    } else {
      document.getElementById('calendar').scrollLeft = 350;
    }
    var dayBreak = new Date("October 13, 2014 07:45:00");
    if (course.days1) {
      if (course.days1.includes(day)) {
        var startTime = new Date("October 13, 2014 " + course.startTime1);
        var endTime = new Date("October 13, 2014 " + course.endTime1);
        var length = (endTime.getTime() - startTime.getTime())/60000;
        var start = (startTime.getTime()-dayBreak.getTime())/60000;
        document.getElementById('calendar').scrollTop = start - 150;
        return ("top:" + start + ";height:" + length);
        // document.getElementById('dayList').scrollLeft = x;
      }
    }
    if (course.days2) {
      if (course.days2.includes(day)) {
        var startTime = new Date("October 13, 2014 " + course.startTime2);
        var endTime = new Date("October 13, 2014 " + course.endTime2);
        var length = (endTime.getTime() - startTime.getTime())/60000;
        var start = (startTime.getTime()-dayBreak.getTime())/60000;
        return ("top:" + start + ";height:" + length);
      }
    }
    if (course.days3) {
      if (course.days3.includes(day)) {
        var startTime = new Date("October 13, 2014 " + course.startTime3);
        var endTime = new Date("October 13, 2014 " + course.endTime3);
        var length = (endTime.getTime() - startTime.getTime())/60000;
        var start = (startTime.getTime()-dayBreak.getTime())/60000;
        return ("top:" + start + ";height:" + length);
      }
    }
  }

  $scope.inDay = function (day) {
    return function (course) {
      if (course.days1) {
        if (course.days1.includes(day)) {
          return true;
        }
      }
      if (course.days2) {
        if (course.days2.includes(day)) {
          return true;
        }
      }
      if (course.days3) {
        if (course.days3.includes(day)) {
          return true;
        }
      }
      return false;
    }
  }

  $scope.increaseLoad = function () {
    $scope.loadLimit += 50;
  }

  $scope.getButtonSource = function (course) {
    for (var i=0;i<$scope.selectedCourses.length;++i) {
      if ($scope.selectedCourses[i].id == course.id){
	    document.getElementById(course.id).style.background = "linear-gradient(90deg,FFBFAC,F490B2)";
        return "img/minusButton.svg";
      }
    }
    document.getElementById(course.id).style.background = "white";
    return "img/addButton.svg";
  }

  $scope.addCourse = function (course) {
    for (var i=0;i<$scope.selectedCourses.length;++i) {
      if ($scope.selectedCourses[i].id == course.id){
        $scope.selectedCourses.splice(i,1);
//         document.getElementById(course.id).style.background = "white";
        return;
      }
    }
    $scope.selectedCourses.push(course);
//     document.getElementById(course.id).style.background = "linear-gradient(90deg,FFBFAC,F490B2)";
    
  }

  $scope.getColor = function (status) {
    if (status == 'CLOSED') {
      return 'CE2B28';
    } else if (status == 'WAITLIST') {
      return 'F4C430';
    } else {
      return '44C678';
    }
  }

  $scope.openMore = function(inputID) {
    var more = "moreInfo ";
    var blockID = more.concat(inputID);
    if (document.getElementById(blockID).className == "noShow" || document.getElementById(blockID).className == "noShow ng-binding") {
      document.getElementById(blockID).className = "moreInfo";
    } else {
      document.getElementById(blockID).className = "noShow";
    }
  }

  $scope.pressForCourses = function (keyevent) {
    if (keyevent.keyCode == 13) {
      $scope.getCourses();
    }
  }

  $scope.getCourses = function() {
          $http({
              method: 'GET',
              url: 'php/search.php',
              params: {
                c1: $scope.c1,
                c2: $scope.c2,
                courseName: $scope.courseName,
                subjectName: $scope.subjectName,
                courseAttribute: $scope.courseAttribute,
                courseNumberOne: $scope.courseNumberOne,
                courseNumberTwo: $scope.courseNumberTwo,
                crn: $scope.crn,
                instructor: $scope.instructor,
                sunday: $scope.sunday,
                monday: $scope.monday,
                tuesday: $scope.tuesday,
                wednesday: $scope.wednesday,
                thursday: $scope.thursday,
                friday: $scope.friday,
                saturday: $scope.saturday,
                wid: $scope.wid,
                deanSeminar: $scope.deanSeminar,
                selectedCourses: JSON.stringify($scope.selectedCourses)
              }
          }).then(function (courses) {
              if (courses.data == 'null') {
                $scope.noCourses = 1;
                $scope.courses = null;
              } else {
                $scope.noCourses = 0;
                $scope.courses = courses.data;
              };
          }, function (courses) {
              // on error
              console.log('ERROR');
          });
  };

}]);
