/*arrays i am using in the pages*/
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
export let num_of_booked_weeks = Math.floor( weeks_till_end_of_year.length / 4 ); // setting ~ 25 % of days as booked,
export let amenities = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ];//19

export let amenities_list = [
	'fresh linens', 'extra blankets', 'puzzle turn down service', 'elevator bartender', 'celebrity wake up call', 'fast Wi-Fi',
	'in-room cocktail station', 'in-room workout and meditation', 'USB charger ports', 'smart TV with Netflix',
	'in-room coffee machine', 'office corner', 'welcome gift', 'local flavor gifts', 'in-room beer tap', 'shower mini fridge',
	'pop corn delivery', 'complementary smart phone', 'complementary BMW SUV'
];

export let autocomplete_searchables =['Cork','Dublin','Limerick','Yaiza','miami-dade county','west palm beach']; //// TO DO to get cities from DB object
export let address_keys = ['city','country','county','village','town','state','state district','suburbs','city district','region','locality','hamlet'];