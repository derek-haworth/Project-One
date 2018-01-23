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
  var database = firebase.database();

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


// database.ref().push(json);


  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

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
    for (var i = 0, length = json.length; i < length; i++) {
      var data = json[i],
        latLng = new google.maps.LatLng(data.lat, data.lng);

      // Creating a marker and putting it on the map
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: data.title
      });

      (function(marker, data) {
        google.maps.event.addListener(marker, "click", function(e) {
          infoWindow.setContent(data.description);
          infoWindow.open(map, marker);
        });
      })(marker, data);

    }

    $('#search').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        database.ref().push(json)
        geocodeAddress(geocoder, map);
      }    
    });

  });


  function geocodeAddress(geocoder, resultsMap) {
    debugger;
    var address = document.getElementById('search').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        var error = document.getElementById('error-msg');
        var errorText = 'Address lookup was not successful for the following reason: ' + status;
        error.insertAdjacentHTML( 'afterBegin', errorText );
      }
    });
  }