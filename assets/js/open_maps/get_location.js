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
//		var owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
//		console.log('owners',owners)
	} );
	
}


mymap.on ( 'click', getCoordinates );

/////// OWNER LOGS IN INTO HIS PROPERTY TO EDIT OR DELETE
$ ( function () {
	if ( sessionStorage.getItem ( 'room_to_edit' ) ) {
		
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


function render_location_details ( location_data, coordinates, owner = false ) {
	var location = $ ( '#location' );
	if(owner)
	{
		$ ( '.how-to' ).html ( '' );
		$('.step').removeClass('d-none');
		$('#step_5').addClass('d-none');
		
		
		
	}
	
	$.each ( location_data, function ( key, value ) {
		
		location.append ( `
					 <div class = "col-auto " >
                    <label class = "sr-only" for = "${key}" >${key}</label >
                    <div class = "input-group mb-2" >
                        <div class = "input-group-prepend" >
                            <div class = "input-group-text bg-transparent border_bottom_only" >
                                <i class = "fas fa-map-marker-alt" >&nbsp;${key.replace ( '_', ' ' )}</i >
                            </div >
                        </div >
                        <input type = "text" name = "address__${key}"
                               class = "form-control form-control-sm border_bottom_only "
                               id = "${key}" value="${value}" required  ${key !== 'country' ? '' : 'readonly'} ${key !== 'country_code' ? '' : 'readonly'}  >
                    </div >
                </div >
					` );
	} );
	location.append ( `
					 <div class = "col-auto " >
                    <label class = "sr-only" for = "lat" >lat</label >
                    <div class = "input-group mb-2" >
                        <div class = "input-group-prepend" >
                            <div class = "input-group-text bg-transparent border_bottom_only" >
                                <i class = "fas fa-map-marker-alt" >&nbsp;lat</i >
                            </div >
                        </div >
                        <input type = "text" name = "lat"
                               class = "form-control form-control-sm border_bottom_only "
                               id = "lat" value="${coordinates[ 0 ]}" required  readonly>
                    </div >
                </div >
					` );
	location.append ( `
					 <div class = "col-auto " >
                    <label class = "sr-only" for = "lng" >lng</label >
                    <div class = "input-group mb-2" >
                        <div class = "input-group-prepend" >
                            <div class = "input-group-text bg-transparent border_bottom_only" >
                                <i class = "fas fa-map-marker-alt" >&nbsp;lng</i >
                            </div >
                        </div >
                        <input type = "text" name = "lng"
                               class = "form-control form-control-sm border_bottom_only "
                               id = "lng" value="${coordinates[ 1 ]}" required readonly >
                    </div >
                </div >
                ${owner ? '' : `<div class = "col" >
            <label class = "sr-only" for = "property_name" >Property Name</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                      <i class="fas fa-bed"></i>
                    </div >
                </div >
                <input type = "text" name = "address__property_name"
                       class = "form-control form-control-sm  border-danger"
                       id = "property_name" placeholder = "Property Name"
                        value="${ typeof(location_data.property_name) !== "undefined" ? location_data.property_name: '' }" required >
            </div >` }
            
        </div >
					` );
}


//// DISPLAYING STEP 2 WHEN USER TYPES IN PROPERTY NAME
$ ( document ).on ( 'input', '#property_name', function () {
	
	var property_name = $ ( '#property_name' );
	var step_2 = $ ( '#step_2' );
	if(!sessionStorage.getItem ( 'room_to_edit' ))
	{
		if ( property_name.val ().length > 2  ) {
			
			property_name.removeClass ( 'border-danger' );
			step_2.removeClass ( 'd-none' );
			step_2.html ( 'room&nbsp;>>>' ).addClass ( 'no_border green' );
		}
		else {
			step_2.addClass ( 'd-none' );
			property_name.addClass ( 'border-danger' );
		}
	}
	
} );