export function preview_room ( id )
	{
		
		/*CHECKOUT GALLERY*/
		cy.get ( `[data-cy=gallery_${ id }]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=gallery_${ id }]` )
			            .should ( ( $content ) =>
			                      {
				                      expect (
					                      $content.html () )
					                      .not.to
					                      .eq (
						                      '' );
			                      } );
		          } );
		
		
		/*CHECKOUT AVAILABILITY*/
		cy.get ( `[data-cy=availability_${ id }]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy=room_availability_${ id }]` )
			            .should (
				            ( $content ) =>
				            {
					            expect ( $content.html () ).not.to.eq ( '' );
				            } );
		          } );
		
		
		/*CHECKOUT ABOUT*/
		cy.get ( `[data-cy=about_${ id }]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=about_${ id }]` )
			            .should (
				            ( $description ) =>
				            {
					            expect ( $description.text () ).not.to.eq ( '' );
				            } );
		          } );
		
		cy.wait ( 2000 );
		/*CHECKOUT AMENITIES*/
		cy.get ( `[data-cy=amenities_${ id }]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=amenities_${ id }]` )
			            .should (
				            ( $content ) =>
				            {
					            expect ( $content.html () ).not.to.eq ( '' );
				            } );
		          } );
		
		cy.wait ( 2000 );
		/*CHECKOUT BOOKING FORM*/
		cy.get ( `[data-cy=book_${ id }]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=book_${ id }]` )
			            .should ( ( $content ) =>
			                      {
				                      expect (
					                      $content.html () )
					                      .not.to
					                      .eq (
						                      '' );
			                      } );
		          } );
		
		/*CLICK ON MARKER UNDER ROOM IMAGE
		 * TO SEE ROOM'S LOCATION AND POPUP
		 * ON THE MAP*/
		if ( id === 14 )
			{
				cy.get ( `[data-cy=room_on_map_${ id }]` ).click ()
				  .then ( () =>
				          {
					          /*ROOM'S POPUP SHOULD OPEN
					           * AND more... BUTTON SHOULD BE
					           * VISIBLE*/
					          cy.get ( `[data-cy=room_map_popup_${ id }]` )
					            .should ( 'be.visible' )
					            .then ( () =>
					                    {
						
						                    /*map_search_result DIV SHOULD BE EMPTY*/
						                    cy.get ( `[data-cy=map_search_result]` )
						                      .then ( ( $empty_map_search ) =>
						                              {
							
							                              const empty_search = $empty_map_search.html ();
							
							                              expect (
								                              empty_search )
								                              .to.eq (
								                              '' );
							
							                              /*WE WILL CLICK ON THE more... BUTTON TO DISPLAY
							                               * ROOM PREVIEW ABOVE THE MAP*/
							                              cy.get ( `[data-cy=room_map_popup_${ id }]` )
							                                .click ()
							                                .then ( () =>
							                                        {
								                                        /*DIV HOLDING THE ROOM PREVIEW
								                                         * SHOULD NOT BE EMPTY*/
								                                        cy.get (
									                                        `[data-cy=map_search_result]` )
								                                          .should (
									                                          ( $map_search ) =>
									                                          {
										                                          expect (
											                                          $map_search.html () )
											                                          .not.to.eq (
											                                          empty_search );
									                                          } );
							                                        } );
							
						                              } );
						
					                    } );
				          } );
			}
		
	}


