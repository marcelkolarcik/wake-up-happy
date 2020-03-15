
import { render_room_preview } from './render_room_preview.js';
import { featured_rooms }      from './featured_rooms.js';


/* CHECKING AVAILABILITY OF THE ROOM */
function is_available ( property, location ) {
	
	var room_type = $ ( "#room_type" ).val ();
	var board_type = $ ( "#board_type" ).val ();
	
	var property_searchables = property.searchables;
	
	//console.log(property_searchables,'search : '+location.toString())
	
	//console.log('room_type '+property.room_type.toString(),'search : '+room_type.toString());
	//console.log('board_type '+property.price[board_type],'search : '+board_type.toString());
	
	//console.log('room_type_same :'+ (property.room_type.toString() === room_type.toString())  );
	
	if ( room_type === 'any' && board_type === 'any' ) {
		///// searching only for the city
		if ( property_searchables.indexOf ( location.toString () ) !== -1 ) {
			return true;
		}
		
	}
	else if ( room_type === 'any' && board_type !== 'any' ) {
		/////searching for the city and board_type
		if ( property_searchables.indexOf ( location.toString () ) !== -1 &&
		     (  board_type in property.price )
		) {
			return true;
		}
	}
	else if ( room_type !== 'any' && board_type === 'any' ) {
		/////searching for the city and room_type
		if ( property_searchables.indexOf ( location.toString () ) !== -1 &&
		     property.room_type.toString () === room_type.toString () ) {
			return true;
		}
		
	}
	else {
		///// searching for the city, room_type, board_type
		if (
			property_searchables.indexOf ( location.toString () ) !== -1 &&
			property.room_type.toString () === room_type.toString () &&
			( board_type in property.price )
		) {
			return true;
		}
	}
}

/* DISPLAYING AVAILABLE ROOMS IN form_search_results*/
$ ( document ).on ( "click", "#search_btn", function ( e ) {
	/*we don't want to submit form to the server, because we don't  have one*/
	e.preventDefault ();
	
	var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
	
	//// because these divs could have content from previous search
	var form_search_results = $ ( '#form_search_results' );
	
	form_search_results.html ( '' );
	$ ( '#map_search_result' ).html ( '' );
	
	//// to make city search case insensitive, same will apply when landlord is adding room into th map, we will store
	// it .toLowerCase();
	var location = $ ( '#location' ).val ();

//	because at least city must be selected
	if ( location === '' ) {
		swal.fire ( (  'select location' ) );
	}
	
	var results = 0;
	for ( var room in ROOMS ) {
		
		var property = ROOMS[ room ];
		
		if(property)
//		property COULD BE null, BECAUSE, WHEN OWNER DELETES ROOM, IT IS ACTUALLY SET TO NULL
			// SO NEED TO FILTER OUT THOSE DELETED ROOMS
		{
			
			if ( is_available ( property, location ) ) {
				
				render_room_preview (  property, 'form_search_results' );
				results++;
			}
		}
		
		
	}
	
	if ( results === 0 ) {
		
		//// because if results are empty , we will display info to the user, about 0 results, and display "featured
		// properties" instead...
		form_search_results.append ( ' <div class = "img-thumbnail mt-3 bg_orange " >' +
		                             'Your search returned 0 results, try different search parameters or have a look at ' +
		                             'featured properties bellow.</div >' );
		featured_rooms ();
		
	}
	else {
		form_search_results.prepend ( ` <div class = "img-thumbnail mt-3 border_green pl-3" >Search results: ${results}</div >` );
	}
	
} );


/*CLICKING ON more... LINK IN MAP POPUP  DISPLAY ROOM IN map_search_result*/
$ ( document ).on ( "click", ".property_popup", function () {
	var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
	$ ( '#form_search_results' ).html ( '' );
	$ ( '#map_search_result' ).html ( '' );
	
	var p_id = $ ( this ).attr ( 'id' );
	var property = ROOMS[ p_id ];
	
	
	render_room_preview ( property, 'map_search_result' );
	
} );


