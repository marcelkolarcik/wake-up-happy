import {preview_room} from "../functions.js";


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
			          
			          /*CLOSE DIB=V ABOUT INITIAL LOCATIONS*/
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
			                  preview_room(14) );
			          
		          } );
		
	} );
} );