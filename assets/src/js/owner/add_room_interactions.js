import { translate }        from '../shared/translator/translator.js';
import { hash_login }       from "../shared/authorizations.js";
import { set_last_room_id } from "../shared/room_actions.js";
import { display_date }     from "../shared/getWeek.js";
import { add_payment_form } from "./add_room_payment_form.js"

import {
	autocomplete_searchables,
	address_keys
} from './../shared/inventory.js';
/* INTERACTIVE FEEDBACK TO USER WHEN GOING THROUGH
 * ADD_YOUR_ROOM FORM AND VALIDATION
 * LOGIC FOR THE FORM*/


// FIRST STEP OF THE FORM FOR USER IS TO FIND LOCATION OF THE PROPERTY
// ON THE MAP AND TYPE IN ROOM NAME, WHICH MUST BE AT LEAST 3 CHARACTERS LONG

// DISPLAYING STEP 2 => "room >>>" WHEN USER TYPES IN PROPERTY NAME
// THAT IS LONGER THEN 2 CHARACTERS
$ ( document ).on ( 'input', '#property_name', function ()
{
	
	var property_name = $ ( '#property_name' );
	var step_2        = $ ( '#step_2' );
	if ( !sessionStorage.getItem ( 'room_to_edit' ) || sessionStorage.getItem ( 'add_mode' ) )
		{
			if ( property_name.val ().length > 2 )
				{
					
					property_name.removeClass ( 'border-danger' );
					step_2.removeClass ( 'd-none' ).addClass ( 'no_border green' );
					if ( property_name.val ().length === 3 && !step_2.html ().includes ( '&nbsp;&gt;&gt;&gt;' ) )
						{
							
							step_2.append ( `&nbsp;>>>` );
						}
					
				}
			else
				{
					step_2.addClass ( 'd-none' );
					property_name.addClass ( 'border-danger' );
				}
		}
	
} );


/*WHEN USER CLICKS TAB TO:
 
 *   1.Select your room type
 *   2.Select the view type your room has
 *   3.Select image your room will be displayed as.
 *   4.Select the board basis you can provide for your guests
 *   5.Select the amenities you can provide for your guests
 *   6.Describe your room, make it attractive (min 30 - max 300 characters)
 *
 *TOGGLING CONTENT OF THE DIV WITH:
 *
 * 1. IMAGES TO SELECT
 * 2. IMAGES AND INPUT FIELD FOR PRICE WHEN SELECTING BOARDS
 * 3. TEXT AREA INPUT WHEN SELECTING TO ADD DESCRIPTION OF THE ROOM*/
$ ( document ).on ( "click", ".show_content", function ()
{
	/*EVERY TAB HAS data-hidden_class ATTRIBUTE BY WHICH
	 * WE KNOW WHICH DIV TO TOGGLE ON CLICK*/
	
	$ ( '.' + $ ( this ).data ( 'hidden_class' ) ).fadeToggle ( 700 ).toggleClass ( 'd-none' );
	
	/*SCROLLING TO CURRENT SELECTION*/
	$ ( $ ( this ) ).get ( 0 ).scrollIntoView ();
} );

/*WHEN USER CLICKS ON ANY IMAGE ON ROOM SECTION
 * IMAGE WILL ENLARGE / SHRINK*/
$ ( document ).on ( "click", ".form_image", function ()
{
	
	$ ( this ).parent ().toggleClass ( 'col-lg-2 col-md-3 col-sm-4 col-4' );
	
} );


/*WE WILL SHOW INPUT FIELD FOR THE PRICE OF THE BOARD ONLY WHEN
 * OWNER SELECTS PARTICULAR BOARD TYPE AND REMOVE IT
 * WHEN USER DESELECTS THIS BOARD
 *
 * ALSO WITH $ ( document ).on ( 'focusin', '.board_price', function (){})
 * WE ARE MONITORING LENGTH OF PRICE FIELD, AND IF IT IS price <= 0
 * WE ARE REMOVING PRICE INPUT ALSO LINE ~ 280 IN THIS FILE*/
$ ( document ).on ( "click", ".board_type", function ()
{
	
	var board_type  = $ ( this ).data ( 'board_type' );
	var board_div   = $ ( '#board_type_' + board_type );
	var board_price = $ ( '#board_price_' + board_type );
	
	if ( $ ( this ).is ( ":checked" ) )
		{
			
			board_div.append ( `<input
											title = "EUR"
											type = "number"
											name = "board_type_${ board_type }_price"
											id="board_price_${ board_type }"
											class="board_price col-md-9 ml-1 form-control"
											data-c_box_id="${ board_type }"
		                                    placeholder = "EUR">
                           

									` );
		}
	else if ( $ ( this ).is ( ":not(:checked)" ) )
		{
			
			board_price.remove ();
		}
	
} );


/*AFTER SELECTING RADIO BUTTONS UNDER :
 
 *   1.Select your room type
 *   2.Select the view type your room has
 *   3.Select image your room will be displayed as.
 *
 *   WE WILL UN-HIDE NEXT DIV TO REVEAL IMAGES TO SELECT
 *   AND HIDE CURRENTLY INTERACTED WITH DIV
 * */
