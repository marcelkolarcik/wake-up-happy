$ ( document ).on ( 'click', '#preview_mode', function () {
//	/owner.html
	
	sessionStorage.removeItem('edit_mode');
	sessionStorage.removeItem('add_mode');
	sessionStorage.removeItem('block_mode');
	sessionStorage.setItem('preview_mode',true);
	
	window.location.reload();
	
	//swal.fire('preview mode',window.location.pathname)
});
$ ( document ).on ( 'click', '#edit_mode', function () {
	
	
	
	sessionStorage.removeItem('preview_mode');
	sessionStorage.removeItem('add_mode');
	sessionStorage.removeItem('block_mode');
	sessionStorage.setItem('edit_mode',true);
	
	window.location.reload();
	
	
});

$ ( document ).on ( 'click', '#add_mode', function () {
	
	
	
	sessionStorage.removeItem('preview_mode');
	sessionStorage.removeItem('edit_mode');
	sessionStorage.removeItem('block_mode');
	sessionStorage.removeItem('room_to_edit');
	sessionStorage.setItem('add_mode',true);
	
	window.location.reload();
	
	
});
$ ( document ).on ( 'click', '#block_mode', function () {
	
	sessionStorage.removeItem('edit_mode');
	sessionStorage.removeItem('add_mode');
	sessionStorage.removeItem('preview_mode');
	
	sessionStorage.setItem('block_mode',true);
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
			
//			DELETING ROOM FROM LOCAL STORAGE
			delete ROOMS[room_id];
			
			localStorage.setItem('ROOMS', JSON.stringify(ROOMS));
//			DELETING room_id FROM OWNER'S room_ids, SO THAT IT WON'T SHOW UP IN NAVIGATION DROP DOWN, WHICH WOULD CAUSE ERRORS....
			owner.room_ids = owner.room_ids.filter(function(item) {
				return item !== room_id
			});
			
			
			
			if(owner.room_ids[0])
			{
				console.log('we have room');

				owner.room_id = owner.room_ids[0];
				if(ROOMS[owner.room_id] !== null){
					//				SETTING CURRENT ROOM TO INTERACT WITH IF IT IS NOT NULL,
					// BECAUSE delete ROOMS[room_id] IS SETTING  ROOMS[room_id] TO NULL
					sessionStorage.setItem('room_to_edit', JSON.stringify(ROOMS[owner.room_ids[0]])   );
					
				}
				
			}
			else
			{
//				IF OWNER DELETED LAST ROOM, HE HAS NO ROOM TO INTERACT WITH => ROOM ACTION  IN add_room_helpers.js
//              (function append_room_actions()) IS ONLY ADD ROOM
				owner.room_id = null;
				owner.room_ids = [];
				sessionStorage.removeItem('room_to_edit');
			}
			
//			UPDATING OWNERS IN LOCAL STORAGE
			OWNERS[sessionStorage.getItem('hashed_login')] = owner;
			localStorage.setItem('OWNERS', JSON.stringify(OWNERS));
			sessionStorage.setItem('authorized_owner',JSON.stringify(owner)  );
			
			Swal.fire(
				'Deleted!',
				`${room_name} has been deleted.`,
				'success'
			);
			
			
			sessionStorage.removeItem('preview_mode');
			sessionStorage.removeItem('edit_mode');
			sessionStorage.removeItem('add_mode');
			sessionStorage.removeItem('block_mode');
			window.location.reload();
		}
	});
	
	
});

$ ( document ).on ( 'click', '#block_dates', function () {
	sessionStorage.setItem('block_dates_mode',true);
});
$ ( document ).on ( 'click', '.room_switch', function () {
	
	
	
	//	SETTING ROOM TO INTERACT WITH AS room_to_edit
	sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( JSON.parse ( localStorage.getItem ( 'ROOMS' ) )[$(this).attr('id')] ) );
	
	sessionStorage.removeItem('edit_mode');
	sessionStorage.removeItem('add_mode');
	
	sessionStorage.setItem('preview_mode',true);
	window.location.replace ( "/owner.html" );
	
});
$ ( document ).on ( 'click', '#add_your_room', function () {
	sessionStorage.setItem('add_mode',true);
});
