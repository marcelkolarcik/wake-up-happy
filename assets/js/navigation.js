/////// OWNER LOGS IN INTO HIS ACCOUNT TO EDIT OR DELETE
$ ( function () {
	
	$ ( '#user' ).append ( `<a class = " dropdown-toggle caret-off " href = "#" id = "initials"
                               data-toggle = "dropdown" aria-haspopup = "true" aria-expanded = "false" >
                                <div id="initials" class="user_initials d-flex justify-content-center align-items-center">
                                <i class="fa fa-user  green"></i>
                                </div>
                            </a >
                            
                            <div class = "dropdown-menu dropdown-menu-right" id="user_drop_down" aria-labelledby = "initials" >
                                <h6 class = "dropdown-header"  id = "owner_name">   <i class="fa fa-user  text-secondary"></i> &nbsp;</h6 >
                                <div class = "dropdown-divider" ></div >
                                ${sessionStorage.getItem ( 'authorized_owner' ) ?
	                              ``:
	                              ` <a id = "login_details" class = "dropdown-item" href = "#" title = "Login form" >Owner Login</a >` }
                               
                                <!--<a id = "logout" class = "dropdown-item" href = "#" title = "Logout" >Logout</a >-->
                            </div >` );
	
	if ( sessionStorage.getItem ( 'authorized_owner' ) ) {
		
		var full_name = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).name;
		var owner_name_a = full_name.split ( ' ' );
		var initials = owner_name_a.map ( myFunction ).join ( '' );
		
		// getting initials of user name
		function myFunction ( str ) {
			return str.charAt ( 0 ).toUpperCase ();
		}
		var user_drop_down = $ ( '#user_drop_down' );
		
		user_drop_down.append ( `
                                
                                <span  class = "dropdown-header bg-secondary text-light"   >My rooms</span >` );
		
		
		
		var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
		var room_ids = JSON.parse(sessionStorage.getItem('authorized_owner')).room_ids;
		
		
			$.each(room_ids, function(key,value)
			{
				if(ROOMS[value])
				{
					
					user_drop_down.append ( `
                                
                                <a id = "${value}" class = "dropdown-item room_switch" href = "#"
                                title = "Switch to ${ROOMS[value].p_address.property_name}" >${ROOMS[value].p_address.property_name}</a >` );
				}
				
			});
		
		
		
		
		user_drop_down.append ( `
                                 <div class = "dropdown-divider" ></div >
                                <a id = "logout" class = "dropdown-item bg_orange_light" href = "#" title = "Logout" >Logout</a >` );
		
		
		$ ( '#owner_name' ).append (`<a href="/owner.html" class="nav_link_property dashboard_link" title="Dashboard">${full_name}</a>`  );
		$ ( '.user_initials' ).text ( initials );
		$ ( '#add_room' ).remove ();
		$ ( '#login_details' ).remove ();
		
	}
	
} );

