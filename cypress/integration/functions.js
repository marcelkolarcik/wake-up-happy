export function preview_room(id)
	{
		
		/*CHECKOUT GALLERY*/
		cy.get ( `[data-cy=gallery_${id}]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=gallery_${id}]` )
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
			          cy.get ( `[data-cy=room_availability_${id}]` )
			            .should (
				            ( $content ) =>
				            {
					            expect ( $content.html () ).not.to.eq ( '' );
				            } );
		          } );
		
		
		/*CHECKOUT ABOUT*/
		cy.get ( `[data-cy=about_${id}]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=about_${id}]` )
			            .should (
				            ( $description ) =>
				            {
					            expect ( $description.text () ).not.to.eq ( '' );
				            } );
		          } );
		
		
		/*CHECKOUT AMENITIES*/
		cy.get ( `[data-cy=amenities_${id}]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=amenities_${id}]` )
			            .should (
				            ( $content ) =>
				            {
					            expect ( $content.html () ).not.to.eq ( '' );
				            } );
		          } );
		
		
		/*CHECKOUT BOOKING FORM*/
		cy.get ( `[data-cy=book_${id}]` ).click ()
		  .then ( () =>
		          {
			          cy.get ( `[data-cy_tab_pane=book_${id}]` )
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
		if(id === 14)
			{
				cy.get ( `[data-cy=room_on_map_${id}]` ).click ()
				  .then ( () =>
				          {
					          /*ROOM'S POPUP SHOULD OPEN
					           * AND more... BUTTON SHOULD BE
					           * VISIBLE*/
					          cy.get ( `[data-cy=room_map_popup_${id}]` )
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
							                              cy.get ( `[data-cy=room_map_popup_${id}]` )
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
			}
		
	}