// WHEN USER SELECTS BOARD ON BOOKING CALENDAR
// IT'S EITHER FIRST TIME OR USER IS CHANGING BOARDS
// => SETTING  WEEKS BOOKED, TOTAL PRICE AND BOARD PRICE FOR THE WEEKS
// ALL FIELDS ARE READONLY SO USER CANNOT CHANGE THEM EASILY....

/*WHEN USER SELECTS BOARD ON BOOKING CALENDAR render_booking_calendar.js line ~ 65
 * IT COULD BE ONE OF TWO CASES :
 *
 *   1. USER IS SELECTING BOARD FOR THE FIRST TIME
 *
 *       =>  WE WILL SET DATA ATTRIBUTE data-price FOR THE WEEKs
 *           ON BOOKING CALENDAR TO THE BOARD PRICE SELECTED
 *           week.data ( 'price', board_price ),
 *
 *           SO THAT WHEN USER IS CLICKING ON WEEKS HE WANTS TO
 *           BOOK, WE WILL CALCULATE TOTAL PRICE FOR THE
 *           BOOKING FROM THIS DATA ATTRIBUTE AS
 *          total_price.val ( (num_of_selected_weeks ) * price_per_week ); lines ~ 120 -> 140...
 *
 *   2. USER IS CHANGING BOARD TYPES
 *       =>  SAME AS CASE 1
 *       +
 *       =>  WE WILL RECALCULATE TOTAL PRICE BASED ON SELECTED BOARD PRICE
 *           $ ( "#total_price_" + p_id ).val ( num_of_selected_weeks * board_price );
 *
 *   IN BOTH CASES WE ARE SETTING BOARD TYPE ON BOOKING FORM TO SELECTED BOARD
 *
 *
 *
 *
 * WHEN USER IS SELECTING WEEKS HE WANTS TO BOOK WE ARE :
 *
 *  1. SHOWING HIM TOTAL PRICE AS HE SELECTS OR DESELECTS WEEKS
 *
 *  2. CHANGING COLOR OF SELECTED WEEK TO bg_light WHEN SELECTED
 *     CHANGING COLOR OF DESELECTED WEEK BACK TO bg_green
 *
 *  3. SETTING TOTAL PRICE FOR THE BOOKING ON BOOKING FORM
 *
 *  4. SETTING WEEKS SELECTED ON BOOKING FORM
 *
 *
 *
 *   */


/*WHEN USER IS CHANGING BOARD TYPE WHEN BOOKING ROOM,
 * BY CLICKING ON RADIO BUTTON ON AVAILABILITY TAB IN ROOM PREVIEW
 * WE WILL RECALCULATE TOTAL PRICE OF BOOKING BASED ON BOARD PRICE AND
 * NUMBER OF WEEKS SELECTED , */






