
$(function() {
	let e =0;
	let randoms = [];
	while( e < 3)
	{
		var random_id = Math.floor(Math.random() * properties.length ) ;
		
		if(randoms.indexOf(random_id) === -1) // to avoid display of same properties....
		{
			randoms.push(random_id) ;
			
			var property = properties[ random_id ];
			var image_id = ( property.p_id % 16 ) + 1;
			var food_id = image_id % 3 + 1;
			
			render_room( property.p_id, image_id, 'form_search_results' );
			render_gallery( property, food_id );
			render_booking_calendar( property );
			
			e++;
		}
	}
});