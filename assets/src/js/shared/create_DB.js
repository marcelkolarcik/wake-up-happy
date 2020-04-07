// HERE IS FUNCTION TO CREATE INITIAL "DATABASE" (localStorage) WITH
// "TABLES"  (ROOMS,board_types,views,room_types,room_styles,amenities_list,autocomplete_searchables,address_keys)
// THAT WILL BE USED THROUGHOUT THE PROJECT
// ANOTHER "TABLE" "OWNERS" WILL BE CREATED ONCE FIRST OWNER ADDS HIS ROOM TO OUR SYSTEM


import {
	cities_coordinates,
	num_of_booked_weeks,
	amenities_list,
	view_types,
	autocomplete_searchables
}                       from './inventory.js';
import { display_date } from "./getWeek.js";
import { translate }    from "./translator/translator.js";


( function ()
	{
		
		
		if ( !localStorage.initial_welcome )
			{
				swal.fire ( {
					            html : `<h4 class="___" data-text="Dear Visitor!"></h4>
							<hr class="bg_green">
							<p class="___" data-text="initial_welcome"></p>
							<hr class="bg_green">
							<p class="___" data-text="initial_clear"></p>
							<hr class="bg_green">
							<h4 class="___" data-text="initial_thanks"></h4>
							<p class="___" data-text="initial_experience"></p>
							<div class="bg_green_light">
							<img src="assets/src/images/logo_sm.png" alt="logo">
							</div>
							`,
					
					            confirmButtonColor : '#0fbeba',
					            confirmButtonText  : `<i class="fas fa-check-circle"></i>`
					
				            } );
				
				localStorage.setItem ( 'initial_welcome', true );
				translate ();
				
				
			}
		
		/*CLEARING localStorage AND sessionStorage ON USER EXITING THE SITE*/
		$ ( document ).on ( 'click', '#clear_localStorage', function ()
		{
			
			location.replace ( 'cleared.html' );
		} );
	} ) ();


/*USING FUNCTION FROM*/
/*https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API*/
/*TO CHECK IF LOCAL STORAGE IS AVAILABLE*/

/*Browsers that support localStorage will have a property on the window object named localStorage.
 However, just asserting that that property exists may throw exceptions.
 If localStorage does exist, there is still no guarantee that localStorage is actually available,
 as various browsers offer settings that disable localStorage. So a browser may support localStorage,
 but not make it available to the scripts on the page.*/


/*Here is a function that detects whether localStorage is both supported and available:*/

function storageAvailable ( type )
	{
		var storage;
		try
			{
				storage = window[ type ];
				var x   = '__storage_test__';
				storage.setItem ( x, x );
				storage.removeItem ( x );
				return true;
			}
		catch ( e )
			{
				return e instanceof DOMException && (
					         // everything except Firefox
					e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === 'QuotaExceededError' ||
					// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ) &&
				       // acknowledge QuotaExceededError only if there's something already stored
				       (
				       storage && storage.length !== 0 );
			}
	}


/*https://gist.github.com/kerimdzhanov/7529623
 * getting random range from range to get random price and random types of boards and rooms
 *
 *
 * I HAVE UPDATED THE FUNCTION TO INCLUDE CASES WHEN I NEED AN ARRAY OR RANDOM INTEGERS FOR BOOKINGS AND AMENITIES*/

export function getRandom ( min, max, times = null )
	{
		var random_array = [];

//	RANDOM  SINGLE INTEGER FROM RANGE => room_type, room_style, board_type, board_price
		if ( times === null ) return Math.floor ( Math.random () * (
		                                          max - min + 1 ) + min );

//	ARRAY OF RANDOM  MULTIPLE INTEGERS FROM RANGE => bookings, amenities
		while ( times > 0 )
			{
				var random_number = Math.floor ( Math.random () * (
				                                 max - min + 1 ) + min );
				
				if ( random_array.indexOf ( random_number ) === -1 )
					{
						
						random_array.push ( random_number );
						times--;
						
					}
			}
		return random_array;
		
	}


//IF I WANT TO START ALL OVER I WOULD UNCOMMENT TWO LINES BELLOW
//TO CLEAR localStorage AND sessionStorage
// AND REFRESH index.html

//localStorage.clear();
//sessionStorage.clear();

//  IF WE ALREADY HAVE ROOMS IN LOCAL STORAGE WE WON'T RECREATE IT AGAIN,
//  BECAUSE WE WOULD DELETE ANY ROOMS ALREADY CREATED BY OWNERS
if ( !localStorage.getItem ( 'ROOMS_created' ) )
	{
		var ROOMS = [];
//	HERE IN A LOOP WE CREATE ROOMS OBJECT AND STORE IT IN localStorage AS INITIAL ROOMS TO DISPLAY
		$.each ( cities_coordinates, function ( index, city_coordinates )
		{
			
			var price         = {};
			var r_board_types = getRandom ( 0, 3 );
			
			
			while ( r_board_types >= 0 )
				{
					price[ r_board_types ] = getRandom ( 150, 300 );
					r_board_types--;
					
				}
			
			ROOMS.push ( {
				             'p_id'          : index,
				             'p_address'     : {
					             'city'          : city_coordinates[ 2 ],
					             'property_name' : 'property name ' + index
					
				             },
				             'price'         : price,
				             'p_description' : 'Beautiful room with ' + view_types[ index % 10 ]
				                               + ' view to make you smile in the morning....',
				             'p_view'        : index % 10,
				             'lat'           : city_coordinates[ 0 ],
				             'lng'           : city_coordinates[ 1 ],
				             'food_id'       : getRandom ( 1, 3 ),
				             'room_type'     : getRandom ( 0, 1 ),
				             'room_style'    : getRandom ( 1, 16 ),
				             'location'      : city_coordinates[ 2 ],
				             'searchables'   : [ city_coordinates[ 2 ] ],
				             'bookings'      : getRandom ( 1, 53, num_of_booked_weeks ),
				             'amenities'     : getRandom ( 1, amenities_list.length - 1, 15 ),
				             'created_at'    : display_date
				
			             } );
			
		} );
		
		if ( storageAvailable ( 'localStorage' ) )
			{

//		BECAUSE localStorage CAN STORE ONLY STRINGS, WE NEED TO JSON.stringify OUR OBJECT ON THE WAY IN localStorage
//		AND JSON.parse ON THE WAY OUT OF localStorage
				
				localStorage.setItem ( 'ROOMS_created', true );
				localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
				localStorage.setItem ( 'autocomplete_searchables', JSON.stringify ( autocomplete_searchables ) );
				
			}
		else
			{
				
				console.log (
					'Your browser doesn\'t have local storage. You won\'t be able to experience the website fully.' );
			}
		
	}
