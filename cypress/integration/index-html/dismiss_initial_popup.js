const url = 'http://127.0.0.1:8000/index.html';

describe ( 'Dismiss initial popup', () =>
{
	it ( 'it will dismiss initial popup about localStorage', () =>
	{
		cy.visit ( url );
		cy.wait ( 500 );
		cy.get ( '#close_initial_alert' ).click ();
		
	} );
} );