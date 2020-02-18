//toggling content of the div ( particular part of the form )
$( document ).on( "click", ".show_content", function () {
	
	var hidden_class = $( this ).data( 'hidden_class' );
	
	$( '.' + hidden_class ).toggleClass( 'd-none' );
} );
//toggling size of images on form
$( document ).on( "click", ".form_image", function () {
	
	$( this ).parent().toggleClass( 'col-lg-2 col-md-3 col-sm-4 col-4' );
	
} );
// showing input for board price only when user selects board. removing input when user deselects board
$( document ).on( "click", ".board_type", function () {
	
	var board_type = $( this ).data( 'board_type' );
	var board_div = $( '#board_type_' + board_type );
	var board_price = $( '#board_price_' + board_type );
	
	if ( $( this ).is( ":checked" ) ) {
		
		board_div.append( `<input title = "price" type = "number" name = "board_type_${board_type}_price" id="board_price_${board_type}"
									class="board_price col-md-9 ml-1 form-control "  data-c_box_id="${board_type}"
                                       placeholder = "price"   value="">
                            </div >` );
	}
	else if ( $( this ).is( ":not(:checked)" ) ) {
		
		board_price.remove();
	}
	
} );
// after selecting radio buttons : room_type, view_type, room_style, this function will collapse parent div, add color
// feedback to user that it is selected already, and it will un-hide next div for selection
$( document ).on( "click", ".collapse_parent", function () {
	
	var parent_div = $( '.' + $( this ).data( 'parent_div' ) );
	var parent_title = $( '#' + $( this ).data( 'parent_title' ) );
	var next_div = $( '.' + $( this ).data( 'next_div' ) );
	
	parent_div.addClass( 'd-none' );
	parent_title.addClass( 'bg_green text-light_light' );
	next_div.removeClass( 'd-none' );
	
} );

