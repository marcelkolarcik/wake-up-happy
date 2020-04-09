const url = 'http://127.0.0.1:8000/index.html';

describe ( 'Initial load of the site', () =>
{
	it ( 'it will check localStorage for initial data, fire alert to user and dismiss initial alert about localStorage', () =>
	{
		cy.visit ( url ).then(()=>
		                      {
		                      	/*INITIAL ALERT SHOULD BE VISIBLE*/
		                      	  cy.get('[data-cy_initial_alert=open]')
		                            .should('be.visible');
			                      cy.wait ( 500 );
			
			                      /*localStorage SHOULD HAVE THIS DATA IN*/
			                      expect(localStorage.getItem('ROOMS_created'))
				                      .not.to.be.eq('null');
			                      expect( localStorage.getItem('ROOMS'))
				                      .not.to.be.eq('null');
			                      expect( localStorage.getItem('autocomplete_searchables'))
				                      .not.to.be.eq('null');
			                      
			                      /*USER SHOULD DISMISS ALERT*/
			                      cy.get ( '#close_initial_alert' ).click ();
			                      cy.wait ( 500 );
			                      
		                      })
		
		
		
		
	} );
} );