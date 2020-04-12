const url = 'http://127.0.0.1:8000/index.html';

describe ( 'Map search', () =>
{
	
	it ( 'it will click on the marker on the map, to display room\'s popup', () =>
	{
		cy.visit ( url ).then ( () =>
		                        {
			                        /*INITIAL ALERT SHOULD BE VISIBLE*/
			                        cy.get ( '[data-cy_initial_alert=open]' )
			                          .should ( 'be.visible' );
			
			
			                        /*USER SHOULD DISMISS ALERT*/
			                        cy.get ( '#close_alert' ).click ();
			                        cy.wait ( 500 );
			
			
		                        } );
		
		cy.get ( '#map_index' )
		  .click ()
		  .then ( () =>
		          {
			          cy.get ( '[ data-cy_=room_popup]' )
			            .should ( 'be.visible' );
		          } );
		
	} );
} );