$ ( document ).on ( "click", ".collapse_parent", function ()
{
	/* TABS HAVE data-parent_div , data-next_div ATTRIBUTES BY WHICH
	 * WE KNOW WHICH DIVS TO OPEN AND CLOSE ON CLICK*/
	var current_div = $ ( '.' + $ ( this ).data ( 'current_div' ) );
	var next_div    = $ ( '.' + $ ( this ).data ( 'next_div' ) );
	
	current_div.fadeOut ( 1000 ).addClass ( 'd-none' );
	next_div.fadeIn ( 1000 ).removeClass ( 'd-none' );
	
} );


(
	/*FUNCTION TO MANAGE INTERACTIVE FEEDBACK WHEN SELECTING IMAGES,
	 * TYPING IN BOARD PRICES, TYPING IN DESCRIPTION OF THE ROOM*/
	function ()
		{
			
			/*INITIAL VARIABLES THAT I AM USING TO DETERMINE WHETHER :
			 *
			 *  1.  TO DISPLAY NEXT STEPS ON THE FORM
			 *
			 *  2.  CHANGE ICON AND COLOR OF THE INDICATORS:
			 *
			 *      a.  completed =>    green CIRCLE WITH white CHECK MARK
			 *      b.  need attention => lightsalmon ... ;-) CIRCLE WITH white EXCLAMATION POINT
			 *         ->  WHEN OWNER SELECTS BOARD, BUT PRICE INPUT FIELD HAS NO PRICE YET
			 *      c.  not completed =>    red CIRCLE WITH white QUESTION MARK
			 *
			 *  */
			
			/*NUMBER OF BOARDS USER SELECTED*/
			var num_of_boards = 0;
			
			/*NUMBER OF AMENITIES OWNER SELECTED*/
			var num_of_amenities = 0;
			
			/*  VAR titles is ARRAY THAT WILL CONTAIN
			 *     titles[ 'room_type' ]  = 1; .....
			 *
			 *     WHEN USER COMPLETES THIS PART OF THE FORM
			 *     BY SELECTING IMAGES ON
			 *
			 *   1.Select your room type
			 *   2.Select the view type your room has
			 *   3.Select image your room will be displayed as.
			 *   ...
			 *
			 *   IF LENGTH >= 3  => USER HAS SELECTED room_type, view_type, room_style
			 *      =>  WE WILL DISPLAY NEXT STEP 3 => services >>> BUTTON
			 */
			var titles = [];
			
			/*NUMBER OF PRICES OWNER TYPED IN*/
			var num_of_prices = 0;
			
			/* TO INCREASE OR NOT TO INCREASE   num_of_boards AND num_of_prices
			 * WHEN INTERACTING WITH PRICE FIELD FOR THE BOARD*/
			var increment = true;
			
			/*IF WE HAVE USER WITH ROOM ALREADY, AND USER IS VIEWING OR EDITING ROOM => ROOM HAS ALL DETAILS SELECTED
			 * SO ALL INDICATORS WILL BE green CIRCLE WITH white CHECK MARK */
			if ( sessionStorage.getItem ( 'room_to_edit' )
			     && !sessionStorage.getItem ( 'add_mode' ) )
				{
					
					var room = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
					
					num_of_boards          = Object.keys ( room.price ).length;
					num_of_prices          = Object.keys ( room.price ).length;
					num_of_amenities       = room.amenities.length;
					titles[ 'room_type' ]  = 1;
					titles[ 'view_type' ]  = 1;
					titles[ 'room_style' ] = 1;
					titles[ 'board' ]      = 1;
					titles[ 'amenity' ]    = 1;
					
				}
			
			$ ( document ).on ( "click", ".check", function ()
			{
				/*INDICATORS TO THE USER WHETHER HE HAS COMPLETED THIS PARTICULAR
				 * PART OF THE FORM DISPLAYED NEXT TO :
				 *
				 *   1.Select your room type
				 *   2.Select the view type your room has
				 *   3.Select image your room will be displayed as.
				 *   4.Select the board basis you can provide for your guests
				 *   5.Select the amenities you can provide for your guests
				 *   6.Describe your room, make it attractive (min 30 - max 300 characters)*/
				var success = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_green' );
				var info    = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_red' );
				var warning = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_orange' );
				
				
				/*I AM CHANGING FOOTER COLOR OF SELECTED IMAGES TO bg_green WHEN SELECTED
				 * AND RETURNING BACK TO bg-secondary WHEN DESELECTED*/
				var footer = $ ( '#' + $ ( this ).data ( 'footer' ) );
				
				/*WHICH TYPE OF INPUT IT IS :
				 *   room_type, view_type, room_style, board, amenity, */
				var type = $ ( this ).data ( 'type' );
				
				if ( $ ( this ).is ( ":checked" ) )
					{
						
						/* IF USER SELECTS ANYTHING FROM THE SELECTION EXCEPT board, WE WILL GIVE HIM green INDICATOR TO CONTINUE.
						 * IF IT IS board TYPE, FIRST HE WILL SEE lightsalmon INDICATOR
						 * => HE NEEDS TO TYPE IN PRICE FOR THE BOARD TO GET green INDICATOR TO CONTINUE.*/
						if ( type === 'board' )
							{
								warning.removeClass ( 'd-none' );
								info.addClass ( 'd-none' );
								
							}
						else
							{
								
								success.removeClass ( 'd-none' );
								info.addClass ( 'd-none' );
							}
						
						//COLLECTING titles , USING IT FOR DISPLAYING 3RD STEP BUTTON
						titles[ type ] = 1;
						
						
						/*IMAGE CARD FOOTER CHANGED TO .bg_green text-light, EXCEPT IF IT IS BOARD,
						 BECAUSE USER  NEEDS TO ADD PRICE FOR THE BOARD,
						 .bg_orange IS APPLIED FIRST, AND WHEN HE ADDS PRICE , IT WILL
						 CHANGE TO .bg_green text-light_light AND WHEN HE DELETES PRICE , IT WILL RETURN TO
						 .bg_orange , AND WHEN USER DESELECTS BOARD, IT WILL BE CHANGED TO ORIGINAL .bg-secondary*/
						if ( type === 'board' )
							{
								footer.removeClass ( 'bg_green_dark' ).addClass ( 'bg_orange' );
								
								
								/*WHEN USER SELECTS BOARD FOR THE FIRST TIME WE WILL SET
								 * increment TO true, SO THEN LATER
								 * IN $ ( document ).on ( 'focusin', '.board_price', function ()
								 * WHEN IT IS TRUE WE WILL INCREMENT num_of_boards AND num_of_prices
								 *
								 * HOWEVER IF OWNER IS EDITING PRICE , PRICE IS THERE ALREADY
								 * => WE WILL SET IT TO false,  LINES ~ 360 IN THIS FILE
								 *   if ( $ ( this ).val () !== '' )
								 {
								 increment = false;
								 
								 }
								 * NOT TO INCREASE   num_of_boards AND num_of_prices TO
								 * HAVE CORRECT VALUES*/
								increment = true;
							}
						else
							{

//					IF WE HAVE ALREADY SELECTED ROOM  OPTIONS IT WILL HAVE bg_green text-light CLASS
//                  SO ON SECOND SELECT, WHEN USER IS CHANGING HIS SELECTION TO ANOTHER OPTION,
//					WE REMOVE bg_green text-light CLASS FROM PREVIOUSLY  SELECTED OPTION
//                  AND REPLACE IT WITH ORIGINAL bg-secondary text-light CLASS
								$ ( "." + type ).removeClass ( "bg_green text-light" ).addClass (
									'bg_green_dark text-light' );

//					AND CURRENTLY SELECTED OPTION WILL GET bg_green text-light CLASS
								footer.removeClass ( 'bg_green_dark' ).addClass ( 'bg_green text-light' );
							}
						
						
						/*COLLECTING NUMBER OF AMENITIES, BOARDS, PRICES WERE
						 SELECTED-DESELECTED,
						 WE WILL USE IT TO DETERMINE WHETHER TO DISPLAY / HIDE
						 STEP 4 =>  preview >>>
						 AND TO CHANGE COLOR OF FOOTER TO bg-secondary */
						if ( type === 'amenity' )
							{
								num_of_amenities++;
								
							}
						
						/*CHECK IF OWNER IS READY FOR STEP 4 => preview >>>*/
						is_ready_for_step_4 (
							num_of_prices, num_of_amenities, $ ( '#room_description' ).val ().length );
						
					}
				else if ( $ ( this ).is ( ":not(:checked)" ) )
					{
						
						if ( type === 'board' )
							{
								num_of_boards--;
								num_of_prices--;
								
							}
						if ( type === 'amenity' )
							{
								num_of_amenities--;
								
							}
						/*CHECK IF STEP 4 => preview >>> SHOULD BE HIDDEN*/
						is_ready_for_step_4 (
							num_of_prices, num_of_amenities, $ ( '#room_description' ).val ().length );
						
						//	IF ANY OF THE SERVICES CHECKBOXES WERE SELECTED (board_type, amenity),
						//	IMAGE CARD FOOTER WOULD HAVE
						// bg_green text-light_light CLASS APPLIED, SO THIS IS JUST TO CHANGE IT TO ORIGINAL STATE
						footer.removeClass ( 'bg_green text-light' ).addClass ( 'bg_green_dark text-light' );
						
						//	IF USER HAS DESELECTED ALL OF PREVIOUSLY SELECTED CHECKBOXES ( board_types and amenities)
						// , THIS IS TO REMOVE green INDICATOR AND TO REMOVE THIS TYPE FROM
//						titles ARRAY
						
						if ( (
							num_of_boards === 0 && type === 'board' ) )
							{
								
								warning.addClass ( 'd-none' );
								success.addClass ( 'd-none' );
								info.removeClass ( 'd-none' );
								titles.splice ( titles.indexOf ( type ), 1 );
								
							}
						
						if ( num_of_amenities === 0 && type === 'amenity' )
							{
								
								success.addClass ( 'd-none' );
								info.removeClass ( 'd-none' );
								titles.splice ( titles.indexOf ( type ), 1 );
								
							}
					}
				
				var num_of_titles = Object.keys ( titles ).length;
				
				/*   IF LENGTH >= 3  => USER HAS SELECTED room_type, view_type, room_style
				 *   =>  WE WILL DISPLAY NEXT STEP 3 => services >>> BUTTON
				 *      */
				var step_3 = $ ( '#step_3' );
				
				if ( num_of_titles >= 3 ) step_3.removeClass ( 'd-none' );
				
				if ( num_of_titles === 3 && !step_3.html ().includes ( '&nbsp;&gt;&gt;&gt;' ) ) step_3.append (
					`&nbsp;>>>` );
				
			} );
			
			////// THIS IS TO INCREMENT num_of_prices AND num_of_boards ONLY IF OWNER ADDS NEW BOARD
			///// AND NOT IF THE OWNER IS EDITING PRICE ANOTHER TIME, SO WE CHECK IF PRICE INPUT FIELD HAS
			//// ANY VALUE ON FOCUS IN , AND IF HAS increment WILL BE FALSE, OTHERWISE IT IS NEW BOARD AND
			//// increment STAYS true
			$ ( document ).on ( 'focusin', '.board_price', function ()
			              {
				
				              if ( $ ( this ).val () !== '' )
					              {
						              increment = false;
						
					              }
			              } )
			              /**/
			              .on ( 'input', '.board_price', function ()
			              {
				
				              var success = $ ( '#board_types_title_green' );
				              var warning = $ ( '#board_types_title_orange' );
				              var info    = $ ( '#board_types_title_red' );
				
				              /* ID OF CURRENTLY SELECTED PRICE INPUT FIELD*/
				              var check_box_id = $ ( this ).data ( 'c_box_id' );
				
				              /* PRICE THAT USER IS TYPING IN...*/
				              var price = $ ( this ).val ();
				
				              /* IF PRICE IS NUMBER > 0 WE WILL INCREMENT num_of_prices, num_of_boards*/
				              if ( price > 0 )
					              {
						
						              if ( increment )
							              {
								              num_of_prices++;
								              num_of_boards++;
								
								              /*SETTING increment TO false,  TO INCREASE VALUES ONLY ONCE PER INPUT*/
								              increment = false;
								
							              }
						
						              /*DISPLAYING green INDICATOR*/
						              warning.addClass ( 'd-none' );
						              info.addClass ( 'd-none' );
						              success.removeClass ( 'd-none' );
						
						              /*CHANGING COLOR OF FOOTER TO bg_green*/
						              $ ( '#board_type_' + check_box_id ).removeClass ( 'bg_orange bg_green_dark' )
						                                                 .addClass ( 'bg_green' );
						
						
					              }
				              else if ( price <= 0 )
					              {
						
						              if ( !increment )
							              {
								
								              num_of_prices--;
								              num_of_boards--;
								              increment = true;
							              }
//				PRICE DESELECTED =>   FOOTER GETS .bg-secondary CLASS APPLIED
						              $ ( '#board_type_' + check_box_id ).removeClass ( 'bg_green' ).addClass (
							              'bg_green_dark' );
						              $ ( '#board_' + check_box_id ).prop ( 'checked', false );
						              $ ( '#board_price_' + check_box_id ).remove ();
						
					              }
				              if ( num_of_prices <= 0 )
					              {
//				NO PRICES FOR THE BOARDS => ADDING INFO ICON
						              warning.addClass ( 'd-none' );
						              success.addClass ( 'd-none' );
						              info.removeClass ( 'd-none' );
						
						              increment = true;
					              }
				              /*CHECK IF STEP 4 => preview >>> SHOULD BE HIDDEN / SHOWN*/
				              is_ready_for_step_4 (
					              num_of_prices, num_of_amenities, $ ( '#room_description' ).val ().length );
				
			              } );
			
			
			/*		ROOM DESCRIPTION MUST BE AT LEAST 30 CHARACTERS LONG,
			 IF IT REACHES 30 CHARACTERS =>
			 1. CHANGING COLOR OF REMAINING CHARACTERS COUNTER TO.text-success
			 2. IF is_ready_for_step_4( num_of_prices, num_of_amenities, room_desc.val ().length)
			 DISPLAYING STEP 4 BUTTON
			 */
			$ ( document ).on ( 'input', '#room_description', function ()
			{
				
				var room_desc            = $ ( '#room_description' );
				var remaining_characters = 300 - room_desc.val ().length;
				var step_4               = $ ( '#step_4' );
				var success              = $ ( '#description_title_green' );
				var info                 = $ ( '#description_title_red' );
				
				if ( room_desc.val ().length <= 29 )
					{
						
						info.removeClass ( 'd-none' );
						success.addClass ( 'd-none' );
						step_4.addClass ( 'd-none' );
						$ ( '#room_description_length' ).removeClass ( 'text-success' ).addClass ( 'text-danger' )
						                                .html ( remaining_characters );
					}
				else
					{
						
						info.addClass ( 'd-none' );
						success.removeClass ( 'd-none' );
						$ ( '#room_description_length' ).removeClass ( 'text-danger' ).addClass ( 'text-success' )
						                                .html ( remaining_characters );
					}
				
				is_ready_for_step_4 ( num_of_prices, num_of_amenities, room_desc.val ().length );
				
			} );
			
		} ) ();


