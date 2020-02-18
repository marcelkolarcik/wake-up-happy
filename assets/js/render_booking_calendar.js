function render_booking_calendar( property ) {
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
				 data-user_set = "false"
				 >
			
				  <span> ${week}</span>
				 </div>
			` );
		}
	} );
	
	$.each( property.price, function ( index, value ) {
		boards.append( `
			<div>
				 <input id = "${index}" name = "board" type = "radio" value = ""${value}  onclick=set_price(${property.p_id},${index}); >
                 <label for = "${index}"  class="nav_link_property board">${board_types[ index ]} : ${value} EUR</label >
			</div>
	` );
	} );
	
}

function set_price( p_id, index ) {
	
	var board_types = JSON.parse( localStorage.getItem( 'board_types' ) );
	$( '#boards_' + p_id ).removeClass( 'bg_orange' );
	$( "#weeks_" + p_id ).val( '' );
	$( "#total_price_" + p_id ).val( '' );
	$( "#board" + p_id ).val( board_types[ index ] );
	
	var board_price = $( 'input[name="board"]:checked' ).val();
	var week = $( '.week' );
	
	week.data( 'price', board_price ).addClass( 'bg_green' ).removeClass( 'text-secondary selected' );
	week.data( 'price', board_price );
	week.data( 'user_set', 'true' );
}
