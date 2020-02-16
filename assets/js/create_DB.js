/*https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API*/

/*Browsers that support localStorage will have a property on the window object named localStorage.
 However, just asserting that that property exists may throw exceptions.
 If localStorage does exist, there is still no guarantee that localStorage is actually available,
 as various browsers offer settings that disable localStorage. So a browser may support localStorage,
 but not make it available to the scripts on the page.*/

/*Here is a function that detects whether localStorage is both supported and available:*/

function storageAvailable( type ) {
	var storage;
	try {
		storage = window[ type ];
		var x = '__storage_test__';
		storage.setItem( x, x );
		storage.removeItem( x );
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
			( storage && storage.length !== 0 );
	}
}

/*https://gist.github.com/kerimdzhanov/7529623
 * getting random range from range to get random price and random types of boards and rooms
 *
 * I have updated the function to include case when i need an array of times integers for random booked weeks in this case
 * and array of times random items from array */

function getRandom( min, max, times = null, array = null ) {
	var random_array = [];
	
	if ( times === null ) return Math.floor( Math.random() * ( max - min + 1 ) + min );
	
	while ( times > 0 ) {
		var random_number = Math.floor( Math.random() * ( max - min + 1 ) + min );
		
		if ( random_array.indexOf( random_number ) === -1 ) {
			if ( array === null ) {
				/// getting  array of  times random numbers from range
				random_array.push( random_number );
				times--;
			}
			
			else if ( random_array.indexOf( array[ random_number ] ) === -1 ) {
				/// getting array of times random items from array
				random_array.push( array[ random_number ] );
				times--;
			}
			
		}
	}
	return random_array;
	
}

var cities_coordinates = [
	[ 24.487149, -77.969971, 'Central Andros' ],
	[ 25.621716, -80.288086, 'miami-dade county' ],
	[ 26.698999, -80.093079, 'west palm beach' ],
	
	[ 28.860799, -13.841014, 'yaiza' ],
	[ 28.863693, -13.828869, 'yaiza' ],
	[ 28.865459, -13.834491, 'yaiza' ],
	[ 28.865459, -13.835491, 'yaiza' ],
	[ 28.845459, -13.836491, 'yaiza' ],
	[ 28.365459, -13.854491, 'yaiza' ],
	[ 28.86159, -13.854491, 'yaiza' ],
	[ 28.865439, -13.86491, 'yaiza' ],
	[ 28.865359, -13.836491, 'yaiza' ],
	[ 28.864459, -13.83391, 'yaiza' ],
	[ 28.865359, -13.85491, 'yaiza' ],
	
	[ 51.802614, -8.54399, "cork" ],
	[ 51.90314, -8.464399, "cork" ],
	[ 51.94614, -8.44359, "cork" ],
	[ 51.905614, -8.4699, "cork" ],
	[ 51.916614, -8.437399, "cork" ],
	[ 51.973614, -8.460399, "cork" ],
	[ 51.98664, -8.38999, "cork" ],
	[ 51.99614, -8.4688499, "cork" ],
	[ 51.98614, -8.66799, "cork" ],
	[ 51.93714, -8.43699, "cork" ],
	[ 51.906414, -8.455399, "cork" ],
	[ 51.905614, -8.464699, "cork" ],
	[ 51.94614, -8.46399, "cork" ],
	[ 51.933614, -8.428799, "cork" ],
	[ 51.9214, -8.4714399, "cork" ],
	
	[ 53.10140, -6.16155, "dublin" ],
	[ 53.20140, -6.26155, "dublin" ],
	[ 53.30140, -6.36155, "dublin" ],
	[ 53.40140, -6.4155, "dublin" ],
	[ 53.50140, -6.56155, "dublin" ],
	[ 53.60140, -6.66155, "dublin" ],
	[ 53.750140, -6.76155, "dublin" ],
	[ 53.80140, -6.86155, "dublin" ],
	[ 53.90140, -6.96155, "dublin" ],
	[ 53.351140, -6.26155, "dublin" ],
	[ 53.3240, -6.26255, "dublin" ],
	[ 53.353140, -6.2355, "dublin" ],
	[ 53.35440, -6.26645, "dublin" ],
	[ 53.35540, -6.26555, "dublin" ],
	[ 53.35640, -6.2665, "dublin" ],
	[ 53.357140, -6.26755, "dublin" ],
	[ 53.35840, -6.26685, "dublin" ],
	
	[ 52.272962, -9.12691, "limerick" ],
	[ 52.10962, -9.2691, "limerick" ],
	[ 52.220962, -9.3691, "limerick" ],
	[ 52.40962, -9.4691, "limerick" ],
	[ 52.50962, -9.5691, "limerick" ],
	[ 52.60962, -9.6691, "limerick" ],
	[ 52.30962, -9.7691, "limerick" ],
	[ 52.00962, -9.8691, "limerick" ],
	[ 52.10962, -9.92691, "limerick" ],
	[ 52.00962, -9.06211, "limerick" ],
	[ 52.27162, -9.06291, "limerick" ],
	[ 52.27262, -9.06391, "limerick" ],
	[ 52.27032, -9.06491, "limerick" ],
	[ 52.27462, -9.06591, "limerick" ],
	[ 52.27052, -9.06691, "limerick" ],
	[ 52.27096, -9.0791, "limerick" ],
	[ 52.2772, -9.06281, "limerick" ],
	
	[ 53.272962, -9.12691, "galway" ],
	[ 54.10962, -9.2691, "galway" ],
	[ 53.220962, -9.3691, "galway" ],
	[ 53.40962, -9.4691, "galway" ],
	[ 53.50962, -9.5691, "galway" ],
	[ 53.60962, -9.6691, "galway" ],
	[ 53.70962, -9.7691, "galway" ],
	[ 53.30962, -9.8691, "galway" ],
	[ 53.90962, -9.92691, "galway" ],
	[ 53.00962, -9.06211, "galway" ],
	[ 53.27162, -9.06291, "galway" ],
	[ 53.27262, -9.06391, "galway" ],
	[ 53.27032, -9.06491, "galway" ],
	[ 53.27462, -9.06591, "galway" ],
	[ 53.27052, -9.06691, "galway" ],
	[ 53.27096, -9.0791, "galway" ],
	[ 53.2772, -9.06281, "galway" ],
	
	[ 52.901614, -8.46599, "cork" ],
	[ 52.202614, -8.44399, "cork" ],
	[ 52.90314, -8.464399, "cork" ],
	[ 52.94614, -8.44359, "cork" ],
	[ 52.905614, -8.4699, "cork" ],
	[ 52.916614, -8.437399, "cork" ],
	[ 52.973614, -8.460399, "cork" ],
	[ 52.98664, -8.38999, "cork" ],
	[ 52.99614, -8.4688499, "cork" ],
	[ 52.98614, -8.66799, "cork" ],
	[ 52.93714, -8.43699, "cork" ],
	[ 52.906414, -8.455399, "cork" ],
	[ 52.905614, -8.464699, "cork" ],
	[ 52.94614, -8.46399, "cork" ],
	[ 52.933614, -8.428799, "cork" ],
	[ 52.9214, -8.4714399, "cork" ]
];