/*ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET, REMOVING STEP 4 & STEP 5 BUTTON OTHERWISE*/
function is_ready_for_step_4 ( num_of_prices, num_of_amenities, room_desc )
	{
		var step_4 = $ ( '#step_4' );
		if ( num_of_prices > 0 && num_of_amenities > 0 && room_desc > 29 )
			{
				step_4.removeClass ( 'd-none' );
				
				if ( !step_4.html ().includes ( '&nbsp;&gt;&gt;&gt;' ) )
					{
						step_4.append ( `&nbsp;>>>` );
					}
				
				return true;
			}
		else
			{
				step_4.addClass ( 'd-none' );
				$ ( '#step_5' ).addClass ( 'd-none' );
				return false;
				
			}
	}


//FORM PROGRESS (STEPS) BUTTONS APPEARANCE
(
	function ()
		{
			
			var step_names = [ 'location', 'room', 'services', 'preview', 'payment' ];
			
			/*  IF WE HAVE authorized_owner AND HE IS NOT ADDING NEW ROOM WE ARE :
			 *
			 *  1.   SHOWING STEPS (TABS) location,room,services,preview
			 *      BELLOW THE FORM => OWNER CAN PREVIEW THE ROOM,
			 *
			 * 2.   REMOVING PAYMENT BUTTON*/
			
			if ( sessionStorage.getItem ( 'authorized_owner' ) && !sessionStorage.getItem ( 'add_mode' ) )
				{
					
					$ ( '#location_details' ).html ( '' );
					$ ( '.step' ).removeClass ( 'd-none' );
					$ ( '#step_5' ).addClass ( 'd-none' );
					
				}
			
			/*BY CLICKING ON location,room,services,preview,payment steps*/
			$ ( document ).on ( 'click', '.step', function ()
			{
				
				$ ( "html, body" ).animate ( { scrollTop : 0 }, "slow" );

//			SETTING CURRENT PROGRESS STEP ON HOW-TO BUTTON =>
//			WHEN USER CLICKS ON HOW-TO BUTTON, WE'LL RETRIEVE CURRENT STEP AND
//			FIRE CORRESPONDING ALERT WITH DESCRIPTION ACCORDING
//			TO THE STEP  IN how_to_alert.js.
				$ ( '#how_alert' ).data ( 'step', $ ( this ).data ( 'step' ) );
				
				var step_id = $ ( this ).data ( 'step_id' );

//			PROGRESS STEP BAR ON THE TOP OF THE PAGE, CIRCLES WITH NUMBERS 1->5
//			AS USER PROGRESSES THROUGH THE FORM , CIRCLES WILL CHANGE COLOR FORM WHITE BG TO GREEN BG
				$ ( '#progress_step_' + step_id ).removeClass ( 'empty' );

//              WHEN OWNER IS IN add_mode AND PREVIEWING NEWLY CREATED ROOM, HE IS READY FOR PAYMENT, SO WE DISPLAY
// payment button
				if ( step_id === 4 && sessionStorage.getItem ( 'add_mode' ) ) $ ( '#step_5' ).removeClass ( 'd-none' );

//              WHEN OWNER IS IN  edit_mode AND WANTS TO BLOCK SOME WEEKS WE WILL DISPLAY pay_for_the_room button (
// text of the button will be update)
				if ( step_id === 4 && sessionStorage.getItem ( 'edit_mode' ) &&
				     window.location.pathname.includes ( 'owner.html' ) )
					{
						$ ( '#pay_for_the_room' ).removeClass ( 'd-none' );
						
					}

//              WHEN OWNER CLICKS ON location,room,services BUTTON, WE WILL REMOVE payment BUTTON,
//				BECAUSE HE COULD BE MAKING CHANGES FOR THE ROOM, AND IF HE DIDN'T CLICK ON PREVIEW
//				BUTTON, BUT STRAIGHT ON payment BUTTON, THE CHANGES WOULDN'T BE RECOGNIZED
//				BECAUSE, BY CLICKING ON preview BUTTON, WE ARE CREATING new_room OBJECT
//				FROM THE DATA IN THE FORM, AND WHEN OWNER DECIDES TO PAY,
//				WE ARE STORING new_room INTO localStorage
//				SO preview BUTTON HAS SAVE YOUR CHANGES FUNCTIONALITY
				else if ( step_id < 4 )
					{
						$ ( '#step_5' ).addClass ( 'd-none' );

//				SAME GOES FOR EDITING ROOM
						$ ( '#pay_for_the_room' ).addClass ( 'd-none' );
					}

//			RENDERING PAYMENT FORM WHEN OWNER CLICK ON PAYMENT BUTTON
				if ( step_id === 5 )
					{
						add_payment_form ();
						
					}

//			LOGGED IN OWNER'S ROOM DATA
				var room = !sessionStorage.getItem ( 'room_to_edit' ) ? null : JSON.parse (
					sessionStorage.getItem ( 'room_to_edit' ) );
				
				if ( room )
					{
//				RENDERING ROOM DESCRIPTION
						$ ( '#room_description' ).html ( room.p_description );
					}
				
				///ADDING NEW ROOM
				if ( sessionStorage.getItem ( 'add_mode' ) )
					{
						
						var next_step = $ ( '#step_' + ( step_id + 1 ) );

//				CHANGING APPEARANCE OF THE location,room,services,preview,payment STEPS
//				DEPENDING ON WHICH ONE WAS CURRENTLY CLICKED
						
						next_step.html ( step_names[ step_id ] ).addClass ( 'no_border green' );
						$ ( this ).html ( step_names[ step_id - 1 ] ).removeClass ( 'no_border green' );
						
						
					}
				
			} );
			
		} ) ();


