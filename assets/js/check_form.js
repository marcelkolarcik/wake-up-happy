function checkForm(   ) {

	var your_room = $("#add_your_room").serialize();
	
	var your_room_array = your_room.split('&');
	
	
	console.log(your_room_array);
	
	
	
	
	

	
	return false;  // To block from loading a new page
}