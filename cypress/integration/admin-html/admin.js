import "cypress-localstorage-commands";

const url = 'http://127.0.0.1:8000/index.html';


describe ( 'Adding new room to the site', () =>
{
	
	beforeEach ( () =>
	             {
		             cy.restoreLocalStorage ();
		
	             } );
	
	afterEach ( () =>
	            {
		            cy.saveLocalStorage ();
	            } );
	
	
	
	it (
		'it will try to log admin',
		() =>
		{
			
			cy.visit ( url ).then ( () =>{
				
				
				/*INITIAL ALERT SHOULD BE VISIBLE*/
				cy.get ( '[data-cy_initial_alert=open]' )
				  .should ( 'be.visible' );
				
				
				/*localStorage SHOULD HAVE THIS DATA IN*/
				expect ( localStorage.getItem ( 'ROOMS_created' ) )
					.not.to.be.eq ( 'null' );
				expect ( localStorage.getItem ( 'ROOMS' ) )
					.not.to.be.eq ( 'null' );
				expect ( localStorage.getItem ( 'autocomplete_searchables' ) )
					.not.to.be.eq ( 'null' );
				
				/*USER SHOULD DISMISS ALERT*/
				cy.get ( '#close_alert' ).click ();
				
				
				cy.get ( '[data-cy=user_nav]' )
				  .should ( 'be.visible' )
				  .scrollIntoView ()
				  .click ();
				
				
				
				cy.get ( '[data-cy=login]' )
				  .should ( 'be.visible' )
				  .click ();
				
				
				cy.get ( '[data-cy=email_of_user]' )
				  .should ( 'be.visible' )
				  .type ( 'admin@wuh.com' )
				  .should ( 'have.value', 'admin@wuh.com' );
				
				cy.wait ( 1000 );
				
				cy.get ( '[data-cy=password]' )
				  .should ( 'be.visible' )
				  .type ( 'password' )
				  .should ( 'have.value', 'password' );
				
				cy.wait ( 1000 );
				
				cy.get ( '[data-cy=log_user]' )
				  .should ( 'be.visible' )
				  .click ();
				
				cy.wait ( 1000 );
				
				
			});
			
			
			
			
		}
	);
	
	it (
		'it will try to preview room id 14',
		() =>
		{
		
		
		
		
		
		
		}
	);
});