// not to put nunber_of_boards outside of function as global variable i use this function to keep it in
//https://stackoverflow.com/questions/12319598/jquery-mouse-click-counter
( function () {

//	FUNCTION TO GIVE USER INTERACTIVE FEEDBACK WHEN GOING THROUGH THE ADD ROOM FORM
	
	var num_of_boards = 0;
	var num_of_amenities = 0;
	var titles = [];
	var num_of_prices = 0;
	var step_4 = $( '#step_4' );
	
	$( document ).on( "click", ".check", function () {
		
		var parent_title = $( '#' + $( this ).data( 'parent_title' ) );
		var check =  $( '#' + $( this ).data( 'parent_title' )+'_check' );
		var footer = $( '#' + $( this ).data( 'footer' ) );
		var type = $( this ).data( 'type' );
		
		if ( $( this ).is( ":checked" ) ) {
			
			//	IF ANY OF THE IMAGES RADIO BUTTON WAS SELECTED, IT WOULD HAVE  bg_green text-light_light CLASS APPLIED, SO  IF USER
			// CHANGES HIS MIND AND SELECTS ANOTHER IMAGE , THIS IS JUST TO REMOVE .bg_green text-light_light FROM PREVIOUSLY SELECTED
			// IMAGE AND BRING IT TO ORIGINAL STATE
			if ( type === 'room_style' ) $( '.room_style' ).removeClass( 'bg_green text-light_light' ).addClass( 'bg-secondary' );
			if ( type === 'view_type' ) $( '.view_type' ).removeClass( 'bg_green text-light_light' ).addClass( 'bg-secondary' );
			if ( type === 'room_type' ) $( '.room_type' ).removeClass( 'bg_green text-light_light' ).addClass( 'bg-secondary' );
			
			// THIS IS TO ADD .bg_green text-light_light TO TITLE OF THIS PART OF THE FORM WHEN USER SELECTS IT
			if ( type === 'board' ) parent_title.addClass( 'bg_orange text-light' );
			else {
			
				parent_title.addClass( 'bg_green text-light' );
				check.removeClass('d-none');
			}
			
			//COLLECTING titles , USING IT FOR DISPLAYING NEXT STEP BUTTON
			titles[ type ] = 1;
			
			/// IMAGE CARD FOOTER CHANGED TO .bg_green text-light_light, EXCEPT IF IT IS BOARD, BECAUSE USER NEEDS TO
			// ADD PRICE FOR THE BOARD, .bg_orange IS APPLIED FIRST, AND WHEN HE ADDS PRICE , IT WILL CHANGE TO
			// .bg_green text-light_light AND WHEN HE DELETES PRICE , IT WILL RETURN TO .bg_orange , AND WHEN USER DESELECTS BOARD, IT
			// WILL BE CHANGED TO ORIGINAL .bg-secondary
			if ( type === 'board' ) {
				footer.removeClass( 'bg-secondary' ).addClass( 'bg_orange' );
				increment = true;
			}
			else {
				footer.removeClass( 'bg-secondary' ).addClass( 'bg_green text-light text-light' );
			}
			
			//CALCULATING HOW MANY CHECKBOXES  num_of_amenities AND num_of_boards AND num_of_prices WERE
			// SELECTED-DESELECTED, NEEDED LATER IF USER DESELECTS ALL OF THEM , TO RETURN COLOR TO ORIGINAL STATE
			
			if ( type === 'amenity' ) {
				num_of_amenities++;
				
			}
			// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
			if ( num_of_prices > 0 && num_of_amenities > 0 && $( '#room_description' ).val().length > 0 ) {
				step_4.removeClass( 'd-none' );
			}
			
		}
		else if ( $( this ).is( ":not(:checked)" ) ) {
			
			if ( type === 'board' ) {
				if ( num_of_boards > 0 ) num_of_boards--;
				num_of_prices--;
				
			}
			if ( type === 'amenity' ) {
				num_of_amenities--;
				
			}
			// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
			if ( num_of_prices > 0 && num_of_amenities > 0 && $( '#room_description' ).val().length > 0 ) {
				step_4.removeClass( 'd-none' );
			}
			//	IF ANY OF THE IMAGES  RADIO'S  OR CHECKBOXES WERE SELECTED, IMAGE CARD FOOTER WOULD HAVE  bg_green text-light_light
			// CLASS APPLIED, SO THIS IS JUST TO RETURN IT TO ORIGINAL STATE
			footer.removeClass( 'bg_green text-light' ).addClass( 'bg-secondary' );
			
			//	IF USER HAS DESELECTED ALL OF PRECIOUSLY SELECTED CHECKBOXES ( board_types and amenities) , THIS IS TO
			// REMOVE APPLIED CLASS
			
			if ( num_of_boards === 0 && type === 'board' ) {
				
				parent_title.removeClass( 'bg_green text-light' ).addClass( 'bg_orange' );
				delete titles[ type ];
				titles.splice( titles.indexOf( type ), 1 );
				
				
			}
			
			if ( num_of_amenities === 0 && type === 'amenity' ) {
				
				parent_title.removeClass( 'bg_green text-light' );
				delete titles[ type ];
				
				titles.splice( titles.indexOf( type ), 1 );
				
				
			}
		}
		
		var num_of_titles = Object.keys( titles ).length;
		
		/// IF FIRST 3 PARTS OF THE FORM ARE FILLED CORRECTLY  num_of_titles === 3 AND THIS IS TO LET USER CAN CONTINUE
		/// WITH THE FORM BY DISPLAYING NEXT STEP BUTTON
		
		if ( num_of_titles === 3 )  $( '#step_3' ).removeClass( 'd-none' );
		
	} );
	
	////// THIS IS TO INCREMENT num_of_prices AND num_of_boards ONLY IF IT IS NEW BOARD
	///// AND NOT IF THE USER IS EDITING PRICE ANOTHER TIME, SO WE CHECK IF PRICE INPUT FIELD HAS
	//// ANY VALUE ON FOCUS IN , AND IF HAS increment WILL BE FALSE, OTHERWISE IT IS NEW BOARD AND
	//// increment STAYS true
	var increment = true;
	
	$( document ).on( 'focusin', '.board_price', function () {
		if ( $( this ).val() !== '' ) {
			increment = false;
		}
	} ).on( 'focusout', '.board_price', function () {
		
		var price = $( this ).val();
		var c_box_id = $( this ).data( 'c_box_id' );
		
		if ( price > 0 ) {
			$( '#board_types_title' ).addClass( 'bg_green text-light' ).removeClass( 'bg_orange' );
			$( '#board_type_' + c_box_id ).addClass( 'bg_green text-light' ).removeClass( 'bg_orange' );
			
			if ( increment ) {
				num_of_prices++;
				num_of_boards++;
				
			}
			
		}
		else if ( price <= 0 ) {
			if ( num_of_prices > 0 ) num_of_prices--;
			if ( num_of_boards > 0 ) num_of_boards--;
			
			$( '#board_type_' + c_box_id ).removeClass( 'bg_green text-light' ).addClass( 'bg-secondary' );
			$( '#board_' + c_box_id ).prop( 'checked', false );
			$( '#board_price_' + c_box_id ).remove();
			
			if ( num_of_boards === 0 && num_of_prices === 0 ) {
				$( '#board_types_title' ).removeClass( 'bg_green text-light' ).addClass( 'bg_orange' );
				step_4.addClass( 'd-none' );
				increment = true;
				
			}
			
		}
		
		// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
		if ( num_of_prices > 0 && num_of_amenities > 0 && $( '#room_description' ).val().length > 0 ) {
			step_4.removeClass( 'd-none' );
		}
		
	} );
	$( document ).on( 'input', '#room_description', function () {
		
		var room_desc = $( '#room_description' );
		var remaining_characters = 300 - room_desc.val().length;
		var step_4 = $( '#step_4' );
		
		if ( remaining_characters === 300 ) {
			$( '#description_title' ).removeClass( 'bg_green text-light' );
			step_4.addClass( 'd-none' );
		}
		else {
			$( '#description_title' ).addClass( 'bg_green text-light' );
		}
		
		$( '#room_description_length' ).addClass( 'text-danger' ).html( remaining_characters );
		
		
		// ADDING STEP 4 BUTTON IF ALL CONDITIONS ARE MET
		if ( num_of_prices > 0 && num_of_amenities > 0 && room_desc.val().length > 0 ) {
			step_4.removeClass( 'd-none' );
		}
		
	} );
	
} )();