var num_of_booked_weeks = Math.floor( weeks_till_end_of_year.length / 4 ); // setting ~ 25 % of days as booked,

var views = [ 'mountain', 'sea', 'lake', 'river', 'pool', 'beach', 'forrest', 'skyline', 'fields', 'desert' ];

var amenities = [
	'fresh linens', 'extra blankets', 'puzzle turn down service', 'elevator bartender', 'celebrity wake up call', 'fast Wi-Fi',
	'in-room cocktail station', 'in-room workout and meditation', 'USB charger ports', 'smart TV with Netflix',
	'in-room coffee machine', 'office corner', 'welcome gift', 'local flavor gifts', 'in-room beer tap', 'shower mini fridge',
	'pop corn delivery', 'complementary smart phone', 'complementary BMW SUV'
];
localStorage.clear();
if ( localStorage.getItem( 'DB' ) ) {
//	IF  DB IS IN LOCAL STORAGE ALREADY, WE WILL GET IT FROM THERE, NO RE-CREATING DB
	// because local storage is storing strings we need to stringify our object on the way in and parse it on the way out
	DB = JSON.parse( localStorage.getItem( 'DB' ) );
	
}
else {
	//	IF  IT IS FIRST REQUEST, DB NOT IN LOCAL STORAGE, WE WILL CREATE IT AND STORE IN LOCAL STORAGE FOR FUTURE USE
	
	var DB = [];
	
	$.each( cities_coordinates, function ( index, city_coordinates ) {
		
		DB.push( {
			         'p_id'         : index,
			         'p_address'    : '',
			         'p_price_per_w': getRandom( 150, 300 ),
			         'p_description': 'Beautiful room with ' + views[ index % 10 ] + ' view to make you smile in the morning....',
			         'p_view'       : views[ index % 10 ],
			         'lat'          : city_coordinates[ 0 ],
			         'lng'          : city_coordinates[ 1 ],
			         'board_type'   : getRandom( 0, 3 ),
			         'room_type'    : getRandom( 0, 1 ),
			         'city'         : city_coordinates[ 2 ],
			         'bookings'     : getRandom( current_date.getWeek(), 53, num_of_booked_weeks ),
			         'amenities'    : getRandom( 1, amenities.length - 1, 15, amenities )
		         } );
		
	} );
	
	if ( storageAvailable( 'localStorage' ) ) {
		// because local storage is storing strings we need to stringify our object on the way in and parse it on the way out
		localStorage.setItem( 'DB', JSON.stringify( DB ) );
	
	}
	else {
		
		console.log( 'Your browser doesn\'t have local storage. You won\'t be able to experience the website fully.' )
	}
	
}

//localStorage.clear();