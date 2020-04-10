const url = 'http://127.0.0.1:8000/index.html';

describe ( 'Initial load of the site', () =>
{
	it (
		'it will check localStorage for initial data, fire alert to user and dismiss initial alert about localStorage',
		() =>
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
			
			
		}
	);
	
	it ( 'it will click on the marker to display room image', () =>
	{
		
		
		cy.get ( '#map_index' )
		  .click ();
		
	} );
} );