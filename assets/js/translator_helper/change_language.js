import { translate } from '../translator/translator.js';

/*USER CHANGING LANGUAGE*/
$ ( document ).on ( 'click', '.language', function ()
{
	
	var current_language =  $ ( this ).data ( 'language' );
	
	
	localStorage.setItem ( 'language', current_language );
	
	/*TRANSLATING ACCORDING TO USER CHOSEN LANGUAGE*/
	translate ();
	
	
	/*CHANGING CHOSEN LANGUAGE FLAG IN NAVIGATION BAR , OPTIONAL*/
	change_flag ( current_language )
	
} );


/*CHANGING CHOSEN LANGUAGE FLAG IN NAVIGATION BAR, OPTIONAL*/
export function change_flag ( current_language )
	{
		
		$ ( '#language_flag' ).html('').html (
			` <img src = "assets/images/flags/${ current_language }_sm.png"  alt = "country flag" ></a>` );
	}

/*CHANGING CHOSEN LANGUAGE FLAG IN NAVIGATION BAR , OPTIONAL*/
change_flag ( localStorage.getItem ( 'language' ) );