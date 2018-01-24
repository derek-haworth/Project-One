$(document).ready(function(){

  $('#modal1').modal();

  // Initialize Firebase

  // Derek Firebase
  var config = {
    apiKey: "AIzaSyAJCyPmkk2azsrA9HMVCBCRH9g4dO70H9o",
    authDomain: "project-one-maps.firebaseapp.com",
    databaseURL: "https://project-one-maps.firebaseio.com",
    projectId: "project-one-maps",
    storageBucket: "project-one-maps.appspot.com",
    messagingSenderId: "735214191875"
  };

// Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyCA3PWKYA42bM2Tz7ofOY72jOI2QdtH5gM",
  //   authDomain: "apartmentyelp.firebaseapp.com",
  //   databaseURL: "https://apartmentyelp.firebaseio.com",
  //   projectId: "apartmentyelp",
  //   storageBucket: "apartmentyelp.appspot.com",
  //   messagingSenderId: "339519487350"
  // };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();
  var apartments = firebase.database().ref('apartments');

  var btn = '<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Review</a>'
  // Test Firebase
  var json = [
  {
    "title": "Test1",
    "lat": 41.900362,
    "lng": -87.623578,
    "description": btn
  },
  {
    "title": "Test 2",
    "lat": 41.897838,
    "lng": -87.620665,
    "description": btn
  },

  ]

  // Initial Values
  var loc = [];
  var coords;
  var lat;
  var lng;
  var formattedAddress;

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


  function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('search').value;
    var address = $("#search").val();

    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        // Get Lat/Lng from Address
        loc[0] = results[0].geometry.location.lat();
        loc[1] = results[0].geometry.location.lng();
        var x = loc.join();
        var y = x.replace(/\./g,'^');
        coords = y.replace(/\,/g,'_');
        lat = loc[0];
        lng = loc[1];

        // Get Pretty Address
        formattedAddress = results[0].formatted_address;

        resultsMap.setCenter(results[0].geometry.location);
        var infowindow = new google.maps.InfoWindow;
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        infowindow.setContent(btn);
        infowindow.open(map, marker);

      } else {
        var error = document.getElementById('error-msg');
        var errorText = 'Address lookup was not successful for the following reason: ' + status;
        error.insertAdjacentHTML( 'afterBegin', errorText );
      }
    });
  }


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

    event.preventDefault();

    // Grabbed values from form
    name = $("#name").val().trim();
    unit = $("#unit").val().trim();
    leaseDur = $("#lease-duration").val();
    comments = $("#comments").val().trim();

    var address = {
      formattedAddress: formattedAddress,
      lat: lat,
      lng: lng
    } 

    // Star Ratings
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

    // Code for "Setting values in the database"
    // database.ref('/data.name').push(apartments);
    firebase.database().ref("apartments/" + [coords] + "/address").set(address);
    firebase.database().ref("apartments/" + [coords] + "/reviews").push(review);
    // firebase.database().ref("apartments/" + [coords] + "/summary").set(summary);
    // firebase.database().ref("apartments/" + [coords] + "/count").set(count);

    //clear out the fields after submitting
    name = $("#name").val("");
    unit = $("#unit").val("");
    leaseDur = $("#lease-duration").val("");
    comments = $("#comments").val("");
  });

  function childSnapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
  };
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshotToArray(childSnapshot));
    var childApt = childSnapshotToArray(childSnapshot);


    // Creating a new map
    var map = new google.maps.Map(document.getElementById("map"), {
      // Default Northwestern Campus
      center: new google.maps.LatLng(41.896601, -87.618751),
      zoom: 16,
      styles: mapStyles
    });

    // Creating a global infoWindow object that will be reused by all markers
    var infoWindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();

    // Looping through the Firebase data
    for (var i = 0, length = childApt.length; i < length; i++) {
      debugger;
      var data = childApt[i],
        latLng = new google.maps.LatLng(data.address.lat, data.address.lng);

      // Creating a marker and putting it on the map
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: data.address.formattedAddress
      });

      (function(marker, data) {
        google.maps.event.addListener(marker, "click", function(e) {
          infoWindow.setContent(data.address.formattedAddress);
          infoWindow.open(map, marker);
        });
      })(marker, data);

    }

    $('#search').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        geocodeAddress(geocoder, map);
      }    
    });

  });

});