/*UPDATING THE ROOM AFTER OWNER EDITED ROOM*/
function update ()
	{
		
		var new_room = JSON.parse ( sessionStorage.getItem ( 'new_room' ) );
		
		/*DATE OF UPDATE*/
		new_room[ 'updated_at' ] = display_date;
		
		/*CHECK AUTOCOMPLETE ARRAY, ADD NEW LOCATIONS IF new_room HAS DIFFERENT LOCATIONS*/
		check_autocomplete ( new_room );
		
		/*SETTING update TO true, SO THE store_room FUNCTION WILL UPDATE EXISTING ROOM*/
		store_room ( new_room, true );
		
	}


/*WHEN USER CLICK ON button with #pay_for_the_room ID , THE BUTTON CAN HAVE
 * TWO DIFFERENT texts :
 *   1.  Pay
 *   2.  Update
 *
 *   IF WE HAVE sessionStorage.getItem ( 'edit_mode' ) && sessionStorage.getItem ( 'authorized_owner' )
 *   WE WILL UPDATE ROOM
 *
 *   OTHERWISE WE WILL ADD NEWLY CREATED ROOM INTO ROOMS OBJECT INTO localStorage*/
$ ( document ).on ( 'click', '#pay_for_the_room', function ()
{
	
	var new_room = JSON.parse ( sessionStorage.getItem ( 'new_room' ) );
	
	/*OWNER IS UPDATING EXISTING ROOM*/
	if ( sessionStorage.getItem ( 'edit_mode' ) && sessionStorage.getItem ( 'authorized_owner' ) )
		{
			update ();
		}
	/*OWNER IS ADDING NEW ROOM*/
	else
		{
			
			swal.fire({
				html:`<img src="assets/src/images/loader.gif" alt="loader">`,
				showConfirmButton:false
			          });
			
			/*OWNER DETAILS FROM PAYMENT FORM*/
			var owner_details       = $ ( "#add_room_payment_form" ).serialize ();
			var owner_details_array = owner_details.split ( '&' );
			var missing_values      = '';
			
			$.each ( owner_details_array, function ( index, value )
			{
				
				var split_value = decodeURIComponent ( value ).split ( '=' );
				
				////checking form fields
				
				/// if already logged in owner, no email and password
				
				/*IF WE HAVE EMPTY FIELDS IN THE FORM, WE WILL FIND THEM AND COLLECT THEM IN missing_values*/
				if ( split_value[ 1 ].replace ( / /g, "" ) === '' || split_value[ 0 ] === 'email_of_user'
				     && !split_value[ 1 ].includes ( '@' ) )
					{
						missing_values += ` ${ split_value[ 0 ].replace ( /_/g, " " ) }<br> `;
					}
				
				/*OWNER DETAILS FROM THE PAYMENT FORM*/
				owner_details_array[ split_value[ 0 ] ] = split_value[ 1 ];
				
			} );

//		IF ANY OF THE FIELDS ARE MISSING, WE'LL FIRE ALERT WITH MISSING FIELDS
			if ( missing_values.length > 0 )
				{
					swal.fire ( {
						            html : `<h3>Please review these fields:</h3>` + missing_values
					            } );
					return false;
				}
			
			//// RECENTLY CREATED ROOM TO BE ADDED TO "DB"...
			
			/* ARRAY OF AUTO COMPLETE LOCATION NAMES, AUTO-UPDATING WITH EVERY NEW LOCATION,STORED IN localStorage*/
			check_autocomplete ( new_room );
			
			/*SETTING COORDINATES FOR POPUP TO OPEN AFTER ADDING new_room INTO ROOMS OBJECT IN localStorage
			 * AND REDIRECTING TO index.html*/
			sessionStorage.setItem ( 'new_p_id', new_room.p_id );
			sessionStorage.setItem ( 'lng', new_room.lng );
			sessionStorage.setItem ( 'lat', new_room.lat );
			
			
			/*IF WE HAVE SOME OWNERS IN localStorage WE'LL RETRIEVE IT*/
			if ( localStorage.getItem ( 'OWNERS' ) )
				{
					var current_owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
					
				}
			
			/*OTHERWISE WE WILL CREATE NEW EMPTY current_owners OBJECT
			 * TO ADD FIRST OWNER ON THE SITE TO localStorage*/
			else
				{
					current_owners = {};
					
				}
			
			
			/*var room_ids HOLDS IDS OF ALL OWNER ROOMS,
			 
			 * SO WHEN WE HAVE authorized_owner, WE WILL :
			 *
			 *   1. RETRIEVE authorized_owner FROM sessionStorage
			 *   2. RETRIEVE hashed_login FROM sessionStorage
			 *          WHICH ARE SET AFTER SUCCESSFUL LOGIN IN authorization.js
			 *  3. SET room_ids = authorized_owner.room_ids
			 *  4. AND THEN PUSH CURRENT room ID TO room_ids
			 *  5. UPDATE CURRENT OWNER OBJECT
			 *  5. RETRIEVE OWNERS OBJECT FROM localStorage
			 *      IF EXISTS, OR CREATE NEW
			 *   6. AND THEN UPDATE CURRENT OWNER IN OWNERS FROM localStorage
			 *
			 *
			 *   7. STORE / UPDATE ROOM IN ROOMS IN localStorage
			 *
			 *
			 * OTHERWISE ( NEW OWNER AND NEW ROOM ) WE WILL :
			 *   1. WE WILL CREATE hashed_login FROM FORM DETAILS AND SET IT TO sessionStorage
			 *   2. WE WILL PUSH CURRENT room ID INTO room_ids
			 *   3. CREATE NEW OWNER OBJECT
			 *   4. MERGE NEW OWNER WITH OWNERS IN localStorage
			 *   4. UPDATE CURRENT OWNER IN OWNERS FROM localStorage
			 *
			 *
			 *   5. STORE ROOM IN ROOMS IN localStorage*/
			var room_ids = [];
			
			
			if ( sessionStorage.getItem ( 'authorized_owner' ) )
				{
					var hashed_login = sessionStorage.getItem ( 'hashed_login' );

//			CURRENTLY LOGGED IN OWNER ADDING NEW ROOM
					var authorized_owner = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) );

//			ADDING NEWLY CREATED ROOM'S ID  new_room.p_id INTO OWNER room_ids ARRAY
					room_ids = authorized_owner.room_ids;
					room_ids.push ( new_room.p_id );
					
					authorized_owner.room_ids = room_ids;

//			SETTING MOST RECENT ROOM ID AS room_id => SO WHENEVER OWNER LOGS IN INTO HIS ACCOUNT
//          AND IF HE HAS MORE THEN 1 ROOM
//          LAST ROOM HE INTERACTED WITH BEFORE LOGOUT WILL BE FIRST ROOM TO SEE AFTER SUCCESSFUL LOGIN.
					authorized_owner.room_id = new_room.p_id;

//			UPDATING OWNER WITH NEW ROOM
					var new_owner = {
						[ hashed_login ] : authorized_owner
					};

//			UPDATING OWNERS WITH NEW OWNER
					current_owners                 = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
					current_owners[ hashed_login ] = authorized_owner;
					localStorage.setItem ( 'OWNERS', JSON.stringify ( current_owners ) );
					
					sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( authorized_owner ) );
					
				}
			else
				{
//			NEW USER ADDING NEW ROOM
					var login    = owner_details_array.email_of_user + owner_details_array.password;
					hashed_login = hash_login ( login );
					
					room_ids.push ( new_room.p_id );

//	        HASHING LOGIN DETAILS, WILL USE SAME HASH TO RETRIEVE OWNER
					new_owner = {
						[ hashed_login ] : {
							'name'       : owner_details_array.name,
							'email'      : owner_details_array.email_of_user,
							'room_ids'   : room_ids,
							'room_id'    : new_room.p_id,
							'updated_at' : display_date,
							'created_at' : display_date
						}
					};
					sessionStorage.setItem ( 'hashed_login', hashed_login );
					
				}