export function book_room ( id, property )
	{
		it (
			'it will try to book a room without selecting board first, and then it will try to book a room without inputing customer details and then it will book the room',
			() =>
			{
				
				
				/*CLICK ON AVAILABILITY TAB*/
				cy.get ( `[data-cy=availability_${ id }]` ).click ()
				  .then ( () =>
				          {
					          cy.get ( `[data-cy=room_availability_${ id }]` )
					            .should (
						            ( $content ) =>
						            {
							            /*WE SHOULD SEE CALENDAR WITH WEEKS*/
							            expect ( $content.html () ).not.to.eq ( '' );
						            } );
				          } );
				
				
				/*TRY TO SELECT WEEK #1, BEFORE SELECTING BOARD
				 * AND YOU SHOULD SEE ALERT ABOUT SELECTING
				 * BOARD FIRST
				 *
				 * WEEK #1 IS NEVER SET AS BOOKED OUT
				 * ON INITIAL CREATION OF THE ROOMS OBJECT
				 *
				 * OTHER WEEKS COULD BE BOOKED OUT AND
				 * WE WOULDN'T HAVE ALERT FIRING*/
				
				
				/*CLICK ON WEEK FIRST, BEFORE SELECTING
				 * BOARD TYPE FOR THE ALERT TO POP
				 * INFORMING ABOUT NEED TO SELECT
				 * BOARD FIRST*/
				cy.get ( `[data-cy_week=1_${ id }]` ).click ()
				  .then ( () =>
				          {
					
					          /*ALERT INFORMING USER TO SELECT
					           BOARD FIRST SHOULD BE VISIBLE*/
					          cy.get ( `[data-cy=dismiss_alert]` )
					            .should ( 'be.visible' )
					            .then ( () =>
					                    {
						                    /*AND WE WILL CLOSE IT*/
						                    cy.get ( '#close_alert' ).click ();
					                    } );
					
					
				          } );
				
				
				/*SELECT THE BOARD AND WEEKS*/
				cy.get ( `[data-cy_board=0_${ id }]` ).click ()
				  .then ( () =>
				          {
					
					          /*AND SELECT SOME WEEKS TO BOOK*/
					
					          /*WEEK 1 IS GUARANTEED NOT TO BE BOOKED
					           * SO THAT WE CAN CHECK THAT WE HAVE
					           * AT LEAST ONE WEEK SELECTED
					           *
					           * BECAUSE IF THE OTHER WEEKS ARE BOOKED OUT
					           * EVEN IF WE CLICK ON THEM
					           * WE CAN'T SELECT THEM AND
					           * WE WOULDN'T SEE THEM IN BOOKING FORM
					           * */
					          cy.get ( `[data-cy_week=1_${ id }]` ).click ();
					
					          /*OTHER WEEKS COULD BE BOOKED OUT AS
					           * BOOKINGS FOR THE ROOM ARE CREATED
					           * DYNAMIC AND RANDOMLY*/
					          cy.get ( `[data-cy_week=20_${ id }]` ).click ();
					
					          cy.get ( `[data-cy_week=21_${ id }]` ).click ();
					
					          cy.get ( `[data-cy_week=22_${ id }]` ).click ();
					
					          cy.get ( `[data-cy_week=23_${ id }]` ).click ();
					
					          cy.get ( `[data-cy_week=24_${ id }]` ).click ();
					
					          cy.get ( `[data-cy_week=25_${ id }]` ).click ();
					
					          cy.get ( `[data-cy_week=26_${ id }]` ).click ();
				          } );
				
				
				/*CLICK ON BOOK TAB*/
				cy.get ( `[data-cy=book_${ id }]` ).click ();
				
				/*WE SHOULD SEE THE BOOKING FORM
				 *
				 *  AND
				 *  DEFINED VALUES FOR room_name, board_type
				 *  AND SOME VALUES weeks_booked, total_price`*/
				cy.get ( `[data-cy_tab_pane=book_${ id }]` )
				  .should ( ( $content ) =>
				            {
					            expect (
						            $content.html () )
						            .not.to.eq ( '' );
					
				            } )
				  .then ( () =>
				          {
					          /*AND ROOM NAME SHOULD BE property name 14*/
					          cy.get ( `[data-cy=room_name_${ id }]` )
					            .should ( ( $property_name ) =>
					                      {
						                      expect (
							                      $property_name.val () )
							                      .to.eq ( property );
					                      } );
					
					          /*AND WE SHOULD HAVE SOME WEEKS BOOKED
					           * AT LEAST 1,*/
					          cy.get ( `[data-cy=weeks_booked_${ id }]` )
					            .should ( ( $weeks_booked ) =>
					                      {
						                      expect (
							                      $weeks_booked.val () )
							                      .not.to.eq ( '' );
					                      } );
					
					          /*AND WE SHOULD HAVE BOARD SELECTED
					           *
					           * Room only*/
					          cy.get ( `[data-cy=selected_board_${ id }]` )
					            .should ( ( selected_board ) =>
					                      {
						                      expect (
							                      selected_board.val () )
							                      .to.eq ( 'Room only' );
					                      } );
					
					          /*AND WE SHOULD HAVE TOTAL `${type}`
					           *NOT EMPTY
					           * */
					          cy.get ( `[data-cy=total_price_${ id }]` )
					            .should ( ( total_price ) =>
					                      {
						                      expect (
							                      total_price.val () )
							                      .not.to.eq ( '' );
					                      } );
				          } );
				
				
				/*TRY AND BOOK WITHOUT FILLING REQUIRED FIELDS
				 *
				 * ALERT SHOULD POP AND WE WILL DISMISS IT*/
				cy.get ( `[data-cy=pay_for_booking_${ id }]` ).click ()
				  .then ( () =>
				          {
					          /*ALERT INFORMING TO FILL REQUIRED FIELDS
					           SHOULD BE VISIBLE*/
					          cy.get ( `[data-cy=required_fields_missing]` )
					            .should ( 'be.visible' )
					            .then ( () =>
					                    {
						                    cy.get ( `[data-cy=dismiss_alert]` )
						                      .click ();
					                    } );
					
				          } )
				
				  /*WE WILL FILL REQUIRED FIELDS
				   * AND ONLY ONE OPTIONAL FIELD request*/
				  .then ( () =>
				          {
					
					
					          cy.get ( `[data-cy=customer_name_${ id }]` ).type ( 'First Customer' )
					            .should ( 'have.value', 'First Customer' );
					
					
					          cy.get ( `[data-cy=customer_email_${ id }]` ).type ( 'first@wuh.com' )
					            .should ( 'have.value', 'first@wuh.com' );
					
					
					          cy.get ( `[data-cy=card_holder_name_${ id }]` ).type ( 'First Customer' )
					            .should ( 'have.value', 'First Customer' );
					
					
					          cy.get ( `[data-cy=card_number_${ id }]` ).type ( '1234567890123456' )
					            .should ( 'have.value', '1234567890123456' );
					
					
					          cy.get ( `[data-cy=card_cvv_${ id }]` ).type ( '123' )
					            .should ( 'have.value', '123' );
					
					
					          cy.get ( `[data-cy=request_${ id }]` ).type (
						          'Can I have breakfast at 6:30 am sharp, please!' )
					            .should ( 'have.value', 'Can I have breakfast at 6:30 am sharp, please!' );
					
					
					          /*PAY FOR THE ROOM*/
					          cy.get ( `[data-cy=pay_for_booking_${ id }]` ).click ()
					            .then ( () =>
					                    {
						
						                    /*ALERT INFORMING TO FILL REQUIRED FIELDS
						                     SHOULD BE VISIBLE*/
						                    cy.get ( `[data-cy=booking_confirmation_${ id }]` )
						                      .should ( 'be.visible' )
						                      .scrollIntoView ()
						                      .then ( () =>
						                              {
							                              cy.wait ( 2000 );
							                              cy.get ( `[data-cy=dismiss_alert]` )
							                                .click ();
						                              } );
					                    } );
				          } );
				
				
			}
		);
		
		
	}


