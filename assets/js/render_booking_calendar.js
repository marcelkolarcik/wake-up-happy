function render_booking_calendar( property ) {
	
	var bookings = $( '#bookings_' + property.p_id );
	
	$.each( weeks_till_end_of_year, function ( index, week ) {
		
		if ( property.bookings.indexOf( week ) !== -1 ) {
			//			booked out weeks
			bookings.append( `
				<div class="col img-thumbnail  bg_orange " title="booked already !"> <span> ${week}</span></div>
			` );
		}
		
		else {
			//			   available weeks
			bookings.append( `
				<div class="col img-thumbnail week bg_green " title="week: ${week} - available !"
				 data-p_id="${property.p_id}"
				 data-week="${week}"
				 data-price="${property.p_price_per_w}">
				 
				  <span> ${week}</span>
				 </div>
			` );
		}
	} );
	
}