$( document ).on( "click", ".week", function () {
	var selected_week = $( this ).data( 'week' ).toString();
	var price_per_week = $( this ).data( 'price' ).toString();
	var weeks = $( "#weeks" );
	var total_price = $( "#total_price" );
	
	
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