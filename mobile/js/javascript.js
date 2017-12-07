var blockCount = 0;

var departmentPicked = 0;
var courseAttributePicked = 0;
var instructorPicked = 0;
var CRNPicked = 0;
var courseNamePicked = 0;
var courseNumber1Picked = 0;
var openPicked = 0;
var closedPicked = 0;
var waitlistPicked = 0;

var switchCount = [
	['open', 0, '#ae2020'],
	['closed', 0, '#ae2020'],
	['waitlist', 0, '#ae2020'],
	['wid', 0, '#ae2020'],
	['deans', 0, '#ae2020'],
	['m', 0, '#D62121'],
	['t', 0, '#D62121'],
	['w', 0, '#D62121'],
	['th', 0, '#D62121'],
	['f', 0, '#D62121']
];

function updateHeight () {
	var results = document.getElementById('results');
	var rect = results.getBoundingClientRect();
	var push = window.scrollY + rect.top;
	results.style.height = 608;
	results.style.height = 608 - (push - 149);
	
	var push = window.scrollY + rect.top;
	callGetCourses();
}

function checkEmpty(idString) {
	if (window[idString+'Picked'] == 1) {
		if (document.getElementById(idString).value == ''){
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById(idString+'Block');
			parent.removeChild(child);
			--blockCount;
			window[idString+'Picked'] = 0;
			updateHeight();
		}
	}

}

function createBlockMoreFilters (term) {
	if (term.substring(0, 2) === "IN") {
		if (instructorPicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('instructorBlock');
			parent.removeChild(child);
			createBlock(term);
		}
	} else if (term.substring(0, 2) === "DE") {
		if (departmentPicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('departmentBlock');
			parent.removeChild(child);
			createBlock(term);
		};
	} else if (term.substring(0, 9) === "COURSE NA") {
		if (courseNamePicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('courseNameBlock');
			parent.removeChild(child);
			createBlock(term);
		}
	} else if (term.substring(0, 8) === "COURSE A") {
		if (courseAttributePicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('courseAttributeBlock');
			parent.removeChild(child);
			createBlock(term);
		}
	} else if (term.substring(0, 9) === "COURSE NU") {
		if (courseNumber1Picked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('courseNumber1Block');
			parent.removeChild(child);
			createBlock(term);
		}
	} else if (term.substring(0, 2) === "CR") {
		if (CRNPicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('CRNBlock');
			parent.removeChild(child);
			createBlock(term);
		}
	} else if (term.substring(0, 9) === "STATUS: O") {
		if (openPicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('openBlock');
			parent.removeChild(child);
			--blockCount;
			openPicked = 0;
			updateHeight();
		}
	} else if (term.substring(0, 9) === "STATUS: C") {
		if (closedPicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('closedBlock');
			parent.removeChild(child);
			--blockCount;
			closedPicked = 0;
			updateHeight();
		}
	} else if (term.substring(0, 9) === "STATUS: W") {
		if (waitlistPicked == 0) {
			createBlock(term);
		} else {
			var parent = document.getElementById('blocksHere');
			var child = document.getElementById('waitlistBlock');
			parent.removeChild(child);
			--blockCount;
			waitlistPicked = 0;
			updateHeight();
		}
	} 
}

