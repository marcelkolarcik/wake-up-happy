
$ ( function () {
	
	$ ( '#user' ).append ( `<a class = " dropdown-toggle caret-off " href = "#" id = "initials"
                               data-toggle = "dropdown" aria-haspopup = "true" aria-expanded = "false" >
                                <div id="initials" class="user_initials d-flex justify-content-center align-items-center">
                                <i class="fa fa-user green"></i>
                                </div>
                            </a >
                            
                            <div class = "dropdown-menu dropdown-menu-right" id="user_drop_down" aria-labelledby = "initials" >
                                <h6 class = "dropdown-header"  id = "owner_name">
                                 <i class="fa fa-user  text-secondary "></i> &nbsp;</h6 >
                                <div class = "dropdown-divider" ></div >
                                ${!sessionStorage.getItem ( 'authorized_owner' ) ?
	                              ` <a id = "login_details" class = "dropdown-item" href = "#" title = "Login form" >Owner Login</a >`:
	                              `` }
                            </div >` );
	
//  IF OWNER LOGS IN INTO HIS ACCOUNT WE WILL DISPLAY HIS INITIALS

	if ( sessionStorage.getItem ( 'authorized_owner' ) ) {
		
		var full_name = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).name;
		var owner_name_a = full_name.split ( ' ' );
		var initials = owner_name_a.map ( user_initial ).join ( '' );
		$ ( '.user_initials' ).text ( initials );
		
// GETTING INITIALS OF USER NAME
		function user_initial ( str ) {
			return str.charAt ( 0 ).toUpperCase ();
		}
		var user_drop_down = $ ( '#user_drop_down' );
		
		user_drop_down.append ( `
                                
                                <span  class = "dropdown-header bg-secondary text-light"   >My rooms</span >` );
		
		
		
		var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
		var room_ids = JSON.parse(sessionStorage.getItem('authorized_owner')).room_ids;
		
		if(room_ids.length  === 0)
		{
			user_drop_down.append ( `
                               
                                <a class = "dropdown-header"
                                title = "No rooms yet" >No rooms yet</a >
								` );
		}
//AND WE WILL APPEND NAMES OF ALL ROOMS HE HAS ADDED. SO THAT HE CAN SWITCH BETWEEN THEM FROM NAVIGATION

			$.each(room_ids, function(key,value)
			{
				var room = ROOMS[value];
				if(room)
				{
					
					user_drop_down.append ( `
                                
                                <a id = "${value}" class = "dropdown-item room_switch" href = "#"
                                title = "Switch to ${room.p_address.property_name}" >${room.p_address.property_name}</a >` );
				}
				
				
				
			});
		
		
//AND WE WILL ADD LINK TO LOGOUT
		
		user_drop_down.append ( `
                                 <div class = "dropdown-divider" ></div >
                                <a id = "logout" class = "dropdown-item bg_orange_light" href = "#" title = "Logout" >Logout</a >` );
		
		
		$ ( '#owner_name' ).append (`<a href="/owner.html" class="nav_link_property dashboard_link" title="Dashboard">${full_name}</a>`  );
		
		$ ( '#add_room' ).remove ();
		$ ( '#login_details' ).remove ();
		
	}
	
} );

