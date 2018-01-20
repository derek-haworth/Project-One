$(document).ready(function(){
	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#modal1').modal();



	// Initialize Firebase

	var config = {
		apiKey: "AIzaSyCA3PWKYA42bM2Tz7ofOY72jOI2QdtH5gM",
		authDomain: "apartmentyelp.firebaseapp.com",
		databaseURL: "https://apartmentyelp.firebaseio.com",
		projectId: "apartmentyelp",
		storageBucket: "apartmentyelp.appspot.com",
		messagingSenderId: "339519487350"
	};

	firebase.initializeApp(config);

	// Create a variable to reference the database.
	var database = firebase.database();


	// Initial Values
	var count = 0;
	var newReview = { };
	var name = "";
	var date = ""; // Date
	var unit = "";
	var leaseDur = 0;

	// Star Ratings
	var bldgCondition = 0;
	var water = 0;
	var tempReg = 0; // new
	var airQuality = 0;
	var management = 0;
	var pests = 0;
	var electricity = 0;
	var hiddenFees = 0;
	var cellRecept = 0;
	var internet = 0; // new

	// Comments
	var comments = "";

	// Make object helper function
	var makeObj = function () {
		newReview = {
			name: name,
			date: date,
			unit: unit,
			leaseDur: leaseDur,
			// star reviews:
			bldgCondition: bldgCondition,
			water: water,
			tempReg: tempReg,
			airQuality: airQuality,
			management: management,
			pests: pests,
			electricity: electricity,
			hiddenFees: hiddenFees,
			cellReception: cellRecept,
			internet: internet,
			// additional comments:
			comments: comments
		};
	};







	// Capture Button Click
	$(".modal-submit").on("click", function(event) {
		console.log("MODAL");

		event.preventDefault();

		// Grabbed values from form
		name = $("#name").val().trim();
		unit = $("#unit").val().trim();
		leaseDur = $("#lease-duration").val();
		comments = $("#comments").val().trim();


		// Code for "Setting values in the database"
		database.ref().set({
			count: count

		});

	});


});