function createBlock(term) {
	var string = term.substring(term.indexOf(':')+2, term.indexOf('(')-1);
	var idString = '';
	var color = "";
	if (term.substring(0, 2) === "IN") {
		idString = 'instructor';
		color = "rgba(126,39,62,";
		instructorPicked = 1;
	} else if (term.substring(0, 2) === "DE") {
		idString = 'department';
		color = "rgba(52,44,86,";
		departmentPicked = 1;
	} else if (term.substring(0, 9) === "COURSE NA") {
		idString = 'courseName';
		color = "rgba(201,33,37,";
		courseNamePicked = 1;
	} else if (term.substring(0, 8) === "COURSE A") {
		idString = 'courseAttribute';
		color = "rgba(176,35,45,";
		courseAttributePicked = 1;
	} else if (term.substring(0, 9) === "COURSE NU") {
		idString = 'courseNumber1';
		color = "rgba(102,40,70,";
		courseNumber1Picked = 1;
	} else if (term.substring(0, 2) === "CR") {
		idString = 'CRN';
		color = "rgba(151,37,53,";
		CRNPicked = 1;
	} else if (term.substring(0, 9) === "STATUS: O") {
		idString = 'open';
		color = "rgba(77,42,78,";
		openPicked = 1;
	} else if (term.substring(0, 9) === "STATUS: C") {
		idString = 'closed';
		color = "rgba(77,42,78,";
		closedPicked = 1;
	} else if (term.substring(0, 9) === "STATUS: W") {
		idString = 'waitlist';
		color = "rgba(77,42,78,";
		waitlistPicked = 1;
	} 
	
	blockCount = blockCount + 1;
	
	if(idString != 'open' && idString != 'closed' && idString != 'waitlist') {
		document.getElementById(idString).value = string;
	} else {
		clickButton(idString);
	}
	
	if (idString != 'courseName') {
		var blockText = term.substring(0, term.indexOf('(')-1);
	} else {
		var blockText = term.substring(0, term.length);
		document.getElementById(idString).value = term.substring(term.indexOf(':')+2, term.length);
	}
		
	var wrap = document.createElement("div");
	var wrapID = idString + 'Block';
	wrap.id = wrapID;
	wrap.style.float = "left";
	wrap.style.marginBottom = 6;
									
	var blockOneID = "blockOneID " + blockCount;				
	var block = document.createElement("div");
	block.style.padding = "8 5 0 10";
	block.style.float = "left";
	block.style.backgroundColor = color + "1)";
	block.style.color = "white";
	block.style.textAlign = "left";
	block.style.fontSize = "14";
	block.style.height = "20";
	block.id = blockOneID;
	
	var text = document.createTextNode(blockText + ' ');
	block.appendChild(text);
	
	var blockTwoID = "blockTwoID " + blockCount;
	var blockTwo = document.createElement("div");
	blockTwo.style.float = "left";
	blockTwo.style.marginRight = 10;
	blockTwo.style.backgroundColor = color + "1)";
	blockTwo.width = "20";
	blockTwo.style.height = "28";
	blockTwo.id = blockTwoID;	
	blockTwo.style.opacity = 1;
	blockTwo.style.WebkitTransition = "all 0.25s";
	blockTwo.style.transition = "all 0.25s";
	
	blockTwo.onmouseover = function (){
		document.getElementById(blockTwoID).style.backgroundColor = color + "0.5)";			
	}
	blockTwo.onmouseout = function (){
		document.getElementById(blockTwoID).style.background = color + "1)";
	}
	blockTwo.onclick = function (){
		var button = 0;
		var delID = "";
		if (term.substring(0, 2) === "IN") {
			instructorPicked = 0;
			delID = "instructor";
		} else if (term.substring(0, 2) === "DE") {
			departmentPicked = 0;
			delID = "department";
		} else if (term.substring(0, 9) === "COURSE NA") {
			courseNamePicked = 0;
			delID = "courseName";
		} else if (term.substring(0, 8) === "COURSE A") {
			courseAttributePicked = 0;
			delID = "courseAttribute";
		} else if (term.substring(0, 9) === "COURSE NU") {
			courseNumber1Picked = 0;
			delID = "courseNumber";
		} else if (term.substring(0, 2) === "CR") {
			CRNPicked = 0;
			delID = "crn";
		} else if (term.substring(0, 9) === "STATUS: O") {
			openPicked = 0;
			clickButton('open');
			button = 1;
		} else if (term.substring(0, 9) === "STATUS: C") {
			closedPicked = 0;
			clickButton('closed');
			button =1;
		} else if (term.substring(0, 9) === "STATUS: W") {
			waitlistPicked = 0;
			button = 1;
			clickButton('waitlist');
		}
		var parent = document.getElementById('blocksHere');
		var child = document.getElementById(wrapID);
		parent.removeChild(child);
		if (button == 0) {
			document.getElementById(delID).value = '';w
		}
		--blockCount;
		updateHeight();
	}
	
	var img = document.createElement("img");
	img.src = 'images/justX.png';
	img.style.margin = "8 6 0 6";
	img.height= 12;
	blockTwo.appendChild(img);
	
	wrap.appendChild(block);
	wrap.appendChild(blockTwo);
	
	document.getElementById('blocksHere').appendChild(wrap);
	
	document.getElementById('hero-demo').value='';
	document.getElementById('startGnome').style.display="none";
	document.getElementById('results').style.display="block";
	
	updateHeight(blockOneID);
	
}

