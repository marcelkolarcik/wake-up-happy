describe ( 'Preview room', () =>
{
	it ( 'click on tabs : about, gallery, amenities, availability, book and make sure tab-pane have content', () =>
	{
		cy.visit ( 'http://127.0.0.1:8000/index.html' );
		cy.wait ( 500 );
		cy.get ( '[data-cy=dismiss_alert]' ).click ();
		
		
		/*LOCATION WITH ROOMS*/
		
		cy.get ( '#form_search_results' )
		  .then ( ( $empty ) =>
		          {
			
			          const empty = $empty.html ();
			          /*SEARCH RESULTS SHOULD BE EMPTY*/
			          expect ( empty )
				          .to.eq ( '' );

//			TYPE IN LOCATION THAT HAVE ROOMS
			          cy.get ( '#location' ).type ( 'Cork' )
			            .should ( 'have.value', 'Cork' );
			          
			          cy.get('[data-cy=initial_locations]')
			            .should('be.visible')
			            .then(()=>{
			            	cy.get('[data-cy=dont_show_again]')
				              .should('be.visible')
				              .click()
					           
			            });
			
			
			          //			SEARCH FOR THE ROOM
			          cy.get ( '#search_btn' ).click ()
			            .then ( () =>
			                    {
				                    // GET SEARCH RESULTS AFTER SEARCH
				                    // COMPARE AND MAKE SURE THEY ARE DIFFERENT => WE HAVE SEARCH RESULTS
				                    cy.get ( '#form_search_results' )
				                      .should ( ( $not_empty ) =>
				                                {
					                                expect (
						                                $not_empty.html () )
						                                .not.to.eq (
						                                empty );
				                                } );
			                    } )
			            .then ( () =>
			                    {
				
				                    /*CHECKOUT GALLERY*/
				                    cy.get ( '[data-cy=gallery_14]' ).click ()
				                      .then ( () =>
				                              {
					                              cy.get ( '[data-cy_tab_pane=gallery_14]' )
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
				                    cy.get ( '[data-cy=availability_14]' ).click ()
				                      .then ( () =>
				                              {
					                              cy.get ( '[data-cy=room_availability_14]' )
					                                .should (
						                                ( $content ) =>
						                                {
							                                expect ( $content.html () ).not.to.eq ( '' );
						                                } );
				                              } );
				
				
				                    /*CHECKOUT ABOUT*/
				                    cy.get ( '[data-cy=about_14]' ).click ()
				                      .then ( () =>
				                              {
					                              cy.get ( '[data-cy_tab_pane=about_14]' )
					                                .should (
						                                ( $description ) =>
						                                {
							                                expect ( $description.text () ).not.to.eq ( '' );
						                                } );
				                              } );
				
				
				                    /*CHECKOUT AMENITIES*/
				                    cy.get ( '[data-cy=amenities_14]' ).click ()
				                      .then ( () =>
				                              {
					                              cy.get ( '[data-cy_tab_pane=amenities_14]' )
					                                .should (
						                                ( $content ) =>
						                                {
							                                expect ( $content.html () ).not.to.eq ( '' );
						                                } );
				                              } );
				
				
				                    /*CHECKOUT BOOKING FORM*/
				                    cy.get ( '[data-cy=book_14]' ).click ()
				                      .then ( () =>
				                              {
					                              cy.get ( '[data-cy_tab_pane=book_14]' )
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
				                    cy.get ( '[data-cy=room_on_map_14]' ).click ()
				                      .then ( () =>
				                              {
					                              /*ROOM'S POPUP SHOULD OPEN
					                               * AND more... BUTTON SHOULD BE
					                               * VISIBLE*/
					                              cy.get ( '[data-cy=room_map_popup_14]' )
					                                .should ( 'be.visible' )
					                                .then ( () =>
					                                        {
						
						                                        /*map_search_result DIV SHOULD BE EMPTY*/
						                                        cy.get ( '[data-cy=map_search_result]' )
						                                          .then ( ( $empty_map_search ) =>
						                                                  {
							                                                 
							                                                  const empty_search = $empty_map_search.html ();
							                                                  
							                                                  expect (
								                                                  empty_search )
								                                                  .to.eq (
								                                                  '' );
							
							                                                  /*WE WILL CLICK ON THE more... BUTTON TO DISPLAY
							                                                   * ROOM PREVIEW ABOVE THE MAP*/
							                                                  cy.get ( '[data-cy=room_map_popup_14]' )
							                                                    .click ()
							                                                    .then ( () =>
							                                                            {
								                                                            /*DIV HOLDING THE ROOM PREVIEW
								                                                             * SHOULD NOT BE EMPTY*/
								                                                            cy.get (
									                                                            '[data-cy=map_search_result]' )
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
			                    } );
			          
		          } );
		
	} );
} );