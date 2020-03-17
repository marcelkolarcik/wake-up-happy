/*FUNCTION TO RENDER ADDRESS OF PROPERTY TO ROOM PREVIEW*/

export function render_address ( room )
	{
		/*ADDRESS DETAILS AS PROVIDED BY nominatim.openstreetmap.org/reverse API
		 * IT CAN VARY IN LENGTH , DEPENDING ON THE POINT ON THE LOCATION
		 *
		 *
		 * EXAMPLE 1 OF room.p_address :
		 *
		 *    house_number: "44"
		 road: "Capel Street"
		 city_district: "North City ED"
		 city: "Dublin"
		 county: "County Dublin"
		 state_district: "Leinster"
		 postcode: "D01 PX00"
		 country: "Ireland"
		 country_code: "ie"
		 
		 EXAMPLE 2  OF room.p_address:
		 
		 country: "United Kingdom"
		 country_code: "gb"
		 county: "Cheshire East"
		 house_number: "6"
		 postcode: "CW5 5HJ"
		 residential: "Millfields"
		 road: "Wyche Avenue"
		 state: "England"
		 state_district: "North West England"
		 suburb: "Nantwich"
		 town: "Nantwich"
		 */
		
		
		/*WHERE TO APPEND ADDRESS*/
		var div = $ ( '#address' + room.p_id );
		
		var e = 0;
		
		$.each ( room.p_address, function ( key, value )
		{
			e++;
			
			/*IF IT IS LAST ADDRESS DETAIL,APPEND IT WITHOUT COMA */
			e === Object.keys ( room.p_address ).length
			? div.append ( `${ value }` )
			: div.append ( `${ value + ',' }` );
			
			
		} );
		
	}