export function select_board ( type, price )
	{
		var types = {
			0 : 'Room Only',
			1 : 'B&B',
			2 : 'B&D',
			3 : 'All Inclusive'
		};
		
		it ( `it will select ${ types[ type ] } board`, () =>
		{
			/*INITIAL COLOR OF IMAGES'S FOOTER
			 *   bg_green_dark
			 *
			 * SHOULD CHANGE UPON INTERACTION
			 *
			 * TO bg_orange  WHEN BOARD SELECTED
			 *
			 * AND TO bg_green WHEN  board IS SELECTED*/
			cy.get ( `[data-cy=board_type_footer_${ type }]` )
			  .should ( 'have.class', 'bg_green_dark' );
			
			
			cy.get ( `[data-cy=board_type_${ type }]` )
			  .should ( 'be.visible' )
			
			  .click ()
			  .then ( () =>
			          {
				          cy.get ( `[data-cy=board_type_footer_${ type }]` )
				            .should ( 'have.class', 'bg_orange' );
			          } )
			;
			
			
			cy.wait ( 1000 );
		} );
		
		it (
			`it will check, that input field for the ${ types[ type ] } board is visible, it should be, because we selected board`,
			() =>
			{
				cy.get ( `[data-cy=board_price_${ type }]` )
				  .should ( 'be.visible' );
				
				
			}
		);
		
		it ( `it will type price for the ${ types[ type ] } board`, () =>
		{
			cy.get ( `[data-cy=board_price_${ type }]` )
			  .should ( 'be.visible' )
			  .type ( `${ price }` )
			  .should ( 'have.value', `${ price }` )
			  .then ( () =>
			          {
				          cy.get ( `[data-cy=board_type_footer_${ type }]` )
				            .should ( 'have.class', 'bg_green' );
			          } );
			
			cy.get ( '[data-cy=board_type_title]' ).scrollIntoView ()
			  .should ( 'be.visible' );
			
			cy.wait ( 1000 );
			
		} );
		
		it ( `it will clear price for the ${ types[ type ] }, image\' footer color should change to dark green`, () =>
		{
			cy.get ( `[data-cy=board_price_${ type }]` )
			  .should ( 'be.visible' )
			  .clear ()
			  .then ( () =>
			          {
				          cy.get ( `[data-cy=board_type_footer_${ type }]` )
				            .should ( 'have.class', 'bg_green_dark' );
			          } );
			
			cy.get ( '[data-cy=board_type_title]' ).scrollIntoView ()
			  .should ( 'be.visible' );
			
			cy.wait ( 1000 );
			
		} );
		
		it ( `it will re-select ${ types[ type ] } board, image\' footer color should change to bg_orange`, () =>
		{
			cy.get ( `[data-cy=board_type_${ type }]` )
			  .should ( 'be.visible' )
			  .should ( 'be.visible' )
			  .click ()
			  .then ( () =>
			          {
				          cy.get ( `[data-cy=board_type_footer_${ type }]` )
				            .should ( 'have.class', 'bg_orange' );
			          } );
			
			cy.wait ( 1000 );
			
			
		} );
		
		it ( `it will re-type price for the ${ types[ type ] } board`, () =>
		{
			cy.get ( `[data-cy=board_price_${ type }]` )
			  .should ( 'be.visible' )
			  .type ( `${ price }` )
			  .should ( 'have.value', `${ price }` )
			  .then ( () =>
			          {
				          cy.get ( `[data-cy=board_type_footer_${ type }]` )
				            .should ( 'have.class', 'bg_green' );
			          } );
			
			cy.get ( '[data-cy=board_type_title]' ).scrollIntoView ()
			  .should ( 'be.visible' );
			
			cy.wait ( 1000 );
			
		} );
	}

function check_correct_info ( wait, step )
	{
		var step_gifs = {
			preview_mode : 'edit_mode',
			edit_mode:'edit_mode',
			block_mode:'block_mode',
			add_mode:'location',
			location:'location',
			room:'room',
			services:'services',
			preview:'edit_mode',
			payment:'payment'
		};
		
		cy.get ( `[data-cy=instruction_${step_gifs[step]}]` )
		  .should ( 'be.visible' );
	}

function open_how_to ( wait , step)
	{
		
		
		
		cy.get ( '[data-cy=how_to]' )
		  .should ( 'be.visible' )
		  .click ();
		cy.wait ( wait );
		
		
		check_correct_info ( wait, step );
	}


function close_how_to ()
	{
		cy.get ( '[data-cy=close_how_to]' ).scrollIntoView ()
		  .should ( 'be.visible' )
		  .click ();
	}


export function preview_how_to ( wait, step )
	{
		
		
		it ( 'will click on how to button and check correct info to see and display it', () =>
		{
			open_how_to ( wait , step);
		} );
		it ( 'will close instruction', () =>
		{
			close_how_to ();
		} );
	}