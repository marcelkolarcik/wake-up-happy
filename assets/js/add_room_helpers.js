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
		
		board_div.append ( `<input title = "price" type = "number" name = "board_type_${board_type}_price" id="board_price_${board_type}"
									class="board_price col-md-9 ml-1 form-control "  data-c_box_id="${board_type}"
                                       placeholder = "price"   value="">
                            </div >` );
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
	parent_title.addClass ( 'bg_green text-light_light' );
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
		
		$ ( document ).on ( "click", ".check", function () {
			
			var parent_title = $ ( '#' + $ ( this ).data ( 'parent_title' ) );
			var check = $ ( '#' + $ ( this ).data ( 'parent_title' ) + '_check' );
			var footer = $ ( '#' + $ ( this ).data ( 'footer' ) );
			var type = $ ( this ).data ( 'type' );
			
			if ( $ ( this ).is ( ":checked" ) ) {
				
				//	IF ANY OF THE IMAGES RADIO BUTTON WAS SELECTED, IT WOULD HAVE  bg_green text-light_light CLASS
				// APPLIED, SO  IF USER CHANGES HIS MIND AND SELECTS ANOTHER IMAGE , THIS IS JUST TO REMOVE .bg_green
				// text-light_light FROM PREVIOUSLY SELECTED IMAGE AND BRING IT TO ORIGINAL STATE
				if ( type === 'room_style' ) $ ( '.room_style' ).removeClass ( 'bg_green text-light_light' ).addClass ( 'bg-secondary' );
				if ( type === 'view_type' ) $ ( '.view_type' ).removeClass ( 'bg_green text-light_light' ).addClass ( 'bg-secondary' );
				if ( type === 'room_type' ) $ ( '.room_type' ).removeClass ( 'bg_green text-light_light' ).addClass ( 'bg-secondary' );
				
				// THIS IS TO ADD .bg_green text-light_light TO TITLE OF THIS PART OF THE FORM WHEN USER SELECTS IT
				if ( type === 'board' ) parent_title.addClass ( 'bg_orange text-light' );
				else {
					
					parent_title.addClass ( 'bg_green text-light' );
					check.removeClass ( 'd-none' );
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
					footer.removeClass ( 'bg-secondary' ).addClass ( 'bg_green text-light text-light' );
				}
				
				//CALCULATING HOW MANY CHECKBOXES  num_of_amenities AND num_of_boards AND num_of_prices WERE
				// SELECTED-DESELECTED, NEEDED LATER IF USER DESELECTS ALL OF THEM , TO RETURN COLOR TO ORIGINAL STATE
				
				if ( type === 'amenity' ) {
					num_of_amenities++;
					
				}
				// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
				//	console.log(num_of_prices,num_of_amenities, $ ( '#room_description' ).val ().length)
				if ( num_of_prices > 0 && num_of_amenities > 0 && $ ( '#room_description' ).val ().length > 0 ) {
					step_4.removeClass ( 'd-none' );
				}
				
			}
			else if ( $ ( this ).is ( ":not(:checked)" ) ) {
				
				if ( type === 'board' ) {
					if ( num_of_boards > 0 ) num_of_boards--;
					num_of_prices--;
					
				}
				if ( type === 'amenity' ) {
					num_of_amenities--;
					
				}
				// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
				if ( num_of_prices > 0 && num_of_amenities > 0 && $ ( '#room_description' ).val ().length > 0 ) {
					step_4.removeClass ( 'd-none' );
				}
				//	IF ANY OF THE IMAGES  RADIO'S  OR CHECKBOXES WERE SELECTED, IMAGE CARD FOOTER WOULD HAVE
				// bg_green text-light_light CLASS APPLIED, SO THIS IS JUST TO RETURN IT TO ORIGINAL STATE
				footer.removeClass ( 'bg_green' ).addClass ( 'bg-secondary' );
				
				//	IF USER HAS DESELECTED ALL OF PRECIOUSLY SELECTED CHECKBOXES ( board_types and amenities) , THIS
				// IS TO REMOVE APPLIED CLASS
				
				if ( num_of_boards === 0 && type === 'board' ) {
					
					parent_title.removeClass ( 'bg_green' ).addClass ( 'bg_orange' );
					delete titles[ type ];
					titles.splice ( titles.indexOf ( type ), 1 );
					
				}
				
				if ( num_of_amenities === 0 && type === 'amenity' ) {
					
					parent_title.removeClass ( 'bg_green' );
					delete titles[ type ];
					
					titles.splice ( titles.indexOf ( type ), 1 );
					
				}
			}
			
			var num_of_titles = Object.keys ( titles ).length;
			
			/// IF FIRST 3 PARTS OF THE FORM ARE FILLED CORRECTLY  num_of_titles === 3 AND THIS IS TO LET USER CAN
			// CONTINUE / WITH THE FORM BY DISPLAYING NEXT STEP BUTTON
			
			if ( num_of_titles === 3 ) $ ( '#step_3' ).removeClass ( 'd-none' );
			
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
		} ).on ( 'focusout', '.board_price', function () {
			
			var price = $ ( this ).val ();
			var c_box_id = $ ( this ).data ( 'c_box_id' );
			console.log ( 'PRICE: ' + price );
			if ( price > 0 ) {
				$ ( '#board_types_title' ).addClass ( 'bg_green' ).removeClass ( 'bg_orange' );
				$ ( '#board_type_' + c_box_id ).addClass ( 'bg_green ' ).removeClass ( 'bg_orange' );
				
				if ( increment ) {
					num_of_prices++;
					num_of_boards++;
					
				}
				
			}
			else if ( price <= 0 ) {
				if ( num_of_prices > 0 ) num_of_prices--;
				if ( num_of_boards > 0 ) num_of_boards--;
				
				$ ( '#board_type_' + c_box_id ).removeClass ( 'bg_green' ).addClass ( 'bg-secondary' );
				$ ( '#board_' + c_box_id ).prop ( 'checked', false );
				$ ( '#board_price_' + c_box_id ).remove ();
				
				if ( num_of_boards === 0 && num_of_prices === 0 ) {
					$ ( '#board_types_title' ).removeClass ( 'bg_green' ).addClass ( 'bg_orange' );
					step_4.addClass ( 'd-none' );
					increment = true;
					
				}
				
			}
			
			// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
			//console.log(num_of_prices,num_of_amenities, $ ( '#room_description' ).val ().length)
			if ( num_of_prices > 0 && num_of_amenities > 0 && $ ( '#room_description' ).val ().length > 0 ) {
				step_4.removeClass ( 'd-none' );
			}
			
		} );
		$ ( document ).on ( 'input', '#room_description', function () {
			
			var room_desc = $ ( '#room_description' );
			var remaining_characters = 300 - room_desc.val ().length;
			var step_4 = $ ( '#step_4' );
			
			if ( remaining_characters === 300 ) {
				$ ( '#description_title' ).removeClass ( 'bg_green' );
				step_4.addClass ( 'd-none' );
			}
			else {
				$ ( '#description_title' ).addClass ( 'bg_green' );
			}
			
			$ ( '#room_description_length' ).addClass ( 'text-danger' ).html ( remaining_characters );
			
			// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
			//console.log(num_of_prices,num_of_amenities, room_desc.val ().length)
			if ( num_of_prices > 0 && num_of_amenities > 0 && room_desc.val ().length > 0 ) {
				step_4.removeClass ( 'd-none' );
			}
			
		} );
		
	} ) ();

