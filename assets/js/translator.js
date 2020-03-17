( function ()
	{
		
		/*PATH ACCORDING TO SELECTED LANGUAGE OR DEFAULT*/
		var path = "./assets/js/es.json";
		
		/*GETTING LANGUAGE FILE AND SETTING IT IN LOCAL STORAGE*/
		
		
		/*IF WE DON'T HAVE TRANSLATION IN localStorage WE WILL GET JSON FILE AND STORE
		 * IT IN localStorage*/
//	if(!localStorage.getItem('current_translation'))
//		{
//			$.getJSON( path, function( translation ) {
//
//				localStorage.setItem('current_translation', JSON.stringify(translation)  );
//
//
//			});
//
//			var current_translation = JSON.parse(localStorage.getItem('current_translation'));
//		}
//
//		/*OTHERWISE WE WILL GET IT FROM LOCAL STORAGE*/
//	else
//		{
//			 current_translation = JSON.parse(localStorage.getItem('current_translation'));
//
//
//		}
		
		/*GETTING CURRENT TRANSLATION*/
		$.getJSON ( path, function ( translation )
		{
			
			localStorage.setItem ( 'current_translation', JSON.stringify ( translation ) );
			
			
		} );
		
		var current_translation = JSON.parse ( localStorage.getItem ( 'current_translation' ) );
		
		/*ALL ELEMENTS THAT NEED TRANSLATING*/
		$ ( '.___' ).each ( function ()
		                    {
			
			                    /*IF ELEMENT HAS DATA ATTRIBUTE VALUE*/
			                    if ( $ ( this ).data ( 'value' ) )
				                    {
					
					                    var translated_value = current_translation[ $ ( this ).data ( 'value' ) ];
					
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
					                    var translated_title = current_translation[ $ ( this ).data ( 'title' ) ];
					
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
					
					                    var translated_placeholder = current_translation[ $ ( this ).data (
						                    'placeholder' ) ];
					
					                    /*IF WE HAVE TRANSLATION WE WILL TRANSLATE TO LANGUAGE*/
					                    if ( translated_placeholder )
						                    {
							                    $ ( this ).prop ( 'placeholder', translated_placeholder );
						                    }
					                    /*IF NOT WE WILL USE DEFAULT*/
					                    else
						                    {
							                    $ ( this ).prop ( 'placeholder', $ ( this ).data ( 'placeholder' ) );
						                    }
					
					
				                    }
		                    } );
		
		
	} ) ();

