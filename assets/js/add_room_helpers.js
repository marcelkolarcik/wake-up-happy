//toggling content of the div ( particular part of the form room_types,board_types,views,amenities_list,room_style )
$ ( document ).on ( "click", ".show_content", function () {
	
	var hidden_class = $ ( this ).data ( 'hidden_class' );
	
	$ ( '.' + hidden_class ).toggleClass ( 'd-none' );
} );

//toggling size of images on form
$ ( document ).on ( "click", ".form_image", function () {
	
	$ ( this ).parent ().toggleClass ( 'col-lg-2 col-md-3 col-sm-4 col-4' );
	
} );

// showing input for board price only when user selects board. removing input when user deselects board
$ ( document ).on ( "click", ".board_type", function () {
	
	var board_type = $ ( this ).data ( 'board_type' );
	var board_div = $ ( '#board_type_' + board_type );
	var board_price = $ ( '#board_price_' + board_type );
	
	if ( $ ( this ).is ( ":checked" ) ) {
		
		board_div.append ( `<input  title = "price"
									type = "number"
									name = "board_type_${board_type}_price"
									id="board_price_${board_type}"
									class="board_price col-md-9 ml-1 form-control "
									data-c_box_id="${board_type}"
                                    placeholder = "price"
                                    value="">
                           ` );
	}
	else if ( $ ( this ).is ( ":not(:checked)" ) ) {
		
		board_price.remove ();
	}
	
} );

// after selecting radio buttons : room_type, view_type, room_style, this function will collapse parent div, add color
// feedback to user that it is selected already, and it will un-hide next div for selection
$ ( document ).on ( "click", ".collapse_parent", function () {
	
	var parent_div = $ ( '.' + $ ( this ).data ( 'parent_div' ) );
	var next_div = $ ( '.' + $ ( this ).data ( 'next_div' ) );
	
	
	parent_div.addClass ( 'd-none' );
	next_div.removeClass ( 'd-none' );

	
} );

