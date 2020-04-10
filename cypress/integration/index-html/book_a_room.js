describe ( 'Book a room', () =>
{
	it ( 'it will try to book a room without selecting board first, and then it will try to book a room without inputing customer details and then it will book the room', () =>
	{
		cy.visit ( 'http://127.0.0.1:8000/index.html' );
		cy.wait ( 500 );
		
		/*CLOSE INITIAL ALERT*/
		cy.get ( '#close_alert' ).click ();
		
		/*AT THIS POINT THERE ARE NO SEARCH RESULTS*/
		cy.get ( '#form_search_results' )
		  .then ( ( $empty ) =>
		          {
			
			          const empty = $empty.text ();

//			TYPE IN LOCATION THAT HAVE ROOMS
			          cy.get ( '#location' ).type ( 'Cork' )
			            .should ( 'have.value', 'Cork' );


//			SEARCH FOR THE ROOM
			          cy.get ( '#search_btn' ).click ();
			
			          // GET SEARCH RESULTS AFTER SEARCH
			          // COMPARE AND MAKE SURE SEARCH RESULTS
			          // ARE NOT EMPTY
			          /*CHOOSING Cork WILL YIELD RESULTS*/
			          cy.get ( '#form_search_results' )
			            .should ( ( $not_empty ) =>
			                      {
				                      expect (
					                      $not_empty.text () )
					                      .not.to.eq (
					                      empty );
			                      } );
			
			
			          /*CLICK ON AVAILABILITY TAB*/
			          cy.get ( '[data-cy=availability_14]' ).click ()
			            .then ( () =>
			                    {
				                    cy.get ( '[data-cy=room_availability_14]' )
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
			          cy.get ( '[data-cy_week=1_14]' ).click ()
			            .then ( () =>
			                    {
				
				                    /*ALERT INFORMING USER TO SELECT
				                     BOARD FIRST SHOULD BE VISIBLE*/
				                    cy.get ( '[data-cy=dismiss_alert]' )
				                      .should ( 'be.visible' )
				                      .then ( () =>
				                              {
					                              /*AND WE WILL CLOSE IT*/
					                              cy.get ( '#close_alert' ).click ();
				                              } );
				
				
			                    } );
			
			
			          /*SELECT THE BOARD AND WEEKS*/
			          cy.get ( '[data-cy_board=0_14]' ).click ()
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
				                    cy.get ( '[data-cy_week=1_14]' ).click ();
				
				                    /*OTHER WEEKS COULD BE BOOKED OUT AS
				                     * BOOKINGS FOR THE ROOM ARE CREATED
				                     * DYNAMIC AND RANDOMLY*/
				                    cy.get ( '[data-cy_week=20_14]' ).click ();
				
				                    cy.get ( '[data-cy_week=21_14]' ).click ();
				
				                    cy.get ( '[data-cy_week=22_14]' ).click ();
				
				                    cy.get ( '[data-cy_week=23_14]' ).click ();
				
				                    cy.get ( '[data-cy_week=24_14]' ).click ();
				
				                    cy.get ( '[data-cy_week=25_14]' ).click ();
				
				                    cy.get ( '[data-cy_week=26_14]' ).click ();
			                    } );
			
			
			          /*CLICK ON BOOK TAB*/
			          cy.get ( '[data-cy=book_14]' ).click ();
			
			          /*WE SHOULD SEE THE BOOKING FORM
			           *
			           *  AND
			           *  DEFINED VALUES FOR room_name, board_type
			           *  AND SOME VALUES weeks_booked, total_price*/
			          cy.get ( '[data-cy_tab_pane=book_14]' )
			            .should ( ( $content ) =>
			                      {
				                      expect (
					                      $content.html () )
					                      .not.to.eq ( '' );
				
			                      } ).then ( () =>
			                                 {
				                                 /*AND ROOM NAME SHOULD BE property name 14*/
				                                 cy.get ( '[data-cy=room_name_14]' )
				                                   .should ( ( $property_name ) =>
				                                             {
					                                             expect (
						                                             $property_name.val () )
						                                             .to.eq ( 'property name 14' );
				                                             } );
				
				                                 /*AND WE SHOULD HAVE SOME WEEKS BOOKED
				                                  * AT LEAST 1,*/
				                                 cy.get ( '[data-cy=weeks_booked_14]' )
				                                   .should ( ( $weeks_booked ) =>
				                                             {
					                                             expect (
						                                             $weeks_booked.val () )
						                                             .not.to.eq ( '' );
				                                             } );
				
				                                 /*AND WE SHOULD HAVE BOARD SELECTED
				                                  *
				                                  * Room only*/
				                                 cy.get ( '[data-cy=selected_board_14]' )
				                                   .should ( ( selected_board ) =>
				                                             {
					                                             expect (
						                                             selected_board.val () )
						                                             .to.eq ( 'Room only' );
				                                             } );
				
				                                 /*AND WE SHOULD HAVE TOTAL PRICE
				                                  *NOT EMPTY
				                                  * */
				                                 cy.get ( '[data-cy=total_price_14]' )
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
			          cy.get ( '[data-cy=pay_for_booking_14]' ).click ()
			            .then ( () =>
			                    {
				                    /*ALERT INFORMING TO FILL REQUIRED FIELDS
				                     SHOULD BE VISIBLE*/
				                    cy.get ( '[data-cy=required_fields_missing]' )
				                      .should ( 'be.visible' )
				                      .then ( () =>
				                              {
					                              cy.get ( '[data-cy=dismiss_alert]' )
					                                .click ();
				                              } );
				
			                    } )
			
			            /*WE WILL FILL REQUIRED FIELDS
			             * AND ONLY ONE OPTIONAL FIELD request*/
			            .then ( () =>
			                    {
				
				
				                    cy.get ( '[data-cy=customer_name_14]' ).type ( 'Marcel Kolarcik' )
				                      .should ( 'have.value', 'Marcel Kolarcik' );
				
				
				                    cy.get ( '[data-cy=customer_email_14]' ).type ( 'marcel@wuh' )
				                      .should ( 'have.value', 'marcel@wuh' );
				
				
				                    cy.get ( '[data-cy=card_holder_name_14]' ).type ( 'Marcel Kolarcik' )
				                      .should ( 'have.value', 'Marcel Kolarcik' );
				
				
				                    cy.get ( '[data-cy=card_number_14]' ).type ( '1234567890123456' )
				                      .should ( 'have.value', '1234567890123456' );
				
				
				                    cy.get ( '[data-cy=card_cvv_14]' ).type ( '123' )
				                      .should ( 'have.value', '123' );
				
				
				                    cy.get ( '[data-cy=request_14]' ).type (
					                    'Can I have breakfast at 6:30 am sharp, please!' )
				                      .should ( 'have.value', 'Can I have breakfast at 6:30 am sharp, please!' );
				
				
				                    /*PAY FOR THE ROOM*/
				                    cy.get ( '[data-cy=pay_for_booking_14]' ).click ()
					                    .then(()=>{
						                    /*ALERT INFORMING TO FILL REQUIRED FIELDS
						                     SHOULD BE VISIBLE*/
						                    cy.get ( '[data-cy=booking_confirmation_14]' )
						                      .should ( 'be.visible' )
						                      .then ( () =>
						                              {
							                              cy.get ( '[data-cy=dismiss_alert]' )
							                                .click ();
						                              } );
					                    });
			                    } );
			
			
		          } );
		
		
	} );
	
} );
