describe ( 'Preview room', () =>
{
	it ( 'click on tabs : about, gallery, amenities, availability, book and make sure tab-pane have content', () =>
	{
		cy.visit ( 'http://127.0.0.1:8000/index.html' );
		cy.wait ( 500 );
		cy.get ( '#close_initial_alert' ).click ();
		
		
		/*LOCATION WITH ROOMS*/
		
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
			          // COMPARE AND MAKE SURE THEY ARE DIFFERENT
			          cy.get ( '#form_search_results' )
			            .should ( ( $not_empty ) =>
			                      {
				                      expect (
					                      $not_empty.text () )
					                      .not.to.eq (
					                      empty );
			                      } );
			
			
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
			
			
		          } );
		
	} );
} );