(
	function () {

//	FUNCTION TO GIVE USER INTERACTIVE FEEDBACK WHEN GOING THROUGH THE ADD ROOM FORM
		
		var num_of_boards = 0;
		var num_of_amenities = 0;
		var titles = [];
		var num_of_prices = 0;

//		IF WE HAVE USER WITH ROOM ALREADY, AND USER IS VIEWING OR EDITING ROOM => ROOM HAS ALL DETAILS SELECTED
		
		if ( (
		     sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' && sessionStorage.getItem ( 'room_to_edit' ) !== null )
		     && !sessionStorage.getItem ( 'add_mode' ) ) {
			
			room = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
			
			num_of_boards = Object.keys ( room.price ).length;
			num_of_prices = Object.keys ( room.price ).length;
			num_of_amenities = room.amenities.length;
			titles[ 'room_type' ] = 1;
			titles[ 'view_type' ] = 1;
			titles[ 'room_style' ] = 1;
			titles[ 'board' ] = 1;
			titles[ 'amenity' ] = 1;
			
		}
		
		$ ( document ).on ( "click", ".check", function () {
			
			var success = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_green' );
			var info = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_blue' );
			var warning = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_orange' );
			var footer = $ ( '#' + $ ( this ).data ( 'footer' ) );
			var type = $ ( this ).data ( 'type' );
			
			if ( $ ( this ).is ( ":checked" ) ) {

//				IF USER SELECTS ANYTHING FROM THE SELECTION EXCEPT board, WE WILL GIVE HIM GREEN LIGHT TO CONTINUE
				// IF IT IS board TYPE, HE NEEDS TO TYPE IN PRICE FOR THE BOARD TO GET GREEN LIGHT
				if ( type === 'board' ) {
					warning.removeClass ( 'd-none' );
					info.addClass ( 'd-none' );
					
				}
				else {
					
					success.removeClass ( 'd-none' );
					info.addClass ( 'd-none' );
				}
				
				//COLLECTING titles , USING IT FOR DISPLAYING 3RD STEP BUTTON
				titles[ type ] = 1;
				
				/// IMAGE CARD FOOTER CHANGED TO .bg_green text-light, EXCEPT IF IT IS BOARD, BECAUSE USER NEEDS
				// TO ADD PRICE FOR THE BOARD, .bg_orange IS APPLIED FIRST, AND WHEN HE ADDS PRICE , IT WILL CHANGE TO
				// .bg_green text-light_light AND WHEN HE DELETES PRICE , IT WILL RETURN TO .bg_orange , AND WHEN USER
				// DESELECTS BOARD, IT WILL BE CHANGED TO ORIGINAL .bg-secondary
				if ( type === 'board' ) {
					footer.removeClass ( 'bg-secondary' ).addClass ( 'bg_orange' );
					
//					NEW BOARD => WHEN INPUTTING NEW PRICE num_of_prices WILL INCREMENT
					increment = true;
				}
				else {
//					IF WE HAVE ALREADY SELECTED ROOM  OPTIONS IT WILL HAVE bg_green text-light CLASS
//                  SO ON SECOND SELECT, WHEN USER IS CHANGING HIS SELECTION TO ANOTHER OPTION,
//					WE REMOVE bg_green text-light CLASS FROM PREVIOUSLY  SELECTED OPTION
//                  AND REPLACE IT WITH ORIGINAL bg-secondary text-light CLASS
					$ ( "." + type ).removeClass ( "bg_green text-light" ).addClass ( 'bg-secondary text-light' );
					
					
//					AND CURRENTLY SELECTED OPTION WILL GET bg_green text-light CLASS
					footer.removeClass ( 'bg-secondary' ).addClass ( 'bg_green text-light' );
				}
				
				//CALCULATING HOW MANY CHECKBOXES  num_of_amenities AND num_of_boards AND num_of_prices WERE
				// SELECTED-DESELECTED, NEEDED LATER IF USER DESELECTS ALL OF THEM , TO RETURN COLOR TO ORIGINAL STATE
				
				if ( type === 'amenity' ) {
					num_of_amenities++;
					
				}
				
				
				is_ready_for_step_4 ( num_of_prices, num_of_amenities, $ ( '#room_description' ).val ().length );
				
			}
			else if ( $ ( this ).is ( ":not(:checked)" ) ) {
				
				if ( type === 'board' ) {
					num_of_boards--;
					num_of_prices--;
					
				}
				if ( type === 'amenity' ) {
					num_of_amenities--;
					
				}
				
				is_ready_for_step_4 ( num_of_prices, num_of_amenities, $ ( '#room_description' ).val ().length );
				
				//	IF ANY OF THE SERVICES  CHECKBOXES WERE SELECTED, IMAGE CARD FOOTER WOULD HAVE
				// bg_green text-light_light CLASS APPLIED, SO THIS IS JUST TO RETURN IT TO ORIGINAL STATE
				footer.removeClass ( 'bg_green text-light' ).addClass ( 'bg-secondary text-light' );
				
				//	IF USER HAS DESELECTED ALL OF PREVIOUSLY SELECTED CHECKBOXES ( board_types and amenities) , THIS
				// IS TO REMOVE GREEN LIGHT
				
				if ( (num_of_boards === 0 && type === 'board' ) ) {
					
					warning.addClass ( 'd-none' );
					success.addClass ( 'd-none' );
					info.removeClass ( 'd-none' );
					titles.splice ( titles.indexOf ( type ), 1 );
					
				}
				
				if ( num_of_amenities === 0 && type === 'amenity' ) {
					
					success.addClass ( 'd-none' );
					info.removeClass ( 'd-none' );
					titles.splice ( titles.indexOf ( type ), 1 );
					
				}
			}
			
			var num_of_titles = Object.keys ( titles ).length;
			
			/// IF FIRST 3 PARTS OF THE FORM ARE FILLED CORRECTLY  num_of_titles === 3 AND THIS IS TO LET USER CAN
			// CONTINUE / WITH THE FORM BY DISPLAYING NEXT STEP BUTTON
			
			if ( num_of_titles > 2 ) $ ( '#step_3' ).removeClass ( 'd-none' );
			
		} );
		
		////// THIS IS TO INCREMENT num_of_prices AND num_of_boards ONLY IF IT IS NEW BOARD
		///// AND NOT IF THE USER IS EDITING PRICE ANOTHER TIME, SO WE CHECK IF PRICE INPUT FIELD HAS
		//// ANY VALUE ON FOCUS IN , AND IF HAS increment WILL BE FALSE, OTHERWISE IT IS NEW BOARD AND
		//// increment STAYS true
		var increment = true;
		
		$ ( document ).on ( 'focusin', '.board_price', function () {
			
			if ( $ ( this ).val () !== '' ) {
				increment = false;
				
			}
		} ).on ( 'input', '.board_price', function () {
			
			var success = $ ( '#board_types_title_green' );
			var warning = $ ( '#board_types_title_orange' );
			var info = $ ( '#board_types_title_blue' );
			var check_box_id = $ ( this ).data ( 'c_box_id' );
			
			var price = $ ( this ).val ();
			
			if ( price > 0 ) {
				
				if ( increment ) {
					num_of_prices++;
					num_of_boards++;
					increment = false;
					
				}
				
//				BOARD SELECTED WITH PRICE => SUCCESS  FOOTER GETS .bg_green CLASS APPLIED
				warning.addClass ( 'd-none' );
				info.addClass ( 'd-none' );
				success.removeClass ( 'd-none' );
				
				$ ( '#board_type_' + check_box_id ).removeClass ( 'bg_orange bg-secondary' ).addClass ( 'bg_green' );
				
			}
			else if ( price <= 0 ) {
				
				if ( !increment ) {
					
					num_of_prices--;
					num_of_boards--;
					increment = true;
				}
//				PRICE DESELECTED =>   FOOTER GETS .bg-secondary CLASS APPLIED
				$ ( '#board_type_' + check_box_id ).removeClass ( 'bg_green' ).addClass ( 'bg-secondary' );
				$ ( '#board_' + check_box_id ).prop ( 'checked', false );
				$ ( '#board_price_' + check_box_id ).remove ();
				
			}
			if ( num_of_prices <= 0 ) {
//				NO PRICES FOR THE BOARDS => ADDING INFO ICON
				warning.addClass ( 'd-none' );
				success.addClass ( 'd-none' );
				info.removeClass ( 'd-none' );
				
				increment = true;
			}
			is_ready_for_step_4 ( num_of_prices, num_of_amenities, $ ( '#room_description' ).val ().length );
			
		} );
		
		$ ( document ).on ( 'input', '#room_description', function () {
			
			var room_desc = $ ( '#room_description' );
			var remaining_characters = 300 - room_desc.val ().length;
			var step_4 = $ ( '#step_4' );
			var success = $ ( '#description_title_green' );
			var info = $ ( '#description_title_blue' );
			
			if ( room_desc.val ().length <= 29 ) {
				
				info.removeClass ( 'd-none' );
				success.addClass ( 'd-none' );
				step_4.addClass ( 'd-none' );
				$ ( '#room_description_length' ).removeClass('text-success').addClass ( 'text-danger' ).html ( remaining_characters );
			}
			else {
				
				info.addClass ( 'd-none' );
				success.removeClass ( 'd-none' );
				$ ( '#room_description_length' ).removeClass('text-danger').addClass ( 'text-success' ).html ( remaining_characters );
			}
			
		
			
			
			
			is_ready_for_step_4 ( num_of_prices, num_of_amenities, room_desc.val ().length );
			
		} );
		
	} ) ();

// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET, REMOVING STEP 4 & STEP 5 BUTTON OTHERWISE
function is_ready_for_step_4 ( num_of_prices, num_of_amenities, room_desc ) {
	if ( num_of_prices > 0 && num_of_amenities > 0 && room_desc > 29 ) {
		$ ( '#step_4' ).removeClass ( 'd-none' );
		sessionStorage.setItem ( 'ready_for_step_4', true );
		return true;
	}
	else {
		$ ( '#step_4' ).addClass ( 'd-none' );
		$ ( '#step_5' ).addClass ( 'd-none' );
		sessionStorage.setItem ( 'ready_for_step_4', false );
	}
}


//FORM PROGRESS (STEPS) BUTTONS
(
	function () {
		
		//// DISPLAYING STEP 2 WHEN USER TYPES IN PROPERTY NAME
		$ ( document ).on ( 'input', '#property_name', function () {
			
			var property_name = $ ( '#property_name' );
			var step_2 = $ ( '#step_2' );
			if ( !sessionStorage.getItem ( 'room_to_edit' ) || sessionStorage.getItem ( 'add_mode' ) ) {
				if ( property_name.val ().length > 2 ) {
					
					property_name.removeClass ( 'border-danger' );
					step_2.removeClass ( 'd-none' );
					step_2.html ( 'room&nbsp;>>>' ).addClass ( 'no_border green' );
				}
				else {
					step_2.addClass ( 'd-none' );
					property_name.addClass ( 'border-danger' );
				}
			}
			
		} );
		
		var steps = [];
		var step_names = [ 'location', 'room', 'services', 'preview', 'payment' ];
		
		var step_desc = [
			`
                    <span class="nav_link">How to:</span>
              Find location of your property on the map and then click the map to display coordinates.
              Then click on
                <button class = "bg_orange" >get details</button >
                button, to display location details.
                 <span class = "bg-danger text-light  p-1" >
                Remember to add your property name! (min 3 characters) to be able to continue to next step.</span >
                You can correct these details.
                Once you're happy with the location details, click on
                   <span class="green">room&nbsp;>>></span> `,
			
			`<span class="nav_link">How to:</span>Define your room by selecting appropriate radio buttons. Once all options are selected
	<span class="green">services&nbsp;>>></span> will appear and you can progress to next step.

		
			    `,
			`<span class="nav_link">How to:</span>Define your services by selecting appropriate check buttons.
	<span class = "bg-danger text-light  p-1" > When selecting board type,
		you must enter price for the board.</span>
 		You can select multiple options.
 
 		When at least one of each options are selected and description is entered
	<span class="green">preview&nbsp;>>></span> will appear and you can progress to next step.
	<span class = "bg-danger text-light  p-1" >Description of the room must be at least 30 characters!</span>

		`,
			`<span class="nav_link">How to:</span>Preview your work of art, by clicking on the tabs
   <span class="nav_link_property"> ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK.</span>
  Once you
are happy with your work, you can click on
	<span class="green">payment&nbsp;>>></span> proceed with payment.

		`,
			`<span class="nav_link">How to:</span>Here you can proceed with payment. Thank you for choosing <b>wake up happy!</b>`
			,
			`<span class="nav_link">How to:</span>Edit your room to your liking and when you are
 ready to save it, click on <span class="img-thumbnail">preview</span> button, and then on
 
 		<a  class = "btn btn-sm m-0 bg_orange horizontally_aligned right-block "
                    title = "Save your changes" >
                Save your changes
            </a >`
			,
			`<span class="nav_link">How to:</span>You are previewing your room , if you would
like to edit it, click on <button class = " no_padding bg-secondary text-light " ><i class="far fa-edit"></i> Edit</button > button`
			
			,
			`<span class="nav_link">How to:</span>If you want to block some dates click on
  <button class = " no_padding bg-secondary text-light " ><i class="far fa-edit"></i> Edit</button > above, then click on
               <span class="img-thumbnail">preview</span >, then click on <strong class="nav_link_property">AVAILABILITY</strong>
                button. `
		];
		var room_actions = $ ( '#room_actions' );
		var how_to = $ ( '#how_to' );
		
		append_room_actions ( room_actions );
		
		// PUBLIC USER ADDING ROOM
		if ( window.location.pathname === '/owner.html' && !sessionStorage.getItem('authorized_user')) {
			
			how_to.html ( `${step_desc[ 0 ]}` );
		
			
		}
		// LOGGED IN USER EDITING ROOM
		if ( sessionStorage.getItem ( 'edit_mode' ) ) how_to.html ( `${step_desc[ 5 ]}` );
		// LOGGED IN USER PREVIEWING ROOM
		if ( sessionStorage.getItem ( 'preview_mode' )  ) {
			if ( (
				sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' && sessionStorage.getItem ( 'room_to_edit' ) !== null ) )
				how_to.html ( `${step_desc[ 6 ]}` );
			
		}
		// LOGGED IN USER ADDING ROOM
		if ( sessionStorage.getItem ( 'add_mode' )  ) how_to.html ( `${step_desc[ 0 ]}` );
		// LOGGED IN USER BLOCKING DATES
		if ( sessionStorage.getItem ( 'block_mode' ) ) {
			how_to.html ( `${step_desc[ 7 ]}` );
			$ ( '#steps' ).html ( '' );
		}

//		location,room,services,preview,payment steps
//		ADDING HOW-TO DESCRIPTION FOR EACH STEP , DEPENDING ON STEP CLICKED
		$ ( document ).on ( 'click', '.step', function () {
			
			var step = $ ( this ).data ( 'step' );
			if ( (
				!sessionStorage.getItem ( 'edit_mode' ) && !sessionStorage.getItem ( 'preview_mode' ) ) ) {
				how_to.html ( `${step_desc[ step - 1 ]}` );
			}
//			PREVIEWING OR EDITING NEW ROOM
			if ( (
				sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'preview_mode' ) ) ) {
				
				remove_white_space_from_description ();
				
				$ ( '#progress_step_' + step ).removeClass ( 'empty' );
				if ( step === 4 ) {
					
					$ ( '#progress_step_5' ).removeClass ( 'empty' );
					
				}
//			LOGGED IN OWNER'S ROOM DATA
				var room = !sessionStorage.getItem ( 'room_to_edit' ) ? null : JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
				
				if ( room ) {
					
					room_description.html ( room.p_description );
				}
				
				if ( step === 5 ) {
					add_room_payment_form ();
					
				}
			}
//			ADDING NEW ROOM
			else {
				var next_step = $ ( '#step_' + (
				                    step + 1 ) );
				
				steps.push ( step );
				
//			PROGRESS STEP BAR ON THE TOP OF THE PAGE, CIRCLES WITH NUMBERS 1->5
//				WHEN USER CLICKS ON THE STEP , CIRCLE WILL CHANGE COLOR TO GREEN
				$ ( '#progress_step_' + step ).removeClass ( 'empty' );
				
				
				if ( step ) {
					
					next_step.html ( step_names[ step ] + '&nbsp;>>>' ).addClass ( 'no_border green' );
					$ ( this ).html ( step_names[ step - 1 ] ).removeClass ( 'no_border green' );
					
				}
				//		ADDING HOW-TO DESCRIPTION FOR EACH STEP , DEPENDING ON STEP CLICKED
				if ( sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname === '/owner.html' ) {
					how_to.html ( `${step_desc[ step - 1 ]}` );
				}
				
				if ( step === 2 ) {
					
					$ ( '#step_1' ).removeClass ( 'd-none' );
					$ ( this ).removeClass ( 'bg-success text-light' );
					
					remove_white_space_from_description ();
					
				}
				if ( step === 3 && sessionStorage.getItem ( 'ready_for_step_4' ) === true ) $ ( '#step_4' ).removeClass ( 'd-none' );
				if ( step === 4 ) $ ( '#step_5' ).removeClass ( 'd-none' );
				
				if ( step === 5 ) add_room_payment_form ();
				
				if ( steps.indexOf ( step + 1 ) !== -1 ) next_step.removeClass ( 'd-none' );
			}
			
		} );
		
	} ) ();




function append_room_actions ( room_actions ) {
	
	room_actions.append ( `<div class = "list-group list-group-horizontal  mb-2"  >
					${(sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' && sessionStorage.getItem ( 'room_to_edit' ) !== null ) ?
	                  `<button class = "list-group-item  no_padding " id="room_name"
                        
                         title="${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}" >
                        
                          ${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}</button >
                          
                      <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'preview_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'}  " id="preview_mode"
                        
                         title="Preview mode" ><i class="far fa-eye"></i> Preview</button >
                         
                      <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'edit_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="edit_mode"
                        
                         title="Edit mode" ><i class="far fa-edit"></i> Edit</button >
                       
                         
                          <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'delete_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="delete_mode"
                        
                         title="Delete mode" data-room_id="${ JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).room_id }"><i class="far fa-trash-alt"></i> Delete</button >
                         <button class = "list-group-item no_padding ${sessionStorage.getItem ( 'block_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="block_mode"
                        
                         title="Block dates" ><i class="far fa-plus-square"></i> Block dates</button >

						` : ``}
 					 <div id="how_to_edit"></div>
                         
                         
                          <button class = "list-group-item no_padding ${sessionStorage.getItem ( 'add_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'}"
                           id="add_mode"
                        
                         title="Add new room" ><i class="far fa-plus-square"></i> Add new room</button >
                         
                         
                      
                  </div >
               
            
             ` );
	
}


function remove_white_space_from_description () {
	//		by clicking on map 60 characters added, so this is to clear it
	room_description = $ ( '#room_description' );
	room_description.html ( '' ).prop ( 'placeholder', 'write something !' );
}


function update () {
	
	var new_room = JSON.parse ( sessionStorage.getItem ( 'new_room' ) );
	check_autocomplete ( new_room );
	store_room ( new_room, true );
	
}


$ ( document ).on ( 'click', '#pay_for_the_room', function () {
	
	var new_room = JSON.parse ( sessionStorage.getItem ( 'new_room' ) );
	
	if ( sessionStorage.getItem ( 'edit_mode' ) && sessionStorage.getItem ( 'authorized_owner' ) )
	{
	
// OWNER IS UPDATING EXISTING ROOM
		
		update ();
	}
	else
	{
		// NEW OWNER IS ADDING NEW ROOM
		var owner_details = $ ( "#add_room_payment_form" ).serialize ();
		var owner_details_array = owner_details.split ( '&' );
		var missing_values = '';
		
		$.each ( owner_details_array, function ( index, value ) {
			
			var split_value = decodeURIComponent ( value ).split ( '=' );
			
			////checking form fields
			
			/// if already logged in owner, no email and password
			
			if ( split_value[ 1 ].replace ( / /g, "" ) === '' || split_value[ 0 ] === 'email_of_user' && !split_value[ 1 ].includes ( '@' ) ) {
				missing_values += ` ${split_value[ 0 ].replace ( /_/g, " " )}<br> `;
			}
			owner_details_array[ split_value[ 0 ] ] = split_value[ 1 ];
			
		} );
		
//		IF ANY OF THE FIELDS ARE MISSING, WE'LL FIRE ALERT WITH MISSING FIELDS
		if ( missing_values.length > 0 ) {
			swal.fire ( {
				            html: `<h3>Please review these fields:</h3>` + missing_values
			            } );
			return false;
		}
		
		//// RECENTLY CREATED ROOM TO BE ADDED TO "DB"...
		
		check_autocomplete ( new_room );
		
		/*setting coordinates for popup to open after adding new room into "ROOMS"  and redirecting to index.html*/
		sessionStorage.setItem ( 'new_p_id', new_room.p_id );
		sessionStorage.setItem ( 'lng', new_room.lng );
		sessionStorage.setItem ( 'lat', new_room.lat );
		
		if ( localStorage.getItem ( 'OWNERS' ) ) {
			var current_owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
			
		}
		else {
			current_owners = {};
			
		}
		/// if already logged in owner, hashed login from session and push new room_id into room_ids array
		/// retrieve new owner from session update room_ids , merge with old owners and set back to localStorage
		
		var room_ids = [];
		
		if ( sessionStorage.getItem ( 'authorized_owner' ) ) {
			var hashed_login = sessionStorage.getItem ( 'hashed_login' );

//			CURRENTLY LOGGED IN OWNER ADDING NEW ROOM
			var authorized_owner = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) );
			
//			ADDING NEWLY CREATED ROOM'S ID  new_room.p_id INTO OWNER room_ids ARRAY
			room_ids = authorized_owner.room_ids;
			room_ids.push ( new_room.p_id );
			
			authorized_owner.room_ids = room_ids;
			
//			SETTING MOST RECENT ROOM ID AS room_id => SO WHENEVER OWNER LOGS IN INTO HIS ACCOUNT
			// AND IF HE HAS MORE THEN 1 ROOM
			// LAST ROOM HE INTERACTED WITH BEFORE LOGOUT WILL BE  ROOM TO  SEE AFTER SUCCESSFUL LOGIN.
			authorized_owner.room_id = new_room.p_id;
			
//			UPDATING OWNER WITH NEW ROOM
			var new_owner = {
				[ hashed_login ]: authorized_owner
			};
			
			
//			UPDATING OWNERS WITH NEW OWNER
			current_owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
			current_owners[ hashed_login ] = authorized_owner;
			localStorage.setItem ( 'OWNERS', JSON.stringify ( current_owners ) );
			
			
			sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( authorized_owner ) );
			
		}
		else {
//			NEW USER ADDING NEW ROOM
			var login = owner_details_array.email_of_user + owner_details_array.password;
			hashed_login = hash_login ( login );
			
			room_ids.push ( new_room.p_id );
			
//	HASHING LOGIN DETAILS, WILL USE SAME HASH TO RETRIEVE OWNER
			new_owner = {
				[ hashed_login ]: {
					'name'      : owner_details_array.name,
					'room_ids'  : room_ids,
					'room_id'   : new_room.p_id,
					'updated_at': current_date,
					'created_at': current_date
				}
			};
			sessionStorage.setItem ( 'hashed_login', hashed_login );
			
		}

//	MERGING CURRENT OWNERS WITH NEW OWNER
		let owners = { ...current_owners, ...new_owner };
		
//	UPDATING OWNERS
		localStorage.setItem ( 'OWNERS', JSON.stringify ( owners ) );
		
		store_room ( new_room );
	}
} );


