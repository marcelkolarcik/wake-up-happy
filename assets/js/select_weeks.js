var booked_properties = [];

$( document ).on( "click", ".week", function () {
	var selected_week = $( this ).data( 'week' ).toString();
	var price_per_week = $( this ).data( 'price' ).toString();
	var p_id = $( this ).data( 'p_id' );
	var weeks = $( "#weeks_" + p_id );
	var total_price = $( "#total_price_" + p_id );

//	RESETTING COUNTER IF CURRENT CLICK IS CLICK ON BOOKING CALENDAR OF DIFFERENT ROOM IN SEARCH RESULTS....
	if ( booked_properties.slice( -1 )[ 0 ] !== p_id ) {
		counter = 0;
	}
//	COLLECTING ALL BOOKED ROOMS IDS
	booked_properties.push( p_id );
	
	if ( counter === 0 ) {
		
		if ( !$( this ).hasClass( 'selected' ) ) {
			weeks.val( weeks.val() + selected_week );
			/*BECAUSE IF IT IS FIRST CLICK, WE APPEND WEEK WITHOUT - ; */
			$( this ).removeClass( 'bg_green' ).addClass( 'text-secondary selected' );
			total_price.val( ( counter + 1 ) * price_per_week );
			counter++;
		}
		else {
			/*BECAUSE IF USER CLICKS ON THE SAME WEEK AGAIN, WE NEED TO , DESELECT IT AND RECALCULATE TOTAL PRICE
			 * AND REMOVE THIS WEEK FROM BOOKING FORM*/
			$( this ).addClass( 'bg_green' ).removeClass( 'text-secondary selected' );
			total_price.val( parseInt( total_price.val() ) - parseInt( price_per_week ) );
			
			if ( weeks.val().includes( '-' + selected_week ) ) weeks.val( weeks.val().replace( '-' + selected_week, '' ) );
			else weeks.val( weeks.val().replace( selected_week, '' ) );
			counter--;
			/* DECREASE COUNTER FOR ACCURATE CALCULATION*/
			
		}
		
	}
	else {
		if ( !$( this ).hasClass( 'selected' ) ) {
			weeks.val( weeks.val() + '-' + selected_week );
			/*BECAUSE IF IT IS NOT FIRST CLICK, WE APPEND WEEK WITH - ; */
			$( this ).removeClass( 'bg_green' ).addClass( 'text-secondary selected' );
			total_price.val( ( counter + 1 ) * price_per_week );
			counter++;
		}
		else {
			/*BECAUSE IF USER CLICKS ON THE SAME WEEK AGAIN, WE NEED TO , DESELECT IT AND RECALCULATE TOTAL PRICE
			 * AND REMOVE THIS WEEK FROM BOOKING FORM*/
			$( this ).addClass( 'bg_green' ).removeClass( 'text-secondary selected' );
			total_price.val( parseInt( total_price.val() ) - parseInt( price_per_week ) );
			
			if ( weeks.val().includes( '-' + selected_week ) ) weeks.val( weeks.val().replace( '-' + selected_week, '' ) );
			else weeks.val( weeks.val().replace( selected_week, '' ) );
			
			counter--;
			/* DECREASE COUNTER FOR ACCURATE CALCULATION*/
			
		}
	}
	
	console.log( Math.random().toString(36).substr(2, 7) );
	
} );