//toggling content of the div ( particular part of the form )
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
	var parent_title = $ ( '#' + $ ( this ).data ( 'parent_title' ) );
	var next_div = $ ( '.' + $ ( this ).data ( 'next_div' ) );
	
	parent_div.addClass ( 'd-none' );
	//parent_title.addClass ( 'bg_green text-light' );
	next_div.removeClass ( 'd-none' );
	
} );

// not to put nunber_of_boards outside of function as global variable i use this anonymous function to keep it in
//https://stackoverflow.com/questions/12319598/jquery-mouse-click-counter
(
	function () {

//	FUNCTION TO GIVE USER INTERACTIVE FEEDBACK WHEN GOING THROUGH THE ADD ROOM FORM
		
		var num_of_boards = 0;
		var num_of_amenities = 0;
		var titles = [];
		var num_of_prices = 0;
		var step_4 = $ ( '#step_4' );
//		var OWNERS = JSON.parse(localStorage.getItem('OWNERS'));
//		var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
//		console.log( OWNERS[sessionStorage.getItem('hashed_login')],ROOMS);
//		IF WE HAVE USER WITH ROOM ALREADY, AND USER IS VIEWING OR EDITING ROOM => ROOM HAS ALL DETAILS FILLED
		if ( sessionStorage.getItem ( 'room_to_edit' ) && !sessionStorage.getItem ( 'add_mode' ) ) {
			
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
			
			var parent_title = $ ( '#' + $ ( this ).data ( 'parent_title' ) );
			var check = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_check' );
			var green = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_green' );
			var blue = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_blue' );
			var orange = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_orange' );
			var footer = $ ( '#' + $ ( this ).data ( 'footer' ) );
			var type = $ ( this ).data ( 'type' );
			
			if ( $ ( this ).is ( ":checked" ) ) {

//				IF USER SELECTS ANYTHING FROM THE SELECTION EXCEPT board, WE WILL GIVE HIM GREEN LIGHT TO CONTINUE
				// IF IT IS board TYPE, HE NEEDS TO TYPE IN PRICE FOR THE BOARD
				if ( type === 'board' ) {
					orange.removeClass ( 'd-none' );
					blue.addClass ( 'd-none' );
				}
				else {
					
					green.removeClass ( 'd-none' );
					blue.addClass ( 'd-none' );
				}
				
				//COLLECTING titles , USING IT FOR DISPLAYING NEXT STEP BUTTON
				titles[ type ] = 1;
				
				/// IMAGE CARD FOOTER CHANGED TO .bg_green text-light_light, EXCEPT IF IT IS BOARD, BECAUSE USER NEEDS
				// TO ADD PRICE FOR THE BOARD, .bg_orange IS APPLIED FIRST, AND WHEN HE ADDS PRICE , IT WILL CHANGE TO
				// .bg_green text-light_light AND WHEN HE DELETES PRICE , IT WILL RETURN TO .bg_orange , AND WHEN USER
				// DESELECTS BOARD, IT WILL BE CHANGED TO ORIGINAL .bg-secondary
				if ( type === 'board' ) {
					footer.removeClass ( 'bg-secondary' ).addClass ( 'bg_orange' );
					increment = true;
				}
				else {
					footer.removeClass ( 'bg-secondary' ).addClass ( 'bg_green text-light' );
				}
				
				//CALCULATING HOW MANY CHECKBOXES  num_of_amenities AND num_of_boards AND num_of_prices WERE
				// SELECTED-DESELECTED, NEEDED LATER IF USER DESELECTS ALL OF THEM , TO RETURN COLOR TO ORIGINAL STATE
				
				if ( type === 'amenity' ) {
					num_of_amenities++;
					
				}
				// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
				
				if ( num_of_prices > 0 && num_of_amenities > 0 && $ ( '#room_description' ).val ().length > 0 ) {
					step_4.removeClass ( 'd-none' );
				}
				else {
					step_4.addClass ( 'd-none' );
				}
				
			}
			else if ( $ ( this ).is ( ":not(:checked)" ) ) {
				
				if ( type === 'board' ) {
					if ( num_of_boards > 0 ) {
						num_of_boards--;
						num_of_prices--;
					}
					
				}
				if ( type === 'amenity' ) {
					num_of_amenities--;
					
				}
				// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
				if ( num_of_prices > 0 && num_of_amenities > 0 && $ ( '#room_description' ).val ().length > 0 ) {
					step_4.removeClass ( 'd-none' );
				}
				else {
					step_4.addClass ( 'd-none' );
				}
				//	IF ANY OF THE IMAGES  RADIO'S  OR CHECKBOXES WERE SELECTED, IMAGE CARD FOOTER WOULD HAVE
				// bg_green text-light_light CLASS APPLIED, SO THIS IS JUST TO RETURN IT TO ORIGINAL STATE
				footer.removeClass ( 'bg_green text-light' ).addClass ( 'bg-secondary text-light' );
				
				//	IF USER HAS DESELECTED ALL OF PREVIOUSLY SELECTED CHECKBOXES ( board_types and amenities) , THIS
				// IS TO REMOVE APPLIED CLASS
				
				if ( num_of_boards === 0 && type === 'board' ) {
					
					//parent_title.removeClass ( 'bg_green  text-light' ).addClass ( 'bg_orange' );
					orange.addClass ( 'd-none' );
					green.addClass ( 'd-none' );
					blue.removeClass ( 'd-none' );
					delete titles[ type ];
					titles.splice ( titles.indexOf ( type ), 1 );
					
				}
				
				if ( num_of_amenities === 0 && type === 'amenity' ) {
					
					green.addClass ( 'd-none' );
					blue.removeClass ( 'd-none' );
					parent_title.removeClass ( 'bg_green  text-light' );
					delete titles[ type ];
					
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
			
			var green = $ ( '#board_types_title_green' );
			var orange = $ ( '#board_types_title_orange' );
			var blue = $ ( '#board_types_title_blue' );
			var check_box_id = $ ( this ).data ( 'c_box_id' );
			
			var price = $ ( this ).val ();
			
			if ( price > 0 ) {
				if ( increment ) {
					num_of_prices++;
					num_of_boards++;
					increment = false;
					
				}
				
				orange.addClass ( 'd-none' );
				green.removeClass ( 'd-none' );
				blue.addClass ( 'd-none' );
				$ ( '#board_type_' + check_box_id ).addClass ( 'bg_green' ).removeClass ( 'bg_orange' );
				
			}
			else if ( price <= 0 ) {
				if ( !increment ) {
					
					num_of_prices--;
					num_of_boards--;
					increment = true;
				}
//				FOOTER BACK TO bg-secondary
				$ ( '#board_type_' + check_box_id ).removeClass ( 'bg_green' ).addClass ( 'bg-secondary' );
				$ ( '#board_' + check_box_id ).prop ( 'checked', false );
				
			}
			if ( price <= 0 && num_of_boards <= 0 && num_of_prices <= 0 ) {
				
				orange.addClass ( 'd-none' );
				green.addClass ( 'd-none' );
				blue.removeClass ( 'd-none' );
				
				$ ( '#board_type_' + check_box_id ).removeClass ( 'bg_green' ).addClass ( 'bg-secondary' );
				$ ( '#board_price_' + check_box_id ).removeClass ( 'bg_green' ).addClass ( 'bg-secondary' );
				
				increment = true;
			}
			
			if ( num_of_prices > 0 && num_of_amenities > 0 && $ ( '#room_description' ).val ().length > 0 ) {
				step_4.removeClass ( 'd-none' );
			}
			else {
				step_4.addClass ( 'd-none' );
			}
			
		} ).on
		              ( 'focusout', '.board_price', function () {
			
			              var green = $ ( '#board_types_title_green' );
			              var orange = $ ( '#board_types_title_orange' );
			              var price = $ ( this ).val ();
			              var check_box_id = $ ( this ).data ( 'c_box_id' );
			
			              if ( price > 0 && increment ) {
				              num_of_prices++;
				              num_of_boards++;
			              }
			              else if ( price <= 0 ) {
				
				              $ ( '#board_' + check_box_id ).prop ( 'checked', false );
				              $ ( '#board_price_' + check_box_id ).remove ();
				
				              if ( num_of_boards === 0 && num_of_prices === 0 ) {
					
					              orange.removeClass ( 'd-none' );
					              green.addClass ( 'd-none' );
					              step_4.addClass ( 'd-none' );
					              increment = true;
					
				              }
				
			              }
			
			              // ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
			
			              if ( num_of_prices > 0 && num_of_amenities > 0 && $ ( '#room_description' ).val ().length > 0 ) {
				              step_4.removeClass ( 'd-none' );
			              }
			              else {
				              step_4.addClass ( 'd-none' );
			              }
			
		              } );
//		description must be not null
		$ ( document ).on ( 'input', '#room_description', function () {
			
			var room_desc = $ ( '#room_description' );
			var remaining_characters = 300 - room_desc.val ().length;
			var step_4 = $ ( '#step_4' );
			var green = $ ( '#description_title_green' );
			var blue = $ ( '#description_title_blue' );
			
			if ( room_desc.val ().length <= 29 ) {
				
				blue.removeClass ( 'd-none' );
				green.addClass ( 'd-none' );
				step_4.addClass ( 'd-none' );
			}
			else {
				
				blue.addClass ( 'd-none' );
				green.removeClass ( 'd-none' );
			}
			
			$ ( '#room_description_length' ).addClass ( 'text-danger' ).html ( remaining_characters );
			
			// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
			
			if ( num_of_prices > 0 && num_of_amenities > 0 && room_desc.val ().length > 29 ) {
				step_4.removeClass ( 'd-none' );
			}
			
		} );
		
	} ) ();

//FORM PROGRESS (STEPS) BUTTONS
(
	function () {
		
		var steps = [];
		var step_names = [ 'location', 'room', 'services', 'preview', 'payment' ];
		
		var step_desc = [
			`
                    <span class="nav_link">How to:</span>
              Find location of your property and click
                <button class = "bg_orange" >get details</button >
                button.Remember to add your
                <span class = "text-danger  p-2" >
                Property name! (min 3 characters)</span >If all details are correct, click on
                   <span class="green">room&nbsp;>>></span> `,
			
			`<span class="nav_link">How to:</span>Define your room by selecting appropriate radio buttons. Once all options are selected
	<span class="green">services&nbsp;>>></span> will appear and you can progress to next step.

		
			    `,
			`<span class="nav_link">How to:</span>Define your services by selecting appropriate check buttons. When selecting board type,
		<strong class="bg-light">you must enter price for the board.</strong>
 		You can select multiple options.When at least one of each options are selected and description is entered
	<span class="green">preview&nbsp;>>></span> will appear and you can progress to next step.

		`,
			`<span class="nav_link">How to:</span>Preview your work of art, by clicking on the tabs ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK. Once you
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
like to edit it, click on <span class="img-thumbnail">Edit mode</span> button`
			,
			`<span class="nav_link">How to:</span>You are adding new room.
              Find location of your property and click
                <button class = "bg_orange" >get details</button >
                button.Remember to add your
                <span class = "text-danger  p-2" >
                Property name! (min 3 characters)</span >If all details are correct, click on
                   <span class="green">room&nbsp;>>></span> `
		];
		var room_actions = $ ( '#room_actions' );
		var how_to = $ ( '#how_to' );
		
		if ( (
			window.location.pathname === '/owner.html' ) ) {
			append_room_actions ( room_actions );
			how_to.html ( `${step_desc[ 6 ]}` );
			
		}
		// PUBLIC USER ADDING ROOM
		if ( (
		     !sessionStorage.getItem ( 'edit_mode' ) && !sessionStorage.getItem ( 'preview_mode' ) ) && window.location.pathname !== '/owner.html' ) {
			how_to.html ( `${step_desc[ 0 ]}` );
			
		}
		// LOGGED IN USER EDITING ROOM
		if ( (
			sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname === '/owner.html' ) ) {
			how_to.html ( `${step_desc[ 5 ]}` );
			
		}
		// LOGGED IN USER PREVIEWING ROOM
		if ( (
			sessionStorage.getItem ( 'preview_mode' ) && window.location.pathname === '/owner.html' ) ) {
			how_to.html ( `${step_desc[ 6 ]}` );
			
		}
		if ( (
			sessionStorage.getItem ( 'add_mode' ) && window.location.pathname === '/owner.html' ) ) {
			how_to.html ( `${step_desc[ 7 ]}` );
			
		}
//		if ( (
//			     sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'preview_mode' ) ) &&
// window.location.pathname === '/owner.html' ) {  append_edit_info ( form_info );  }
		
		$ ( document ).on ( 'click', '.step', function () {
			
			var step = $ ( this ).data ( 'step' );
			if ( (
				!sessionStorage.getItem ( 'edit_mode' ) && !sessionStorage.getItem ( 'preview_mode' ) ) ) {
				how_to.html ( `${step_desc[ step - 1 ]}` );
			}
			if ( (
				     sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'preview_mode' ) ) && window.location.pathname === '/owner.html' ) {
				
				//$ ( '.step' ).removeClass ( 'd-none' );
				
				//append_edit_info ( form_info );
				
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
					$ ( '#pay_for_the_room' ).text ( 'save' );
				}
			}
			else {
				var next_step = $ ( '#step_' + (
				                    step + 1 ) );
				
				steps.push ( step );
				// TOP DISPLAY
				
				$ ( '#progress_step_' + step ).removeClass ( 'empty' );
				
				if ( step ) {
					
					//$ ( '#step_'+ (step - 1) ).html('<<<&nbsp;previous');
					next_step.html ( step_names[ step ] + '&nbsp;>>>' ).addClass ( 'no_border green' );
					$ ( this ).html ( step_names[ step - 1 ] ).removeClass ( 'no_border green' );
					$ ( '#step_' + (
					    step + 2 ) ).addClass ( 'd-none' ).removeClass ( 'no_border green' );
				}
				if ( sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname === '/owner.html' ) {
					how_to.html ( `${step_desc[ step - 1 ]}` );
				}
				
				if ( step === 2 ) {
					
					$ ( '#step_1' ).removeClass ( 'd-none' );
					$ ( this ).removeClass ( 'bg-success text-light' );
					
					remove_white_space_from_description ();
					
				}
				if ( step === 4 ) $ ( '#step_5' ).removeClass ( 'd-none' );
				
				if ( step === 5 ) {
					add_room_payment_form ();
					
				}
				if ( steps.indexOf ( step + 1 ) !== -1 ) next_step.removeClass ( 'd-none' );
			}
			
		} );
		
	} ) ();


