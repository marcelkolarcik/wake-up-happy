import {render_index} from "./render_index.js";
$( document ).on( 'click', '.preview_room', function () {
	
	var your_room = $("#add_your_room").serialize();
	var your_room_array = your_room.split('&');
	var address = {};
	var amenities = [];
	var property = {'price':{}};
	for(var item in your_room_array)
	{
		var s_item =your_room_array[item] .split('=');
		var key = s_item[0];
		var value = s_item[1];
		
		if(key.substring(0,7) === 'address')
		{
			address[key.split('__')[1]] =  value.replace(/%20/g, ' ');
		}
		else if(key === 'amenities')
		{
			amenities.push(value)  ;
		}
		else if(key === 'view_type')
		{
			property['p_view'] = value;
		}
		else if(key === 'description')
		{
			property['p_description'] = value.replace(/%20/g, ' ');
		}
		
		else if(key === 'room_style' )
		{
			property['room_style'] = parseInt( value ) + 1; //// to avoid 0
		}
		else if(key === 'board_type_0_price' && value !== '') /// to avoid no price for board
		{
			property['price'][0] = value;
		}
		else if(key === 'board_type_1_price' && value !== '')
		{
			property['price'][1] = value;
		}
		else if(key === 'board_type_2_price' && value !== '')
		{
			property['price'][2] = value;
		}
		else if(key === 'board_type_3_price' && value !== '')
		{
			property['price'][3] = value;
		}
		else if (key !=="board_type_0" &&key !=="board_type_1" &&  key !=="board_type_2" && key !=="board_type_3")
		{
			property[key] = value;
		}
		
		
	}
	
	property['p_id']    =   1000;
	property['p_address'] = address;
	property['city'] = address.county;
	property['amenities']   =   amenities;
	property['bookings']   =   [];
	
	render_index( property, property.room_style, 'preview');
});

