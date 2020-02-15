function checkForm() {

	var your_room = $("#add_your_room").serialize();
	
	var your_room_array = your_room.split('&');
	var sorted_array = [];
	var missing_items = [];
	
	//console.log(your_room_array);
		for(let item in your_room_array)
		{
			
			
			
			
			//console.log(your_room_array[item].split('=')[1] === ''  , 'type of '+your_room_array[item].split('=')[1] );
//			if(item.substring(0,6) === 'address')
//			{
//
//				sorted_array[your_room_array[item].split('=')[0]].push( your_room_array[item].split('=')[1]);
//
//			}
//			else if (item.split('=')[0] === 'amenities' )
//			{
//
//				sorted_array[your_room_array[item].split('=')[0]].push(your_room_array[item].split('=')[1]);
//
//			}
//
//			else if( typeof(your_room_array[item].split('=')[1]) !== 'undefined')
//			{
//
//				sorted_array[your_room_array[item].split('=')[0]].push(your_room_array[item].split('=')[1])
//
//			}
		}
	
	
	
	

	
	return false;  // To block from loading a new page
}