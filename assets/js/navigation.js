/////// OWNER LOGS IN INTO HIS PROPERTY TO EDIT OR DELETE
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
                                <a id = "login" class = "dropdown-item" href = "#" title = "Login" >Owner Login</a >
                                <!--<a id = "logout" class = "dropdown-item" href = "#" title = "Logout" >Logout</a >-->
                            </div >` );
	
	if ( sessionStorage.getItem ( 'authorized_owner' ) ) {
		var full_name = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).name;
		var owner_name_a = full_name.split ( ' ' );
		var initials = owner_name_a.map ( myFunction ).join ( '' );
		
		
		function myFunction ( str ) {
			return str.charAt ( 0 ).toUpperCase ();
		}
		
		
		$ ( '#user_drop_down' ).append ( `
                                
                                <a id = "logout" class = "dropdown-item" href = "#" title = "Logout" >Logout</a >` );
		
		$ ( '#owner_name' ).append (`<a href="/owner.html" class="nav_link_property dashboard_link" title="Dashboard">${full_name}</a>`  );
		$ ( '.user_initials' ).text ( initials );
		$ ( '#add_room' ).remove ();
		$ ( '#login' ).remove ();
		
	}
	
} );