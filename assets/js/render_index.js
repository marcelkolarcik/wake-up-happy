function render_index( property, image_id, where ) {
	
	var food_id = image_id % 3 + 1;///// because i am applying random image to  a food style
	// ( breakfast style, lunch style, dinner style)and i have only 3 images per style ...
	
	render_room( property, image_id, where );
	render_gallery( property, food_id,image_id );
	render_amenities( property );
	render_booking_calendar( property );
}

function getImageId( property_id ) {
	return ( property_id % 16 ) + 1; /////  because i am applying random image to  a room and i have only 16 images and
	                                 // > 16 rooms to display...
	
}
