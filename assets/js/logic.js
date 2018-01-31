$(document).ready(function() {
  $('#modal1').modal();

  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyCA3PWKYA42bM2Tz7ofOY72jOI2QdtH5gM",
  //   authDomain: "apartmentyelp.firebaseapp.com",
  //   databaseURL: "https://apartmentyelp.firebaseio.com",
  //   projectId: "apartmentyelp",
  //   storageBucket: "apartmentyelp.appspot.com",
  //   messagingSenderId: "339519487350"
  // };
  var config = {
    apiKey: "AIzaSyCtC_WfcQSu9ndz1qysN9BFgrupp1xt03Y",
    authDomain: "homest-maps.firebaseapp.com",
    databaseURL: "https://homest-maps.firebaseio.com",
    projectId: "homest-maps",
    storageBucket: "homest-maps.appspot.com",
    messagingSenderId: "453985177971"
  };


  firebase.initializeApp(config);
  // Create a variable to reference the database.
  var database = firebase.database();

  var btn = '<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Write a Review</a>';
  var viewBtn = '<a href="#" id="test-button" data-activates="slide-out" class="button-collapse">View</a>'
  

  // Initial Values
  var loc = [];
  var coords;
  var lat;
  var lng;
  var formattedAddress;


  function geocodeAddress(geocoder, resultsMap) {

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
        infowindow.setContent(`${results[0].formatted_address} <br> ${btn}`);
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
    var name = $("#name").val().trim();
    var unit = $("#unit").val().trim();
    var leaseDur = $("#lease-duration").val();
    var comments = $("#comments").val().trim();

    var address = {
      formattedAddress: formattedAddress,
      lat: lat,
      lng: lng
    } 

    // Star Ratings
    var review = {
      name: name,
      // date: date,
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
    firebase.database().ref("apartments/" + [coords] + "/address").set(address);
    firebase.database().ref("apartments/" + [coords] + "/reviews").push(review);

    //clear out the fields after submitting
    name = $("#name").val("");
    unit = $("#unit").val("");
    leaseDur = $("#lease-duration").val("");
    comments = $("#comments").val("");

    window.location.reload();
  });

  function search (geocoder, map) {
    $('#search').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        geocodeAddress(geocoder, map);
      }    
    });
  }

  // Function to convert firebase snapshot into array to easily
  // loop through to extract info to populate markers
  function childSnapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  };
  // var childApt = childSnapshotToArray(childSnapshot);

    database.ref().on("child_added", function(childSnapshot) {
      var apartments = childSnapshot.val();
    // Creating a new map
    var map = new google.maps.Map(document.getElementById("map"), {
      // Default Northwestern Campus
      center: new google.maps.LatLng(41.896601, -87.618751),
      zoom: 14,
      styles: mapStyles
    });

    var html = `
          <div class="row">
            <div class="col s12 m12">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title"></span>
                  <p>This building has (# of reviews) reviews.</p>
                  <br>
                  <p class="view-btn"></p>
                </div>
              </div>
            </div> 
          </div>

          <div class="row">
            <div id="review-wrapper" class="col s12 m12">
            </div>
          </div>
          `;
    // Creating a global infoWindow object that will be reused by all markers
    var infoWindow = new google.maps.InfoWindow({
      content: html
    });
    var geocoder = new google.maps.Geocoder();


    // Looping through the Firebase data
    for (o in apartments) {

      // Retrieve Lat/Lng Coords
      var latLng = new google.maps.LatLng(apartments[o].address.lat, apartments[o].address.lng);

      // Creating a marker and putting it on the map
      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon:  {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 5
        },
        title: apartments[o].address.formattedAddress
      });

      // Closure
      (function(marker, apartments) {
        google.maps.event.addListener(marker, "click", function(e) {
      
          infoWindow.open(map, marker);

        var formattedAddress = apartments[o].address.formattedAddress;
        $(".card-title").html(marker.title);
        $(".view-btn").html(btn);

        for (x in apartments[o].reviews) {
          // user info
          var name = apartments[o].reviews[x].name;
          // var date = apartments[o].reviews[x].date;
          var unit = apartments[o].reviews[x].unit;
          var leaseDur = apartments[o].reviews[x].leaseDur;
          //ratings
          var air = apartments[o].reviews[x].air;
          var bldgCondition = apartments[o].reviews[x].bldgCondition;
          var water = apartments[o].reviews[x].water;
          var tempReg = apartments[o].reviews[x].tempReg;
          var cell = apartments[o].reviews[x].cell;
          var management = apartments[o].reviews[x].management;
          var pests = apartments[o].reviews[x].pests;
          var electricity = apartments[o].reviews[x].electricity;
          var internet = apartments[o].reviews[x].internet;
          var hiddenFees = apartments[o].reviews[x].hiddenFees;
          // add'l comments
          var comments = apartments[o].reviews[x].comments;


        $("#review-wrapper").prepend(`
              <div class="card-panel teal">
                <div class="row">

                  <div class="col s5 m5 rating-overview">
                    <div class="row">
                      <div class="col s6 m6">
                        <p>Overall Building Condition:${bldgCondition}</p>
                        <p>Water: ${water}</p>
                        <p>Temperature Regulation: ${tempReg}</p>
                        <p>Air Quality: ${air}</p>
                        <p>Property Management: ${management}</p>
                      </div>

                      <div class="col s6 m6">
                        <p>Pests: ${pests}</p>
                        <p>Electricity: ${electricity}</p>
                        <p>Hidden Fees: ${hiddenFees}</p>
                        <p>Cell reception: ${cell}</p>
                        <p>Internet: ${internet}</p>
                      </div>
                    </div>
                  </div>


                  <div class="col s7 m7 additional-overview">
                    <div class="row">
                        <div class="col s12 m12 user-info">
                          <p>Name: ${name}</p>
                          <p>Unit: ${unit}</p>
                          <p>Lease Duration: ${leaseDur}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col s12 m12 user-comments">
                        ${comments}
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            `);
          }
        });
      })(marker, apartments);

      
      // Create an If that determines if address has reviews
      // Populate btns accordingly

      // Loop through reviews within apartments loop

    }

    search(geocoder, map);

  });


  //drawer stuff
    // Initialize collapse button
    $(".button-collapse").sideNav();
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();
    $('.button-collapse').sideNav({
        menuWidth: 600, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { }, // A function to be called when sideNav is opened
        onClose: function(el) {  }, // A function to be called when sideNav is closed
      }
      );
    // hide sideNav to begin - toggles show
    $('.button-collapse').sideNav('hide');
  });