//	MERGING CURRENT OWNERS WITH NEW OWNER
			let owners = { ... current_owners, ... new_owner };

//	UPDATING OWNERS
			localStorage.setItem ( 'OWNERS', JSON.stringify ( owners ) );
			
			store_room ( new_room );
		}
} );


/*ARRAY OF LOCATION NAMES, AUTO-UPDATING WITH EVERY NEW LOCATION*/
function check_autocomplete ( new_room )
	{

//  ARRAY OF LOCATION NAMES, AUTO-UPDATING WITH EVERY NEW LOCATION, SO WHEN USER SEARCHES FOR LOCATION IN
// SEARCH FORM ON index.html , IF THE LOCATION IS IN THIS ARRAY, IT WILL SHOW ON AUTO-COMPLETE


		
		//// USING address_keys AS FILTER TO GET STRINGS  FOR AUTO-COMPLETE ( EX. 'city','country','village','town')
		// FROM ADDRESS PROVIDED BY nominium, OMITTING KEYS LIKE (lat,lng, road....)
		

		var new_locations   = false;
		
		$.each ( new_room.p_address, function ( key, value )
		{
//		CHECK IF WE ARE USING KEY FOR AUTO-COMPLETE AND IF WE ALREADY HAVE IT IN  autocomplete_searchables ARRAY
			if ( address_keys.indexOf ( key ) !== -1 && autocomplete_searchables.indexOf ( value ) === -1 )
				{
					
					$.each ( value.split ( ' ' ), function ( index, string )
					{
//				IF LOCATION CONSISTS OF MORE THEN 1 WORD WE'LL SPLIT IT AND USE EACH PART +
						if ( autocomplete_searchables.indexOf ( string ) === -1 && value.split ( ' ' ).length > 1 )
							{
								autocomplete_searchables.push ( decodeURI ( string ) );
							}
						
					} );
					//			+	FULL LOCATION NAME
					if ( autocomplete_searchables.indexOf ( value ) === -1 )
						{
							autocomplete_searchables.push ( decodeURI ( value ) );
						}
					
					new_locations = true;
				}
			
		} );

//let unique = [ ...new Set ( all ) ];  TO GET UNIQUE ARRAY
		
		//// UPDATING autocomplete_searchables IF NEW VALUES
		if ( new_locations ) localStorage.setItem (
			'autocomplete_searchables', JSON.stringify ( autocomplete_searchables ) );
	}


