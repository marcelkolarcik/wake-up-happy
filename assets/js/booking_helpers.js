// WHEN USER SELECTS BOARD ON BOOKING CALENDAR
// IT'S EITHER FIRST TIME OR USER IS CHANGING BOARDS
// => SETTING  WEEKS BOOKED, TOTAL PRICE AND BOARD PRICE FOR THE WEEKS
// ALL FIELDS ARE READONLY SO USER CANNOT CHANGE THEM EASILY....
function set_price ( p_id, index ) {
	
	var board_types = JSON.parse ( localStorage.getItem ( 'board_types' ) );
	
	$ ( '#boards_' + p_id ).removeClass ( 'border border-danger' );
	
	var num_of_selected_weeks = selected_weeks(p_id);
	

	
//	PRICE FRO THE BOARD (ROOM ONLY, B&B...) TO CALCULATE TOTAL PRICE FOR THE BOOKING
//	num_of_selected_weeks * board_price
	var board_price = $ ( 'input[name="board"]:checked' ).val ();
	
//			SETTING TOTAL PRICE FOR THE BOOKING ON PAYMENT FOR BOOKING FORM
	$ ( "#total_price_" + p_id ).val ( num_of_selected_weeks * board_price );
	
//			SETTING NAME OF THE BOARD FOR THE BOOKING ON PAYMENT FOR BOOKING FORM
	$ ( "#board" + p_id ).val ( board_types[ index ] );
	
	//			FEEDBACK TO USER ON BOOKING CALENDAR ABOUT THE TOTAL PRICE FOR THE BOOKING
	$ ( "#preview_total_price_" + p_id ).html ( num_of_selected_weeks * board_price +" EUR" );
	
	
//	WEEKS ON BOOKING CALENDAR
	var week = $ ( '.week' );
	week.data ( 'price', board_price );
	
//	WHEN USER SELECTS BOARD WHILE BOOKING WEEKS, WE'LL SET WEEKS ON BOOKING CALENDAR AS BOOKABLE
//	BECAUSE IF NO BOARD IS SELECTED, WE'LL FIRE ALERT IF USER TRIES TO
//	SELECT ANY WEEK
	week.data ( 'board_selected_' + p_id, 'true' );
}

function selected_weeks(p_id)
{
	var selected_weeks = $ ( "#weeks_" + p_id ).val();

//	COUNTING NUMBER OF SELECTED WEEKS TO CALCULATE TOTAL PRICE FOR THE BOOKING
//	num_of_selected_weeks * board_price
	if(selected_weeks !== "")
	{
//		IF MORE THEN 1 WEEK
		if(selected_weeks.includes('-')) return selected_weeks.split('-').length;
//		IF 1 WEEK selected_weeks.includes('-') RETURNS  FALSE , BECAUSE FIRST WEEK IS APPENDED WITHOUT -
		return 1;
	}
	else
	{
		return 0;
	}
}

// MARKING SELECTED WEEKS ON THE BOOKING CALENDAR
(
	function () {
		var booked_properties = [];
		var num_of_selected_weeks = 0;
		$ ( document ).on ( "click", ".week", function () {
			
			var p_id = $ ( this ).data ( 'p_id' );
			
			
//			IF USER FORGETS TO SELECT THE BOARD BEFORE SELECTING WEEKS, WE'LL FIRE ALERT
			if ( $ ( this ).data ( 'board_selected_' + p_id ) === false ) {
				$ ( '#boards_' + p_id ).addClass ( 'border border-danger' );
				swal.fire ( {
					
					            title: 'Oops...',
					            text : 'Please, select board!',
					            icon : 'warning'
					
				            } );
				return;
			}
			
			var selected_week = $ ( this ).data ( 'week' ).toString ();
			var price_per_week = $ ( this ).data ( 'price' ).toString ();
			
			var weeks = $ ( "#weeks_" + p_id );
			var total_price = $ ( "#total_price_" + p_id );
			

			

//	COLLECTING ALL BOOKED ROOMS IDS
			booked_properties.push ( p_id );
			
			if ( num_of_selected_weeks === 0 ) {
			
//				IF THE WEEK IS NOT SELECTED, ADD THIS WEEK TO BOOKINGS
				if ( !$ ( this ).hasClass ( 'selected' ) ) {
					
					/* IF IT IS FIRST CLICK, WE APPEND WEEK WITHOUT - ; */
					weeks.val ( weeks.val () + selected_week );
					$ ( this ).removeClass ( 'bg_green' ).addClass ( 'text-secondary selected' );
//					TOTAL PRICE IS ONE price_per_week , BECAUSE IT'S FIRST WEEK SELECTED
					total_price.val ( price_per_week );
					
					num_of_selected_weeks = selected_weeks(p_id);
					
					
				}
				
				
			}
			else {
				if ( !$ ( this ).hasClass ( 'selected' ) ) {
					
					/* IF IT IS NOT FIRST CLICK, WE APPEND WEEK WITH - ;  (11-12-13)*/
					weeks.val ( weeks.val () + '-' + selected_week );
					num_of_selected_weeks = selected_weeks(p_id);
					
//					UPDATING COLOR OF SELECTED WEEK
					$ ( this ).removeClass ( 'bg_green' ).addClass ( 'text-secondary selected' );
					
					total_price.val ( (num_of_selected_weeks ) * price_per_week );
					
					
				}
				else {
					/*BECAUSE IF USER CLICKS ON THE SAME WEEK AGAIN, WE NEED TO , DESELECT IT AND RECALCULATE TOTAL PRICE
					 * AND REMOVE THIS WEEK FROM BOOKING FORM*/
					
					//					UPDATING COLOR OF DE-SELECTED WEEK
					$ ( this ).addClass ( 'bg_green' ).removeClass ( 'text-secondary selected' );
					
					total_price.val ( parseInt ( total_price.val () ) - parseInt ( price_per_week ) );
					
					if ( weeks.val ().includes ( '-' + selected_week ) ) weeks.val ( weeks.val ().replace ( '-' + selected_week, '' ) );
					else weeks.val ( weeks.val ().replace ( selected_week, '' ) );
					
//					IF USER DESELECT FIRSTLY SELECTED WEEK FIRST CHARACTER OF BOOKED WEEKS AFTER USER DESELECTS IT IS - ,
//                  WE'LL REMOVE IT FROM BOOKING FORM => TO AVOID DISPLAYING BOOKED WEEKS AS -12-23,
//					EXAMPLE: CURRENTLY SELECTED WEEKS 11-12-13 , USER DESELECT FIRSTLY SELECTED WEEK 11 => DISPLAY IS -12-13
//					SO WE'RE REMOVING FIRST -
					if(weeks.val ().charAt(0) === '-') weeks.val ( weeks.val ().substring(1) ) ;
					
					num_of_selected_weeks = selected_weeks(p_id);
					
					
				}
			}
//			FEEDBACK TO USER ON BOOKING CALENDAR ABOUT THE TOTAL PRICE FOR THE BOOKING
			$ ( "#preview_total_price_" + p_id ).html ( total_price.val ()+" EUR" );
			
			
		} );
	} ) ();


