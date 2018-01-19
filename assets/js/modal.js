$(document).ready(function(){
// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
$('#modal1').modal();

console.log("MODAL");
});

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
});

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBJVVmkoI4kqEULZglV7X0oUfeT2_LuReA",
	authDomain: "project-1-8d0e8.firebaseapp.com",
	databaseURL: "https://project-1-8d0e8.firebaseio.com",
	projectId: "project-1-8d0e8",
	storageBucket: "project-1-8d0e8.appspot.com",
	messagingSenderId: "1010869223986"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var bldgCondition = 0;
var water = 0;
var airQuality = 0;
var management = 0;
var pests = 0;
var electricity = 0;
var hiddenFees = 0;
var cellReception = 0;

// Capture Button Click
$(".modal-submit").on("click", function(event) {
	event.preventDefault();

	// Grabbed values from text-boxes
	name = $("#name-input").val().trim();
	email = $("#email-input").val().trim();
	age = $("#age-input").val().trim();
	comment = $("#comment-input").val().trim();

	// Code for "Setting values in the database"
	database.ref().set({
		buildingCondition: bldgCondition,
		water: water,
		airQuality: airQuality,
		management: management,
		pests: pests,
		electricity: electricity,
		hiddenFees: hiddenFees,
		cellReception: cellReception
	});

});