( function ()
	{
		var to_be_booked_room_ids = [];
		
		$ ( document ).on ( 'click', '.board_type', function ()
		{
			var p_id  = $ ( this ).data ( 'p_id' );
			var index = $ ( this ).data ( 'index' );
			
			/*REMOVING CLASS .need_translation FROM WEEKS RENDERED FOR THIS PROPERTY
			* IN BOOKING CALENDAR, BECAUSE, WE DON'T NEED TO TRANSLATE ALERT
			* ABOUT SELECTING BOARD FIRST, BECAUSE USER JUST SELECTED THE BOARD*/
			$("#bookings_" + p_id).children().removeClass('need_translation');
			
			/*COLLECTING to_be_booked_room_ids FOR CHECK*/
			to_be_booked_room_ids.push ( p_id );
			
			/*CHECKING IF USER CHANGED HIS MIND AND SELECTED DIFFERENT ROOM
			 * TO BOOK, IF HE SELECTS DIFFERENT ROOM, WE WILL SET
			 * PREVIOUS ROOM TO DEFAULT STATE, AS IF IT WAS NEVER INTERACTED WITH*/
			check_current_room ( to_be_booked_room_ids );
			
			var board_types = JSON.parse ( localStorage.getItem ( 'board_types' ) );
			
			$ ( '#boards_' + p_id ).removeClass ( 'border border-danger' );


//	PRICE FOR THE BOARD (ROOM ONLY, B&B...) TO CALCULATE TOTAL PRICE FOR THE BOOKING
			
			var board_price = $ ( 'input[name="board"]:checked' ).val ();

//			SETTING TOTAL PRICE FOR THE BOOKING ON PAYMENT FOR BOOKING FORM
			$ ( "#total_price_" + p_id ).val ( sessionStorage.num_of_selected_weeks * board_price );

//			SETTING NAME OF THE BOARD FOR THE BOOKING ON PAYMENT FOR BOOKING FORM
			$ ( "#board" + p_id ).val ( board_types[ index ] );

//			FEEDBACK TO USER ON BOOKING CALENDAR ABOUT THE TOTAL PRICE FOR THE BOOKING
//			ON AVAILABILITY TAB, SO USER CAN SEE TOTAL PRICE FOR THE BOOKING AS
//			HE SELECTS / DESELECTS THE WEEKS HE WANTS
			$ ( "#preview_total_price_" + p_id ).html ( sessionStorage.num_of_selected_weeks * board_price + " EUR" );


//	WEEKS ON BOOKING CALENDAR
			var week = $ ( '.week' );
			
			/*SETTING BOARD PRICE ON A WEEK, FOR CURRENTLY SELECTED BOARD*/
			week.data ( 'price', board_price );

//	WHEN USER SELECTS BOARD WHILE BOOKING WEEKS, WE'LL SET board_selected_(p_id) AS true
//  SO THAT HE CAN BOOK THOSE WEEKS,
//	BECAUSE DEFAULT board_selected_(p_id) IS false => IF HE FORGETS TO SELECT BOARD FIRST
//	AND NO BOARD IS SELECTED, WE'LL FIRE ALERT
//	TO SELECT BOARD FIRST
			week.data ( 'board_selected_' + p_id, 'true' );
		} );
		
		
	} ) ();


