import "cypress-localstorage-commands";
import { preview_room, book_room, select_board, preview_how_to ,search_for_room_in,check_mobile} from "../../fixtures/functions.js";




const url = 'http://127.0.0.1:8000/owner.html';


describe ( 'Adding new room to the site, booking room, checking customers, editing room, blocking dates for owner, logging out, logging in', () =>
{
	beforeEach ( () =>
	             {
		             cy.restoreLocalStorage ();
		
	             } );
	
	afterEach ( () =>
	            {
		            cy.saveLocalStorage ();
	            } );
	it ( 'it will click on the map to get property location', () =>
	{
		sessionStorage.clear ();
		cy.visit ( url ).then ( () =>
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
			
			
		                        } );
		
		
	} );
	
	it ( 'it will dismiss welcome message to potential landlords', () =>
	{
		cy.get ( '[data-cy=dont_show_again]' )
		  .should ( 'be.visible' )
		  .click ();
	} );
	
	preview_how_to ( 2000, 'location' );
	
	it ( 'will click on the map to display coordinates of the future room', () =>
	{
		cy.get ( '#map_owner' )
		  .should ( 'be.visible' )
		  .click ();
		
	} );
	
	it ( 'will click on get details button to display location details', () =>
	{
		cy.get ( '[data-cy=get_details]' )
		  .should ( 'be.visible' )
		  .click ();
		
	} );
	
	it (
		'it will check if step_2 "room" button is visible already, it shouldn\'t be, because we didn\'t type in property name that is at least 3 characters long',
		() =>
		{
			cy.get ( '[data-cy=room]' )
			  .should ( 'not.be.visible' );
			
		}
	);
	
	it ( 'it will type in property name longer then 3 characters', () =>
	{
		cy.get ( '[data-cy=property_name]' )
		  .type ( 'Villa Melzi' )
		  .should ( 'have.value', 'Villa Melzi' );
		cy.wait ( 2000 );
	} );
	
	it (
		'it will check if step_2 "room" button is visible already, it should be, because we type in property name that is at least 3 characters long',
		() =>
		{
			cy.get ( '[data-cy=room]' )
			  .should ( 'be.visible' );
			
		}
	);
	
	it ( 'it will delete property name', () =>
	{
		cy.get ( '[data-cy=property_name]' )
		  .clear ();
		cy.wait ( 2000 );
	} );
	
	it (
		'it will check if step_2 "room" button is visible already, it shouldn\' be, because we deleted property name',
		() =>
		{
			cy.get ( '[data-cy=room]' )
			  .should ( 'not.be.visible' );
			
		}
	);
	
	it ( 'it will type in property name longer then 3 characters', () =>
	{
		
		cy.get ( '[data-cy=property_name]' )
		  .type ( 'Villa Melzi' )
		  .should ( 'have.value', 'Villa Melzi' );
		
		cy.wait ( 2000 );
	} );
	
	it ( 'it will progress to step_2 "room", defining room', () =>
	{
		cy.get ( '[data-cy=room]' )
		  .should ( 'be.visible' )
		  .click ();
		
	} );
	
	preview_how_to ( 6500, 'room' );
	
	it (
		'it will check if step_3 "services" button is visible, it shouldn\'t be, because we didn\'t select any options yet',
		() =>
		{
			cy.get ( '[data-cy=services]' )
			  .should ( 'not.be.visible' );
			
			
		}
	);
	
	it ( 'it will select single room and check if it is selected', () =>
	{
		cy.get ( '[data-cy=room_type_0]' )
		  .click ();
		
		cy.get ( '[data-cy=room_type_title]' )
		  .click ();
		
		cy.get ( '[data-cy=room_type_footer_0]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.wait ( 2000 );
	} );
	
	it ( 'it will select sea view and check if it is selected', () =>
	{
		cy.get ( '[data-cy=view_type_1]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=view_type_title]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=view_type_footer_1]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.wait ( 2000 );
	} );
	
	it (
		'it will enlarge image,  select image #7 => the image new room will be displayed as, and check if it is selected',
		() =>
		{
			cy.get ( '[data-cy=room_style_image_6]' )
			  .should ( 'be.visible' )
			  .click ();
			cy.wait ( 2000 );
			cy.get ( '[data-cy=room_style_image_6]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
			cy.get ( '[data-cy=room_style_6]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.get ( '[data-cy=room_style_title]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.get ( '[data-cy=room_style_footer_6]' )
			  .should ( 'be.visible' )
			  .should ( 'have.class', 'bg_green' );
			
			cy.wait ( 2000 );
		}
	);
	
	it ( 'it will check if step_3 "services" button is visible, it should be, because we selected all options', () =>
	{
		cy.get ( '[data-cy=services]' )
		  .should ( 'be.visible' );
		
		
	} );
	
	it ( 'it will progress to step_3 "services" ', () =>
	{
		cy.get ( '[data-cy=services]' )
		  .should ( 'be.visible' )
		  .click ();
		
		
	} );
	
	preview_how_to ( 5000, 'services' );
	
	it (
		'it will check if step_4 "preview" button is visible, it shouldn\'t be, because we didn\'t selected any options yet',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'not.be.visible' );
			
			
		}
	);
	
	
	select_board ( 0, 150 );
	select_board ( 1, 250 );
	select_board ( 2, 350 );
	select_board ( 3, 450 );
	
	
	it ( 'it will open amenities div', () =>
	{
		cy.get ( '[data-cy=amenity_title]' )
		  .should ( 'be.visible' )
		  .click ();
	} );
	
	it ( 'it will select amenities', () =>
	{
		
		
		cy.get ( '[data-cy=amenity_1]' )
		  .should ( 'be.visible' )
		  .should ( 'not.be.checked' )
		  .click ();
		
		
		cy.get ( '[data-cy=amenity_5]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_8]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_title]' ).scrollIntoView ()
		  .should ( 'be.visible' );
		
		cy.get ( '[data-cy=amenity_footer_1]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.get ( '[data-cy=amenity_footer_5]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.get ( '[data-cy=amenity_footer_8]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.wait ( 2000 );
	} );
	
	it ( 'it will open description textarea div and write description', () =>
	{
		cy.get ( '[data-cy=description_title]' )
		  .should ( 'be.visible' )
		  .click ();
		
		
		cy.get ( '[data-cy=description]' )
		  .should ( 'be.visible' )
		  .type ( 'This is the best room in the universe and beyond...;-)' )
		  .should ( 'have.value', 'This is the best room in the universe and beyond...;-)' );
	} );
	
	
	it (
		'it will check if step_4 "preview" button is visible, it should be, because we did selected all options',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it (
		'it will clear room description and step_4 "preview" button should disappear',
		() =>
		{
			cy.get ( '[data-cy=description]' )
			  .should ( 'be.visible' )
			  .clear ()
			  .then ( () =>
			          {
				          cy.get ( '[data-cy=preview]' )
				            .should ( 'not.be.visible' );
			          } );
			cy.wait ( 2000 );
			
			
		}
	);
	
	it ( 'write description again', () =>
	{
		
		cy.get ( '[data-cy=description]' )
		  .should ( 'be.visible' )
		  .type ( 'This is the best room in the universe and beyond...;-)' )
		  .should ( 'have.value', 'This is the best room in the universe and beyond...;-)' );
	} );
	
	it (
		'it will check if step_4 "preview" button is visible, it should be, because we did selected all options',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it ( 'it will de-select amenities', () =>
	{
		
		
		cy.get ( '[data-cy=amenity_1]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_5]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_8]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_title]' ).scrollIntoView ()
		  .should ( 'be.visible' );
		
		cy.get ( '[data-cy=amenity_footer_1]' )
		  .should ( 'have.class', 'bg_green_dark' );
		
		cy.get ( '[data-cy=amenity_footer_5]' )
		  .should ( 'have.class', 'bg_green_dark' );
		
		cy.get ( '[data-cy=amenity_footer_8]' )
		  .should ( 'have.class', 'bg_green_dark' );
		
		cy.wait ( 2000 );
	} );
	
	it (
		'it will check if step_4 "preview" button is visible, it shouldn\'t be, because we de-selected all amenities',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'not.be.visible' );
			
			cy.wait ( 2000 );
		}
	);
	
	it ( 'it will select amenities', () =>
	{
		
		
		cy.get ( '[data-cy=amenity_1]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_5]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_8]' )
		  .should ( 'be.visible' )
		  .click ();
		
		cy.get ( '[data-cy=amenity_title]' ).scrollIntoView ()
		  .should ( 'be.visible' );
		
		cy.get ( '[data-cy=amenity_footer_1]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.get ( '[data-cy=amenity_footer_5]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.get ( '[data-cy=amenity_footer_8]' )
		  .should ( 'have.class', 'bg_green' );
		
		cy.wait ( 2000 );
	} );
	
	it (
		'it will check if step_4 "preview" button is visible, it should be, because we did select all options',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it (
		'it will progress to step_4 "preview" ',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	preview_how_to ( 2000, 'preview' );
	
	it (
		'it will preview room ',
		() =>
		{
			preview_room ( 96 );
			
			
		}
	);
	
	it (
		'it will check if step_5 "payment" button is visible, it should be, because we did select all options',
		() =>
		{
			cy.get ( '[data-cy=payment]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it (
		'it will proceed to step_5 "payment" ',
		() =>
		{
			cy.get ( '[data-cy=payment]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	preview_how_to ( 2000, 'payment' );
	
	it (
		'it will try to add room without filling in required fields ',
		() =>
		{
			cy.get ( '[data-cy=pay_for_the_room]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.wait ( 2000 );
		}
	);
	
	it (
		'it will check for the missing fields alert and close it',
		() =>
		{
			cy.get ( '[data-cy=required_fields_missing]' )
			  .should ( 'be.visible' )
			  .then ( () =>
			          {
				          cy.get ( '[data-cy=dismiss_alert]' )
				            .should ( 'be.visible' )
				            .click ();
			          } );
			
			
		}
	);
	
	it ( 'it will fill all required fields', () =>
	{
		
		cy.wait ( 500 );
		cy.get ( '[data-cy=name]' )
		  .should ( 'be.visible' )
		  .type ( 'Marcel Kolarcik' )
		  .should ( 'have.value', 'Marcel Kolarcik' );
		
		
		cy.wait ( 500 );
		cy.get ( '[data-cy=email]' )
		  .should ( 'be.visible' )
		  .type ( 'marcel@wuh.com' )
		  .should ( 'have.value', 'marcel@wuh.com' );
		
		cy.wait ( 500 );
		
		cy.get ( '[data-cy=password]' )
		  .should ( 'be.visible' )
		  .type ( 'password' )
		  .should ( 'have.value', 'password' );
		
		cy.wait ( 500 );
		
		cy.get ( '[data-cy=card_holder_name]' )
		  .should ( 'be.visible' )
		  .type ( 'Marcel Kolarcik' )
		  .should ( 'have.value', 'Marcel Kolarcik' );
		
		cy.wait ( 500 );
		
		cy.get ( '[data-cy=card_number]' )
		  .should ( 'be.visible' )
		  .type ( '1234567890123456' )
		  .should ( 'have.value', '1234567890123456' );
		
		cy.wait ( 500 );
		
		cy.get ( '[data-cy=cvv]' )
		  .should ( 'be.visible' )
		  .type ( '123' )
		  .should ( 'have.value', '123' );
		
		cy.wait ( 500 );
		
		cy.get ( '[data-cy=payment_form]' ).scrollIntoView ()
		  .should ( 'be.visible' );
		
	} );
	
	
	it (
		'it will pay for the services and redirect to index.html to show newly created room on the map',
		() =>
		{
			cy.get ( '[data-cy=pay_for_the_room]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	it (
		'it will click on popup\'s more... button to preview it',
		() =>
		{
			cy.get ( '[ data-cy=room_map_popup_96]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	it (
		'it will preview the room',
		() =>
		{
			preview_room ( 96 );
			
			
		}
	);
	
	book_room ( 96, 'Villa Melzi' );
	
	it (
		'it will check top right corner navigation, to see user\'s initials in white circle and click on it to see options',
		() =>
		{
			check_mobile('mobile_nav_toggler');
			
			cy.get ( '[data-cy=user_nav]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .then ( () =>
			          {
				          cy.get ( '[data-cy=user_nav]' ).click ();
			          } );
			
			cy.wait ( 2500 );
		}
	);
	
	it (
		'it will click on user\' name and will be redirected to owner\'s dashboard, where he can interact with the room',
		() =>
		{
			cy.get ( '[data-cy=owners_room_96]' )
			  .should ( 'be.visible' ).click ();
			
			
		}
	);
	
	it (
		'it will preview bookings',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ()
			  .then ( () =>
			          {
				          cy.get ( '[data-cy=preview]' )
				            .should ( 'be.visible' )
				            .scrollIntoView ()
				            .click ();
			          } );
			
			cy.wait ( 2000 );
			
		}
	);
	
	it (
		'it will check room\'s customers',
		() =>
		{
			cy.get ( '[data-cy=customers]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			cy.wait ( 2000 );
			
		}
	);
	
	
	it (
		'it will close customers popup',
		() =>
		{
			cy.get ( '[data-cy=customers_table]' )
			  .should ( 'be.visible' )
			  .then ( () =>
			          {
				          cy.get ( '[data-cy=dismiss_alert]' )
				            .should ( 'be.visible' )
				            .scrollIntoView ()
				            .click ();
			          } );
			
			
		}
	);
	
	it (
		'it will click on  edit room',
		() =>
		{
			cy.get ( '[data-cy=edit_mode]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			
		}
	);
	
	preview_how_to ( 3000, 'edit_mode' );
	
	
	it (
		'it will edit description of the room',
		() =>
		{
			cy.get ( '[data-cy=services]' )
			  .should ( 'be.visible' )
			  .click ()
			  .then ( () =>
			          {
				
				          cy.get ( '[data-cy=description_title]' )
				            .should ( 'be.visible' )
				            .click ();
				
				          cy.get ( '[data-cy=description]' )
				            .should ( 'be.visible' )
				            .clear ()
				            .type ( 'This is really the best room in the universe and beyond...;-)' )
				            .should ( 'have.value', 'This is really the best room in the universe and beyond...;-)' );
			          } );
			
			
		}
	);
	
	it (
		'it will update the room',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' )
			  .click ()
			  .then ( () =>
			          {
				          cy.get ( '[data-cy=update]' )
				            .should ( 'be.visible' )
				            .click ();
			          } );
			
			
		}
	);
	
	it (
		'it will preview changes',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.wait ( 2000 );
		}
	);
	
	it (
		'it will block some dates for owner of the room',
		() =>
		{
			cy.get ( '[data-cy=block_mode]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.wait ( 2500 );
			
			cy.get ( '[data-cy=close_how_to]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			cy.wait ( 500 );
			
			cy.get ( '[data-cy=edit_mode]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.wait ( 500 );
			
			check_mobile('mobile_more_96');
			
			cy.wait(1500);
			
			cy.get ( '[data-cy=availability_96]' )
			  .should ( 'be.visible' )
			  .click ();
			
			/*SELECT THE BOARD AND WEEKS*/
			cy.get ( `[data-cy_board=0_96]` ).click ()
			  .then ( () =>
			          {
				
				          /*AND SELECT SOME WEEKS TO BLOCK*/
				
				          cy.get ( `[data-cy_week=30_96]` ).click ();
				
				          cy.get ( `[data-cy_week=31_96]` ).click ();
				
				          cy.get ( `[data-cy_week=32_96]` ).click ();
				
				          cy.get ( `[data-cy_week=33_96]` ).click ();
				
				          cy.get ( `[data-cy_week=34_96]` ).click ();
				
				          cy.get ( `[data-cy_week=35_96]` ).click ();
				
				          cy.get ( `[data-cy_week=36_96]` ).click ();
			          } )
			  .then ( () =>
			          {
				          /*AND WE SHOULD HAVE SOME WEEKS BOOKED
				           * AT LEAST 1,*/
				          cy.get ( `[data-cy=weeks_booked_96]` )
				            .should ( ( $weeks_booked ) =>
				                      {
					                      expect (
						                      $weeks_booked.val () )
						                      .not.to.eq ( '' );
				                      } );
			          } );
			
			
			/*CLICK ON BOOK TAB*/
			cy.get ( `[data-cy=book_96]` ).click ();
			cy.wait ( 2000 );
			/*CLICK ON BLOCK THE WEEKS TAB*/
			cy.get ( `[data-cy=block_dates_96]` ).click ();
			cy.wait ( 1500 );
			cy.get ( '[data-cy=dismiss_alert]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	it (
		'it will check blocked weeks',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ()
			  .then ( () =>
			          {
				          check_mobile('mobile_more_96');
				          cy.wait ( 2000 );
				          cy.get ( '[data-cy=availability_96]' )
				            .should ( 'be.visible' )
				
				            .click ();
				
				          cy.wait ( 2000 );
			          } );
			
			
		}
	);
	
	it (
		'it will log owner out',
		() =>
		{
			check_mobile('mobile_nav_toggler');
			
			cy.get ( '[data-cy=user_nav]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			cy.wait ( 2500 );
			
			cy.get ( '[data-cy=logout]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	it (
		'it will preview room live on the site, and see new autocomplete item => newly added location',
		() =>
		{
			cy.get ( '[data-cy=index]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			search_for_room_in('Carrownagappul');
			

			cy.wait ( 5000 );
			
			
		}
	);
	
	
	it (
		'it will try to login with wrong credentials',
		() =>
		{
//			check_mobile('mobile_nav_toggler');
//
//			cy.get ( '[data-cy=owner]' )
//			  .should ( 'be.visible' )
//			  .scrollIntoView ()
//			  .click ();
			
			check_mobile('mobile_nav_toggler');
		    cy.wait(2000);
			
			cy.get ( '[data-cy=user_nav]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			cy.wait ( 2500 );
			
			cy.get ( '[data-cy=login]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
			cy.get ( '[data-cy=email_of_user]' )
			  .should ( 'be.visible' )
			  .type ( 'wrong@email.com' )
			  .should ( 'have.value', 'wrong@email.com' );
			
			cy.wait ( 1000 );
			
			cy.get ( '[data-cy=password]' )
			  .should ( 'be.visible' )
			  .type ( '12345678' )
			  .should ( 'have.value', '12345678' );
			
			cy.wait ( 1000 );
			
			cy.get ( '[data-cy=log_user]' )
			  .should ( 'be.visible' )
			  .click ();
			
			cy.wait ( 1000 );
			
			cy.get ( '[data-cy=dismiss_alert]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	it (
		'it will try to login with right credentials',
		() =>
		{
			check_mobile('mobile_nav_toggler');
			
			cy.get ( '[data-cy=user_nav]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			cy.wait ( 2500 );
			
			cy.get ( '[data-cy=login]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
			cy.get ( '[data-cy=email_of_user]' )
			  .should ( 'be.visible' )
			  .type ( 'marcel@wuh.com' )
			  .should ( 'have.value', 'marcel@wuh.com' );
			
			cy.wait ( 1000 );
			
			cy.get ( '[data-cy=password]' )
			  .should ( 'be.visible' )
			  .type ( 'password' )
			  .should ( 'have.value', 'password' );
			
			cy.wait ( 1000 );
			
			cy.get ( '[data-cy=log_user]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	it (
		'it will log owner out',
		() =>
		{
			check_mobile('mobile_nav_toggler');
			
			cy.get ( '[data-cy=user_nav]' )
			  .should ( 'be.visible' )
			  .scrollIntoView ()
			  .click ();
			
			cy.wait ( 2500 );
			
			cy.get ( '[data-cy=logout]' )
			  .should ( 'be.visible' )
			  .click ();
			
			
		}
	);
	
	
} );