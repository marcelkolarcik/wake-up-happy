import { search_for_room_in } from "../functions.js";


describe ( 'Searching for the room - several scenarios', () =>
{
	
	beforeEach ( () =>
	             {
		             /*RELOAD PAGE*/
		             cy.visit ( 'http://127.0.0.1:8000/index.html' );
		             cy.wait ( 500 );
		             cy.get ( '[data-cy=dismiss_alert]' )
		               .should ( 'be.visible' )
		               .click ();
	             } );
	
	it ( 'it will try to search for the room without selecting location', () =>
	{
		
		
		/*LOCATION WITHOUT ROOMS*/
		
		cy.get ( '#form_search_results' )
		  .then ( () =>
		          {
			
			
			          /*CLICK ON SEARCH BUTTON WITHOUT SELECTING LOCATION*/
			          cy.get ( '#search_btn' )
			            .should ( 'be.visible' )
			            .click ();
			
			          cy.get ( '#location' )
			            .should ( 'have.class', 'bg-warning' );
			
			
		          } );
		
		cy.get ( '#location' ).scrollIntoView ();
		cy.wait ( 2000 );
	} );
	
	it ( 'it will try to search for the room in location without the rooms - Tokyo, should not get results', () =>
	{
		
		search_for_room_in ( 'Tokyo' );
		
		cy.wait ( 2000 );
		
		
	} );
	
	it ( 'it will try to search for the room in location with the rooms - Cork, should get results', () =>
	{
		
		search_for_room_in ( 'Cork' );
		cy.wait ( 2000 );
		
		
	} );
	
	it ( 'It will search for the rooms in Cork with weeks, boards,room type selected, should get results', () =>
	{
		
		
		/*LOCATION WITH ROOMS*/
		
		cy.get ( '#form_search_results' )
		  .then ( ( $empty ) =>
		          {
			
			
			          const empty = $empty.text ();

//			TYPE IN LOCATION THAT HAVE ROOMS
			          cy.get ( '#location' )
			            .should ( 'be.visible' )
			            .clear ()
			            .type ( 'Cork' )
			            .should ( 'have.value', 'Cork' );
			          cy.wait ( 500 );


//			FIND ROOM TYPE
			          cy.get ( '#room_type' )
			            .should ( 'be.visible' )
			            .should ( 'have.value', 'any' );


//			          // SELECT ROOM TYPE 0 aAND EXPECT TO SEE IT
			          cy.get ( '#room_type' ).select ( '0' )
			            .then ( () =>
			                    {
				                    expect ( cy.get ( '#room_type' )
				                               .should ( 'have.value', '0' ) );
				
			                    } );
			
			          cy.get ( '#location' ).scrollIntoView ();
			          cy.wait ( 1000 );
			
			          cy.get ( '#searched_weeks' ).click ();
			
			          /*ADD WEEK 36*/
			          cy.get ( '[data-cy_week=36]' )
			            .should ( 'be.visible' )
			            .click ();
			
			          cy.get ( '[data-cy_week=36]' )
			            .should ( 'have.class', 'bg-danger' );
			
			
			          /*REMOVE WEEK 36*/
			          cy.get ( '[data-cy_week=36]' )
			            .should ( 'be.visible' )
			            .click ();
			
			          cy.get ( '[data-cy_week=36]' )
			            .should ( 'not.have.class', 'bg-danger' )
			            .should ( 'have.class', 'bg_green' );
			
			          /*ADD WEEK 37*/
			          cy.get ( '[data-cy_week=37]' )
			            .should ( 'be.visible' )
			            .click ();
			
			          cy.get ( '[data-cy_week=37]' )
			            .should ( 'have.class', 'bg-danger' );
			
			
			          /*ADD WEEK 38*/
			          cy.get ( '[data-cy_week=38]' )
			            .should ( 'be.visible' )
			            .click ();
			
			          cy.get ( '[data-cy_week=38]' )
			            .should ( 'have.class', 'bg-danger' );
			
			
			          cy.get ( '#location' ).scrollIntoView ();
			          cy.wait ( 2000 );
			          /* SEARCHED WEEKS SHOULD BE 37,38,*/
			          cy.get ( '#searched_weeks' )
			            .should ( ( $searched_weeks ) =>
			                      {
				                      expect (
					                      $searched_weeks.val () )
					                      .to.eq (
					                      '37,38,' );
			                      } );
			
			
			          //			FIND BOARD TYPE
			          cy.get ( '#board_type' )
			            .should ( 'be.visible' )
			            .should ( 'have.value', 'any' );

//			          // SELECT BOARD TYPE 0 AND EXPECT TO SEE IT
			          cy.get ( '#board_type' ).select ( '0' )
			            .then ( () =>
			                    {
				                    expect ( cy.get ( '#board_type' )
				                               .should ( 'have.value', '0' ) );
				
			                    } );
			
			          cy.get ( '#location' ).scrollIntoView ();
			          cy.wait ( 2000 );
//			SEARCH FOR THE ROOM
			
			          cy.get ( '#search_btn' )
			            .should ( 'be.visible' )
			            .click ();
			
			
			          // GET SEARCH RESULTS AFTER SEARCH
			          // COMPARE AND MAKE SURE WE HAVE SEARCH RESULTS
			          cy.get ( '#form_search_results' )
			            .should ( ( $not_empty ) =>
			                      {
				                      expect (
					                      $not_empty.text () )
					                      .not.to.eq (
					                      empty );
			                      } );
		          } );
		
		cy.wait ( 2000 );
	} );
} );



