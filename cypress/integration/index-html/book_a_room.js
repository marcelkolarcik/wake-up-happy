import "cypress-localstorage-commands";
import { book_room } from "../functions.js";


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
	
	it ( 'will type Cork in location field as Cork has rooms to rent...;-)', () =>
	{
		/*AT THIS POINT THERE ARE NO SEARCH RESULTS*/
		cy.get ( '#form_search_results' )
		  .then ( ( $empty ) =>
		          {
			
			          const empty = $empty.text ();

//			TYPE IN LOCATION THAT HAVE ROOMS
			          cy.get ( '#location' ).type ( 'Cork' )
			            .should ( 'have.value', 'Cork' );


//			SEARCH FOR THE ROOM
			          cy.get ( '#search_btn' ).click ();
			
			          // GET SEARCH RESULTS AFTER SEARCH
			          // COMPARE AND MAKE SURE SEARCH RESULTS
			          // ARE NOT EMPTY
			          /*CHOOSING Cork WILL YIELD RESULTS*/
			          cy.get ( '#form_search_results' )
			            .should ( ( $not_empty ) =>
			                      {
				                      expect (
					                      $not_empty.text () )
					                      .not.to.eq (
					                      empty );
			                      } );
			
		          } );
		
	
		
	} );
	
	book_room ( 14 , 'property name 14' );
} );
