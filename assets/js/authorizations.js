/*LOGIN FORM*/
$ ( document ).on ( 'click', '#login_details', function () {
	swal.fire ( {
		            position: 'top-end',
		
		            html             : `
			<h4>Owner login</h4>
			<form id="login_form">
				<div class = "col-auto" >
		            <label class = "sr-only" for = "email" >Email</label >
		            <div class = "input-group mb-2" >
		                <div class = "input-group-prepend" >
		                    <div class = "input-group-text bg-transparent border_bottom_only" >
		                        <i class = "fas fa-at" ></i >
		                    </div >
		                </div >
		                <input type = "text" name = "email"
		                       class = "form-control form-control-sm  border_bottom_only"
		                       id = "email_of_user" placeholder = "Email" required >
		            </div >
		        </div >
		         <div class = "col-auto" >
		            <label class = "sr-only" for = "password" >Password</label >
		            <div class = "input-group mb-2" >
		                <div class = "input-group-prepend" >
		                    <div class = "input-group-text bg-transparent border_bottom_only" >
		                       <i class="fas fa-lock"></i>
		                    </div >
		                </div >
		                <input type = "password" name = "password"
		                       class = "form-control form-control-sm  border_bottom_only"
		                       id = "password" placeholder = "Password" required >
		            </div >
		        </div >
		         <div class = "col-auto text-center" >
           
		            <a  class = "btn btn-sm bg_green text-light " id="login"
		                    title = "Login" >
		                Login
		            </a >
        		</div >
		</form>`,
		            showConfirmButton: false
	            } );
} );

// WHEN USER CLICKS ON LOGIN BUTTON, WE'LL CHECK HIS CREDENTIALS
// IF WE HAVE USER WE'LL LOG HIM IN, OTHERWISE FIRE ALERT
// WITH NOTIFICATION THAT HE CAN REGISTER OR CHECK HIS INPUT
$ ( document ).on ( 'click', '#login', function () {
	var owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
	if ( owners === null ) {
		not_registered ();
		return;
	}
	swal.close ();
	
	var form_data = $ ( '#login_form' ).serialize ().split ( '&' );
	var email = form_data[ 0 ].split ( '=' )[ 1 ];
	var password = form_data[ 1 ].split ( '=' )[ 1 ];
	
	var login = decodeURIComponent ( email ) + decodeURIComponent ( password );
	
	/// USING SAME HASHING AS WHEN CREATING OWNER
	var hashed_login = hash_login ( login );
	
	var owner = owners[ hashed_login ];
	
	//	WE ARE CHECKING IF WE HAVE USER WITH THESE CREDENTIALS
	// IF WE DO WE WILL REDIRECT TO owner.html
	if ( owner ) {
		authorize_owner ( owner ,hashed_login);
	}
	else {
		not_registered ();
	}
	
} );

// WHEN USER LOGS OUT, WE'LL CLEAR SESSION AND LOG HIM OUT
$ ( document ).on ( 'click', '#logout', function () {
	sessionStorage.clear();
	window.location.reload();
} );

// FUNCTION TO HASH LOGIN DETAILS, EXAMPLE FROM stackoverflow.com
function hash_login ( string ) {
	//	https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
	hashed_string = string.split ( '' ).reduce ( ( a, b ) => {
		a = (
			    (
				    a << 5 ) - a ) + b.charCodeAt ( 0 );
		return a & a;
	}, 0 );
	
	return hashed_string;
}

// USER IS NOT REGISTERED OR CREDENTIALS ARE WRONG, FIRING ALERT TO NOTIFY OWNER
function not_registered () {
	swal.fire ( {
		            position: 'top-end',
		            title   : 'Not registered yet?',
		
		            html             : `
				<div class = "col-auto" >
		       No Problem! <hr class="bg_green">
		       Just take the first step.... <br>
		       <a href="/owner.html"  class="add_your_room" title="Add your room now!">Right on this site !</a>
		        </div >
		        <hr class="bg_green">
		         <div class = "col-auto text-center" >
		        
           			Select location of your property first !
           			<br>
           			<br>
		            <a  href="/owner.html" class = "btn btn-sm bg_green text-light pl-3 pr-3 add_your_room"  id="ok" onclick="swal.close()"
		                   title="Add your room now!" >
		               ok
		            </a >
        		</div >
        		 <hr >
        	<small> If you are already registered, check your login credentials, or CAPS Lock...;-) </small>
		`,
		            showConfirmButton: false
		
	            } );
}

// AUTHORIZING OWNER AFTER LOGIN
function authorize_owner ( owner ,hashed_login) {
	
	
	sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
	sessionStorage.setItem('preview_mode',true);
	
	
    var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
	var room = ROOMS[owner.room_id];
	
//	IF OWNER HAS ROOM, WE'LL SET IT AS room_to_edit TO sessionStorage
	if(ROOMS[owner.room_id] !== null){
		sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( room ) );
		
	}
	else
	{
		sessionStorage.setItem ( 'room_to_edit', null );
	}
	
//	PUTTING HASHED LOGIN TO SESSION, WILL NEED IT FOR UPDATE....
	sessionStorage.setItem ( 'hashed_login', hashed_login );
	window.location.replace ( "/owner.html" );
	
	
	/*IF LOGGED IN OWNER HAS AT LEAST ONE ROOM, WE WILL RENDER LOCATION DETAILS OF THAT ROOM
	* NEXT TO THE MAP */
	if (
		sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' &&
		sessionStorage.getItem ( 'room_to_edit' ) !== null  &&
		!sessionStorage.getItem ( 'add_mode' ) &&
		sessionStorage.getItem ( 'authorized_owner' ) ) {
		
		var coordinates = [];
		room = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
		 
		 
		 /*IF HE IS PREVIEWING OR EDITING ROOM, THERE IS NO NEED FOR PAYMENT STEP*/
		
		$ ( '.progress_step_5' ).addClass ( 'd-none' ); // PAYMENT
		$ ( '.progress_step_4' ).html ( `Preview <br> Save` );
		
		
		/*GETTING INITIALS OF OWNER'S NAME TO DISPLAY IN NAVIGATION*/
		var full_name = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).name;
		var owner_name_a = full_name.split ( ' ' );
		var owner_name = owner_name_a.map ( myFunction ).join ( '' );
		
		function myFunction ( str ) {
			return str.charAt ( 0 ).toUpperCase ();
		}
		$ ( '#initials' ).html ( `<div class="user_initials d-flex justify-content-center align-items-center"><span>${owner_name}</span></div>` );
		$ ( '#owner_name' ).text ( full_name );
		
		
		/*DATA TO RENDER LOCATION  DETAILS OF THE ROOM*/
		location_data = room.p_address;
		coordinates[ 0 ] = room.lat;
		coordinates[ 1 ] = room.lng;
		
		render_location_details ( location_data, coordinates, true );
	}
}
