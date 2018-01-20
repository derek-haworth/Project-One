/*
1. Establish geolocation on page load
2. if user declines then set coordinates to Chicago Loop
3. Implement autocomplete address in search bar
4. Search address and upon click or enter then initialize Google Map Api
5. Parse address into Lat, Long coordinates
6. Set marker and info window conditions
7. Push coordinates into Firebase
8. If user clicks review, trigger modal window
8a. If user cancels or clicks view then clear out coordinates in Firebase.
9. 


*/


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJCyPmkk2azsrA9HMVCBCRH9g4dO70H9o",
  authDomain: "project-one-maps.firebaseapp.com",
  databaseURL: "https://project-one-maps.firebaseio.com",
  projectId: "project-one-maps",
  storageBucket: "project-one-maps.appspot.com",
  messagingSenderId: "735214191875"
};

firebase.initializeApp(config);


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
	var newReview = {},
		name = "",
		date = "", // Date
		unit = "",
		leaseDur = 0;

	// Star Ratings
	var bldgCondition = 0,
		water = 0,
		tempReg = 0, // new
		airQuality = 0,
		management = 0,
		pests = 0,
		electricity = 0,
		hiddenFees = 0,
		cellRecept = 0,
		internet = 0; // new
	// Comments
	var comments = "";


	// Capture Button Click
	$(".modal-submit").on("click", function(event) {
		console.log("Submit Modal data");

		event.preventDefault();

		// Grabbed values from form
		name = $("#name").val().trim();
		unit = $("#unit").val().trim();
		leaseDur = $("#lease-duration").val();
		comments = $("#comments").val().trim();

		var apartments = {
				name: name,
				date: date,
				unit: unit,
				leaseDur: leaseDur,
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
			}
		};


		// Code for "Setting values in the database"
		database.ref().push(apartments);

	});


});







