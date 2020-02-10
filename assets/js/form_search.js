$( document ).on( "click", "#search_btn", function ( e ) {
	/*we don't want to submit form to the server, because we don't  have one*/
	e.preventDefault();
	
	var city = $( '#city' ).val().toLowerCase();
	
	var room_type = $( "#room_type" ).val();
	var board_type = $( "#board_type" ).val();
	
	
	
	if(city === '')
	{
		swal.fire(('select city'));
	}
	console.log(city === '',room_type,board_type);
	$( '#form_search_results' ).html( '' );
	$( '#map_search_result' ).html( '' );


//	 here multi options for searching with any room type or board type
	for ( var room in properties ) {
		
		var property = properties[ room ];
		var image_id = ( property.p_id % 16 ) + 1;
		var food_id = image_id % 3 + 1;
		
		if ( property.city.toString().toLowerCase() === city.toString() &&
			property.room_type.toString() === room_type.toString() &&
			property.board_type.toString() === board_type.toString() ) {
			
			render_room( property.p_id, image_id, 'form_search_results' );
			render_gallery( property, food_id );
			render_booking_calendar( property );
		}
	}
	
} );


