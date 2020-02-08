function sendMail( contactForm ) {
	emailjs.send( "gmail", "template_pDNgSwG0", {
		"from_name"          : contactForm.name.value,
		"from_email"         : contactForm.email_of_user.value,
		"room_details"       : contactForm.room_details.value,
		"request_of_property": contactForm.request_of_property.value
	} )
		.then(
			function ( response ) {
				console.log( "SUCCESS", response );
			},
			function ( error ) {
				console.log( "FAILED", error );
			}
		);
	return false;  // To block from loading a new page
}