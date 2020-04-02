/*WE HAVE USER SYSTEM ON THE SITE
 *
 * AFTER SUCCESSFUL PAYMENT
 * WHEN OWNER ADDS ROOM TO THE SITE AND PAYS FEE,
 * WE CREATE NEW OWNER OBJECT AND STORE IT TO OWNERS OBJECT
 * IN localStorage
 *
 * NEW OWNER IS SET AS authorized_owner ,
 * HE IS LOGGED INTO HIS ACCOUNT WITH HASHED EMAIL AND PASSWORD
 * PROVIDED WHEN PAYING FOR THE ROOM
 *
 * HE HAS OPTION OF LOGGING OUT => WE WILL CLEAR sessionStorage
 * REMOVE authorized_owner FROM sessionStorage
 *
 * THEN HE CAN LOGIN AGAIN
 * WE WILL HASH EMAIL AND PASSWORD PROVIDED WHEN LOGGING IN
 * AND COMPARE IT WITH OWNERS OBJECT FROM localStorage
 * AND IF WE HAVE KEY === hashed(email+password)
 * WE WILL LOG OWNER INTO HIS ACCOUNT
 *
 * OTHERWISE ALERT WILL POP INFORMING USER THAT
 * WE DON'T HAVE USER WITH THIS CREDENTIALS
 */


import { translate } from "./translator/translator.js";


$ ( document ).on ( 'click', '#login_details', function ()
{
	swal.fire ( {
		            position : 'top-end',
		
		            html              : `
			<h4 class="___" data-text="Owner login"></h4>
			<form id="login_form">
				<div class = "col-auto" >
		            <label class = "sr-only ___" for = "email" data-text="Email"></label >
		            <div class = "input-group mb-2" >
		                <div class = "input-group-prepend" >
		                    <div class = "input-group-text bg-transparent border_bottom_only" >
		                        <i class = "fas fa-at" ></i >
		                    </div >
		                </div >
		                <input type = "text" name = "email"
		                       class = "form-control form-control-sm  border_bottom_only ___"
		                       id = "email_of_user" data-placeholder = "Email" required >
		            </div >
		        </div >
		         <div class = "col-auto" >
		            <label class = "sr-only ___" for = "password" data-text="Password"></label >
		            <div class = "input-group mb-2" >
		                <div class = "input-group-prepend" >
		                    <div class = "input-group-text bg-transparent border_bottom_only" >
		                       <i class="fas fa-lock"></i>
		                    </div >
		                </div >
		                <input type = "password" name = "password"
		                       class = "form-control form-control-sm  border_bottom_only ___"
		                       id = "password" data-placeholder = "Password" required >
		            </div >
		        </div >
		         <div class = "col-auto text-center" >
           
		            <a  class = "btn btn-sm bg_green text-light ___" id="login"
		                    data-title = "Login" data-text="Login">
		                
		            </a >
        		</div >
		</form>`,
		            showConfirmButton : false
	            } );
	
	translate();
} );

// WHEN USER CLICKS ON LOGIN BUTTON, WE'LL CHECK HIS CREDENTIALS
// IF WE HAVE USER WE'LL LOG HIM IN, OTHERWISE FIRE ALERT
// WITH NOTIFICATION THAT HE CAN REGISTER OR CHECK HIS INPUT
$ ( document ).on ( 'click', '#login', function ()
{
	var owners = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
	
	/*IF USER TRYING TO LOG IN AND THERE IS NO OWNERS OBJECT
	 IN localStorage YET, WE WILL ALERT WITH POPUP not_registered ()*/
	if ( owners === null )
		{
			not_registered ();
			
			return;
		}
	/*AFTER CLICKING ON login BUTTON WE WILL CLOSE LOGIN FORM*/
	swal.close ();
	
	var form_data = $ ( '#login_form' ).serialize ().split ( '&' );
	var email     = form_data[ 0 ].split ( '=' )[ 1 ];
	var password  = form_data[ 1 ].split ( '=' )[ 1 ];
	
	var login = decodeURIComponent ( email ) + decodeURIComponent ( password );
	
	/// USING SAME HASHING AS WHEN CREATING OWNER
	var hashed_login = hash_login ( login );
	
	var owner = owners[ hashed_login ];
	
	//	WE ARE CHECKING IF WE HAVE USER WITH THESE CREDENTIALS
	// IF WE DO WE WILL REDIRECT TO owner.html
	if ( owner )
		{
			authorize_owner ( owner, hashed_login );
		}
	
	/*ELSE WE WILL ALERT WITH POPUP not_registered ()*/
	else
		{
			not_registered ();
			
		}
	
} );

