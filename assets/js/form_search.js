function is_available( property , city ) {
	
	var room_type = $( "#room_type" ).val();
	var board_type = $( "#board_type" ).val();
	
	if ( room_type === 'any' && board_type === 'any' ) {
		///// searching only for the city
		if ( property.city.toString().toLowerCase() === city.toString() ) {
			return true;
		}
		
	}
	else if ( room_type === 'any' && board_type !== 'any' ) {
		/////searching for the city and board_type
		if ( property.city.toString().toLowerCase() === city.toString() &&
			property.board_type.toString() === board_type.toString() ) {
			return true;
		}
	}
	else if ( room_type !== 'any' && board_type === 'any' ) {
		/////searching for the city and room_type
		if ( property.city.toString().toLowerCase() === city.toString() &&
			property.room_type.toString() === room_type.toString() ) {
			return true;
		}
		
	}
	else {
		///// searching for the city, room_type, board_type
		if(
			property.city.toString().toLowerCase() === city.toString() &&
			property.room_type.toString() === room_type.toString() &&
			property.board_type.toString() === board_type.toString()
		)
		{
			return true;
		}
	}
}

$( document ).on( "click", "#search_btn", function ( e ) {
	/*we don't want to submit form to the server, because we don't  have one*/
	e.preventDefault();
	
	
	
	//// because these divs could have content from previous search
	var form_search_results = $( '#form_search_results' );
	form_search_results.html( '' );
	$( '#map_search_result' ).html( '' );
	
	//// to make city search case insensitive, same will apply when landlord is adding room into th map, we will store
	// it .toLowerCase();
	var city = $( '#city' ).val().toLowerCase();

//	because at least city must be selected
	if ( city === '' ) {
		swal.fire( ( 'select city' ) );
	}
	
	var results = 0;
	for ( var room in properties ) {
		
		var property = properties[ room ];
		var image_id = ( property.p_id % 16 ) + 1; ///// because , this is process how we apply random image to
		                                           // property, to be consistent across the site, TO DO  : extract to
		                                           // function
		var food_id = image_id % 3 + 1;///// because , this is process how we apply random food_image to property, to
		                               // be consistent across the site, TO DO  : extract to function
		
		if(is_available(property,city))
		{
			render_room( property.p_id, image_id, 'form_search_results' );
			render_gallery( property, food_id );
			render_booking_calendar( property );
			
			results++;
		}
		
	}
	
	if ( results === 0 ) {
		
		//// because if results are empty , we will display info to the user, about 0 results, and display "featured
		// properties" instead...
		form_search_results.append(' <div class = "img-thumbnail mt-3 bg_orange " >Your search returned 0 results, try different search parameters or have a look at ' +
			                                 'featured properties bellow.</div >');
		featured_rooms();
		console.log('no properties found');
		
	}
	
} );


