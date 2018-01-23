
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
	var apartments = firebase.database().ref('apartments');

	//latitude-longitude
	var latLong = "41^8781_87^6297";  //hard coded for now

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
	var air = 0;
	var management = 0;
	var pests = 0;
	var electricity = 0;
	var hiddenFees = 0;
	var cell = 0;
	var internet = 0; // new

	// Comments
	var comments = "";

	//Vue stuff
	Vue.component('star-rating', VueStarRating.default);

	window.vm = new Vue({
		   el: '#app',
		   methods: {
			   setRating: function(rating) {
				   this.rating = "You have Selected: " + rating + " stars";
			   },
			   showCurrentRating: function(rating) {
				   this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
			   },
			   setCurrentSelectedRating: function(rating) {
				   this.currentSelectedRating = "You have Selected: " + rating + " stars";
			   }
		   },
		   data: {
			   bldgCondition: 0,
			   water: 0,
			   tempReg: 0,
			   air: 0,
			   management: 0,
			   pests: 0,
			   electricity: 0,
			   hiddenFees: 0,
			   cell: 0,
			   internet: 0
		   }
	   });


	// Capture Button Click
	$(".modal-submit").on("click", function(event) {
		console.log("MODAL");

		event.preventDefault();

		// Grabbed values from form
		name = $("#name").val().trim();
		unit = $("#unit").val().trim();
		leaseDur = $("#lease-duration").val();
		comments = $("#comments").val().trim();

		
		var review = {
				name: name,
				date: date,
				unit: unit,
				leaseDur: leaseDur,
				// star reviews:
				bldgCondition: vm.bldgCondition,
				water: vm.water,
				tempReg: vm.tempReg,
				air: vm.air,
				management: vm.management,
				pests: vm.pests,
				electricity: vm.electricity,
				hiddenFees: vm.hiddenFees,
				cell: vm.cell,
				internet: vm.internet,
				// additional comments:
				comments: comments
			};

			var summary = {
				"stuff" : "stuff", //more coming soon
			}

			var count = 4;


		// Code for "Setting values in the database"
		// database.ref('/data.name').push(apartments);
		firebase.database().ref([latLong]+ "/reviews").push(review);
		firebase.database().ref([latLong]+ "/summary").set(summary);
		firebase.database().ref([latLong]+ "/count").set(count);
	});
});

//TODO have a function that runs whenever I add a review to my firebase (child added I believe)

//In that function first iterate through the the reviews "object" using a for in loop
//In that for in loop add sum.reviewProperty of each review
var sum = 0;
/*for(review in reviews) {
sum.bldgCondition+=reviews[review].bldgCondition;
sum.water+=review.water
sum.tempReg+=review.tempReg
sum.airQuality+=review.airQuality
sum.management+=review.management
+ other things
}
calculate length of object by running Object.keys(whatever the object is)
for(sum in summmary) {
property.avg = sum / count;
}

var obj = {
'1': '456',
'2': 'Whatever',
'3': "who cares"
}

for(o in obj) {
//console.log(o)
console.log(obj[o])
}
outputs :
"456"
"Whatever"
"who cares" */