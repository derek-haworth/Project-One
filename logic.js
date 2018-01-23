$(document).ready(function() {

  window.onload = geolocateUser();

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

  // User selects 'Allow'
  function geolocationSuccess(position) {
    var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var myOptions = {
      zoom: 16,
      center: userLatLng,
      styles: mapStyles
    };
    // Draw the map
    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    // Place the marker
    var marker = new google.maps.Marker({
      map: mapObject,
      position: userLatLng,
      // icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });
    var contentString = '<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Review</a>'
    // var contentString = '<p>Current Location</p>'
    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(contentString);
    infoWindow.open(map, marker);
    // if user closes infowindow, allow them to open it by clicking on marker
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });

    // var lat = position.coords.latitude;
    // var lng = position.coords.longitude;
    // var apartments = {
    //   location: {
    //     lat: lat,
    //     lng: lng
    //   }
    // };
  }

  // If user clicks 'Block' or does not select anything
  function geolocationError(positionError) {
    var myOptions = {
      zoom: 16,
      // Northwestern Coords
      center: {
        lat: 41.896601,
        lng: -87.618751
      },
      styles: mapStyles
    };
    // Draw the map
    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    // Place the marker
    new google.maps.Marker({
      map: mapObject,
      position: {
        lat: 41.896601,
        lng: -87.618751
      }
    });
  }

  // If the browser supports the HTML5 Geolocation API
  function geolocateUser() {
    if (navigator.geolocation) {
      var positionOptions = {
        enableHighAccuracy: true,
        // If user does not select option, load the error coordinates
        timeout: 5 * 1000 // 5 seconds
      };
      navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
    } else {
      navigator.geolocation.getCurrentPosition(geolocationError);
    }
  }


  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var lat = childSnapshot.val().location.lat;
    var lng = childSnapshot.val().location.lng;
    var latLng = new google.maps.LatLng(lat, lng)
    var myOptions = {
      zoom: 16,
      center: latLng
    };
    // Draw the map
    // var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    // Place the marker
    var marker = new google.maps.Marker({
      // map: mapObject,
      position: latLng,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10
      }
    });
  });
});