function check_autocomplete ( new_room ) {


//  ARRAY OF LOCATION NAMES, AUTO-UPDATING WITH EVERY NEW LOCATION, SO WHEN USER SEARCHES FOR LOCATION IN
	// SEARCH FORM ON index.html , IF THE LOCATION IS IN THIS ARRAY, IT WILL SHOW ON AUTO-COMPLETE
	var autocomplete_searchables = JSON.parse ( localStorage.getItem ( 'autocomplete_searchables' ) );
	
	//// USING address_keys  TO GET STRINGS  FOR AUTO-COMPLETE ( EX. 'city','country','village','town') FROM ADDRESS
	// PROVIDED BY nominium, OMITTING KEYS LIKE (lat,lng, road....)
	var address_keys = JSON.parse ( localStorage.getItem ( 'address_keys' ) );
	var new_auto_c = false;
	
	$.each ( new_room.p_address, function ( key, value ) {
//		CHECK IF WE ARE USING KEY FOR AUTO-COMPLETE AND IF WE ALREADY HAVE IT IN  autocomplete_searchables ARRAY
		if ( address_keys.indexOf ( key ) !== -1 && autocomplete_searchables.indexOf ( value ) === -1 ) {
			
			$.each ( value.split ( ' ' ), function ( index, string ) {
//				IF LOCATION CONSISTS OF MORE THEN 1 WORD WE'LL SPLIT IT AND USE EACH PART +
				if ( autocomplete_searchables.indexOf ( string ) === -1 && value.split ( ' ' ).length > 1 ) {
					autocomplete_searchables.push ( decodeURI ( string ) );
				}
				
			} );
			//			+	FULL LOCATION NAME
			if ( autocomplete_searchables.indexOf ( value ) === -1 ) {
				autocomplete_searchables.push ( decodeURI ( value ) );
			}
			
			new_auto_c = true;
		}
		
	} );

//let unique = [ ...new Set ( all ) ];  TO GET UNIQUE ARRAY
	
	//// RE-SETTING autocomplete_searchables IF NEW VALUES
	if ( new_auto_c ) localStorage.setItem ( 'autocomplete_searchables', JSON.stringify ( autocomplete_searchables ) );
}


