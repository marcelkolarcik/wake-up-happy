/*WHEN OWNER CLICKS ON preview BUTTON, WE WILL CREATE AND RENDER ROOM FOR PREVIEWING
 * OWNER COULD BE PREVIEWING, EDITING OR ADDING NEW ROOM, IF ADDING NEW ROOM
 * NEW room_id WILL BE JSON.parse ( localStorage.getItem ( 'ROOMS' ) ).length
 * OTHERWISE WE WILL RETRIEVE room_id FORM CURRENT ROOM*/

import { render_room_preview } from "./render_room_preview.js";


$ ( document ).on ( 'click', '.preview_room', function ()
{
	
	if ( sessionStorage.getItem ( 'room_to_edit' ) && !sessionStorage.getItem ( 'add_mode' ) )
		{
			var p_id = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_id;
			
		}
	else
		{
			p_id = JSON.parse ( localStorage.getItem ( 'ROOMS' ) ).length;
		}


//	GETTING FORM DATA WITH serialize()
	var your_room       = $ ( "#add_your_room" ).serialize ();
	var your_room_array = your_room.split ( '&' );
	
	
	var address   = {};
	var amenities = [];
	var room      = { 'price' : {} };
	
	for ( var item in your_room_array )
		{
			var s_item = your_room_array[ item ].split ( '=' );
			var key    = s_item[ 0 ];
			var value  = s_item[ 1 ];
			
			/* I HAVE PREPENDED __address TO DETAILS FROM REVERSE SEARCH FROM nominatim AND NOW
			 * I AM COLLECTING ADDRESS DETAILS AND PUSHING THEM INTO ADDRESS ARRAY*/
			
			if ( key.substring ( 0, 7 ) === 'address' )
				{
					address[ key.split ( '__' )[ 1 ] ] = decodeURIComponent ( value );
				}
			/*THERE COULD BE MULTIPLE AMENITIES SELECTED, SO I AM PUSHING  AMENITY (1,3,4,...) INTO AMENITIES ARRAY AS WELL*/
			else if ( key === 'amenities' )
				{
					amenities.push ( parseInt ( value ) );
				}
			else if ( key === 'view_type' )
				{
					room[ 'p_view' ] = value; // (1 || 2 || 3....16)
				}
			else if ( key === 'description' )
				{
					room[ 'p_description' ] = decodeURIComponent ( value );
					
				}
			
			else if ( key === 'room_style' )
				{
//			ADDING +1 TO room_style AS THIS NUMBER IS USED TO RETRIEVE IMAGE FROM assets/images/bedrooms
// (b1.jpg,b2.jpg......b16.jpg)
					room[ 'room_style' ] = parseInt ( value ) + 1; //// to avoid 0
				}
//		PRICE FOR ROOM ONLY
			else if ( key === 'board_type_0_price' )
				{
					room[ 'price' ][ 0 ] = value;
				}
//		PRICE FOR B&B
			else if ( key === 'board_type_1_price' )
				{
					room[ 'price' ][ 1 ] = value;
				}
//		PRICE FOR B&D
			else if ( key === 'board_type_2_price' )
				{
					room[ 'price' ][ 2 ] = value;
				}
//		PRICE FOR ALL INCLUSIVE
			else if ( key === 'board_type_3_price' )
				{
					room[ 'price' ][ 3 ] = value;
				}
//      ROOM TYPE, ROOM VIEW
			else if ( key !== "board_type_0" && key !== "board_type_1" && key !== "board_type_2" && key
			          !== "board_type_3" )
				{
					room[ key ] = value;
				}
			
		}
	
	room[ 'p_id' ]      = p_id;
	room[ 'food_id' ]   = getRandom(1,3);
	room[ 'p_address' ] = address;
	room[ 'location' ]  = address.city || address.village || address.hamlet || address.county || address.state_district
	                      || address.state || address.country;
	room[ 'amenities' ] = amenities;
	room[ 'bookings' ]  = [];
	
	if ( sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' && sessionStorage.getItem ( 'room_to_edit' )
	     !== null )
		{
//		IF OWNER IS PREVIEWING / EDITING ROOM , WE'LL SHOW BOOKINGS, IF ANY...
			room[ 'bookings' ] = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).bookings;
		}

//	ARRAY OF SEARCHABLE ADDRESS STRINGS , BY WHICH ROOM CAN BE FOUND BY SEARCHING IN SEARCH FORM ON index.html
	var searchables = [];
	
	
	//	address_keys ( FILTER ) FOR CREATING SEARCHABLE ARRAY FOR THE ROOM ( EX. 'city','country','village','town')
	// FROM THE ADDRESS DETAILS PROVIDED BY nominatim, WITHOUT KEYS LIKE (lat,lng, road....)
	var address_keys = JSON.parse ( localStorage.getItem ( 'address_keys' ) );
	
	$.each ( address, function ( key, value )
	{

//		IF KEY IS IN address_keys ARRAY  ( EX. 'city','country','village','town')
//       WE'LL GET IT AND STORE IT FOR THE ROOM
		
		if ( address_keys.indexOf ( key ) !== -1 )
			{

//				WE'LL SPLIT EVERY LOCATION DETAIL ON SPACE AND
				$.each ( value.split ( ' ' ), function ( index, string )
				{

//              IF IT'S length > 1 WE'LL USE EACH PART +
					if ( value.split ( ' ' ).length > 1 ) searchables.push ( decodeURI ( string ) );
					
				} );

//			+	FULL LOCATION NAME
				searchables.push ( decodeURI ( value ) );
			}
		
	} );
	
	room[ 'searchables' ] = searchables;
	
	// SETTING new_room TO SESSION, FOR WHEN OWNER DECIDES TO GO AHEAD AND PAY FOR THE ADDING THE ROOM TO THE SITE
	sessionStorage.setItem ( 'new_room', JSON.stringify ( room ) );
	
	//LATER AFTER PAYMENT WE'LL RETRIEVE new_room FROM THE sessionStorage AND STORE IT
	// IN localStorage IN add_room_interactions.js  LINE NUMBER ~ 423


//	RENDERING ROOM FOR PREVIEW
	render_room_preview ( room, 'preview', true );
	
} );

