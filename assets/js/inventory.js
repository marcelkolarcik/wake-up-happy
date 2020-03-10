/*TO CREATE "DATABASE" IN localStorage I AM USING THESE ARRAYS AS "TABLES"
* WHEN STORING NEW ROOM INTO localStorage , I AM STORING ONLY KEY OF THE ARRAY ITEM INTO ROOM OBJECT
* AND ON RENDERING THE PAGE DISPLAYING FULL STRING
* EXAMPLE  of one of the ROOM STORED IN localStorage
*
* var property = {"p_id":0,
* "p_address":{"city":"Central Andros","property_name":"property name 0"},
* "price":{"0":300,"1":292,"2":219},
* "p_description":"Beautiful room with mountain view to make you smile in the morning....","
* p_view":0,
* "lat":24.487149,
* "lng":-77.969971,
* "room_type":0,
* "room_style":14,
* "location":"Central Andros",
* "searchables":["Central Andros"],
* "bookings":[18,34,12,24,29,48,47,2,51,40],
* "amenities":[12,10,4,5,13,3,15,17,8,11,9,6,14,16,7]}
*
* SO WHEN RENDERING THE ROOM ON THE PAGE FOR EXAMPLE IF I WANT TO RENDER VIEW TYPE IMAGE
* var views = JSON.parse( localStorage.getItem('views') );
* I AM ACCESSING IT BY ${views[property.p_view]}.jpg WHICH IS IN THIS CASE WILL RENDER mountain.jpg FILE*/


export let room_types = [ 'single', 'double' ];
export let board_types = [ 'Room only',
                           'B & B',
                           'B & D',
                           'All Inclusive' ];
export let view_types =  [ 'mountain', 'sea', 'lake', 'river', 'pool', 'beach', 'forrest', 'skyline', 'fields', 'desert' ];
export let room_styles = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

export var cities_coordinates = [
	[ 24.487149, -77.969971, 'Central Andros' ],
	[ 25.621716, -80.288086, 'Miami-dade county' ],
	[ 26.698999, -80.093079, 'West palm beach' ],
	
	[ 28.860799, -13.841014, 'Yaiza' ],
	[ 28.863693, -13.828869, 'Yaiza' ],
	[ 28.865459, -13.834491, 'Yaiza' ],
	[ 28.865459, -13.835491, 'Yaiza' ],
	[ 28.845459, -13.836491, 'Yaiza' ],
	[ 28.365459, -13.854491, 'Yaiza' ],
	[ 28.86159, -13.854491, 'Yaiza' ],
	[ 28.865439, -13.86491, 'Yaiza' ],
	[ 28.865359, -13.836491, 'Yaiza' ],
	[ 28.864459, -13.83391, 'Yaiza' ],
	[ 28.865359, -13.85491, 'Yaiza' ],
	
	[ 51.802614, -8.54399, "Cork" ],
	[ 51.90314, -8.464399, "Cork" ],
	[ 51.94614, -8.44359, "Cork" ],
	[ 51.905614, -8.4699, "Cork" ],
	[ 51.916614, -8.437399, "Cork" ],
	[ 51.973614, -8.460399, "Cork" ],
	[ 51.98664, -8.38999, "Cork" ],
	[ 51.99614, -8.4688499, "Cork" ],
	[ 51.98614, -8.66799, "Cork" ],
	[ 51.93714, -8.43699, "Cork" ],
	[ 51.906414, -8.455399, "Cork" ],
	[ 51.905614, -8.464699, "Cork" ],
	[ 51.94614, -8.46399, "Cork" ],
	[ 51.933614, -8.428799, "Cork" ],
	[ 51.9214, -8.4714399, "Cork" ],
	
	[ 53.10140, -6.16155, "Dublin" ],
	[ 53.20140, -6.26155, "Dublin" ],
	[ 53.30140, -6.36155, "Dublin" ],
	[ 53.40140, -6.4155, "Dublin" ],
	[ 53.50140, -6.56155, "Dublin" ],
	[ 53.60140, -6.66155, "Dublin" ],
	[ 53.750140, -6.76155, "Dublin" ],
	[ 53.80140, -6.86155, "Dublin" ],
	[ 53.90140, -6.96155, "Dublin" ],
	[ 53.351140, -6.26155, "Dublin" ],
	[ 53.3240, -6.26255, "Dublin" ],
	[ 53.353140, -6.2355, "Dublin" ],
	[ 53.35440, -6.26645, "Dublin" ],
	[ 53.35540, -6.26555, "Dublin" ],
	[ 53.35640, -6.2665, "Dublin" ],
	[ 53.357140, -6.26755, "Dublin" ],
	[ 53.35840, -6.26685, "Dublin" ],
	
	[ 52.272962, -9.12691, "Limerick" ],
	[ 52.10962, -9.2691, "Limerick" ],
	[ 52.220962, -9.3691, "Limerick" ],
	[ 52.40962, -9.4691, "Limerick" ],
	[ 52.50962, -9.5691, "Limerick" ],
	[ 52.60962, -9.6691, "Limerick" ],
	[ 52.30962, -9.7691, "Limerick" ],
	[ 52.00962, -9.8691, "Limerick" ],
	[ 52.10962, -9.92691, "Limerick" ],
	[ 52.00962, -9.06211, "Limerick" ],
	[ 52.27162, -9.06291, "Limerick" ],
	[ 52.27262, -9.06391, "Limerick" ],
	[ 52.27032, -9.06491, "Limerick" ],
	[ 52.27462, -9.06591, "Limerick" ],
	[ 52.27052, -9.06691, "Limerick" ],
	[ 52.27096, -9.0791, "Limerick" ],
	[ 52.2772, -9.06281, "Limerick" ],
	
	[ 53.272962, -9.12691, "Galway" ],
	[ 54.10962, -9.2691, "Galway" ],
	[ 53.220962, -9.3691, "Galway" ],
	[ 53.40962, -9.4691, "Galway" ],
	[ 53.50962, -9.5691, "Galway" ],
	[ 53.60962, -9.6691, "Galway" ],
	[ 53.70962, -9.7691, "Galway" ],
	[ 53.30962, -9.8691, "Galway" ],
	[ 53.90962, -9.92691, "Galway" ],
	[ 53.00962, -9.06211, "Galway" ],
	[ 53.27162, -9.06291, "Galway" ],
	[ 53.27262, -9.06391, "Galway" ],
	[ 53.27032, -9.06491, "Galway" ],
	[ 53.27462, -9.06591, "Galway" ],
	[ 53.27052, -9.06691, "Galway" ],
	[ 53.27096, -9.0791, "Galway" ],
	[ 53.2772, -9.06281, "Galway" ],
	
	[ 52.901614, -8.46599, "Cork" ],
	[ 52.202614, -8.44399, "Cork" ],
	[ 52.90314, -8.464399, "Cork" ],
	[ 52.94614, -8.44359, "Cork" ],
	[ 52.905614, -8.4699, "Cork" ],
	[ 52.916614, -8.437399, "Cork" ],
	[ 52.973614, -8.460399, "Cork" ],
	[ 52.98664, -8.38999, "Cork" ],
	[ 52.99614, -8.4688499, "Cork" ],
	[ 52.98614, -8.66799, "Cork" ],
	[ 52.93714, -8.43699, "Cork" ],
	[ 52.906414, -8.455399, "Cork" ],
	[ 52.905614, -8.464699, "Cork" ],
	[ 52.94614, -8.46399, "Cork" ],
	[ 52.933614, -8.428799, "Cork" ],
	[ 52.9214, -8.4714399, "Cork" ]
];