// MARKING SELECTED WEEKS ON THE BOOKING CALENDAR
// AND CHECKING CURRENTLY to_be_booked_room_ids
// WITH 	check_current_room ( to_be_booked_room_ids )
// SO THAT IF USER CHANGES ROOM HE WANTS TO BOOK
// WE WILL SET PREVIOUS ROOM TO DEFAULT STATE
(
	function ()
		{
			
			sessionStorage.num_of_selected_weeks = 0;
			
			$ ( document ).on ( "click", ".week", function ()
			{
				
				var p_id = $ ( this ).data ( 'p_id' );


//			IF USER FORGETS TO SELECT THE BOARD FOR THE ROOM,
//			BEFORE SELECTING WEEKS, WE'LL FIRE ALERT
				if ( $ ( this ).data ( 'board_selected_' + p_id ) === false )
					{
						$ ( '#boards_' + p_id ).addClass ( 'border border-danger' );
						swal.fire ( {
							           
							            html : `<h4 class="___" data-text="Oops..."></h4>
										<div class = "col-auto" >
									   
									    <hr class = "bg_green" >
									    <span class="___" data-text="Please, select board!"></span>
									     <br ><br >
									    <a href = "#" class = "btn btn-sm bg_green text-light pl-3 pr-3 " id = "ok"
									       onclick = "swal.close()"
									       > ok </a ></div>`,
							
							            showConfirmButton : false
							
						            } );
						
						
						return;
					}
				
				var selected_week  = $ ( this ).data ( 'week' ).toString ();
				var price_per_week = $ ( this ).data ( 'price' ).toString ();
				
				var weeks       = $ ( "#weeks_" + p_id );
				var total_price = $ ( "#total_price_" + p_id );
				
				/*IF WEEK ON BOOKING CALENDAR IS NOT SELECTED YET, WE WILL ADD IT
				 * TO BOOKING FORM , RECALCULATE TOTAL PRICE, CHANGE COLOR OF SELECTED WEEK*/
				if ( !$ ( this ).hasClass ( 'selected' ) )
					{
						
						
						weeks.val ( weeks.val () + '-' + selected_week );
						
						/*UPDATING num_of_selected_weeks*/
						sessionStorage.num_of_selected_weeks++;
						
						
						
//					UPDATING COLOR OF SELECTED WEEK
						$ ( this ).removeClass ( 'bg_green' ).addClass ( 'text-secondary selected' );

//						AND TOTAL PRICE FOR THE BOOKING
						total_price.val ( ( sessionStorage.num_of_selected_weeks ) * price_per_week );
						
						
					}
				else
					{
						/*BECAUSE IF USER CLICKS ON THE SAME WEEK AGAIN, WE NEED TO , DESELECT IT AND RECALCULATE TOTAL PRICE
						 * AND REMOVE THIS WEEK FROM BOOKING FORM*/
						
						//					UPDATING COLOR OF DE-SELECTED WEEK
						$ ( this ).addClass ( 'bg_green' ).removeClass ( 'text-secondary selected' );

//						AND TOTAL PRICE FOR THE BOOKING
						total_price.val ( parseInt ( total_price.val () ) - parseInt ( price_per_week ) );

//						REMOVING MINUS SIGN '-' THAT I USE TO SEPARATE WEEKS IN INPUT FIELD ON THE BOOKING
//						FORM WHEN APPENDING WEEKS BOOKED,SO THAT WE WON'T HAVE TWO MINUS SIGNS NEXT TO
//		                EACH OTHER, WHEN DESELECTING WEEK, THAT IS NOT FIRST IN INPUT FIELD
						if ( weeks.val ().includes ( '-' + selected_week ) ) weeks.val (
							weeks.val ().replace ( '-' + selected_week, '' ) );
						
						//		                IF THE WEEK IS FIRST IN INPUT
//						FIELD, IT WON'T HAVE MINUS '-' SIGN, SO WE JUST REMOVE WEEK NUMBER
						else weeks.val ( weeks.val ().replace ( selected_week, '' ) );
						
						
						/*UPDATING num_of_selected_weeks*/
						sessionStorage.num_of_selected_weeks--;
						
						
					}
				
				/*IF USER SELECTS / DESELECT  WEEK AND THE WEEK WAS FIRST IN INPUT FIELD IT WOULD HAVE MINUS SIGN '-'
				 AT THE BEGINNING SO  WE'LL REMOVE IT FROM BOOKING FORM => TO AVOID DISPLAYING BOOKED WEEKS AS -12-23,
				 EXAMPLE:
				 
				 1. USER SELECT FIRST WEEK 22, DISPLAY IN INPUT FIELD WOULD BE -22
				 
				 2. CURRENTLY SELECTED WEEKS 11-12-13 , USER DESELECT FIRSTLY SELECTED WEEK 11 => DISPLAY WOULD BE -12-13 SO WE'RE REMOVING
				 FIRST -
				 */
				if ( weeks.val ().charAt ( 0 ) === '-' ) weeks.val ( weeks.val ().substring ( 1 ) );

//			FEEDBACK TO USER ON BOOKING CALENDAR ABOUT THE TOTAL PRICE FOR THE BOOKING
				$ ( "#preview_total_price_" + p_id ).html ( total_price.val () + " EUR" );
				
				
			} );
			
			
		} ) ();


/*ON index.html , WHEN USER IS BOOKING A ROOM AND SELECTS FEW WEEKS AND THEN DECIDES
 * THAT HE WANTS TO BOOK ANOTHER ROOM AND TRIES TO BOOK ANOTHER ROOM,
 * WE WILL PUT PREVIOUS ROOM TO DEFAULT STATE, AS IT WAS NEVER INTERACTED WITH*/
