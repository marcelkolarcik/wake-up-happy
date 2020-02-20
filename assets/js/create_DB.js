import {
	cities_coordinates,
	num_of_booked_weeks,
	amenities,
	amenities_list,
	view_types,
	board_types,
	room_types,
	room_styles,
	autocomplete_searchables,
	address_keys
} from './module/inventory.js';
/*https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API*/

/*Browsers that support localStorage will have a property on the window object named localStorage.
 However, just asserting that that property exists may throw exceptions.
 If localStorage does exist, there is still no guarantee that localStorage is actually available,
 as various browsers offer settings that disable localStorage. So a browser may support localStorage,
 but not make it available to the scripts on the page.*/


/*Here is a function that detects whether localStorage is both supported and available:*/

function storageAvailable ( type ) {
	var storage;
	try {
		storage = window[ type ];
		var x = '__storage_test__';
		storage.setItem ( x, x );
		storage.removeItem ( x );
		return true;
	}
	catch ( e ) {
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
 * I have updated the function to include case when i need an array of times integers for random booked weeks in this case
 * and array of times random items from array */

function getRandom ( min, max, times = null, array = null ) {
	var random_array = [];
	
	if ( times === null ) return Math.floor ( Math.random () * (
	                                          max - min + 1 ) + min );
	
	while ( times > 0 ) {
		var random_number = Math.floor ( Math.random () * (
		                                 max - min + 1 ) + min );
		
		if ( random_array.indexOf ( random_number ) === -1 ) {
			if ( array === null ) {
				/// getting  array of  times random numbers from range
				random_array.push ( random_number );
				times--;
			}
			
			else if ( random_array.indexOf ( array[ random_number ] ) === -1 ) {
				/// getting array of times random items from array
				random_array.push ( array[ random_number ] );
				times--;
			}
			
		}
	}
	return random_array;
	
}


//localStorage.clear ();

if ( !localStorage.getItem ( 'ROOMS_created' ) ) {
	var ROOMS = [];
	$.each ( cities_coordinates, function ( index, city_coordinates ) {
		
		var price = {};
		var r_board_types = getRandom ( 0, 3 );
		
		while ( r_board_types >= 0 ) {
			price[ r_board_types ] = getRandom ( 150, 300 );
			r_board_types--;
			
		}
		
		ROOMS.push ( {
			             'p_id'         : index,
			             'p_address'    : { 'city': city_coordinates[ 2 ] },
			             'price'        : price,
			             'p_description': 'Beautiful room with ' + view_types[ index % 10 ] + ' view to make you smile in the morning....',
			             'p_view'       : index % 10,
			             'lat'          : city_coordinates[ 0 ],
			             'lng'          : city_coordinates[ 1 ],
			             'room_type'    : getRandom ( 0, 1 ),
			             'room_style'   : getRandom ( 1, 16 ),
			             'location'     : city_coordinates[ 2 ],
			             'searchables'  : [ city_coordinates[ 2 ] ],
			             'bookings'     : getRandom ( current_date.getWeek (), 53, num_of_booked_weeks ),
			             'amenities'    : getRandom ( 1, amenities.length - 1, 15 ),
			             'property_name': 'property name ' + index
		             } );
		
	} );
	
	if ( storageAvailable ( 'localStorage' ) ) {
		// because local storage is storing strings we need to stringify our object on the way in and parse it on the
		// way out
		localStorage.setItem ( 'ROOMS_created', true );
		localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
		localStorage.setItem ( 'board_types', JSON.stringify ( board_types ) );
		localStorage.setItem ( 'views', JSON.stringify ( view_types ) );
		localStorage.setItem ( 'room_types', JSON.stringify ( room_types ) );
		localStorage.setItem ( 'room_styles', JSON.stringify ( room_styles ) );
		localStorage.setItem ( 'amenities_list', JSON.stringify ( amenities_list ) );
		localStorage.setItem ( 'autocomplete_searchables', JSON.stringify ( autocomplete_searchables ) );
		localStorage.setItem ( 'address_keys', JSON.stringify ( address_keys ) );
		
	}
	else {
		
		console.log ( 'Your browser doesn\'t have local storage. You won\'t be able to experience the website fully.' );
	}
	
}

//console.log('local storage '+localStorage.getItem( 'ROOMS' ), ROOMS);
//console.log('local storage '+localStorage.getItem( 'ROOMS' ), ROOMS);
//localStorage.clear();