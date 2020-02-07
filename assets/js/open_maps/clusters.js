var tiles = L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom    : 18,
	attribution: '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
} );

var map = L.map( 'map', {
	center: L.latLng( 44.8, -17.2 ),
	zoom  : 1,
	layers: [ tiles ]
} );

var mcg = L.markerClusterGroup( {
	                                chunkedLoading   : true,
	                                //singleMarkerMode: true,
	                                spiderfyOnMaxZoom: false
                                } );

for ( var room in properties ) {
	
	var property = properties[ room ];
	
	var marker = L.marker( new L.LatLng( property.lat, property.lng ), { title: property.p_name } );
	marker.bindPopup( `<img src="assets/images/avatar/avatar${property.p_id }.png"   alt = "property image"  style="width:30px;height:30px;"><b>${property.city}</b><br>${property.lng} ${property.lat} <a class="property_pop" id="${property.p_id}" href="#" >click me</a>` );
	mcg.addLayer( marker );
	
}


map.addLayer( mcg );