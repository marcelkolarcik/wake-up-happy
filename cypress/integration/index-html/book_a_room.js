/*AS CYPRESS CLEARING LOCAL STORAGE AFTER
 * EACH TEST, THIS PACKAGE WILL PERSIST localStorage
 * BETWEEN THE TESTS*/
import "cypress-localstorage-commands";
import { book_room, search_for_room_in } from "../functions.js";


describe ( 'Book a room', () =>
{
	beforeEach ( () =>
	             {
		             cy.restoreLocalStorage ();
		
	             } );
	
	afterEach ( () =>
	            {
		            cy.saveLocalStorage ();
	            } );
	
	
	it ( 'will load index.html and close initial alert', () =>
	{
		cy.visit ( 'http://127.0.0.1:8000/index.html' );
		cy.wait ( 500 );
		
		/*CLOSE INITIAL ALERT*/
		cy.get ( '#close_alert' ).click ();
	} );
	
	it ( 'will search rooms in Cork as Cork has rooms to rent...;-)', () =>
	{
		search_for_room_in ( 'Cork' );
		
	} );
	
	book_room ( 14, 'property name 14' );
} );
