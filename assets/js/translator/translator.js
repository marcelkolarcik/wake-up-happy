import { default_language, path_to_language_files, site_languages,highlight_class } from './settings.js';


/*TRANSLATING ACCORDING TO BROWSER OR DEFAULT LANGUAGE*/
translate ();


/*GETTING CURRENT TRANSLATION AND TRANSLATING*/
export function translate ()
	{
		
		/*TRYING TO GET MATCH OF BROWSER LANGUAGE(S)
		 * AND SITE LANGUAGE(S) INITIAL PAGE LOAD*/
		if ( !localStorage.language )
			{
				
				var browser_language = null;
				
				$.each ( navigator.languages, function ( key, language )
				{
					if ( site_languages.indexOf ( language ) !== -1 )
						{
							
							browser_language = language;
							return false;
						}
					
				} );
				
				/*SETTING INITIAL LANGUAGE TO localStorage:
				 
				 1. IF WE HAVE MATCH WITH BROWSER LANGUAGE(S)
				 IT WILL BE BROWSER MATCHED LANGUAGE
				 
				 2.  IF WE HAVE NO BROWSER MATCH
				 IT WILL BE DEFAULT LANGUAGE AS
				 SET IN settings.js
				 
				 IT MIGHT BE CHANGED, WHEN USER SELECTS DIFFERENT LANGUAGE */
				localStorage.setItem ( 'language', browser_language || default_language );
				
			}
		
		
		/*GETTING TRANSLATION FILE ACCORDING TO LANGUAGE
		 * SET IN localStorage.getItem ( 'language' ), IT COULD BE :
		 *
		 *   1.  DEFAULT LANGUAGE FILE
		 *
		 *       a.  IF DEFAULT LANGUAGE === BROWSER LANGUAGE
		 *       b.  IF THERE IS NO BROWSER MATCH
		 *       c.  IF USER SELECTS DEFAULT LANGUAGE
		 *
		 *   2.  BROWSER MATCHED LANGUAGE FILE
		 *
		 *   3.  USER SELECTED LANGUAGE FILE*/
		
		
		$.getJSON (
			path_to_language_files + '/' + localStorage.getItem ( 'language' ) + ".json", function ( translation )
			{
				
				/*ALL ELEMENTS THAT NEED TRANSLATING
				 * MUST HAVE ___ CLASS TO BE TRANSLATED*/
				$ ( '.___' ).each ( function ()
				                    {
					
					                    /*IF ELEMENT HAS data-text ATTRIBUTE*/
					                    if ( $ ( this ).data ( 'text' ) )
						                    {
							
							                    /*TRANSLATED LANGUAGE TEXT*/
							                    var translated_text = translation[ $ ( this ).data ( 'text' ) ];
							
							                    if ( translated_text )
								                    {
									                    $ ( this ).html ( translated_text );
								                    }
							                    /*IF WE DO NOT HAVE TRANSLATION WE WILL USE DEFAULT LANGUAGE*/
							                    else
								                    {
									                    $ ( this ).html ( $ ( this ).data ( 'text' ) ).addClass(highlight_class);
								                    }
							
							                    /*WE WILL CHECK IF TEXT HAS VARIABLE
							                     * IT WOULD HAVE "|" AS FIRST CHARACTER
							                     * IF WE HAVE IT => WE WILL LOOK FOR data- ATTRIBUTE
							                     * VALUE OF THAT VARIABLE AND THEN REPLACE
							                     * NAMED VARIABLE WITH ACTUAL VARIABLE
							                     *
							                     * EXAMPLE :
							                     *
							                     *  <span class="___" id="variable_text"
							                     data-text="text with |user variable"
							                     data-user="Marcel">
							                     </span>
							 
							                     * HERE WE HAVE data-text="text with |user variable"
							                     *
							                     * WHERE |user IS NAMED VARIABLE
							                     *
							                     * AND WE HAVE data-user="Marcel"
							                     *
							                     * SO "Marcel" IS ACTUAL VARIABLE
							                     *
							                     * SO WE WILL REPLACE NAMED VARIABLE |user WITH
							                     * ACTUAL VARIABLE "Marcel"
							                     *
							                     * IN THIS CASE HTML WILL RENDER AS "text with Marcel variable"
							                     *
							                     * IN ANY LANGUAGE WE CHOOSE
							                     *
							                     *
							 
							 
							                     * */
							                    check_variables ( $ ( this ), 'text', translation );
						                    }
					
					
					                    /*IF ELEMENT HAS data-title ATTRIBUTE*/
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
									                    $ ( this ).prop (
										                    'title', $ ( this ).data ( 'title' ) );
								                    }
							                    check_variables ( $ ( this ), 'title', translation );
							
						                    }
					                    /*IF ELEMENT HAS data-placeholder ATTRIBUTE*/
					                    if ( $ ( this ).data ( 'placeholder' ) )
						                    {
							
							                    var translated_placeholder = translation[ $ ( this ).data (
								                    'placeholder' ) ];
							
							                    /*IF WE HAVE TRANSLATION WE WILL TRANSLATE TO LANGUAGE*/
							                    if ( translated_placeholder )
								                    {
									                    $ ( this ).prop (
										                    'placeholder', translated_placeholder );
								                    }
							                    /*IF NOT WE WILL USE DEFAULT*/
							                    else
								                    {
									                    $ ( this ).prop (
										                    'placeholder', $ ( this ).data ( 'placeholder' ) );
								                    }
							
							                    check_variables ( $ ( this ), 'placeholder', translation );
						                    }
					                    /*IF ELEMENT HAS data-alt ATTRIBUTE*/
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
							
							                    check_variables ( $ ( this ), 'alt', translation );
						                    }
				                    } );
				
			} );
		
		
		function check_variables ( element, type, translation )
			{
				/*DEFAULT LANGUAGE TEXT*/
				var original = element.data ( type );
				
				/*TRANSLATED LANGUAGE TEXT*/
				var translated_text = translation[ original ];
				
				/*SPLIT STRING TO CHECK FOR VARIABLES
				 *
				 * IF PIPE "|" IS PREPENDED TO A WORD  => IT IS SIMPLE VARIABLE
				 * AND WE WILL JUST REPLACE NAMED VARIABLE WITH ACTUAL VARIABLE VALUE
				 *
				 * IF COLON ":" IS PREPENDED TO A WORD => IT IS VARIABLE
				 * THAT NEED TRANSLATION, SO WE WILL REPLACE NAMED
				 * VARIABLE WITH TRANSLATION*/
				var split = original.split ( " " );
				
				
				for ( var i = 0 ; i < split.length ; i++ )
					{
						/*IF WE HAVE SIMPLE VARIABLE, WE WILL REPLACE IT WITH VARIABLE VALUE
						*
						* IF THE FIRST CHARACTER IS | AND IT'S NOT STAND ALONE CHARACTER*/
						if ( split[ i ].charAt ( 0 ) === "|" &&  split[ i ].length > 1 && translated_text)
							{
								
								translated_text = translated_text.replace (
									split[ i ],
													/* GETTING NAMED VARIABLE WITHOUT "|" */
									element.data ( split[ i ].substr ( 1 ) )
								);
								
								/*IF THERE IS NO VARIABLE IN ELEMENT'S data-{ named_variable }
								* WE WILL HIGHLIGHT TEXT TO DEVELOPER*/
								if(!element.data ( split[ i ].substr ( 1 ) ))
									{
										element.addClass(highlight_class);
									}
							}
						/*ELSE IF WE HAVE VARIABLE THAT NEEDS TRANSLATING
						 *  WE WILL REPLACE IT WITH TRANSLATION
						 *
						 *  IF THE FIRST CHARACTER IS : AND IT'S NOT STAND ALONE CHARACTER*/
						else if ( split[ i ].charAt ( 0 ) === ":" &&  split[ i ].length > 1  && translated_text)
							{

								if ( translation[ element.data ( split[ i ].substr ( 1 ) ) ] )
									{
//
										translated_text = translated_text.replace (
											split[ i ], translation[ element.data ( split[ i ].substr ( 1 ) ) ] );
									}
								
								/*IF THERE IS NO VARIABLE IN ELEMENT'S data-{ named_variable }
								 * WE WILL HIGHLIGHT TEXT TO DEVELOPER*/
								if(!translation[ element.data ( split[ i ].substr ( 1 ) ) ] )
									{
										element.addClass(highlight_class);
									}
							}
					}
				
				/*IF WE TRANSLATING TEXT WE WILL SET html TO TRANSLATED TEXT*/
				if ( type === 'text' )  element.html ( translated_text );
				
				/*IF WE ARE TRANSLATING title,placeholder,alt WE WILL SET prop OF ELEMENT*/
				else element.prop ( type, translated_text );
				
				
				
			}
	}