function store_room ( new_room, update = false )
	{
		
		var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
		
		/*IF OWNER IS EDITING EXISTING ROOM WE WILL UPDATE HIS ROOM IN ROOMS OBJECT IN localStorage*/
		if ( update )
			{

//// UPDATING EXISTING ROOM
				ROOMS[ new_room.p_id ] = new_room;
				
			}
		
		/*IF OWNER IS CREATING NEW ROOM WE WILL PUSH HIS ROOM IN ROOMS OBJECT IN localStorage*/
		else
			{
////ADDING NEW ROOM
				new_room.owner_id = sessionStorage.hashed_login;
				
				ROOMS.push ( new_room );
				
				
			}
		
//	UPDATING ROOMS IN localStorage
		localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );

//	new_room IS STORED, SO REMOVING IT FROM SESSION AND SETTING IT AS room_to_edit IN SESSION
		sessionStorage.removeItem ( 'new_room' );
		sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( new_room ) );
		
		/*SETTING NEWLY CREATED ROOM'S ID AS ID OF LASTLY INTERACTED ROOM WITH
		 * SO IF OWNER HAS MORE THEN ONE ROOM, AND IF HE LOGS OUT RIGHT
		 * AFTER ADDING THIS ROOM,
		 * LATER WHEN HE LOGS IN, HE WILL SEE THIS ROOM AS CURRENT ROOM*/
		set_last_room_id ();

