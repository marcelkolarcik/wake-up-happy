var booked_properties = [];

$( document ).on( "click", ".week", function () {
	var selected_week = $( this ).data( 'week' ).toString();
	var price_per_week = $( this ).data( 'price' ).toString();
	var p_id = $( this ).data( 'p_id' );
	var weeks = $( "#weeks_"+p_id );
	var total_price = $( "#total_price_"+p_id );
	
	
//	RESETTING COUNTER IF CURRENT CLICK IS CLICK ON BOOKING CALENDAR OF DIFFERENT ROOM IN SEARCH RESULTS....
	if(booked_properties.slice(-1)[0] !== p_id)
	{
		counter = 0;
	}
//	COLLECTING ALL BOOKED ROOMS IDS
	booked_properties.push(p_id);
	
	
	if ( counter === 0 ) {
		weeks.val( weeks.val() + selected_week );
		$( this ).removeClass( 'bg_green' ).addClass( 'text-secondary' );
		total_price.val( 'Total price : ' + ( counter + 1 ) * price_per_week  +' EUR');
		
	}
	else {
		weeks.val( weeks.val() + ', ' + selected_week );
		$( this ).removeClass( 'bg_green' ).addClass( 'text-secondary' );
		total_price.val( 'Total price : ' + ( counter + 1 ) * price_per_week +' EUR');
	}
	
	counter++;
	
	
} );