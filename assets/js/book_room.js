function sendMail( contactForm, p_id ) {
	confirm_payment( "SUCCESS", p_id, contactForm );
	
	/*emailjs.send( "gmail", "template_pDNgSwG0", {
	 "from_name"          : contactForm.name.value,
	 "from_email"         : contactForm.email_of_user.value,
	 "room_details"       : contactForm.room_details.value,
	 "weeks"              : contactForm.weeks.value,
	 "total_price"        : contactForm.total_price.value,
	 "request_of_property": contactForm.request_of_property.value
	 } )
	 .then(
	 function ( response ) {
	 console.log( "SUCCESS", response );
	 confirm_payment("SUCCESS");
	 },
	 function ( error ) {
	 console.log( "FAILED", error );
	 confirm_payment("FAILED");
	 }
	 );*/
	return false;  // To block from loading a new page
}

function confirm_payment( status, p_id, contactForm ) {
	function reload_page() {
		location.reload();
	}
	
	if ( status === 'SUCCESS' ) {
		swal.fire( {
			           html:
				           `<div class="card horizontally_aligned" style="width: 100%;">
							<div class="d-flex justify-item-around bg_green">
							 <img class="" src="assets/images/logo_md.png"  alt="logo image" style="width:100px;height:100px;">
							 <ul class = "navbar-nav mr-auto " >
				                <li class = "nav-item active" >
				                    <span class = "logo" >wake up happy</span >
				                    <br >
				                    <span class = "logo_small" >
				                        <small >rooms with the view</small >
				                    </span >
				                </li >
				            </ul >
							</div>
							
							 <img src="assets/images/bedrooms/b${p_id}.jpg" class="card-img-top" alt="property image">
							 <div class="card-body">
									 <p class="card-title nav_link_property">Thank you for booking with us !</p>
									 <span class="nav_link_property">Name:</span> <span>${contactForm.name.value}</span><br >
									 <span class="nav_link_property">Email:</span> <span>${contactForm.email_of_user.value}</span><br >
									 <span class="nav_link_property">Room:</span> <span>${contactForm.room_details.value}</span><br >
									 <span class="nav_link_property">Weeks:</span> <span> ${contactForm.weeks.value}</span><br >
									 <span class="nav_link_property">Total price:</span> <span>${contactForm.total_price.value}</span><br >
									 <span class="nav_link_property">Request:</span> <span>${contactForm.request_of_property.value}</span><br >
									  <a class="btn btn-sm border_green d-print-none mb-3" href=""  title="Dismiss"><i class="fas fa-thumbs-up"></i></a>
									  <div class="card-footer bg-transparent pb-0 mb-0">
										    Reservation ID: ${Math.random().toString(36).substr(2, 10)}<br >
										  
										     <span class="btn btn-sm bg_green_light d-print-none " onclick="window.print()">save as PDF</span>
										     
											
										</div>
							 </div>
							 </div>`,
			
			         
			           showConfirmButton:false
			
		           } );
		
		//setTimeout(reload_page,5000);
		
	}
	else if ( status === 'FAILED' ) {
		swal.fire( {
			           position         : 'top-end',
			           type             : 'error',
			           title            : 'Whoops !',
			           text             : 'Your room is not booked !',
			           showConfirmButton: true,
			           timer            : 2500
			
		           } );
		setTimeout( reload_page, 2500 );
	}
}