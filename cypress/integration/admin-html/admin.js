import "cypress-localstorage-commands";
import { search_for_room_in, preview_room, room } from "../functions.js";


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
		'it will preview rooms in Cork,room id 14 with name "PROPERTY NAME 14" should be in search results',
		() =>
		{
			
			
			cy.visit ( url )
			  .then ( () =>
			          {
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
				
				
				          search_for_room_in ( 'Cork' );
				
				          cy.get ( '[data-cy=room_id_14]' )
				            .should ( 'be.visible' )
				            .scrollIntoView ();
				
				
				          cy.wait ( 2000 );
				
			          } );
			
			
		}
	);
	
	it (
		'it will try to log admin in',
		() =>
		{
			
			cy.visit ( url ).then ( () =>
			                        {
				
				
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
				
				
			                        } );
			
			
		}
	);
	
	it (
		'it will preview room id 14',
		() =>
		{
			
			cy.get ( '[ data-cy=preview_added_room_14]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ()
			  .then ( () =>
			          {
				
				          preview_room ( 14, true );
				
			          } )
			  .then ( () =>
			          {
				          cy.wait ( 1000 );
				          cy.get ( '[data-cy=close_preview]' )
				            .should ( 'be.visible' )
				            .scrollIntoView ()
				            .click ();
			          } );
			
			
		}
	);
	
	it (
		'it will disable room id 14',
		() =>
		{
			
			room ( 14, 'disable' );
			
			
		}
	);
	it (
		'it will preview rooms in Cork and room id 14 with name "PROPERTY NAME 14" shouldn\'t be in search results, because it is disabled!',
		() =>
		{
			
			
			cy.visit ( url )
			  .then ( () =>
			          {
				
				
				          search_for_room_in ( 'Cork' );
				
				          cy.get ( '[data-cy=room_id_14]' )
				            .should ( 'not.be.visible' );
				
				          cy.get ( '[data-cy=search_results]' )
				            .should ( 'be.visible' )
				            .scrollIntoView ();
				
				
				          cy.wait ( 2000 );
				
			          } );
			
			
		}
	);
	
	it ( 'it will enable room_id 14 with name "PROPERTY NAME 14" ', () =>
	{
		
		
		cy.visit ( 'http://127.0.0.1:8000/admin.html' )
		  .then ( () =>
		          {
			          room ( 14, 'enable' );
		          } );
		
	} );
	
	it (
		'it will search for rooms in Cork and room with name "PROPERTY NAME 14" should be in search results, because i was re-enabled!',
		() =>
		{
			
			
			cy.visit ( 'http://127.0.0.1:8000/index.html' )
			  .then ( () =>
			          {
				          search_for_room_in ( 'Cork' );
				          
				          cy.get ( '[data-cy=room_id_14]' )
				            .should ( 'be.visible' )
				            .scrollIntoView ();
				
				
				          cy.wait ( 2000 );
			          } );
			
			
		}
	);
} );