//FORM PROGRESS (STEPS) BUTTONS
(function (  ) {
	
	var steps = [];
	var step_names = ['location','room','services','preview','payment'];
	
	var step_desc = [
		`By scrolling or clicking on the map, select location of your property. Once
                you
                are
                happy with the location, click on
                <button class = "bg_orange" >get details</button >
                button,
                and this will display all the address information. You can choose what
                details
                you want
                to share. If you don't want to share some details,
                just edit it by clicking on the field. Remember to add your
                <span class = "text-danger  p-2" >
                Property name! </span > Once you choose location and are happy with it, click on
                   <span class="green">room&nbsp;>>></span> `,
		
		`Define your room by selecting appropriate radio buttons. Once all options are selected
	<span class="green">services&nbsp;>>></span> will appear and you can progress to next step.

		You can always edit your choice, by clicking on  <i class = "fas fa-caret-down" ></i >
			    <i class = "fas fa-caret-up" ></i > and choosing another option.
			    `,
		`Define your services by selecting appropriate check buttons. When selecting board type, <strong class="bg-light">you must enter price for the board.</strong>
 		You can select multiple options.When at least one of each options are selected and description is entered
	<span class="green">preview&nbsp;>>></span> will appear and you can progress to next step.

		You can always edit your choice, by clicking on  <i class = "fas fa-caret-down" ></i >
			    <i class = "fas fa-caret-up" ></i > and choosing another option.`,
		`Here you can preview your work of art, by clicking on the tabs ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK. Once you
are happy with your work, you can click on
	<span class="green">payment&nbsp;>>></span> proceed with payment.

		`,
		`Here you can proceed with payment. Thank you for choosing <b>wake up happy!</b>`];
	
	$ ( document ).on ( 'click', '.step', function () {
		
		var step = $ ( this ).data ( 'step' );
		var next_step =$ ( '#step_'+ (step + 1) );
		var form_info = $('#form_info');
		steps.push(step);
		// TOP DISPLAY
		
		$ ( '#progress_step_' + step ).removeClass ( 'empty' );
		
		if(step)
		{
			
			//$ ( '#step_'+ (step - 1) ).html('<<<&nbsp;previous');
			next_step.html(step_names[step ]+'&nbsp;>>>').addClass('no_border green');
			$(this).html(step_names[step -1]).removeClass('no_border green');
			$ ( '#step_'+ (step + 2) ).addClass('d-none').removeClass ( 'no_border green' );
		}
		
		form_info.html(`${step_desc[step-1]}`);
		
		if ( step === 2 ) {
			
			$ ( '#step_1' ).removeClass ( 'd-none' );
			$ ( this ).removeClass ( 'bg-success text-light' );

//		by clicking on map 60 characters added, so this is to clear it
			
			$ ( '#room_description' ).html ( '' ).prop ( 'placeholder', 'write something !' );
			
		}
		if ( step === 4 ) $ ( '#step_5' ).removeClass ( 'd-none' );
		
		if ( step === 5 ) {
			add_room_payment ();
			
		}
		if(steps.indexOf(step + 1) !== -1) next_step.removeClass('d-none');
	} );
	
})();

