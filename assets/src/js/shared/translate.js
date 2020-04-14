import { translate } from "./translator/translator.js";


$ ( document ).ready ( function ()
                       {
	                       $ ( '.need_translation' ).on ( 'click', function ()
	                       {
		                       if ( $ ( this ).hasClass ( 'need_translation' ) ) translate ();
		
		
	                       } );
                       } );

