export function create_map ( coordinates = null, zoom = null, show_p_id = null ) {
	var tiles = L.tileLayer ( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom    : 18,
		attribution: '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
	} );
	
	var container = L.DomUtil.get ( 'mapid' );
	
	if ( container != null ) {
		/* on show on map we need to recreate divs to avoid container already initiated, or container not found...*/
		container._leaflet_id = null;
		$ ( "#api_open_maps" ).html ( "" );
		$ ( "#map" ).empty ();
		$ ( "<div id=\"mapid\" style=\"min-height: 400px;\"></div>" ).appendTo ( "#api_open_maps" );
	}
	var map = L.map ( 'mapid', {
		center: L.latLng ( coordinates || 39.095963, -48.515625 ),
		zoom  : zoom || 2,
		layers: [ tiles ]
	} );
	
	var mcg = L.markerClusterGroup ( {
		                                 chunkedLoading   : true,
		                                 //singleMarkerMode: true,
		                                 spiderfyOnMaxZoom: false
	                                 } );
	
	var room_types = JSON.parse ( localStorage.getItem ( 'room_types' ) );
	var views = JSON.parse ( localStorage.getItem ( 'views' ) );
	var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
	
	for ( var room in ROOMS ) {
		
		var property = ROOMS[ room ];
		if(property)
		{
			var image_id = (property.p_id % 16 ) + 1;
			var marker = L.marker ( new L.LatLng ( property.lat, property.lng ), { title: property.city } );
			var popup = `<img src="assets/images/bedrooms/b${property.room_style }_s.jpg"   alt = "property image"
					 style="width:140px;height:70px;">
					 <br><b><span class="text-capitalize">  ${decodeURI( property.location )}</span></b>
					
					 <br>room: ${room_types[ property.room_type ]}
					 <br>view: ${views[ property.p_view ] }

					 <a class="property_popup btn btn-sm bg_green_light "
					  title="See more information about the room."
					  id="${property.p_id}"
					  data-image_id="${image_id}"
					  href="#" >more...</a>`;
			
			if ( parseInt ( sessionStorage.getItem ( 'new_p_id' ) ) === property.p_id && sessionStorage.getItem ( 'lat' ) && sessionStorage.getItem ( 'lng' )) {
				//		ADDED NEW ROOM => SHOW ON MAP
				
				L.marker ( [ sessionStorage.getItem ( 'lat' ), sessionStorage.getItem ( 'lng' ) ] ).addTo ( map )
				 .bindPopup ( popup ).openPopup ();
				
				sessionStorage.removeItem('new_p_id');
				sessionStorage.removeItem('lat');
				sessionStorage.removeItem('lng');
				
			}
			
			else if ( coordinates && property.p_id === show_p_id ) {
				
				/*OPEN POPUP ON CLICK ON show on map BUTTON IN ROOM PREVIEW*/
				L.marker ( coordinates ).addTo ( map )
				 .bindPopup ( popup ).openPopup ();
			}
			else {
				marker.bindPopup ( popup );
			}
			
			mcg.addLayer ( marker );
		}
		
		
	}
	
	map.addLayer ( mcg );
	
}


$ ( function () {
	if ( window.location.pathname === '/index.html' ) create_map ();
	
} );
