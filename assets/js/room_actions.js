$ ( document ).on ( 'click', '#preview_mode', function () {
//	/owner.html
	
	sessionStorage.removeItem('edit_mode');
	sessionStorage.removeItem('add_mode');
	
	sessionStorage.setItem('preview_mode',true);
	
	window.location.reload();
	
	//swal.fire('preview mode',window.location.pathname)
});
$ ( document ).on ( 'click', '#edit_mode', function () {
	
	
	
	sessionStorage.removeItem('preview_mode');
	sessionStorage.removeItem('add_mode');
	
	sessionStorage.setItem('edit_mode',true);
	
	window.location.reload();
	
	
});

$ ( document ).on ( 'click', '#add_mode', function () {
	
	
	
	sessionStorage.removeItem('preview_mode');
	sessionStorage.removeItem('edit_mode');
	
	sessionStorage.setItem('add_mode',true);
	
	window.location.reload();
	
	
});

$ ( document ).on ( 'click', '#delete_mode', function () {
	
	
	//console.log(JSON.parse(sessionStorage.getItem('room_to_edit')))
	var room = JSON.parse(sessionStorage.getItem('room_to_edit'));
	var room_id = room.p_id ;
	var room_name = room.p_address.property_name ;
	var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
	
	var OWNERS = JSON.parse(localStorage.getItem('OWNERS'));
	var owner = OWNERS[sessionStorage.getItem('hashed_login')];
	
//	delete ROOMS[room_id];
//	ROOMS.splice(ROOMS.indexOf(room_id) - 1, 1);
//	localStorage.setItem('ROOMS', JSON.stringify(ROOMS));
//
//	owner.room_ids.shift(room_id);
//	if(owner.room_ids[0])
//	{
//		console.log('room_ids',owner.room_ids[0]);
//
//		console.log('we have room');
//		owner.room_id = owner.room_ids[0];
//		sessionStorage.setItem('room_to_edit', JSON.stringify(ROOMS[owner.room_ids[0]])   );
//	}
//	else
//	{
//		console.log('we have no room');
//		owner.room_id = null;
//		sessionStorage.removeItem('room_to_edit');
//	}
//	console.log(sessionStorage.getItem('room_to_edit'))
//
//	console.log('this room',JSON.stringify(ROOMS[owner.room_ids[0]]));
	
	Swal.fire({
		          title: `Delete ${room_name} ?`,
		          text: "You won't be able to revert this!",
		          imageUrl: `assets/images/bedrooms/b${room.room_style}.jpg`,
		          imageWidth: 400,
		          imageHeight: 200,
		          imageAlt: 'Custom image',
		          showCancelButton: true,
		          confirmButtonColor: '#3085d6',
		          cancelButtonColor: '#d33',
		          confirmButtonText: `Yes, delete ${room_name} !`
	          }).then((result) => {
		if (result.value) {
			
			
			delete ROOMS[room_id];
			//ROOMS.splice(ROOMS.indexOf(room_id) - 1, 1);
			localStorage.setItem('ROOMS', JSON.stringify(ROOMS));
			
			
//			owner.room_ids.shift(room_id);
//
//			var value = 3
//
//			var arr = [1, 2, 3, 4, 5, 3]
			
			owner.room_ids = owner.room_ids.filter(function(item) {
				return item !== room_id
			});
			
			
			
			if(owner.room_ids[0])
			{
				console.log('we have room');
				owner.room_id = owner.room_ids[0];
				if(ROOMS[owner.room_id] !== null){
					sessionStorage.setItem('room_to_edit', JSON.stringify(ROOMS[owner.room_ids[0]])   );
					//sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( room ) );
				}
				//sessionStorage.setItem('room_to_edit', JSON.stringify(ROOMS[owner.room_ids[0]])   );
			}
			else
			{
				console.log('we have no room');
				owner.room_id = null;
				owner.room_ids = [];
				sessionStorage.removeItem('room_to_edit');
			}
			
			
			OWNERS[sessionStorage.getItem('hashed_login')] = owner;
			localStorage.setItem('OWNERS', JSON.stringify(OWNERS));
			sessionStorage.setItem('authorized_owner',JSON.stringify(owner)  );
			
			Swal.fire(
				'Deleted!',
				`${room_name} has been deleted.`,
				'success'
			);
			
			console.log(OWNERS,owner,room_id);
			sessionStorage.removeItem('preview_mode');
			sessionStorage.removeItem('edit_mode');
			sessionStorage.removeItem('add_mode');
			window.location.reload();
		}
	});
	
	//sessionStorage.removeItem('room_to_edit');
	//window.location.reload();
	
	
});

$ ( document ).on ( 'click', '.room_switch', function () {
	
	
	
	//	SETTING SELECTED ROOM AS room_to_edit
	sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( JSON.parse ( localStorage.getItem ( 'ROOMS' ) )[$(this).attr('id')] ) );
	sessionStorage.removeItem('edit_mode');
	sessionStorage.removeItem('add_mode');
	
	sessionStorage.setItem('preview_mode',true);
	window.location.replace ( "/owner.html" );
	
});