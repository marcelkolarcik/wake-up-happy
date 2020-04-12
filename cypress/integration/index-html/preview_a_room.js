/*AS CYPRESS CLEARING LOCAL STORAGE AFTER
* EACH TEST, THIS PACKAGE WILL PERSIST localStorage
* BETWEEN THE TESTS*/
import "cypress-localstorage-commands";
import { preview_room, search_for_room_in } from "../functions";

const url = 'http://127.0.0.1:8000/index.html';

describe ( 'Preview a room', () =>
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
		'it will load index.html, check localStorage for rooms, close initial alert',
		() =>
		{
			cy.visit ( url ).then ( () =>
			                        {
				                        /*INITIAL ALERT SHOULD BE VISIBLE*/
				                        cy.get ( '[data-cy_initial_alert=open]' )
				                          .should ( 'be.visible' );
				                        cy.wait ( 500 );
				
				                        /*localStorage SHOULD HAVE THIS DATA IN*/
				                        expect ( localStorage.getItem ( 'ROOMS_created' ) )
					                        .not.to.be.eq ( 'null' );
				                        expect ( localStorage.getItem ( 'ROOMS' ) )
					                        .not.to.be.eq ( 'null' );
				                        expect ( localStorage.getItem ( 'autocomplete_searchables' ) )
					                        .not.to.be.eq ( 'null' );
				
				                        /*USER SHOULD DISMISS ALERT*/
				                        cy.get ( '#close_alert' ).click ();
				                        cy.wait ( 500 );
				
			                        } );
			
			
		}
	);
	
	it (
		'it will search for rooms in Cork, should have results',
		() =>
		{
			
			search_for_room_in('Cork');
			
		}
	);
	
	it (
		'it will preview room with name "PROPERTY NAME 14" and see location on the map,'
		+ ' click the more... button on the room\'s popup to see preview above the map',
		() =>
		{
			
		preview_room(14);
		
		
			
		}
	);
} );