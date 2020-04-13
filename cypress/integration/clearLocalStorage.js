/*AS CYPRESS CLEARING LOCAL STORAGE AFTER
 * EACH TEST, THIS PACKAGE WILL PERSIST localStorage
 * BETWEEN THE TESTS*/
import "cypress-localstorage-commands";
import { check_mobile } from "../fixtures/functions";


const url = 'http://127.0.0.1:8000/index.html';

describe ( 'Clear localStorage', () =>
{
	
	
	
	it (
		'it will load index.html, check localStorage for rooms,should be created close initial alert',
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
					                        .not.to.be.eq ( null );
				                        expect ( localStorage.getItem ( 'ROOMS' ) )
					                        .not.to.be.eq ( null );
				                        expect ( localStorage.getItem ( 'autocomplete_searchables' ) )
					                        .not.to.be.eq ( null );
				
				                        /*USER SHOULD DISMISS ALERT*/
				                        cy.get ( '#close_alert' ).click ();
				                        cy.wait ( 500 );
				
			                        } );
			
			
			/*SAVE localStorage FOR NEXT TEST*/
			cy.saveLocalStorage ();
			
			
		}
	);
	
	it (
		'it will click on clear localStorage in navigation and check localStorage for rooms, should be cleared',
		() =>
		{
			
			cy.restoreLocalStorage ();
			check_mobile('mobile_nav_toggler');
			cy.get ( '[data-cy=user_nav]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			cy.wait(2000);
			
			cy.get ( '[data-cy=clear_localStorage]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.wait(1000);
			
			
			/*localStorage SHOULD NOT HAVE THIS DATA IN*/
			expect ( localStorage.getItem ( 'ROOMS_created' ) )
				.to.be.eq ( null );
			expect ( localStorage.getItem ( 'ROOMS' ) )
				.to.be.eq ( null );
			expect ( localStorage.getItem ( 'autocomplete_searchables' ) )
				.to.be.eq ( null );
			
		}
	);
	
	
} );