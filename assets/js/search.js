$( document ).on( "click", "#search_btn", function ( e ) {
	/*we don't want to submit form to the server, because we don't  have one*/
	e.preventDefault();
	
	var city = $( '#city' ).val().toLowerCase();
	var room_type = $( "#room_type" ).val();
	var board_type = $( "#board_type" ).val();
	var search_results = $( '#search_results' );
	
	search_results.html( '' );
	
	/*console.log(room_type,board_type);*/
	

//	 here multi options for searching with any room type or board type
	for ( var room in properties ) {
		
		var property = properties[ room ];
		var image_id = ( property.p_id % 16 ) + 1;
		var food_id = image_id % 3 +1;
	
		
		
		if ( property.city.toString().toLowerCase() === city.toString() &&
			property.room_type.toString() === room_type.toString() &&
			property.board_type.toString() === board_type.toString() ) {
			
			
			render_room( property.p_id,image_id);
			render_gallery(property,food_id);
			render_booking_calendar(property);
//			search_results.append( `
//					<div class="img-thumbnail">
//							<img src="assets/images/bedrooms/b${image_id}_s.jpg">
//							${property.p_address}  ${room_types[ property.room_type ]}  ${board_types[ property.board_type ]} ${property.p_price_per_w}
//
//							<button class="btn bg_green_light" class="load_info" data-property_id="${property.p_id}">more info</button>
//							<div id="load_to_${property.p_id}"></div>
//							</div>
//				` )
		}
	}
	
	
} );


