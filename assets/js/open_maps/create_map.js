function create_map( coordinates = null, zoom = null, show_p_id = null ) {
	var tiles = L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom    : 18,
		attribution: '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
	} );
	
	var container = L.DomUtil.get( 'map' );
	
	if ( container != null ) {
		/* on show on map we need to recreate divs to avoid container already initiated, or container not found...*/
		container._leaflet_id = null;
		$( "#api_open_maps" ).html( "" );
		$( "#map" ).empty();
		$( "<div id=\"map\" style=\"min-height: 400px;\"></div>" ).appendTo( "#api_open_maps" );
	}
	var map = L.map( 'map', {
		center: L.latLng( coordinates || 39.095963, -48.515625 ),
		zoom  : zoom || 2,
		layers: [ tiles ]
	} );
	
	var mcg = L.markerClusterGroup( {
		                                chunkedLoading   : true,
		                                //singleMarkerMode: true,
		                                spiderfyOnMaxZoom: false
	                                } );
	let room_types = [
		
		'Single ( En Suite )',
		'Double ( En Suite )'
	];
	
	let board_types = [
		'Room only',
		'Bed & Breakfast',
		'Breakfast & Dinner',
		'All Inclusive'
	];
	for ( var room in DB ) {
		
		var property = DB[ room ];
		var image_id = ( property.p_id % 16 ) + 1;
		var marker = L.marker( new L.LatLng( property.lat, property.lng ), { title: property.city } );
		var popup = `<img src="assets/images/bedrooms/b${image_id }_s.jpg"   alt = "property image"
					 style="width:140px;height:70px;">
					 <br><b><span class="text-capitalize">${property.city}</span></b>
					 <br>board :  ${board_types[ property.board_type ]}
					 <br>room: ${room_types[ property.room_type ]}
					 <br>view: ${property.p_view}
					 <br> <h6 class="bg_green text-light p-2 mt-2">${property.p_price_per_w}&nbsp;EUR <small>per week</small></h6><br>
					 <a class="property_popup btn btn-sm bg_green_light "
					  title="See more information about the room."
					  id="${property.p_id}"
					  data-image_id="${image_id}"
					  href="#" >more...</a>`;
		
		if ( coordinates && property.p_id === show_p_id ) {
			/*open popup on show on map click*/
			L.marker( coordinates ).addTo( map )
				.bindPopup( popup ).openPopup();
		}
		else {
			marker.bindPopup( popup );
		}
		
		mcg.addLayer( marker );
		
	}
	
	map.addLayer( mcg );
	
}

$( function () {
	
	create_map()
} );
