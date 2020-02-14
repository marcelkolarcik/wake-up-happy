/*arrays i am using in the pages*/
export let room_types = [ 'single', 'double' ];
export let board_types = [ 'room only', 'bed & breakfast', 'breakfast & dinner', 'all inclusive' ];
export let view_types = [ 'beach', 'desert', 'fields', 'forrest', 'lake', 'mountain', 'pool', 'river', 'sea', 'skyline' ];
export let room_styles = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
export let amenities = [
	'fresh linens', 'extra blankets', 'puzzle turn down service', 'elevator bartender', 'celebrity wake up call', 'fast Wi-Fi',
	'in-room cocktail station', 'in-room workout and meditation', 'USB charger ports', 'smart TV with Netflix',
	'in-room coffee machine', 'office corner', 'welcome gift', 'local flavor gifts', 'in-room beer tap', 'shower mini fridge',
	'pop corn delivery', 'complementary smart phone', 'complementary BMW SUV'
];

//these two functions are not available in the page after import
// i am including it in functions.js on landlord.html page

/*Uncaught ReferenceError: enlarge_img is not defined
 at HTMLImageElement.onclick*/

/*
export function show_content() {
	
	$( document ).on( "click", ".form_image", function () {
		
		console.log( $( this ).parent(), $( this ) );
		$( this ).parent().toggleClass( 'col-md-2' );
		
	} )
}

export function enlarge_img() {
	$( document ).on( "click", ".form_image", function () {
		
		console.log( $( this ).parent(), $( this ) );
		$( this ).parent().toggleClass( 'col-md-2' );
		
	} )
}*/
