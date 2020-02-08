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
	let room_types =[
		'Single ( En Suite )',
		'Double ( En Suite )',
	];
	
	let  board_types =  [
		'Room only',
		'Bed & Breakfast',
		'Breakfast & Dinner',
		'All Inclusive'
	];
	for ( var room in properties ) {
		
		var property = properties[ room ];
		var image_id = (property.p_id % 7) + 1;
		var marker = L.marker( new L.LatLng( property.lat, property.lng ), { title: property.p_name } );
		marker.bindPopup( `<img src="assets/images/bedrooms/b${image_id }_s.jpg"   alt = "property image"
	 style="width:90px;height:45px;">
	 <br><b>${property.city}</b>
	 <br>board :  ${board_types[property.board_type]}
	 <br>room: ${room_types[property.room_type]}
	 <br> <h6 class="bg_green text-light p-2 mt-2">${property.p_price_per_w}&nbsp;EUR <small>per week</small></h6><br>
	 <a class="property_pop" id="${property.p_id}" data-image_id="${image_id}" href="#" >more...</a>` );
		
		mcg.addLayer( marker );
		
	}
	
	
	map.addLayer( mcg );