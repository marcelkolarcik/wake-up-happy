import { translate } from "./shared/translator/translator.js";


( function ()
	{
		/*https://stackoverflow.com/questions/758688/sleep-in-javascript-delay-between-actions*/
		
		
		/*I HAD TO CLEAR JUST AFTER TRANSLATION HAPPENED, OTHERWISE
		 * IT WAS NOT DISPLAYING ANY TEXT*/
		function sleep ( ms, f )
			{
				return (
					setTimeout ( f, ms )
				);
			}
		
		
		sleep ( 0, function ()
		{
			translate ();
			
			sleep ( 500, function ()
			{
				/*CLEARING localStorage AND sessionStorage ON USER EXITING THE SITE*/
				localStorage.removeItem ( 'ROOMS_created' );
				localStorage.removeItem ( 'ROOMS' );
				localStorage.removeItem ( 'OWNERS' );
				localStorage.removeItem ( 'CUSTOMERS' );
				localStorage.removeItem ( 'autocomplete_searchables' );
				localStorage.removeItem ( 'hello' );
				localStorage.removeItem ( 'initial_locations' );
				localStorage.removeItem ( 'initial_welcome' );
				localStorage.removeItem ( 'language' );
				sessionStorage.clear ();
			} );
		} );
		
		
	} ) ();