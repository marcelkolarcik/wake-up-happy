// SETTING BOOKED WEEKS AND TOTAL PRICE ON BOOKING FORM
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
	week.data( 'user_set_'+p_id, 'true' );
}

// MARKING SELECTED WEEKS ON THE BOOKING CALENDAR
( function () {
	var booked_properties = [];
	
	$( document ).on( "click", ".week", function () {
		
		var p_id = $( this ).data( 'p_id' );
		
		if ( $( this ).data( 'user_set_'+p_id ) === false ) {
			$( '#boards_' + p_id ).addClass( 'bg_orange' );
			alert( 'Please select board' );
			return;
		}
		
		var selected_week = $( this ).data( 'week' ).toString();
		var price_per_week = $( this ).data( 'price' ).toString();
		
		var weeks = $( "#weeks_" + p_id );
		var total_price = $( "#total_price_" + p_id );

//	IF USER CHANGES BOARD TYPE we are reseting prices and booked weeks to '' and so we must reset counter as well
		if ( total_price.val() === '' ) counter = 0;
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
		
		//	console.log( Math.random().toString( 36 ).substr( 2, 7 ) ,total_price.val());
		
	} );
} )();

//// SEND EMAIL TO ADMIN
function sendMail( contactForm, p_id ) {
	confirm_payment( "SUCCESS", p_id, contactForm );
	
	/*emailjs.send( "gmail", "template_pDNgSwG0", {
	 "from_name"          : contactForm.name.value,
	 "from_email"         : contactForm.email_of_user.value,
	 "room_details"       : contactForm.room_details.value,
	 "weeks"              : contactForm.weeks.value,
	 "total_price"        : contactForm.total_price.value,
	 "request_of_property": contactForm.request_of_property.value
	 } )
	 .then(
	 function ( response ) {
	 console.log( "SUCCESS", response );
	 confirm_payment("SUCCESS");
	 },
	 function ( error ) {
	 console.log( "FAILED", error );
	 confirm_payment("FAILED");
	 }
	 );*/
	return false;  // To block from loading a new page
}

// PAYMENT CONFIRMATION  POPUP
function confirm_payment( status, p_id, contactForm ) {
	function reload_page() {
		location.reload();
	}
	
	if ( contactForm.weeks.value === '' || contactForm.total_price.value === '' ) {
		swal.fire( 'Please,select at least one week!' );
	}
	else {
		if ( status === 'SUCCESS' ) {
			swal.fire( {
				           html:
					           `<div class="card horizontally_aligned" style="width: 100%;">
							<div class=" bg_green">
							 <img class="" src="assets/images/logo_sm.png"  alt="logo image">
						
							</div>
							
							 <img src="assets/images/bedrooms/b${p_id}.jpg" class="card-img-top" alt="property image">
							 <div class="card-body">
									 <p class="card-title nav_link_property">Thank you for booking with us !</p>
									 <table class="table table-sm">
									
									 	<tr>
									 		<td> <span class="nav_link_property">Name:</span></td>
									 		<td><span>${contactForm.name.value}</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property">Email:</span></td>
									 		<td><span>${contactForm.email_of_user.value}</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property">Room:</span></td>
									 		<td><span>${contactForm.room_details.value}</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property">Week:</span></td>
									 		<td><span>${contactForm.weeks.value}</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property">Total price:</span></td>
									 		<td><span>${contactForm.total_price.value}</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property">address:</span></td>
									 		<td><small>${contactForm.form_address.value}</small></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property">Request:</span></td>
									 		<td><span>${contactForm.request_of_property.value}</span></td>
										</tr>
									</table>
									
									
									  <span class="btn btn-sm bg_green_light d-print-none " onclick="window.print()">save as PDF</span>
									  <div class="card-footer bg-transparent pb-0 mb-0">
										    Reservation ID: ${Math.random().toString( 36 ).substr( 2, 10 )}<br >
										  
										    
										      <a class="btn btn-sm border_green d-print-none mb-3" href=""  title="Dismiss"><i class="fas fa-thumbs-up"></i></a>
										     
											
										</div>
							 </div>
							 </div>`,
				
				           showConfirmButton: false
				
			           } );
			
			//	setTimeout(reload_page,5000);
			
		}
		else if ( status === 'FAILED' ) {
			swal.fire( {
				           position         : 'top-end',
				           type             : 'error',
				           title            : 'Whoops !',
				           text             : 'Your room is not booked !',
				           showConfirmButton: true,
				           timer            : 2500
				
			           } );
			//	setTimeout( reload_page, 2500 );
		}
	}
}