//NUMBER OF INITIAL BOOKED WEEKS FOR THE ROOM
export let num_of_booked_weeks = 10;



export let amenities_list = [
	'fresh linens', 'extra blankets', 'puzzle turn down service', 'elevator bartender', 'celebrity wake up call', 'fast Wi-Fi',
	'in-room cocktail station', 'in-room workout and meditation', 'USB charger ports', 'smart TV with Netflix',
	'in-room coffee machine', 'office corner', 'welcome gift', 'local flavor gifts', 'in-room beer tap', 'shower mini fridge',
	'pop corn delivery', 'complementary smart phone', 'complementary BMW SUV'
];

// INITIAL autocomplete_searchables  ARRAY, THAT IS UPDATED WITH EVERY ADDRESS OF NEW ROOM ADDED TO localStorage IF
// ADDRESS ITEM IS NOT ALREADY IN THE ARRAY USING address_keys AS FILTER
// IN add_room_helpers.js => check_autocomplete(room) function -> lines 682 ->...
// SO WHEN USER TYPES IN LOCATION AND WE ALREADY HAVE IT, AUTO-COMPLETE OPTION WILL SHOW
// city_autocomplete.js line 101
export let autocomplete_searchables =['Cork','Dublin','Limerick','Yaiza','Miami-dade county','West palm beach'];

// WE ARE CREATING SEARCHABLE ARRAY FOR EACH ROOM  IN added_room_preview.js lines 101 -> ...
// ADDED FROM ADDRESS DETAILS PROVIDED BY
// https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates[ 0 ]}&lon=${coordinates[ 1 ]}
// PASSING IT THROUGH FILTER address_keys , OMITTING DETAILS LIKE road, lng,lat...
// SO WHEN USER IS SEARCHING FOR THE LOCATION OF THE ROOM ON index.html
// search_results.js ->  function is_available ( property, location ) lines 7 -> ...
// IF ROOM'S SEARCHABLE ARRAY CONTAINS
// STRING THAT USER TYPES => THIS ROOM WILL APPEAR IN SEARCH RESULTS, IF OF COURSE OTHER CONDITIONS ARE MET LIKE room_type, board_type, free weeks
export let address_keys = ['city','country','county','village','town','state','state district','suburbs','city district','region','locality','hamlet'];