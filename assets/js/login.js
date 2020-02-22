$(document).on('click', '#login', function (  ) {
	swal.fire({
		position: 'top-end',
		text:'login',
		html : `<form id="login_form">
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
           
		            <a  class = "btn btn-sm bg_green text-light " id="log_user"
		                    title = "Login" >
		                Login
		            </a >
        		</div >
		</form>`,
		showConfirmButton:false
	          })
});

$(document).on('click','#log_user',function(){
	var owners = JSON.parse(localStorage.getItem('OWNERS')) ;
	var form_data = $('#login_form').serialize().split('&');
	var email = form_data[0].split('=')[1];
	var name = form_data[1].split('=')[1];
	
	var login = decodeURIComponent(email) + decodeURIComponent(name);
	hashCode = string => string.split ( '' ).reduce ( ( a, b ) => {
		a = (( a << 5 ) - a ) + b.charCodeAt ( 0 );
		return a & a;
	}, 0 );
	
	var owner = hashCode(login);
	swal.close()
	if(owners[owner])
	{
		swal.fire({
			          position: 'top-end',
			          text:'you are owner',
		          }    );
	}
	else
	
	{
		swal.fire({
			          position: 'top-end',
			          text:`we don't have owner with these credentials !`,
		          }    );
		
	}
//	console.log(owners, decodeURI(email),decodeURIComponent(email),decodeURIComponent(name) ,name,);
//	console.log(owners[hashed]);

})