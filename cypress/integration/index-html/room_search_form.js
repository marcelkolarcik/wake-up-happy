
/*CLOSING INITIAL ALERT*/
function close_alert()
	{
		cy.visit ( 'http://127.0.0.1:8000/index.html' );
		cy.wait ( 500 );
		cy.get ( '#close_alert' ).click ();
	}
/*CLOSING DIV ABOUT INITIAL LOCATIONS*/
function close_initial_locations()
	{
		
		
		cy.get('[data-cy=initial_locations]')
		  .should('be.visible')
		  .then(()=>{
			  cy.get('[data-cy=dont_show_again]')
			    .should('be.visible')
			    .click()
			
		  });
	}
 
describe ( 'Didn\'t select location when searching for the room', () =>
{
	it ( 'we get bg-warning class on location field', () =>
	{
		close_alert();
		
		
		/*LOCATION WITHOUT ROOMS*/
		
		cy.get ( '#form_search_results' )
		  .then ( () =>
		          {
			
			
			          /*CLICK ON SEARCH BUTTON WITHOUT SELECTING LOCATION*/
			          cy.get ( '#search_btn' ).click ();
			
			          cy.get ( '#location' )
			            .should ( 'have.class', 'bg-warning' );
			
			
		          } );
		
		
	} );
} );


describe ( 'Selected location with no rooms', () =>
{
	it ( 'we will not get any results', () =>
	{
		close_alert();
		
		
		/*LOCATION WITHOUT ROOMS*/
		
		cy.get ( '#form_search_results' )
		  .then ( () =>
		          {

//			TYPE IN LOCATION THAT DOESN'T HAVE ROOMS
			          cy.get ( '#location' )
			            .type ( 'Tokyo' )
			            .should ( 'have.value', 'Tokyo' );
			
			
			          close_initial_locations();
			          // SUBMIT A SEARCH QUERY
			          cy.get ( '#search_btn' ).click ();
			         
			
			
//			          RESULTS SHOUL BE 0
			          cy.get ( '#results' )
			            .should (
				            'have.text',
				            'Your search returned 0 results, try different search parameters or have a look at featured properties bellow.'
			            );
			
		          } );
		
		
	} );
} );


describe ( 'Selected location with rooms', () =>
{
	it ( 'we will results: location only', () =>
	{
		close_alert();
		
		
		/*LOCATION WITH ROOMS*/
		
		cy.get ( '#form_search_results' )
		  .then ( ( $empty ) =>
		          {

//			TYPE IN LOCATION THAT HAVE ROOMS
			          cy.get ( '#location' ).type ( 'Cork' )
			            .should ( 'have.value', 'Cork' );
			
			
			          close_initial_locations();
			          
			          // STORE INITIAL SEARCH RESULTS BEFORE SEARCH
			          const empty = $empty.text ();
			
			          // SUBMIT A SEARCH QUERY
			          cy.get ( '#search_btn' ).click ();
			         
			
			
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
		
		
	} );
} );


describe ( 'Selected location with rooms,weeks,board type, room type', () =>
{
	it ( 'we will results: location, weeks, boards,room type', () =>
	{
		close_alert();
		
		
		/*LOCATION WITH ROOMS*/
		
		cy.get ( '#form_search_results' )
		  .then ( ( $empty ) =>
		          {
			
			
			          const empty = $empty.text ();

//			TYPE IN LOCATION THAT HAVE ROOMS
			          cy.get ( '#location' )
			            .should('be.visible')
			            .type ( 'Cork' )
			            .should ( 'have.value', 'Cork' );
			          cy.wait ( 500 );
			
			
			
			          close_initial_locations();
//			FIND ROOM TYPE
			          cy.get ( '#room_type' )
			            .should ( 'have.value', 'any' );
			          
			          
//			          // SELECT ROOM TYPE 0 aAND EXPECT TO SEE IT
			          cy.get ( '#room_type' ).select ( '0' )
				          .then(()=>{
					          expect(cy.get ( '#room_type' )
						                  .should('have.value', '0'))
					           
				          });
			
			
			          cy.wait ( 2500 );
			
			          cy.get ( '#searched_weeks' ).click ();
			
			          /*ADD WEEK 36*/
			          cy.get ( '[data-cy_week=36]' ).click ();
			          cy.get ( '[data-cy_week=36]' )
			            .should('have.class','bg-danger');
			          cy.wait ( 500 );
			
			          /*REMOVE WEEK 36*/
			          cy.get ( '[data-cy_week=36]' ).click ();
			          cy.get ( '[data-cy_week=36]' )
			            .should('not.have.class','bg-danger')
				          .should('have.class','bg_green');
			
			          /*ADD WEEK 37*/
			          cy.get ( '[data-cy_week=37]' ).click ();
			          cy.get ( '[data-cy_week=37]' )
			            .should('have.class','bg-danger');
			          cy.wait ( 500 );
			
			          /*ADD WEEK 38*/
			          cy.get ( '[data-cy_week=38]' ).click ();
			          cy.get ( '[data-cy_week=38]' )
			            .should('have.class','bg-danger');
			          cy.wait ( 500 );
			
			
			          cy.wait ( 2500 );
			          
						/* SEARCHED WEEKS SHOULD BE 37,38,*/
			          cy.get ( '#searched_weeks' )
			            .should ( ( $searched_weeks ) =>
			                      {
				                      expect (
					                      $searched_weeks.val () )
					                      .to.eq (
					                      '37,38,' );
			                      } );
			
			          cy.wait ( 2500 );
			        
			          //			FIND BOARD TYPE
			          cy.get ( '#board_type' )
			            .should ( 'have.value', 'any' );

//			          // SELECT BOARD TYPE 0 AND EXPECT TO SEE IT
			          cy.get ( '#board_type' ).select ( '0' )
			            .then(()=>{
				            expect(cy.get ( '#board_type' )
				                     .should('have.value', '0'))
				
			            });
			          cy.wait ( 2500 );
//			SEARCH FOR THE ROOM
			
			          cy.get ( '#search_btn' )
			            .shoul('be.visible')
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
		
		
	} );
} );