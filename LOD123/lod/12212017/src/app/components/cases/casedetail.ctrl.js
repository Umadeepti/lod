myOpenCAFApp.controller('CaseDetailCtrl', function($scope, $location, getCasesService) {
	$scope.casenumber=$location.search().c;
	$scope.casedetails = undefined;
	$scope.injuredWorker = undefined;
	$scope.claims = undefined;
	$scope.history = undefined;
	$scope.selectedClaim = undefined;	
	$scope.urlReadyClaimNumber = undefined;
	$scope.processViewUrl=undefined;
	$scope.filelist=undefined;
	$scope.tasklist=undefined;
	

	$scope.loadDocumentsCallback = function(filelist){
		console.log(filelist);
		$scope.filelist=filelist;
	};		
	getCasesService.getDocuments($scope.casenumber,$scope.loadDocumentsCallback);

	
	$scope.fetchTasksCallback = function(tasklist){
		$scope.filelist=tasklist;
		//console.log("back from the task fetch");
		for (var i =0; i<tasklist.length;i++){
			//loop thru and convert string to object
			//and correct ClaimID when task is not associated
			var taskdataobj = JSON.parse(tasklist[i].taskData);
			if(taskdataobj.ClaimData == undefined){
				taskdataobj.ClaimData= {"ClaimID":"none"};
				//console.log('corrected claimid');
			}
			tasklist[i].taskData = taskdataobj;
		}
		console.log(tasklist);
		//make data table
		var tasktable = $('#doltasktable').DataTable( {
			"order": [[1,'asc']],
			"data": tasklist,
			"retrieve": true,
			"columns": [
				{ "data": "taskInfo.name"},
				{ "data": "taskInfo.name"},
				{ "data": "taskInfo.priority" },
				{ "data": "taskInfo.status" },
				{ "data": "taskInfo.lastModifiedDate" },
				{ "data": "taskInfo.assignedToList[0]" },
				{ "data": "taskData.ClaimData.ClaimID"}
			],
			responsive: true,
			"createdRow": function ( row, data, index ) {
				var taskname = $('td', row).eq(0).html();
				var bctaskurl="";
				if(data.taskInfo.taskTypeID=="3A5D5AF6-CE67-EC34-5618-650D9B66820B"){
					//Reminder
					bctaskurl="/business.console#/inbox/" + data.taskInfo.taskTypeID + "/My%20Inbox/taskDetail/"+ data.taskInfo.taskID +"/doltasks/Reminder/?tab=2";
					$('td', row).eq(1).html("Reminder");
				}
				if(data.taskInfo.taskTypeID=="F29968E9-02AF-0726-2E23-B6E4BB0A94A1"){
					//Review Claim
					bctaskurl="/business.console#/inbox/" + data.taskInfo.taskTypeID + "/My%20Inbox/taskDetail/"+ data.taskInfo.taskID +"/doltasks/ReviewClaimandCase/?tab=2";					
					$('td', row).eq(1).html("Review Claim");
				}
				if(data.taskInfo.taskTypeID=="252DB731-6676-5BCC-3197-C9BA7F9B40A8"){
					//Issue Decision
					bctaskurl="/business.console#/inbox/" + data.taskInfo.taskTypeID + "/My%20Inbox/taskDetail/"+ data.taskInfo.taskID +"/doltasks/IssueDecision/?tab=2";					
					$('td', row).eq(1).html("Issue Decision");
				}
				var linkage='<a target="_blank" href="'+bctaskurl+'">'+taskname+'</a>';
				//console.log(taskname);
				$('td', row).eq(0).html(linkage);
	        }
		});
	};		

	$scope.loadCaseCallback = function(casedetails,iw,claims,history) {
		$scope.casedetails = casedetails;
		$scope.injuredWorker = iw;
		$scope.claims = claims;
		$scope.history = history;	
	
		//make data tables:
		var claimstable = $('#claimstable').DataTable( {
			select: {style: 'single'},
			"order": [[1,'asc']],
			"data": claims,
			"retrieve": true,
			"columns": [
				{ "data": "claimnumber"},
				{ "data": "claimfiledate" },
				{ "data": "dateofinjury" },
				{ "data": "claimtype" },
				{ "data": "claimantname" },
				{ "data": "claimanttype" },
				{ "data": "claimstatus" }
			],
			responsive: true
		});
		
		claimstable.on( 'select', function ( e, dt, type, indexes ) {
			$scope.setSelectedClaim(dt.data());
			$scope.$apply();
        });
		claimstable.on( 'deselect', function ( e, dt, type, indexes ) {
			$scope.selectedClaim = undefined;
			$scope.urlReadyClaimNumber = undefined;
			$scope.$apply();
        });

		var casehistory = $('#casehistory').DataTable( {
			"order": [[1,'desc']],
			"data": history,
			"retrieve": true,
			"columns": [
				{ "data": "category" },
				{ "data": "eventdate" },
				{ "data": "eventdescription" },
				{ "data": "actiontakenby" }
			],
			responsive: true,
			"createdRow": function ( row, data, index ) {
				//augment with icon
				var category = $('td', row).eq(0).html();
				var catwithglyph=category;
				if (category == "Claim Filed"){
					catwithglyph = '<span class="glyphicon glyphicon-list-alt aria-hidden="true"></span> ' + category;
				}
				if (category == "Correspondence"){
					catwithglyph = '<span class="glyphicon glyphicon-envelope aria-hidden="true"></span> ' + category;
				}
				if (category == "Medical Development"){
					catwithglyph = '<span class="glyphicon glyphicon-heart-empty aria-hidden="true"></span> ' + category;
				}
				if (category == "Recommended Decision"){
					catwithglyph = '<span class="glyphicon glyphicon-fullscreen aria-hidden="true"></span> ' + category;
				}
				if (category == "Claimant Response"){
					catwithglyph = '<span class="glyphicon glyphicon-user aria-hidden="true"></span> ' + category;
				}
				if (category == "Causation"){
					catwithglyph = '<span class="glyphicon glyphicon-exclamation-sign aria-hidden="true"></span> ' + category;
				}
				if (category == "Final Decision"){
					catwithglyph = '<span class="glyphicon glyphicon-transfer aria-hidden="true"></span> ' + category;
				}
				if (category == "Claimant Close"){
					catwithglyph = '<span class="glyphicon glyphicon-stop aria-hidden="true"></span> ' + category;
				}
				if (category == "Conference Scheduled"){
					catwithglyph = '<span class="glyphicon glyphicon-calendar aria-hidden="true"></span> ' + category;
				}
				$('td', row).eq(0).html(catwithglyph);
	        }
		});
		$('#claimtype').selectpicker();
		$('#conftype').selectpicker();
		$('#confdatetime').datetimepicker();
	};
	
	getCasesService.getCaseById($scope.casenumber,$scope.loadCaseCallback);
	getCasesService.fetchPendingWorkAction($scope.casenumber,$scope.fetchTasksCallback);

	$('#reminderdatetime').datetimepicker();

	$('#doliw').click(function(){
		$('#iwmodal').modal('show');
	});
	
	$('#navclaims').click(function(event){
		$('#collapseClaims').collapse('toggle');
		if ($('#claimli').hasClass('active')){
			$('#claimli').removeClass('active');
		}else{
			$('#claimli').addClass('active');		
			$('#collapseHistory').collapse('hide');
			$('#historyli').removeClass('active');
			$('#collapseDocuments').collapse('hide');
			$('#documentsli').removeClass('active');
			$('#collapseTasks').collapse('hide');
			$('#tasksli').removeClass('active');
		}
	});

	$('#navhistory').click(function(event){
		$('#collapseHistory').collapse('toggle');
		if ($('#historyli').hasClass('active')){
			$('#historyli').removeClass('active');
		}else{
			$('#historyli').addClass('active');			
			$('#collapseDocuments').collapse('hide');
			$('#documentsli').removeClass('active');
			$('#collapseClaims').collapse('hide');
			$('#claimli').removeClass('active');
			$('#collapseTasks').collapse('hide');
			$('#tasksli').removeClass('active');
		}
	});

	$('#navdocuments').click(function(event){
		$('#collapseDocuments').collapse('toggle');
		if ($('#documentsli').hasClass('active')){
			$('#documentsli').removeClass('active');
		}else{
			$('#documentsli').addClass('active');			
			$('#collapseClaims').collapse('hide');
			$('#claimli').removeClass('active');
			$('#collapseHistory').collapse('hide');
			$('#historyli').removeClass('active');
			$('#collapseTasks').collapse('hide');
			$('#tasksli').removeClass('active');
		}
	});

	$('#navtasks').click(function(event){
		$('#collapseTasks').collapse('toggle');
		if ($('#tasksli').hasClass('active')){
			$('#tasksli').removeClass('active');
		}else{
			$('#tasksli').addClass('active');			
			$('#collapseClaims').collapse('hide');
			$('#claimli').removeClass('active');
			$('#collapseHistory').collapse('hide');
			$('#historyli').removeClass('active');
			$('#collapseDocuments').collapse('hide');
			$('#documentsli').removeClass('active');
		}
	});

	$('.actionlink').click(function(eventData){
		if(eventData.currentTarget.innerText == "New Claim"){
			$('#newclaimmodal').modal('show');
		}
		if(eventData.currentTarget.innerText == "Schedule a Conference"){
			$('#newconfmodal').modal('show');
		}
		if(eventData.currentTarget.innerText == "Create Reminder"){
			$('#remindermodal').modal('show');
		}
	});

	$('#dolclaimcreatebutton').click(function(){
		var casenum=$('#casenumber').val();
		var iwid=$('#iwid').val();
		var claimtype=$('#claimtype').val();
		getCasesService.createClaim(casenum,iwid,claimtype,$scope.claimCreatedCB);
	});
	
	$('#dolconfcreatebutton').click(function(){
		var casenum=$('#casenumber').val();
		var conftype=$('#conftype').val();
		var taskname="Conference: " + conftype;
		var duedate=$("#confdatetime").data("DateTimePicker").date();
		var iwname=$scope.injuredWorker.firstname + " " + $scope.injuredWorker.lastname;
		getCasesService.createConferenceTask(casenum,taskname,duedate,iwname,$scope.confCreatedCB);
	});

	$('#dolremindercreatebutton').click(function(){
		var casenum=$('#casenumber').val();
		var desc=$('#description').val();
		var taskname=$('#taskname').val();
		var reminderdate=$("#reminderdatetime").data("DateTimePicker").date();
		getCasesService.createReminderTask(casenum,taskname,reminderdate,desc,$scope.reminderCreatedCB);
	});

	$scope.reminderCreatedCB = function(results){
		console.log(results);
		$('#remindermodal').modal('hide');
		location.reload();
	};

	$scope.claimCreatedCB = function(results){
		console.log(results);
		$('#newclaimmodal').modal('hide');
		location.reload();
	};

	$scope.confCreatedCB = function(results){
		console.log(results);
		$('#newconfmodal').modal('hide');
		location.reload();
	};

	$scope.formatDate= function (thedate){
		var datobj = new Date(thedate);
		return datobj.toLocaleDateString("en-US");
	};

	$scope.setSelectedClaim = function(selection) {
		$scope.selectedClaim = selection;
		$scope.urlReadyClaimNumber = encodeURIComponent(selection.claimnumber);
		$scope.processViewUrl = "/business.console#/details/process/" + $scope.urlReadyClaimNumber + "/?tab=2&modelId=DolPocProcesses%2FClaimProcess";
		
	};	

	$scope.isSelectionMade=function(){
		if ($scope.selectedClaim != undefined){
			return(true);
		}
		return(false);
	}

});