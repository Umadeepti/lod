myOpenCAFApp.controller('CaseCtrl', function($scope, $location, getCasesService) {
	$scope.cases = [];
	$scope.loadCasesCallback = function(cases) {
		console.log("loadCasesCallback");
		$scope.cases = cases;

			console.log("setup datatable");
			var casetable = $('#cases').DataTable( {
				select: {style: 'single'},
				"order": [[4,'asc']],
				"data": cases,
				"retrieve": true,
				"columns": [
					{ "data": "casenumber" },
					{ "data": "casetype" },
					{ "data": "districtoffice" },
					{ "data": "examinerassigned" },
					{ "data": "casestatus" },
					{ "data": "programname" }
				],
				responsive: true
			});
	
			
			casetable.on( 'select', function ( e, dt, type, indexes ) {
				$scope.setSelectedCase(dt.data());
				$scope.$apply();
	        });
			casetable.on( 'deselect', function ( e, dt, type, indexes ) {
				$scope.selectedCase = undefined;
				$scope.urlReadyCaseNumber = undefined;
				$scope.$apply();
	        });
	};
	var currentprogram=$('#global-program').val();
	getCasesService.getCases(currentprogram,$scope.loadCasesCallback);
	
	$scope.selectedCase = undefined;	
	
	$scope.urlReadyCaseNumber = undefined;

	$scope.setSelectedCase = function(selection) {
		$scope.selectedCase = selection;
		$scope.urlReadyCaseNumber = encodeURIComponent(selection.casenumber);
	};	
	

	$scope.isCaseRowSelected = function(caseid) {
		return $scope.selectedCase && $scope.selectedCase.casenumber == caseid;
	};
	$scope.isSelectionMade=function(){
		if ($scope.selectedCase != undefined){
			return(true);
		}
		return(false);
	}

});