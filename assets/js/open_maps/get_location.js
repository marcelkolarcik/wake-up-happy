var mymap = L.map( 'mapid' ).setView( [ 53.505, -8.49 ], 6 );

L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom    : 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id         : 'mapbox/streets-v11'
} ).addTo( mymap );


var popup = L.popup( {
	
	                     className: 'popup_class'
	
                     } );

function getCoordinates( e ) {
	
	var location_details = $( '#location' );
	$( '#location_details' ).html( '' );
	
	
	
	var coordinates = e.latlng.toString().replace( 'LatLng(', '' ).replace( ')', '' ).replace( ' ', '' ).split( ',' );
	var get_address = $('#get_address');
	get_address.removeClass('d-none');
	popup
		
		.setLatLng( e.latlng )
		.setContent( "Coordinates : " + coordinates[ 0 ] + ',' + coordinates[ 1 ] +
			             `<br><button type="submit" id="get_address"
										class="bg_orange  btn btn-sm p-0 float-right"
										title="click to get location details">get details</button>` )
		.openOn( mymap );
	
	var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[ 0 ]}&lon=${coordinates[ 1 ]}`;
	
	function getAddress( url ) {
		
	
		
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () {
			if ( this.readyState === 4 && this.status === 200 ) {
				location_details.html( '' );
				var location = $( '#location' );
				$('#get_address').addClass('d-none');
				var location_data = JSON.parse( this.responseText ).address;
				//console.log(location_data)
				$.each( location_data, function ( key, value ) {
					
					location.append( `
					 <div class = "col-auto " >
                    <label class = "sr-only" for = "${key}" >${key}</label >
                    <div class = "input-group mb-2" >
                        <div class = "input-group-prepend" >
                            <div class = "input-group-text bg-transparent border_bottom_only" >
                                <i class = "fas fa-map-marker-alt" >&nbsp;${key.replace( '_', ' ' )}</i >
                            </div >
                        </div >
                        <input type = "text" name = "address__${key}"
                               class = "form-control form-control-sm border_bottom_only "
                               id = "${key}" value="${value}" required  ${key  !== 'country' ? '' : 'readonly'} ${key  !== 'country_code' ? '' : 'readonly'}  >
                    </div >
                </div >
					` );
				} );
				location.append( `
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
				location.append( `
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
                 <div class = "col" >
            <label class = "sr-only" for = "property_name" >Property Name</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                      <i class="fas fa-bed"></i>
                    </div >
                </div >
                <input type = "text" name = "property_name"
                       class = "form-control form-control-sm  border-danger"
                       id = "property_name" placeholder = "Property Name" required >
            </div >
        </div >
					` );
				
			}
		};
		
		xhr.open( "GET", url );
		xhr.send();
	}
	
	$( '#get_address' ).on( 'click', function () {
		getAddress( url );
	
		
	} );
	
	
}

mymap.on( 'click', getCoordinates );

//// DISPALYING STEP 2 WHEN USER TYPES IN PROPERTY NAME
$ ( document ).on ( 'input', '#property_name', function () {

	var property_name = $('#property_name');
	var step_2= $('#step_2');
	if(property_name.val().length > 2)
	{
		
		property_name.removeClass('border-danger');
		step_2.removeClass('d-none');
		step_2.html('room&nbsp;>>>').addClass('no_border green');
	}
	else{
		step_2.addClass('d-none');
		property_name.addClass('border-danger');
	}
});