//console.log ( 'edit_mode ' + sessionStorage.getItem ( 'edit_mode' ) );

function append_room_actions ( room_actions ) {
	room_actions.append ( `<div class = "list-group list-group-horizontal  mb-2"  >
					${sessionStorage.getItem ( 'room_to_edit' ) ? `<button class = "list-group-item  no_padding " id="room_name"
                        
                         title="${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}" >
                        
                          ${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}</button >
                          
                      <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'preview_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'}  " id="preview_mode"
                        
                         title="Preview mode" ><i class="far fa-eye"></i> Preview</button >
                         
                      <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'edit_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="edit_mode"
                        
                         title="Edit mode" ><i class="far fa-edit"></i> Edit</button >
                       
                         
                          <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'delete_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="delete_mode"
                        
                         title="Delete mode" data-room_id="${ JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).room_id }"><i class="far fa-trash-alt"></i> Delete</button >
                         ` : ``}
 					 <div id="how_to_edit"></div>
                         
                         
                          <button class = "list-group-item no_padding ${sessionStorage.getItem ( 'add_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="add_mode"
                        
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
	if ( sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname === '/owner.html' && sessionStorage.getItem ( 'authorized_owner' ) ) {
// OWNER IS UPDATING EXISTING ROOM
		
		update ();
	}
	else {
		
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
			
			room_ids = authorized_owner.room_ids;
			room_ids.push ( new_room.p_id );
			authorized_owner.room_ids = room_ids;
			authorized_owner.room_id = new_room.p_id;
			
			var new_owner = {
				[ hashed_login ]: authorized_owner
			};
			
			sessionStorage.removeItem ( 'add_mode' );
			
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
		
		//	PUTTING BACK TO STORAGE
		localStorage.setItem ( 'OWNERS', JSON.stringify ( owners ) );
		
		store_room ( new_room );
	}
} );


function check_autocomplete ( new_room ) {
	var autocomplete_searchables = JSON.parse ( localStorage.getItem ( 'autocomplete_searchables' ) );
	//// USING address_keys  TO GET ELEMENTS TO AUTOCOMPLETE ( EX. 'city','country','village','town') FROM ADDRESS
	// PROVIDED BY nominium, OMITTING KEYS LIKE lat,lng, road.....
	var address_keys = JSON.parse ( localStorage.getItem ( 'address_keys' ) );
	var new_auto_c = false;
	
	$.each ( new_room.p_address, function ( key, value ) {
//		CHECK IF WE ARE USING KEY FOR AUTOCOMPLETE AND IF WE ALREADY HAVE IT IN  autocomplete_searchables ARRAY
		if ( address_keys.indexOf ( key ) !== -1 && autocomplete_searchables.indexOf ( value ) === -1 ) {
			
			$.each ( value.split ( ' ' ), function ( index, string ) {
				if ( autocomplete_searchables.indexOf ( string ) === -1 ) {
					autocomplete_searchables.push ( decodeURI ( string ) );
				}
				
			} );
			
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
		//// updating existing room
		ROOMS[ new_room.p_id ] = new_room;
		
	}
	else {
		//// adding new room
		ROOMS.push ( new_room );
	}
	
	localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
	
	sessionStorage.removeItem ( 'new_room' );
	sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( new_room ) );
	
	var hashed_login = sessionStorage.getItem ( 'hashed_login' );
	var owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
	var owner = owners[ hashed_login ];
	
	sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
	sessionStorage.setItem ( 'preview_mode', true );
//	IF OWNER IS EDITING, WE WILL REDIRECT TO OWNER ACCOUNT, OTHERWISE TO INDEX TO SHOW ROOM ON THE MAP WITH MARKER
// AND POPUP
	sessionStorage.getItem ( 'edit_mode' ) ? location.replace ( `owner.html` ) : location.replace ( `index.html` );
	
	sessionStorage.removeItem ( 'edit_mode' );
}