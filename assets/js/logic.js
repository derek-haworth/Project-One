$(document).ready(function() {

  window.onload = initMap();

  // User selects 'Allow'
  function geolocationSuccess(position) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: { lat: 40.712784, lng: -74.005941 }
    });

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

    var geocoder = new google.maps.Geocoder();

    $('#search').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        geocodeAddress(geocoder, map);
      }    
    });
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

  /*
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
  */

});


  // initialize the map with the users coordinates
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: { lat: 40.712784, lng: -74.005941 },
        styles: mapStyles
    });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.712784, -74.005941),
        map: map
    });
    var geocoder = new google.maps.Geocoder();

    $('#search').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        geocodeAddress(geocoder, map);
      }    
    });

  }

  function geocodeAddress(geocoder, resultsMap) {
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