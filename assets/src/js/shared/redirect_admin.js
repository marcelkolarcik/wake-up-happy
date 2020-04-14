/*IF ADMIN TRIES TO GO TO owner.html WE WILL REDIRECT HIM BACK TO
 * admin.html,, BECAUSE AS ADMIN, HE CAN'T ADD*/


( function ()
	{
		if ( sessionStorage.admin ) location.replace ( 'admin.html' );
		
	} ) ();