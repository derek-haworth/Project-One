$(document).ready(function(){
	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#modal1').modal();


	// Initialize Firebase

	var config = {
		apiKey: "AIzaSyBJVVmkoI4kqEULZglV7X0oUfeT2_LuReA",
		authDomain: "project-1-8d0e8.firebaseapp.com",
		databaseURL: "https://project-1-8d0e8.firebaseio.com",
		projectId: "project-1-8d0e8",
		storageBucket: "project-1-8d0e8.appspot.com",
		messagingSenderId: "1010869223986"
	};

	var app = firebase.initializeApp(config);

	// Create a variable to reference the database.
	var database = app.database();


	// // Initial Values
	// var count = 0;
	// var newReview = { };
	// var name = "";
	// var date = ""; // Date
	// var unit = "";
	// var leaseDur = 0;

	// // Star Ratings
	// var bldgCondition = 0;
	// var water = 0;
	// var tempReg = 0; // new
	// var airQuality = 0;
	// var management = 0;
	// var pests = 0;
	// var electricity = 0;
	// var hiddenFees = 0;
	// var cellRecept = 0;
	// var internet = 0; // new

	// // Comments
	// var comments = "";

	// // Make object helper function
	// var makeObj = function () {
	// 	newReview = {
	// 		name: name,
	// 		date: date,
	// 		unit: unit,
	// 		leaseDur: leaseDur,
	// 		// star reviews:
	// 		bldgCondition: bldgCondition,
	// 		water: water,
	// 		tempReg: tempReg,
	// 		airQuality: airQuality,
	// 		management: management,
	// 		pests: pests,
	// 		electricity: electricity,
	// 		hiddenFees: hiddenFees,
	// 		cellReception: cellRecept,
	// 		internet: internet,
	// 		// additional comments:
	// 		comments: comments
	// 	};
	// };

	// Vue.component('star-rating', VueStarRating.default)

	// new Vue({
	// 	el: '#app',

	// 	data: {
	// 		bldgCondition: 0,
	// 		water: 0,
	// 		air: 0,
	// 		management: 0,
	// 		pests: 0,
	// 		electricity: 0,
	// 		hiddenFees: 0,
	// 		cellReception: 0,
	// 		tempReg: 0,
	// 		internet: 0
	// 	},

	// 	methods: {
	// 		submitReview: function() {
	// 			var data = new FormData
	// 			this.$http.post('https://project-1-8d0e8.firebaseio.com/', { bldgCondition: this.bldgCondition, water: this.water }).then(
	// 				function(response) {
	// 					window.location.href="https://project-1-8d0e8.firebaseio.com/" ;
	// 				},
	// 				function(response) {
	// 					that.errors = response.data.errors
	// 				}
	// 				)
	// 		}
	// 	}
	// });	



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
		database.ref().push({
			name: name,
			unit: unit,
			leaseDur: leaseDur,
			comments: comments
		});

	});

});



// var rating = $("#app > div:nth-child(1) > div.bldgCondition-rating.vue-star-rating > div > span.vue-star-rating-rating-text").text().trim();

// var captureRating = function(ratingClass) {
// 	$(ratingClass).on("click"), function(){

// 	}
// }



