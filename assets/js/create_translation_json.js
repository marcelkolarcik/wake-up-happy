( function ()
	{
		
		$ ( '#create_JSON' ).on ( 'click', function ( {} )
		{
			var default_language = $ ( '#from_language' ).val ();
			var to_language      = $ ( '#to_language' ).val ();
			
			var default_translation     = plain_translation ( default_language );
			var to_language_translation = plain_translation ( to_language );
			var translated_JSON         = {};
			
			$.each ( default_translation, function ( key, value )
			{
				translated_JSON[ default_translation[ key ] ] = to_language_translation[ key ];
			} );
			
			$ ( '#translated_JSON' ).html ( '' ).append ( JSON.stringify ( translated_JSON ) );
			$ ( '#copy' ).removeClass ( 'd-none' ).html ( '' ).append ( `
			  Copy JSON into your file located at  &nbsp;&nbsp; /assets/js/languages/${ to_language }.json` );
		} );
		
		//console.log ( plain_translation ( 'en' ) );
		
		
		function plain_translation ( language )
			{
				var plain = {
					'en'         : [
						
						"property image",
						"room :",
						"more...",
						"preview room",
						"Select your room type."
					
					
					],
					'en_example' : [
						"hello",
						"this is link",
						"label",
						"great input placeholder",
						"i am input",
						"link",
						"logo image",
						"translate",
						"switch to english",
						"switch to slovak",
						"switch to spanish",
						"switch to polish",
						"english flag image",
						"slovak flag image",
						"spanish flag image",
						"polish flag image",
						"Home",
						"Link",
						"Disabled",
						"Search"
					],
					'es'         : [
						"Hola",
						"este es el enlace",
						"Etiqueta",
						"gran marcador de posición de entrada",
						"soy entrada",
						"Enlace",
						"imagen del logotipo",
						"Traducir",
						"cambiar a inglés",
						"cambiar a eslovaco",
						"cambiar a español",
						"cambiar a polaco",
						"imagen de la bandera inglesa",
						"imagen de la bandera eslovaca",
						"imagen de la bandera española",
						"imagen de la bandera polaca",
						"Inicio",
						"Enlace",
						"Desactivada",
						"Buscar"
					],
					'sk'         : [
						"Ahoj",
						"toto je odkaz",
						"znacka",
						"veľký zástupný symbol vstupu",
						"vstupujem",
						"odkaz",
						"logo image",
						"Preložiť",
						"prejsť na angličtinu",
						"prejsť na slovenčinu",
						"prejsť na španielčinu",
						"prepnúť na poľský",
						"anglický obrázok vlajky",
						"obrázok slovenskej vlajky",
						"španielsky obrázok vlajky",
						"poľský obrázok vlajky",
						"Domov",
						"Odkaz",
						"Neucinny",
						"Hladaj"
					]
					,
					'pl'         : [
						"cześć",
						"to jest link",
						"etykieta",
						"doskonały symbol zastępczy",
						"Jestem wprowadzony",
						"link",
						"obraz logo",
						"tłumaczyć",
						"zmień na angielski",
						"zmień na słowacki",
						"zmień na hiszpański",
						"zmień na polski",
						"obraz flagi angielskiej",
						"obraz flagi słowackiej",
						"obraz hiszpańskiej flagi",
						"obraz polskiej flagi",
						"Dom",
						"Link",
						"Wyłączone",
						"Szukaj"
					]
				};
				
				return plain[ language ];
			}
		
		
		var plain_wuh = {
			'en' : [
				"property image",
				"room :",
				"more...",
				"preview room",
				"Select your room type."
			
			]
		};
		
		
	} ) ();

