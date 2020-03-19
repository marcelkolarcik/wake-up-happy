import {
	site_languages,
	default_language,
	path
} from './vars.js';


//
/*SETTING INITIAL LANGUAGE TO localStorage,
 IT MIGHT BE CHANGED, WHEN USER SELECTS DIFFERENT LANGUAGE */
if ( !localStorage.language )
	{
		var browser_language  = null;
		
		$.each ( navigator.languages, function ( key, language )
		{
			if ( site_languages.indexOf ( language ) !== -1 )
				{
					
					browser_language = language;
					return false;
				}
			
		} );
		
		
		localStorage.setItem ( 'language', browser_language || default_language );
	}


/*TRANSLATING ACCORDING TO BROWSER OR DEFAULT LANGUAGE*/
translate ();




/*GETTING CURRENT TRANSLATION AND TRANSLATING*/
export function translate ()
	{
		
		
				$.getJSON ("./.."+ path + "/" +  localStorage.getItem ( 'language' ) + ".json", function ( translation )
				{
					console.log(translation);
					/*ALL ELEMENTS THAT NEED TRANSLATING*/
					$ ( '.___' ).each ( function ()
					                    {
						
						                    /*IF ELEMENT HAS DATA ATTRIBUTE VALUE*/
						                    if ( $ ( this ).data ( 'value' ) )
							                    {
								
								                    var translated_value = translation[ $ ( this ).data ( 'value' ) ];
								
								                    /*IF WE HAVE TRANSLATION WE WILL TRANSLATE TO LANGUAGE*/
								                    if ( translated_value )
									                    {
										                    $ ( this ).html ( translated_value );
									                    }
								                    /*IF NOT WE WILL USE DEFAULT*/
								                    else
									                    {
										                    $ ( this ).html ( $ ( this ).data ( 'value' ) );
									                    }
								
							                    }
						
						                    if ( $ ( this ).data ( 'title' ) )
							                    {
								                    var translated_title = translation[ $ ( this ).data ( 'title' ) ];
								
								                    /*IF WE HAVE TRANSLATION WE WILL TRANSLATE TO LANGUAGE*/
								                    if ( translated_title )
									                    {
										                    $ ( this ).prop ( 'title', translated_title );
									                    }
								                    /*IF NOT WE WILL USE DEFAULT*/
								                    else
									                    {
										                    $ ( this ).prop ( 'title', $ ( this ).data ( 'title' ) );
									                    }
								
								
							                    }
						
						                    if ( $ ( this ).data ( 'placeholder' ) )
							                    {
								
								                    var translated_placeholder = translation[ $ ( this ).data (
									                    'placeholder' ) ];
								
								                    /*IF WE HAVE TRANSLATION WE WILL TRANSLATE TO LANGUAGE*/
								                    if ( translated_placeholder )
									                    {
										                    $ ( this ).prop ( 'placeholder', translated_placeholder );
									                    }
								                    /*IF NOT WE WILL USE DEFAULT*/
								                    else
									                    {
										                    $ ( this ).prop (
											                    'placeholder', $ ( this ).data ( 'placeholder' ) );
									                    }
								
								
							                    }
						
						                    if ( $ ( this ).data ( 'alt' ) )
							                    {
								
								                    var translated_alt = translation[ $ ( this ).data (
									                    'alt' ) ];
								
								                    /*IF WE HAVE TRANSLATION WE WILL TRANSLATE TO LANGUAGE*/
								                    if ( translated_alt )
									                    {
										                    $ ( this ).prop ( 'alt', translated_alt );
									                    }
								                    /*IF NOT WE WILL USE DEFAULT*/
								                    else
									                    {
										                    $ ( this ).prop ( 'alt', $ ( this ).data ( 'alt' ) );
									                    }
								
								
							                    }
					                    } );
					
				} );
			
		
		
	}