function store_room ( new_room, update = false ) {
	
	var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
	
	if ( update ) {
//// UPDATING EXISTING ROOM
		ROOMS[ new_room.p_id ] = new_room;
		
	}
	else {
////ADDING NEW ROOM
		ROOMS.push ( new_room );
	}
//	UPDATING ROOMS IN localStorage
	localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );

//	new_room IS STORED, SO REMOVING IT FROM SESSION AND SETTING IT AS room_to_edit IN SESSION
	sessionStorage.removeItem ( 'new_room' );
	sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( new_room ) );

//	SETTING NEW OWNER AS authorized_owner
	var hashed_login = sessionStorage.getItem ( 'hashed_login' );
	var owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
	var owner = owners[ hashed_login ];
	sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
	
//	AFTER STORING / UPDATING ROOM WE SET  preview_mode AS TRUE
	sessionStorage.setItem ( 'preview_mode', true );
	
//	IF OWNER IS EDITING, WE WILL REDIRECT TO OWNER ACCOUNT,
// OTHERWISE TO INDEX TO SHOW ROOM ON THE MAP WITH MARKER AND POPUP
	sessionStorage.getItem ( 'edit_mode' ) ? location.replace ( `owner.html` ) : location.replace ( `index.html` );
	
	sessionStorage.removeItem ( 'edit_mode' );
	sessionStorage.removeItem ( 'add_mode' );
	
}