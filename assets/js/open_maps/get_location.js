(
	function () {
		/*INITIAL COORDINATES OF THE MAP WITH ZOOM 6 */
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
		
		mymap.on ( 'click', getCoordinates );

//WHEN USER CLICKS ON THE MAP WHEN SELECTING THE LOCATION OF THE PROPERTY ON owner.html
// POPUP WILL SHOW WITH COORDINATES AND get details BUTTON*/
		function getCoordinates ( e ) {
			
			$ ( '#location_details' ).html ( '' );
			var coordinates = e.latlng.toString ().replace ( 'LatLng(', '' ).replace ( ')', '' ).replace ( ' ', '' ).split ( ',' );
			popup
				.setLatLng ( e.latlng )
				.setContent ( "Coordinates : " + coordinates[ 0 ] + ',' + coordinates[ 1 ] +
				              `<br><button type="submit" id="get_address"
										class="bg_orange  btn btn-sm p-0 float-right"
										title="click to get location details">get details</button>` )
				.openOn ( mymap );
			
			/*USING nominatim API FROM openstreetmap TO DO REVERSE SEARCH AND WHEN USER CLICKS ON get details WE'LL
			 * TAKE THE this.responseText AND TAKE address   FROM IT TO DISPLAY LOCATION DETAILS TO OWNER WITH render_location_details() FUNCTION*/
			
			var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[ 0 ]}&lon=${coordinates[ 1 ]}`;
			
			$ ( '#get_address' ).removeClass ( 'd-none' ).on ( 'click', function () {
				getAddress ( url, coordinates );
				
			} );
		}
		
		
		function getAddress ( url, coordinates ) {
			
			var location_details = $ ( '#location' );
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
		
	} ) ();

/////// OWNER IS LOGGED IN INTO HIS ACCOUNT AND HAS AL LEAST ONE ROOM
// AND IS EDITING OR PREVIEWING
$ ( function () {
		if (
		sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' &&
		sessionStorage.getItem ( 'room_to_edit' ) !== null  &&
		!sessionStorage.getItem ( 'add_mode' ) &&
		sessionStorage.getItem ( 'authorized_owner' ) ) {

		var coordinates = [];
		room = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
		
		 /*IF OWNER IS PREVIEWING OR EDITING ROOM, THERE IS NO NEED FOR PAYMENT STEP*/

		$ ( '.progress_step_5' ).addClass ( 'd-none' ); // PAYMENT
		$ ( '.progress_step_4' ).html ( `Preview <br> Save` );
		
		/*DATA TO RENDER LOCATION  DETAILS OF THE ROOM*/
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
	location.append ( `${owner ? '' : `<div class = "col" >
            <label class = "sr-only" for = "property_name" >Property Name</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                     <i class="fas fa-signature"></i>
                    </div >
                </div >
                <input type = "text" name = "address__property_name"
                       class = "form-control form-control-sm  border-danger"
                       id = "property_name" placeholder = "Property Name"
                        value="${ typeof(location_data.property_name) !== "undefined" ? location_data.property_name: '' }" required >
            </div >` }
					` );
	$.each ( location_data, function ( key, value ) {
		
		location.append ( `
					 <div class = "col-auto " >
                    <label class = "sr-only" for = "${key}" >${key}</label >
                    <div class = "input-group mb-2" >
                        <div class = "input-group-prepend" >
                            <div class = "input-group-text bg-transparent border_bottom_only" >
                            ${key === 'property_name' ? ` <i class="fas fa-signature"></i>`:
		                      ` <i class = "fas fa-map-marker-alt" >&nbsp;${key.replace ( '_', ' ' )}</i >`}
                            
                            </div >
                        </div >
                        <input type = "text" name = "address__${key}"
                               class = "form-control form-control-sm border_bottom_only "
                               id = "	${key}" value="${value}" required
										${key !== 'country' ? '' : 'readonly'}
										${key !== 'country_code' ? '' : 'readonly'}  >
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
                
            
        </div >
					` );
	
	//		by clicking on map 60 characters added to description text area, so this is to clear it
	$ ( '#room_description' ).html ( '' ).prop ( 'placeholder', 'write something !' );
}



