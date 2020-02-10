/*clicking on more... link on the map in popup*/
$( document ).on( "click", ".property_popup", function () {
	
	$( '#form_search_results' ).html( '' );
	$( '#map_search_result' ).html( '' );
	
	var p_id = $( this ).attr( 'id' );
	var image_id = $( this ).data( 'image_id' );
	var food_id = image_id % 3 + 1;
	var property = properties[ p_id ];
	
	render_room( p_id, image_id, 'map_search_result' );
	
	render_gallery( property, food_id );
	
	render_booking_calendar( property );
	
} );

