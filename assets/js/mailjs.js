function sendMail( contactForm, p_id ) {
	
	
	
	emailjs.send( "gmail", "template_pDNgSwG0", {
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
		);
	return false;  // To block from loading a new page
}

function confirm_payment(status)
{
	function reload_page()
	{
		location.reload();
	}
	
	
	if(status === 'SUCCESS') {
		swal.fire({
			          position: 'top-end',
			          type: 'success',
			          title: 'Congratulations !',
			          text: 'Your room is booked !',
			          showConfirmButton: true,
			          timer: 2500
			
		          });
		
		setTimeout(reload_page,2500);
		
		
		
	}
	else if(status === 'FAILED'){
		swal.fire({
			          position: 'top-end',
			          type: 'error',
			          title: 'Whoops !',
			          text: 'Your room is not booked !',
			          showConfirmButton: true,
			          timer: 2500
			
		          });
		setTimeout(reload_page,2500);
	}
}