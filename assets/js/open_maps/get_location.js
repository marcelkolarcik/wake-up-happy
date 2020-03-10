var mymap = L.map ( 'mapid' ).setView ( [ 53.505, -8.49 ], 6 );

L.tileLayer ( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom    : 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
	             '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	             'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id         : 'mapbox/streets-v11'
} ).addTo ( mymap );

var popup = L.popup ( {
	
	                      className: 'popup_class'
	
                      } );


function getCoordinates ( e ) {
	
	var location_details = $ ( '#location' );
	$ ( '#location_details' ).html ( '' );
	
	var coordinates = e.latlng.toString ().replace ( 'LatLng(', '' ).replace ( ')', '' ).replace ( ' ', '' ).split ( ',' );
	var get_address = $ ( '#get_address' );
	get_address.removeClass ( 'd-none' );
	popup
		
		.setLatLng ( e.latlng )
		.setContent ( "Coordinates : " + coordinates[ 0 ] + ',' + coordinates[ 1 ] +
		              `<br><button type="submit" id="get_address"
										class="bg_orange  btn btn-sm p-0 float-right"
										title="click to get location details">get details</button>` )
		.openOn ( mymap );
	
	var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[ 0 ]}&lon=${coordinates[ 1 ]}`;
	
	
	function getAddress ( url ) {
		
		var xhr = new XMLHttpRequest ();
		
		xhr.onreadystatechange = function () {
			if ( this.readyState === 4 && this.status === 200 ) {
				location_details.html ( '' );
				
				$ ( '#get_address' ).addClass ( 'd-none' );
				
				var location_data = JSON.parse ( this.responseText ).address;
				
				render_location_details ( location_data, coordinates );
				
			}
		};
		
		xhr.open ( "GET", url );
		xhr.send ();
	}
	
	
	$ ( '#get_address' ).on ( 'click', function () {
		getAddress ( url );

	} );
	
}


mymap.on ( 'click', getCoordinates );

/////// OWNER LOGS IN INTO HIS PROPERTY TO EDIT / PREVIEW / DELETE / ADD
$ ( function () {
	if ( (sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' && sessionStorage.getItem ( 'room_to_edit' ) !== null)  && !sessionStorage.getItem('add_mode')) {
		
		var coordinates = [];
		var room = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ));
		$('.progress_step_5').addClass('d-none');
		$('.progress_step_4').html(`Preview <br> Save`);
		
		
		if(sessionStorage.getItem ( 'authorized_owner'))
		{
			var full_name = JSON.parse(sessionStorage.getItem ( 'authorized_owner')).name;
			var owner_name_a = full_name.split(' ');
			var owner_name = owner_name_a.map(myFunction).join('');
			function myFunction(str) {
				return str.charAt(0).toUpperCase();
			}
			
			$('#initials').html(`<div class="user_initials d-flex justify-content-center align-items-center"><span>${owner_name}</span></div>`);
			$('#owner_name').text(full_name);
		}
		
	
		
		location_data = room.p_address;
		coordinates[ 0 ] = room.lat;
		coordinates[ 1 ] = room.lng;
		
		render_location_details ( location_data, coordinates, true );
	}
} );