function openModal() {
	var backdrop = document.getElementById('backdrop');
    backdrop.style.display = "block";
    
    var modalContent = document.getElementById('modalWrap');
    modalContent.style.display = "block";
}

function closeModal() {
	var modal = document.getElementById('backdrop');
	var modalContent = document.getElementById('modalWrap');
    modal.style.display = "none";
    modalContent.style.display = "none";
}

window.onclick = function(event) {	

	var modal = document.getElementById('backdrop');
	var modalContent = document.getElementById('modalWrap');
    if (event.target == modal) {
        modal.style.display = "none";
        modalContent.style.display = "none";
    }
}

function turnOn (idString) {
	for (var i=0;i<10;++i) {
		if (idString === switchCount[i][0]) {
			if (document.getElementById(idString).className == document.getElementById(idString).name + "Deselect") {
				document.getElementById(idString).className = document.getElementById(idString).name;
			}
		}
	}
}

function clickButton(idString) {
	
	for (var i=0;i<10;++i) {
		if (idString === switchCount[i][0]) {
			if (switchCount[i][1] === 0) {
				document.getElementById(idString).className = document.getElementById(idString).name + "Hover";
				switchCount[i][1] = 1;
			} else {
				document.getElementById(idString).className = document.getElementById(idString).name +"Deselect";
				switchCount[i][1] = 0;
			}
		}
	}
	
	callGetCourses();
	
}

function clearAll () {
	for (var i=0;i<10;++i) {
		document.getElementById(switchCount[i][0]).style.backgroundColor = switchCount[i][2];
		document.getElementById(switchCount[i][0]).style.borderColor = 'white';
		switchCount[i][1] = 0;		
	}
	document.getElementById('courseName').value = '';
	document.getElementById('CRN').value = '';
	document.getElementById('courseNumber1').value = '';
	document.getElementById('courseNumber2').value = '';
	document.getElementById('department').value = '';
	document.getElementById('instructor').value = '';
	document.getElementById('courseAttribute').value = '';
	document.getElementById('credit').value = '';
	document.getElementById('basicExample').value = '';
	document.getElementById('basicExample2').value = '';
}

function callGetCourses () {
	angular.element(document.getElementById('body')).scope().getCourses();
}

var app = angular.module ("gnomeApp", []);

