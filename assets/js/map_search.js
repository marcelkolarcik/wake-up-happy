/*clicking on more... link in the map popup */
$( document ).on( "click", ".property_popup", function () {
	
	$( '#form_search_results' ).html( '' );
	$( '#map_search_result' ).html( '' );
	
	var p_id = $( this ).attr( 'id' );
	var property = DB[ p_id ];
	var image_id = $( this ).data( 'image_id' );
	
	render(property, image_id, 'map_search_result');
	
} );