//// SEND EMAIL TO ADMIN
// WHEN USER PAYS FOR THE ROOM, ADMIN OF THE SITE WILL BE NOTIFIED VIA EMAIL
function sendMail ( contactForm, p_id, room_style ) {
	confirm_payment ( "SUCCESS", p_id, contactForm, room_style );
	
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
//ONCE USER PAYS FOR THE BOOKING, WE WILL FIRE CONFIRMATION ALERT, WITH OPTION
// TO SAVE THIS CONFIRMATION LOCALLY
function confirm_payment ( status, p_id, contactForm, room_style ) {

	
	
	if ( contactForm.weeks.value === '' || contactForm.total_price.value === '' ) {
		swal.fire ( 'Please,select at least one week!' );
	}
	else {
		if ( status === 'SUCCESS' ) {
		

			var booked_weeks = contactForm.weeks.value;
			if ( booked_weeks.charAt ( 0 ) === '-' ) booked_weeks = booked_weeks.substr ( 1 );
		
			var current_bookings_s = booked_weeks.split ( '-' );
			//	PARSING weeks ( strings ) to integers
			var current_bookings = current_bookings_s.map ( parse_to_int );
			
			function parse_to_int ( num ) {
				return parseInt ( num );
			}
			
			var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
			var room = ROOMS[ p_id ];
			
//			ADDING CURRENT BOOKINGS TO ROOM'S BOOKINGS
			room.bookings = room.bookings.concat ( current_bookings );
			ROOMS[ p_id ] = room;
			localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
			
			sessionStorage.setItem ( 'room_to_edit', JSON.stringify(room) );
			
//			IF OWNER WANTS TO BLOCK SOME DATES WE WILL FIRE THIS ALERT
			if(sessionStorage.getItem('edit_mode'))
			{
				swal.fire({
					html:` <div >
									 <p class="card-title nav_link_property">Your dates were blocked !</p>
									 <hr >
									 <span class="nav_link_property">Week(s): ${contactForm.weeks.value}</span>
									  <hr >
									<a class="btn btn-sm border_green d-print-none mb-3" href=""  title="Dismiss"><i class="fas fa-thumbs-up"></i></a>
							 </div>`,
					          showConfirmButton: false
				          })
			}
//			IF USER BOOKED A ROOM WE WILL FIRE THIS ALERT
			else
			{
				swal.fire ( {
					            html:
						            `<div class="card horizontally_aligned" style="width: 100%;">
							<div class=" bg_green">
							 <img class="" src="assets/images/logo_sm.png"  alt="logo image">
						
							</div>
							
							 <img src="assets/images/bedrooms/b${room_style}.jpg" class="card-img-top" alt="property image">
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
									 		<td><span>${contactForm.total_price.value} EUR</span></td>
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
										    Reservation ID: ${Math.random ().toString ( 36 ).substr ( 2, 10 )}<br >
										  
										    
										      <a class="btn btn-sm border_green d-print-none mb-3" href=""  title="Dismiss"><i class="fas fa-thumbs-up"></i></a>
										     
											
										</div>
							 </div>
							 </div>`,
					
					            showConfirmButton: false
					
				            } );
				
			}
//	END OF	ADDING CURRENT BOOKINGS TO ROOM'S BOOKINGS
		
		
			
		}
		else if ( status === 'FAILED' ) {
			swal.fire ( {
				            position         : 'top-end',
				            type             : 'error',
				            title            : 'Whoops !',
				            text             : 'Your room is not booked !',
				            showConfirmButton: true,
				            timer            : 2500
				
			            } );
			
		}
	}
}
