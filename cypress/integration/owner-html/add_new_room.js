import { preview_room } from "../functions.js";


const url = 'http://127.0.0.1:8000/owner.html';


function open_how_to ( wait )
	{
		cy.get ( '[data-cy=how_to]' )
		  .should ( 'be.visible' )
		  .click ();
		cy.wait ( wait );
	}


function close_how_to ()
	{
		cy.get ( '[data-cy=close_how_to]' )
		  .should ( 'be.visible' )
		  .click ();
	}


function preview_how_to ( wait )
	{
		it ( 'will click on how to button to see instruction as how to progress with current step of the form', () =>
		{
			open_how_to ( wait );
		} );
		it ( 'will close instruction', () =>
		{
			close_how_to ();
		} );
	}


describe ( 'Adding new room to the site', () =>
{
	
	it ( 'it will click on the map to get property location', () =>
	{
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
	
	preview_how_to ( 2000 );
	
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
		'it will check if step_2 button is visible already, it shouldn\'t be, because we didn\'t type in property name that is at least 3 characters long',
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
		'it will check if step_2 button is visible already, it should be, because we type in property name that is at least 3 characters long',
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
	
	it ( 'it will check if step_2 button is visible already, it shouldn\' be, because we deleted property', () =>
	{
		cy.get ( '[data-cy=room]' )
		  .should ( 'not.be.visible' );
		
	} );
	
	it ( 'it will type in property name longer then 3 characters', () =>
	{
		
		cy.get ( '[data-cy=property_name]' )
		  .type ( 'Villa Melzi' )
		  .should ( 'have.value', 'Villa Melzi' );
		
		cy.wait ( 2000 );
	} );
	
	it ( 'it will progress to step_2, defining room', () =>
	{
		cy.get ( '[data-cy=room]' )
		  .should ( 'be.visible' )
		  .click ();
		
	} );
	
	preview_how_to ( 6500 );
	
	it ( 'it will check if step_3 button is visible, it shouldn\'t be, because we didn\'t select any options yet', () =>
	{
		cy.get ( '[data-cy=services]' )
		  .should ( 'not.be.visible' );
		
		
	} );
	
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
	
	it ( 'it will check if step_3 button is visible, it should be, because we selected all options', () =>
	{
		cy.get ( '[data-cy=services]' )
		  .should ( 'be.visible' );
		
		
	} );
	
	it ( 'it will progress to step_3 ', () =>
	{
		cy.get ( '[data-cy=services]' )
		  .should ( 'be.visible' )
		  .click ();
		
		
	} );
	
	preview_how_to ( 5000 );
	
	it (
		'it will check if step_4 button is visible, it shouldn\'t be, because we didn\'t selected any options yet',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'not.be.visible' );
			
			
		}
	);
	
	it ( 'it will select Room only board', () =>
	{
		cy.get ( '[data-cy=board_type_0]' )
		  .should ( 'be.visible' )
		  .click ();
		cy.wait ( 1000 );
	} );
	
	it (
		'it will check, that input field for the Room only board is visible, it should be, because we selected board',
		() =>
		{
			cy.get ( '[data-cy=board_price_0]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it ( 'it will type price for the board', () =>
	{
		cy.get ( '[data-cy=board_price_0]' )
		  .should ( 'be.visible' )
		  .type ( '150' )
		  .should ( 'have.value', '150' );
		
		cy.get ( '[data-cy=board_type_title]' ).scrollIntoView ()
		  .should ( 'be.visible' );
		
		
	} );
	
	it ( 'it will select B&B board', () =>
	{
		cy.get ( '[data-cy=board_type_1]' )
		  .should ( 'be.visible' )
		  .click ();
		
	} );
	
	it ( 'it will check, that input field for the B&B board is visible, it should be, because we selected board', () =>
	{
		cy.get ( '[data-cy=board_price_1]' )
		  .should ( 'be.visible' );
		
		
	} );
	
	it ( 'it will type price for the board', () =>
	{
		cy.get ( '[data-cy=board_price_1]' )
		  .should ( 'be.visible' )
		  .type ( '250' )
		  .should ( 'have.value', '250' );
		
		
		cy.get ( '[data-cy=board_type_title]' ).scrollIntoView ()
		  .should ( 'be.visible' );
		
		
		cy.wait ( 1000 );
		
	} );
	
	it ( 'it will select All Inclusive board', () =>
	{
		cy.get ( '[data-cy=board_type_3]' )
		  .should ( 'be.visible' )
		  .click ();
		
	} );
	
	it (
		'it will check, that input field for the All Inclusive board is visible, it should be, because we selected board',
		() =>
		{
			cy.get ( '[data-cy=board_price_3]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it ( 'it will type price for the board', () =>
	{
		cy.get ( '[data-cy=board_price_3]' )
		  .should ( 'be.visible' )
		  .type ( '450' )
		  .should ( 'have.value', '450' );
		
		
		cy.get ( '[data-cy=board_type_title]' ).scrollIntoView ()
		  .should ( 'be.visible' );
		
		
		cy.wait ( 1000 );
		
	} );
	
	
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
		'it will check if step_4 button is visible, it should be, because we did selected all options',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it (
		'it will clear room description and step_4 button should disappear',
		() =>
		{
			cy.get ( '[data-cy=description]' )
			  .should ( 'be.visible' )
			  .clear ()
				.then(()=>{
					cy.get ( '[data-cy=preview]' )
					  .should ( 'not.be.visible' );
				});
			cy.wait ( 2000 );
			
			
		}
	);
	
	it('write description again' , ()=>
	{
		
		cy.get ( '[data-cy=description]' )
		  .should ( 'be.visible' )
		  .type ( 'This is the best room in the universe and beyond...;-)' )
		  .should ( 'have.value', 'This is the best room in the universe and beyond...;-)' );
	});
	
	it (
		'it will check if step_4 button is visible, it should be, because we did selected all options',
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
		'it will check if step_4 button is visible, it shouldn\'t be, because we de-selected all amenities',
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
		'it will check if step_4 button is visible, it should be, because we did selected all options',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' );
			
			
		}
	);
	
	it (
		'it will progress to step_4 ',
		() =>
		{
			cy.get ( '[data-cy=preview]' )
			  .should ( 'be.visible' )
				.click();
			
			
		}
	);
	
	preview_how_to(3000);
	
	it('it will preview newly created room', ()=>{
	
	})
} );