//	SETTING NEW OWNER AS authorized_owner
		var owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
		var owner  = owners[ sessionStorage.hashed_login ];
		sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
		
		//	AFTER STORING / UPDATING ROOM WE SET  preview_mode AS TRUE
		sessionStorage.setItem ( 'preview_mode', true );
		
		/*REMOVING PREVIOUSLY SET MODES*/
		sessionStorage.removeItem ( 'edit_mode' );
		sessionStorage.removeItem ( 'add_mode' );
		
		
		/*ADMIN WILL BE NOTIFIED, WHEN NEW ROOM IS ADDED TO THE SITE*/
		if ( !update )
			{
				send_email_to_admin ( new_room, owner );
			}
		else{
			
			//	IF OWNER IS  EDITING  ROOM WE WILL REDIRECT TO owner.html
			location.replace ( `owner.html` );
		}
	}


/*WHEN USER CLICKS ON FORM STEPS - TABS ( location, room, services, preview, payment )
 WE NEED TO TRANSLATE  steps
 THAT IS BEING INTRODUCED TO THE VIEW,
 */
$ ( document ).on ( 'click', '.step', function ()
{
	translate ();
	
} );

/*ADMIN WILL BE NOTIFIED BY EMAIL, WHEN NEW ROOM IS ADDED TO THE SITE*/
function send_email_to_admin ( new_room, owner )
	{
		location.replace ( `index.html` );
//		emailjs.send ( "gmail", "template_pDNgSwG0", {
//			       "name"      : owner.name,
//			       "email"     : owner.email,
//			       "room_name" : new_room.p_address.property_name,
//			       "location"  : new_room.location,
//			       "added_at"  : new_room.created_at
//
//		       } )
//		       .then (
//			       function ( response )
//			       {
//				       console.log ( "SUCCESS", response );
//
//				       //	IF OWNER IS  ADDING NEW ROOM SO WE WILL REDIRECT TO index.html
//				       // TO SHOW ROOM ON THE MAP WITH MARKER AND POPUP
//				       location.replace ( `index.html` );
//
//
//			       },
//			       function ( error )
//			       {
//				       console.log ( "FAILED", error );
//
//			       }
//		       );
//		return false;  // To block from loading a new page
	}