//FORM PROGRESS (STEPS) BUTTONS

$( document ).on( 'click', '.step', function () {
	
	var step = $( this ).data( 'step' );
	$('#progress_step_'+step).removeClass('empty');
	if ( step === 2 ) {
		
		
		$( '#step_' + ( step - 1 ) ).removeClass( 'd-none' );
		$( this ).removeClass( 'bg-success text-light' );

//		by clicking on map 60 characters added, so this is to clear it
		
		$( '#room_description' ).html( '' ).prop( 'placeholder', 'write something !' );
		
	}
	if( step === 4) $( '#step_5').removeClass( 'd-none' );
	
	if(step === 5)
	{
		$('#payment').append(`
<form id="add_room_payment" >
   <div class = "bg_green text-light text-center mt-1 mb-3" >
    Payment details : 99 EUR per year + 9 % of each booking.
	</div >
	<div class = "row" >
    <div class = "col-md-6" >
        <div class = "col-auto" >
            <label class = "sr-only" for = "total_price_" >Total price</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-credit-card" ></i >
                    </div >
                </div >
                <input type = "text" name = "total_price"
                       class = "form-control form-control-sm  border_bottom_only bg_green_light"
                       id = "total_price_" placeholder = ""
                       value = "99"
                       required readonly >
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only" for = "fullname" >Full Name</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-user" ></i >
                    </div >
                </div >
                <input type = "text" name = "name"
                       class = "form-control form-control-sm border_bottom_only"
                       id = "fullname" placeholder = "Full Name" required >
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only" for = "email_of_user" >Email</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-at" ></i >
                    </div >
                </div >
                <input type = "text" name = "email_of_user"
                       class = "form-control form-control-sm  border_bottom_only"
                       id = "email_of_user" placeholder = "Email" required >
            </div >
        </div >
    </div >
    <div class = "col-md-6" >
        <div class = "col-auto " >
            <label class = "sr-only" for = "card_holder_name" >Card Holder Name:</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-user" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm
							        			border_bottom_only" id = "card_holder_name" name = "card_holder_name"
                       placeholder = "Card Holder Name" required >
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only" for = "card_numder" >Card Number</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-credit-card" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                       id = "card_numder" placeholder = "Card Number" name = "card_number" required >
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only" for = "cvv" >CVV</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-credit-card" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                       id = "cvv" placeholder = "CVV" required name = "cvv" >
            </div >
        </div >
        <div class = "col-auto text-center" >
            <div id = "loader_holder" ></div >
            <button type = "submit" class = "btn bg_green_light horizontally_aligned right-block "
                    title = "Submit & Pay" >
                Pay
            </button >
        </div >
    </div >
</div >
</form>
   `);
	}
	
	
} );



