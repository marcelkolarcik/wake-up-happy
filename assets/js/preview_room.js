function preview_room()
{
	var views = [ 'mountain', 'sea', 'lake', 'river', 'pool', 'beach', 'forrest', 'skyline', 'fields', 'desert' ];
	var amenities_list = [
		'fresh linens', 'extra blankets', 'puzzle turn down service', 'elevator bartender', 'celebrity wake up call', 'fast Wi-Fi',
		'in-room cocktail station', 'in-room workout and meditation', 'USB charger ports', 'smart TV with Netflix',
		'in-room coffee machine', 'office corner', 'welcome gift', 'local flavor gifts', 'in-room beer tap', 'shower mini fridge',
		'pop corn delivery', 'complementary smart phone', 'complementary BMW SUV'
	];
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
			amenities.push(amenities_list[value])  ;
		}
		else if(key === 'view_type')
		{
			property['p_view'] = views[ parseInt( value ) ];
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
	console.log(address,amenities,your_room_array,property);
	/*room_type: "0"
	 view_type: "2"
	 room_style: "2"
	 board_type_0_price: "5"*/
	//console.log(your_room_array,address,amenities_list,s_item[1]);
//	var property = {
//		p_id: 1222,
//		p_address: "",
//		p_price_per_w: 176,
//		p_description: "Beautiful room with river view to make you smile in the morning....",
//		p_view: "river",
//		lat: 51.93714,
//		lng: -8.43699,
//		board_type: 2,
//		room_type: 0,
//		city: "cork",
//		bookings:[],
//		amenities:[]
//	}

}
