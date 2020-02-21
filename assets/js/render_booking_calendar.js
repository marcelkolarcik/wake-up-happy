export function render_booking_calendar( property ) {
	var board_types = JSON.parse( localStorage.getItem( 'board_types' ) );
	var bookings = $( '#bookings_' + property.p_id );
	var boards = $( '#boards_' + property.p_id );
	
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
				 data-price="${ property.price[ Object.keys( property.price )[ 0 ] ]}"
				 data-user_set_${property.p_id} = "false"
				 >
			
				  <span> ${week}</span>
				 </div>
			` );
		}
	} );
	
	$.each( property.price, function ( index, value ) {
		boards.append( `
			
				 <input id = "${index}" name = "board" type = "radio" value = "${value}"  onclick=set_price(${property.p_id},${index}); >
                 <label for = "${index}"  class="nav_link_property board p-2">${board_types[ index ]} : ${value} EUR</label >
			
	` );
	} );
	
}