function check_current_room ( to_be_booked_room_ids )
	{
		
		/*IF WE HAVE BOOKED ROOM ID'S AND CURRENT ID IS DIFFERENT FORM
		 * PREVIOUS ID => DIFFERENT ROOM => ...*/
		if ( ( to_be_booked_room_ids.length > 1
		       && to_be_booked_room_ids[ to_be_booked_room_ids.length - 2 ]
		       !== to_be_booked_room_ids[ to_be_booked_room_ids.length - 1 ] ) )
			{
				
				
				var previous_room_id = to_be_booked_room_ids[ to_be_booked_room_ids.length - 2 ];
				
				var week = $ ( '.week' );
				
				week.removeClass ( 'text-secondary selected' ).addClass ( 'bg_green' );
				
				$ ( "#preview_total_price_" + previous_room_id ).html ( '' );
				$ ( "#total_price_" + previous_room_id ).val ( '' );
				$ ( "#weeks_" + previous_room_id ).val ( '' );
				$ ( "#board" + previous_room_id ).val ( '' );
				sessionStorage.num_of_selected_weeks = 0;
				
				week.data ( 'board_selected_' + previous_room_id, false );
			}
	}


/*
 SEND EMAIL TO ADMIN
 
 BY USING emailjs WE CAN SEND EMAIL TO ADMIN OF THE SITE ABOUT THE BOOKING
 WHEN USER PAYS FOR THE ROOM, ADMIN OF THE SITE CAN THEN
 NOTIFY OWNER / FORWARD BOOKING TO OWNER OF THE ROOM
 
 
 IT IS A BIT OF LIMITATION OF emailjs, THAT IT CAN'T SEND EMAIL
 TO VARIOUS EMAIL ADDRESSES, BECAUSE IN REAL WORLD APPLICATION
 OWNER OF THE ROOM WOULD GET EMAIL DIRECTLY UPON BOOKING...
 function check_autocomplete ( new_room ) IN add_room_interactions.js
 
 
 */

 function process_booking ( contactForm, p_id, room_style )
	{
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

function parse_to_int ( num )
	{
		return parseInt ( num );
	}
/*PAYMENT CONFIRMATION  POPUP
 ONCE USER PAYS FOR THE BOOKING, WE WILL FIRE CONFIRMATION ALERT, WITH OPTION
 TO SAVE THIS CONFIRMATION LOCALLY*/
function confirm_payment ( status, p_id, contactForm, room_style )
	{

		/*IF USER DIDN'T SELECT ANY WEEKS TO BOOK WE WILL ALERT HIM ABOUT IT*/
		if ( contactForm.weeks.value === '' || contactForm.total_price.value === '' )
			{
			
				
				swal.fire ( {
					
					            html : `<h4 class="___" data-text="Oops..."></h4>
										<div class = "col-auto" >
									   
									    <hr class = "bg_green" >
									    <span class="___" data-text=" Please,select at least one week!"></span>
									    <br ><br >
									    <a href = "#" class = "btn btn-sm bg_green text-light pl-3 pr-3 " id = "ok"
									       onclick = "swal.close()"
									       > ok </a ></div>`,
					
					            showConfirmButton : false
					
				            } );
				
			}
		else
			{
				/*IF USER SELECTED WEEKS AND BOARD WE WILL ALERT HIM WITH SUCCESS
				* AND GIVE HIM OPTION TO SAVE RESERVATION TO HIS DEVICE*/
				if ( status === 'SUCCESS' )
					{
						
						
						var booked_weeks = contactForm.weeks.value;
						if ( booked_weeks.charAt ( 0 ) === '-' ) booked_weeks = booked_weeks.substr ( 1 );
						
						var current_bookings_s = booked_weeks.split ( '-' );
						//	PARSING weeks ( strings ) to integers
						var current_bookings   = current_bookings_s.map ( parse_to_int );
						
						
					
						
						
						var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
						var room  = ROOMS[ p_id ];

//			ADDING CURRENT BOOKINGS TO ROOM'S BOOKINGS
						room.bookings = room.bookings.concat ( current_bookings );
						ROOMS[ p_id ] = room;
						localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
						
						sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( room ) );

//			IF OWNER BLOCKED SOME DATES WE WILL FIRE THIS ALERT
						if ( sessionStorage.getItem ( 'edit_mode' ) )
							{
								swal.fire ( {
									            html              : ` <div >
									 <p class="card-title nav_link_property ___" data-text="Your dates were blocked !"></p>
									 <hr >
									 <span class="___" data-text="Week(s):"></span>
									 <span class="nav_link_property"> ${ contactForm.weeks.value }</span>
									  <hr >
									<a class="btn btn-sm border_green d-print-none mb-3" href=""  title="Dismiss"><i class="fas fa-thumbs-up"></i></a>
							 </div>`,
									            showConfirmButton : false
								            } );
							}
//			IF USER BOOKED A ROOM WE WILL FIRE THIS ALERT
						else
							{
								swal.fire ( {
									            html :
										            `<div class="card horizontally_aligned" style="width: 100%;">
							<div class=" bg_green">
							 <img class="" src="assets/images/logo_sm.png"  alt="logo image">
						
							</div>
							
							 <img src="assets/images/bedrooms/b${ room_style }.jpg" class="card-img-top" alt="property image">
							 <div class="card-body">
									 <p class="card-title nav_link_property ___" data-text="Thank you for booking with us !"></p>
									 <table class="table table-sm">
									
									 	<tr>
									 		<td> <span class="nav_link_property ___" data-text="Name:"></span></td>
									 		<td><span>${ contactForm.name.value }</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property ___" data-text="Email:"></span></td>
									 		<td><span>${ contactForm.email_of_user.value }</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property ___" data-text="Room:"></span></td>
									 		<td><span>${ contactForm.room_details.value }</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property ___" data-text="Week:"></span></td>
									 		<td><span>${ contactForm.weeks.value }</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property ___" data-text="Total price:"></span></td>
									 		<td><span>${ contactForm.total_price.value } </span> <span>EUR</span></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property ___" data-text="address:"></span></td>
									 		<td><small>${ contactForm.form_address.value }</small></td>
										</tr>
										<tr>
									 		<td> <span class="nav_link_property ___" data-text="Request:"></span></td>
									 		<td><span>${ contactForm.request_of_property.value }</span></td>
										</tr>
									</table>
									
									
									  <span class="btn btn-sm bg_green_light d-print-none ___" onclick="window.print()" data-text="save as PDF"></span>
									  <div class="card-footer bg-transparent pb-0 mb-0">
									  <span class="___" data-text="Reservation ID:"></span>
										     ${ Math.random ().toString ( 36 ).substr ( 2, 10 ) }<br >
										  
										    
										      <a class="btn btn-sm border_green d-print-none mb-3 ___" href=""  data-title="Dismiss"><i class="fas fa-thumbs-up"></i></a>
										     
											
										</div>
							 </div>
							 </div>`,
									
									            showConfirmButton : false
									
								            } );
								
							}
//	END OF	ADDING CURRENT BOOKINGS TO ROOM'S BOOKINGS
						
						
					}
					/*IF THERE IS AN ERROR */
				else if ( status === 'FAILED' )
					{
						
						
						swal.fire ( {
							            html              : ` <div >
                                    <h4 class="___" data-text="Whoops !"></h4>
									 <p class="card-title nav_link_property ___" data-text="Your room is not booked !"></p>
									 <hr class="bg-danger">
									 <span class="___" data-text="Week(s):"></span>
									 <span class="nav_link_property"> ${ contactForm.weeks.value }</span>
									   <hr class="bg-danger">
									 <a href = "#" class = "btn btn-sm bg_green text-light pl-3 pr-3 " id = "ok"
									       onclick = "swal.close()"
									       > ok </a >
							 </div>`,
							            showConfirmButton : false
						            } );
						
					}
			}
		
		
	}
