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
	// IF WE DO WE WILL REDIRECT TO owner.html or will reuse add_your_room.html
	if ( owner ) {
		authorize_owner ( owner ,hashed_login);
	}
	else {
		not_registered ();
	}
//console.log(owners, decodeURI(email),decodeURIComponent(email),decodeURIComponent(name) ,name,);
	//console.log(owner);
	
} );
$ ( document ).on ( 'click', '#logout', function () {
	sessionStorage.clear();
	window.location.replace ( "/index.html" );
} );


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
function not_registered () {
	swal.fire ( {
		            position: 'top-end',
		            title   : 'Not registered yet?',
		
		            html             : `
				<div class = "col-auto" >
		       No Problem! <hr class="bg_green">
		       Just take the first step.... <br>
		       Right on this page !
		        </div >
		        <hr class="bg_green">
		         <div class = "col-auto text-center" >
           			Select location of your property first !
           			<br>
           			<br>
		            <a  class = "btn btn-sm bg_green text-light pl-3 pr-3" id="ok" onclick="swal.close()"
		                    title = "ok" >
		               ok
		            </a >
        		</div >
        		 <hr >
        	<small> If you are already registered, check your login credentials, or CAPS Lock...;-) </small>
		`,
		            showConfirmButton: false
		
	            } );
}
function authorize_owner ( owner ,hashed_login) {
	
	
	sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
	sessionStorage.setItem('preview_mode',true);
    var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
	var room = ROOMS[owner.room_id];
	console.log('room',room === null);
	console.log('ROOMS',ROOMS);
	console.log('owner',owner);
	if(ROOMS[owner.room_id] !== null){
		sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( room ) );
	}
	
//	PUTTING HASHED LOGIN TO SESSION, WILL NEED IT FOR UPDATE....
	sessionStorage.setItem ( 'hashed_login', hashed_login );
	window.location.replace ( "/owner.html" );
}