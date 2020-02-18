import { render_index } from "./render_index.js";


$ ( document ).on ( 'click', '.preview_room', function () {
	
	var p_id = JSON.parse ( localStorage.getItem ( 'ROOMS' ) ).length;
	
	var your_room = $ ( "#add_your_room" ).serialize ();
	var your_room_array = your_room.split ( '&' );
	var address = {};
	var amenities = [];
	var room = { 'price': {} };
	for ( var item in your_room_array ) {
		var s_item = your_room_array[ item ].split ( '=' );
		var key = s_item[ 0 ];
		var value = s_item[ 1 ];
		
		if ( key.substring ( 0, 7 ) === 'address' ) {
			address[ key.split ( '__' )[ 1 ] ] =   value.replace ( /%20/g, ' ' ) ;
		}
		else if ( key === 'amenities' ) {
			amenities.push ( value );
		}
		else if ( key === 'view_type' ) {
			room[ 'p_view' ] = value;
		}
		else if ( key === 'description' ) {
			room[ 'p_description' ] = value.replace ( /%20/g, ' ' );
			
		}
		
		else if ( key === 'room_style' ) {
			room[ 'room_style' ] = parseInt ( value ) + 1; //// to avoid 0
		}
		else if ( key === 'board_type_0_price' && value !== '' ) /// to avoid no price for board
		{
			room[ 'price' ][ 0 ] = value;
		}
		else if ( key === 'board_type_1_price' && value !== '' ) {
			room[ 'price' ][ 1 ] = value;
		}
		else if ( key === 'board_type_2_price' && value !== '' ) {
			room[ 'price' ][ 2 ] = value;
		}
		else if ( key === 'board_type_3_price' && value !== '' ) {
			room[ 'price' ][ 3 ] = value;
		}
		else if ( key !== "board_type_0" && key !== "board_type_1" && key !== "board_type_2" && key !== "board_type_3" ) {
			room[ key ] = value;
		}
		
	}
	
	room[ 'p_id' ] = p_id;
	room[ 'p_address' ] = address;
	room[ 'location' ] = address.city || address.village  || address.city_district || address.county || address.state_district|| address.state  || address.country;
	room[ 'amenities' ] = amenities;
	room[ 'bookings' ] = [];
	sessionStorage.setItem ( 'new_room', JSON.stringify ( room ) );
	
	
	render_index ( room, room.room_style, 'preview' );
} );

