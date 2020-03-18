( function ()
	{
		$ ( '#translations' ).append ( `<img class="___" src = "assets/images/logo_lg.png" data-alt="logo image" alt="" >
	
	<button class = "___ btn btn-sm btn-secondary text-light" data-value="translate">
		
		</button >
		
	
		<p class = "___"   data-value="hello" id="1"></p >
	<hr >
		<a class = "___"  href = "#" data-title = "this is link" data-value="link"></a >
	<hr >
		<label class = "___"  for = "link" data-value="label"></label >
		<input class = "___"  id = "link" data-placeholder = "great input placeholder" data-title = "i am input" type = "text" >` );
		/*OUR TRANSLATIONS*/
		var our_translations = [ 'sk', 'en' ];
		
		/*OUR DEFAULT LANGUAGE*/
		var default_language = 'en';
		
		/*BROWSER PREFERRED LANGUAGES*/
		var browser_languages = navigator.languages;
		var selected_language = null;
		
		
		$.each ( browser_languages, function ( key, language )
		{
			if ( our_translations.indexOf ( language ) !== -1 )
				{
					
					selected_language = language;
					return false;
				}
			
		} );
		
		/*IF WE HAVE TRANSLATION FILE FOR THE BROWSER
		 * WE WILL USE IT OTHERWISE WILL USE DEFAULT*/
		var current_language = selected_language || default_language;
		
		/*PATH ACCORDING TO SELECTED LANGUAGE OR DEFAULT*/
		var path = "./assets/js/languages/" + current_language + ".json";
		
		
		/*GETTING CURRENT TRANSLATION*/
		$.getJSON ( path, function ( translation )
		{
			
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
		
		
	} ) ();