/*WHEN USER LOGS OUT, WE'LL CLEAR SESSION AND LOG HIM OUT
 * authorized_owner WILL BE CLEARED FROM SESSION
 * AMONG OTHER ITEMS IN THE sessionStorage*/
$ ( document ).on ( 'click', '#logout', function ()
{
	
	sessionStorage.clear ();
	sessionStorage.setItem ( 'add_mode', true );
	window.location.reload ();
	
} );


// FUNCTION TO HASH LOGIN DETAILS, EXAMPLE FROM stackoverflow.com
export function hash_login ( string )
	{
		//	https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
		return string.split ( '' ).reduce ( ( a, b ) =>
		                                             {
			                                             a = (
				                                                 (
					                                                 a << 5 ) - a ) + b.charCodeAt ( 0 );
			                                             return a & a;
		                                             }, 0 );
		
		
	}


// USER IS NOT REGISTERED OR CREDENTIALS ARE WRONG, FIRING ALERT TO NOTIFY USER
function not_registered ()
	{
		swal.fire ( {
			            position : 'top-end',
			
			            html : `<h4 class="___" data-text="Not registered yet?"></h4>
									<div class = "col-auto" >
									<span class="___" data-text="No Problem!"></span>
									  
									    <hr class = "bg_green" >
									    <span class="___" data-text="Just take the first step...."></span>
									     <br >
									    <a class = "add_your_room ___"
									    href = "owner.html"
									    data-title = "Add your room now!" data-text="Right on this site !"></a >
									</div >
									<hr class = "bg_green" >
									<div class = "col-auto text-center" >
									<span class="___" data-text="Select location of your property first !"></span>
									    
									    <br >
									    <br >
									    <a href = "owner.html" class = "btn btn-sm bg_green text-light pl-3 pr-3 add_your_room ___" id = "ok"
									       onclick = "swal.close()"
									       data-title = "Add your room now!" >
									        ok
									    </a >
									</div >
									<hr >
									<small class="___" data-text="If you are already registered, check your login credentials, or CAPS Lock...;-)"> </small >`,
			
			            showConfirmButton : false
			
		            } );
		/*NEED TO TRANSLATE ALERT, BECAUSE ON INITIAL PAGE LOAD,ALERT IS NOT IN THE DOCUMENT */
		translate();
	}


/*IF WE HAVE OWNER WITH PROVIDED CREDENTIALS
 * WE WILL SET LOGGED IN OWNER AS authorized_owner IN sessionStorage
 *       => sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
 *
 * AND SET CURRENT MODE TO  preview_mode
 *       => sessionStorage.setItem ( 'preview_mode', true )
 *
 * AND IF OWNER HAS AT LEAST ONE room ADDED
 * WE WILL SET room_to_edit IN sessionStorage
 *       => sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( room ) )
 *
 * owner.room_id IS THE ID OF THE ROOM OWNER INTERACTED LAST
 * SO AFTER LOGGING IN HE WILL SEE LASTLY INTERACTED ROOM WITH IN
 * PREVIEW, READY TO BE INTERACTED WITH AGAIN
 *
 * IF OWNER HAS MORE THEN ONE ROOM, HE CAN SWITCH TO ANY ROOM FROM
 * NAVIGATION IN TOP RIGHT CORNER*/
function authorize_owner ( owner, hashed_login )
	{
		
		
		sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
		sessionStorage.setItem ( 'preview_mode', true );
		
		
		var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
		var room  = ROOMS[ owner.room_id ];

//	IF OWNER HAS ROOM, WE'LL SET IT AS room_to_edit TO sessionStorage
		if ( ROOMS[ owner.room_id ] !== null )
			{
				sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( room ) );
				sessionStorage.removeItem ( 'add_mode' );
				
				
			}
		else
			{
				sessionStorage.setItem ( 'room_to_edit', null );
			}

//	PUTTING HASHED LOGIN TO SESSION, WILL NEED IT FOR UPDATE ....
		sessionStorage.setItem ( 'hashed_login', hashed_login );
		window.location.replace ( "owner.html" );
		
		
	}