app.controller('gnomeController', ['$scope','$http', '$sce', function($scope, $http, $sce) {
	
	$scope.courses = [];
	$scope.offerings = [];
	$scope.instructors = [];
	$scope.offeringMeets = [];
	$scope.courseAttributes = [];
	
	$scope.newColor = function (number) {		
		var mod = number%7;
		switch (mod) {
			case 0:
				return '#E27A3F';
				break;
			case 1:
				return '#D4A0A7';
				break;
			case 2:
				return '#32965D';
				break;
			case 3:
				return '#EAC44E';
				break;
			case 4:
				return '#A7ABDD';
				break;
			case 5:
				return '#2AB7CA';
				break;
			case 6:
				return '#FE4A49';
				break;
		}
	}
	
	$scope.getOfferings = function (parent) {
		var children = [];
		for (var i = 0; i < $scope.offerings.length; ++i) {
			if ($scope.offerings[i].cid == parent.cid) {
				children.push($scope.offerings[i]);
			}
		}
		return children;
	};
	
	$scope.showInstructors = function (parent) {
		var children = [];
		for (var i = 0; i < $scope.instructors.length; ++i) {
			if ($scope.instructors[i].oid == parent.oid) {
				children.push($scope.instructors[i]);
			}
		}
		return children;
	};

	$scope.getInstructors = function (parent) {
		var children = [];
		for (var i = 0; i < $scope.instructors.length; ++i) {
			if ($scope.instructors[i].oid == parent.oid) {
				children.push($scope.instructors[i]);
			}
		}
		return children;
	};
	
	$scope.getOfferingMeets = function (parent) {
		var children = [];
		for (var i = 0; i < $scope.offeringMeets.length; ++i) {
			if ($scope.offeringMeets[i].oid == parent.oid) {
				children.push($scope.offeringMeets[i]);
			}
		}
		return children;
	};
	
	$scope.getCourseAttributes = function (parent) {
		var children = [];
		for (var i = 0; i < $scope.courseAttributes.length; ++i) {
			if ($scope.courseAttributes[i].oid == parent.oid) {
				children.push($scope.courseAttributes[i]);
			}
		}
		return children;
	};
	
	$scope.decodeHTML = function(x){
        return $sce.trustAsHtml(x);
    };
    
    $scope.openBox = function (parentIndex, index) {
	    var elementId = 'box' + parentIndex + index;
	    if (document.getElementById(elementId).style.display == 'block') {
		    document.getElementById(elementId).style.display = 'none';
	    } else {
			document.getElementById(elementId).style.display = 'block';
	    }
    }
	
	$scope.convertDate = function (date) {
		var d = new Date(date);
		var month = d.getMonth() + 1;
		var day = d.getDate() + 1;
		var year = d.getFullYear().toString().substr(-2);
		return(month + '/' + day + '/' + year);
	};
	
	$scope.convertTime = function (time) {
		var newTime = time.substring(0, 5);
		var hourInt = parseInt(newTime.substring(0,2));
		if (hourInt>12) {
			hourInt -= 12;
			newTime = hourInt.toString() + newTime.substring(2, 5);		
			}
		if (newTime.substring(0,1) == '0') {
			newTime = newTime.substring(1, 5);
		}
		return newTime;
	};
	
	$scope.createBlock = function (term) {
		if (term.substring(0, 10) != 'INSTRUCTOR') {
			$http({
			  method: 'GET',
			  url: 'php/getDepartmentName.php',
			  params: {
				  input: term
			  }
			}).then(function (departmentName) {
				var name = departmentName["data"].replace(/['"]+/g, '');
				createBlockMoreFilters("DEPARTMENT: " + name + " (2)");
			});
		} else {
			createBlockMoreFilters(term);
		}
	};
	
	$scope.stringify = function (term) {
		return JSON.stringify($scope.$eval(term));
	};
	
	$scope.getDepartment = function() {
		var request = $http.post('php/getDepartment.php', JSON.stringify($scope.courses)).then (function successCallback(departments) {
				$scope.departmentList = departments.data;
		});
	};
	
	$scope.newColorHover = function (number) {		
		var mod = number%7;
		switch (mod) {
			case 0:
				return 'rgba(226, 122, 62, 0.4)';
				break;
			case 1:
				return 'rgba(212, 160, 167, 0.4)';
				break;
			case 2:
				return 'rgba(50, 150, 93, 0.4)';
				break;
			case 3:
				return 'rgba(234, 196, 78, 0.4)';
				break;
			case 4:
				return 'rgba(167, 171, 221, 0.4)';
				break;
			case 5:
				return 'rgba(42, 183, 202, 0.4)';
				break;
			case 6:
				return 'rgba(254, 74, 73, 0.4)';
				break;
		}
	}
	
	$scope.newColorShowMore = function (number) {	
		var mod = number%7;
		switch (mod) {
			case 0:
				return 'rgba(226, 122, 62, 0.1)';
				break;
			case 1:
				return 'rgba(212, 160, 167, 0.1)';
				break;
			case 2:
				return 'rgba(50, 150, 93, 0.1)';
				break;
			case 3:
				return 'rgba(234, 196, 78, 0.1)';
				break;
			case 4:
				return 'rgba(167, 171, 221, 0.1)';
				break;
			case 5:
				return 'rgba(42, 183, 202, 0.1)';
				break;
			case 6:
				return 'rgba(254, 74, 73, 0.1)';
				break;
		}
	}
	
	$scope.deselectOffering = function(oid) {
		
		while (document.getElementById('offeringBlock' + oid)!=null) {
			var child = document.getElementById('offeringBlock' + oid);
			var addDiv = "hour" + child.name;		
			var parent = document.getElementById(addDiv);
			parent.removeChild(child);
		}
		
	}
	
	$scope.hoverOffering = function(oid, courseIndex) {
				
		var days = ["m","t","w","r","f"];
			
		for (var i =0; i<$scope.offeringMeets.length;++i) {
			if ($scope.offeringMeets[i]["oid"] == oid) {
								
				for (var k = 0; k <5;++k) {
					if ($scope.offeringMeets[i][days[k]]==1) {
						
						var offeringBlock = document.createElement("div");
						offeringBlock.style.width = '92%';
						offeringBlock.style.backgroundColor = $scope.newColorHover(courseIndex);
						offeringBlock.style.position = 'absolute';
						offeringBlock.style.color = "rgba(255,255,255,0.8)";
						offeringBlock.style.textAlign = "left";
						offeringBlock.style.fontSize = "12";
						offeringBlock.style.padding = '4%';
						offeringBlock.style.paddingTop = '6%';
						offeringBlock.id = 'offeringBlock' + oid;
						offeringBlock.style.textOverflow = "clip";
						offeringBlock.style.overflow = "hidden";
						offeringBlock.style.lineHeight = 1; 
						
						var startHour = ($scope.offeringMeets[i]["startTime"]).substring(0,2)-8;
						var endHour = ($scope.offeringMeets[i]["endTime"]).substring(0,2)-8;
						
						var startMin = ($scope.offeringMeets[i]["startTime"]).substring(3,5);
						var endMin = ($scope.offeringMeets[i]["endTime"]).substring(3,5);
						
						var x = startHour+(startMin/60);
						var y = endHour+(endMin/60);
						
						offeringBlock.name = startHour + days[k];
																						
						offeringBlock.style.marginTop = (startMin/60)*45;
						
						offeringBlock.style.height = (y-x)*45-10;

						var textOne = document.createTextNode($scope.courses[courseIndex]["courseName"]);
						var textTwo = document.createTextNode($scope.convertTime($scope.offeringMeets[i]["startTime"]) + " - " + $scope.courses[courseIndex]["subjectAcronym"]);
						
						offeringBlock.appendChild(textTwo);	
						var br = document.createElement("div");
						br.style.marginBottom = 3;
						offeringBlock.appendChild(br);
						offeringBlock.appendChild(textOne);			
						
						var addDiv = "hour" + startHour + days[k];		
						document.getElementById(addDiv).appendChild(offeringBlock);
						
					}
				}
			
			}
		}
	
	} 
	
	$scope.getCourses = function() {
		$http({
		  method: 'GET',
		  url: 'php/getOfferings.php',
		  params: {
		    courseName: $scope.courseName,
		    crn: $scope.CRN,
		    courseNumber1: $scope.courseNumber1,
		    courseNumber2: $scope.courseNumber2,
		    department: document.getElementById('department').value,
		    instructor: document.getElementById('instructor').value,
		    courseAttribute: document.getElementById('courseAttribute').value,
		    credit: document.getElementById('credit').value,
		    open: switchCount[0][1],
		    closed: switchCount[1][1],
		    waitlist: switchCount[2][1],
		    wid: switchCount[3][1],
		    deans: switchCount[4][1],
		    startTime: document.getElementById('startTime').value,
		    endTime: document.getElementById('endTime').value,
		    m: switchCount[5][1],
		    t: switchCount[6][1],
		    w: switchCount[7][1],
		    th: switchCount[8][1],
		    f: switchCount[9][1]
		  }
		}).then(function (offerings) {
			
			if (offerings.data.length == 0) {
				$scope.courses = [];
				$scope.offerings = [];
				$scope.instructors = [];
				$scope.offeringMeets = [];
				$scope.courseAttributes = [];
				return;
			}
			
			$http.post('php/getCourses.php', JSON.stringify(offerings.data)).then (function successCallback(courses) {
				($scope.courses = courses.data);
			});
			
			$scope.offerings = offerings.data;
			
			$http.post('php/getInstructors.php', JSON.stringify(offerings.data)).then (function successCallback(instructors) {
				($scope.instructors = instructors.data);
			});
		
			$http.post('php/getOfferingMeets.php', JSON.stringify(offerings.data)).then (function successCallback(offeringMeets) {
				($scope.offeringMeets = offeringMeets.data);
			});	
			
			$http.post('php/getAttributes.php', JSON.stringify(offerings.data)).then (function successCallback(courseAttributes) {
				($scope.courseAttributes = courseAttributes.data);
			});		
						
		});
	};

}]);
