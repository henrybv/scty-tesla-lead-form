'use strict';

app.controller('userCtrl',function($scope, UserFactory) {
	
	$scope.newLead = {};

	$scope.availableOptions = [
      {id: '1', name: 'Go green, save the environment'},
      {id: '2', name: 'Dollar & Energy Savings'},
      {id: '3', name: 'Increase home value for $0 down'},
      {id: '4', name: 'Federal tax credits'},
      {id: '5', name: 'Other(s) (please specify below)'}
  	];

	$scope.submitLead = function(newLead) {

    $scope.submitted = true;

		var leadToSubmit = {
			firstName: $scope.newLead.firstName,
			lastName: $scope.newLead.lastName,
			email: $scope.newLead.email,
			phone: $scope.newLead.phone, // unique, for Salesforce
			address: $scope.newLead.address,
			reason: $scope.newLead.reason,
			other: $scope.newLead.other, // not required
			referrer: $scope.newLead.referrer // not required
		}
		
		console.log("LEAD TO SUBMIT", leadToSubmit);

		UserFactory.submitLead(leadToSubmit)
		.then(newLead => {
			console.log("NEWLY SUBMITTED LEAD:", newLead);
			alert('Thank you for your submission. We will be in touch shortly.');
	      	$scope.newLead = {};
	      	// Set back to pristine.
	      	$scope.userForm.$setPristine();
	      	// Since Angular 1.3, set back to untouched state.
	      	$scope.userForm.$setUntouched();
		})
		
	}
});
