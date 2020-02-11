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

function onMapClick( e ) {
	
	var location_details = $( '#location' );
	$( '#location_default' ).html( '' );
	location_details.html( '' );
	
	var coordinates = e.latlng.toString().replace( 'LatLng(', '' ).replace( ')', '' ).replace( ' ', '' ).split( ',' );
	
	popup
		
		.setLatLng( e.latlng )
		.setContent( "Coordinates : " + coordinates[ 0 ] + ',' + coordinates[ 1 ] +
			             `<br><button type="submit" id="get_address"
										class="bg_orange  btn btn-sm p-0 float-right"
										title="click to get location details">get details</button>` )
		.openOn( mymap );
	
	var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[ 0 ]}&lon=${coordinates[ 1 ]}`;
	
	function getData( url ) {
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () {
			if ( this.readyState === 4 && this.status === 200 ) {
				var location_data = JSON.parse( this.responseText ).address;
				
				$.each( location_data, function ( key, value ) {
					
					$( '#location' ).append( `
					 <div class = "col-auto " >
                    <label class = "sr-only" for = "${key}" >${key}</label >
                    <div class = "input-group mb-2" >
                        <div class = "input-group-prepend" >
                            <div class = "input-group-text bg-transparent border_bottom_only" >
                                <i class = "fas fa-map-marker-alt" >&nbsp;${key.replace( '_', ' ' )}</i >
                            </div >
                        </div >
                        <input type = "text" name = "${key}"
                               class = "form-control form-control-sm border_bottom_only "
                               id = "${key}" value="${value}" required >
                    </div >
                </div >
					` );
				} );
				
			}
		};
		
		xhr.open( "GET", url );
		xhr.send();
	}
	
	$( '#get_address' ).on( 'click', function () {
		getData( url );
	} );
	
}

mymap.on( 'click', onMapClick );


