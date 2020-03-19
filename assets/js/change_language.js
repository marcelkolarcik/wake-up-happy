import { translate } from './translator/translator.js';

/*USER CHANGING LANGUAGE*/
$ ( document ).on ( 'click', '.language', function ()
{
	
	var current_language =  $ ( this ).data ( 'language' );
	console.log(current_language)
	/*TRANSLATING ACCORDING TO USER CHOSEN LANGUAGE*/
	localStorage.setItem ( 'language', current_language );
	
	translate ();
	
	
	/*CHANGING CHOSEN LANGUAGE FLAG IN NAVIGATION BAR*/
	
	change_flag ( current_language )
	
} );


/*CHANGING CHOSEN LANGUAGE FLAG IN NAVIGATION BAR*/
export function change_flag ( current_language )
	{
		var languages = {
			'en':'english',
			'es':'spanish',
			'sk':'slovak',
			'pl':'polish'
		};
		
		$ ( '#language_flag' ).html('').html (
			` <img class="___" src = "assets/images/flags/${ current_language }_sm.png" data-alt="${languages[current_language]} flag image" alt = "" ></a>` );
	}

change_flag ( localStorage.getItem ( 'language' ) );