$ ( document ).on ( 'click', '#pay_for_the_room', function () {
	
	
	
	//	 CREATING OWNER OBJECT AND STORING IT IN "DB"
	
	var owner_details = $ ( "#add_room_payment" ).serialize ();
	var owner_details_array = owner_details.split ( '&' );
	var missing_values = '';
	$.each ( owner_details_array, function ( index, value ) {
		
		var split_value = decodeURIComponent ( value ).split ( '=' );
		
		////checking form fields
		if(split_value[ 1 ].replace(/ /g, "") === '' ||  split_value[ 0 ] === 'email_of_user' && !split_value[ 1 ].includes('@'))
		{
			missing_values += ` ${split_value[ 0 ].replace(/_/g, " ")}<br> `;
		}
		owner_details_array[ split_value[ 0 ] ] = split_value[ 1 ];
		
		//console.log(/*encodeURI(value), decodeURI(value),encodeURIComponent(value),*/decodeURIComponent(value));
		/* decodeURIComponent(value) is the way to go*/
		
	} );
	if(missing_values.length > 0 )
	{
		swal.fire({
			          html : `<h3>Please review these fields:</h3>`+ missing_values} );
		return false;
	}

//	GETTING AUTOCOMPLETE ARRAY FROM LOCAL STORAGE, TO ADD TO IT IF NEW LOCATION HAS NEW ELEMENTS, NOT IN ARRAY
//  ALREADY, WHEN ADDING NEW ROOM...
		
		var autocomplete_searchables = JSON.parse ( localStorage.getItem ( 'autocomplete_searchables' ) );
		
		//// RECENTLY CREATED ROOM TO BE ADDED TO "DB"...
		var new_room = JSON.parse ( sessionStorage.getItem ( 'new_room' ) );
		
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
					autocomplete_searchables.push ( decodeURI ( value ) );}
				
				new_auto_c = true;
			}
			
		} );

//let unique = [ ...new Set ( all ) ];  TO GET UNIQUE ARRAY
		
		//// RE-SETTING autocomplete_searchables IF NEW VALUES
		if ( new_auto_c ) localStorage.setItem ( 'autocomplete_searchables', JSON.stringify ( autocomplete_searchables ) );
		
		////////// ADDING NEWLY CREATED ROOM INTO "DB
		var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
		ROOMS.push ( new_room );
		localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
		
		sessionStorage.removeItem ( 'new_room' );
		
		/*setting coordinates for popup to open after adding new room into "ROOMS"  and redirecting to index.html*/
		sessionStorage.setItem ( 'new_p_id', new_room.p_id );
		sessionStorage.setItem ( 'lng', new_room.lng );
		sessionStorage.setItem ( 'lat', new_room.lat );


		
		if ( localStorage.getItem ( 'OWNERS' ) ) {
			var current_owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
			console.log ( 'fresh owners ', current_owners );
		}
		else {
			current_owners = {};
			console.log ( 'first time owners ' );
		}



//	console.log ( 'owners_old ', owners_old );
//	console.log ( 'landlord ', landlord );
		
		var login = owner_details_array.email_of_user + owner_details_array.password;

//	https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
		hashCode = string => string.split ( '' ).reduce ( ( a, b ) => {
			a = (( a << 5 ) - a ) + b.charCodeAt ( 0 );
			return a & a;
		}, 0 );

//	HASHING LOGIN DETAILS, WILL USE SAME HASH TO RETRIEVE OWNER
		var new_owner = {
			[ hashCode ( login ) ]: {
				'name'      : owner_details_array.name,
				'room'      : new_room,
				'updated_at': current_date,
				'created_at': current_date
			}
		};

//	MERGING CURRENT OWNERS WITH NEW OWNER
		let owners = { ...current_owners, ...new_owner };
		//	PUTTING BACK TO STORAGE
		localStorage.setItem ( 'OWNERS', JSON.stringify ( owners ) );



//	if(email in parsed)
//	{
//		alert('yay')
//	}
		
		location.replace ( `index.html` );
		
	} );




