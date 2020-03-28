import { path_to_language_files } from "./settings.js";


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
			  Copy created JSON into file located at  &nbsp;&nbsp; ${ path_to_language_files }/${ to_language }.json` );
		} );
		
		
		function plain_translation ( language )
			{
				var plain = {
					
					'en' : [
						"hello",
						"this is link",
						"label",
						"Your idea",
						"Create something amazing...",
						"image alt description",
						"Google translate helper",
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
						"Search",
						"Title of element : data-title attribute",
						"Placeholder for input fields : data-placeholder attribute",
						"alt attribute for images  : data-alt attribute",
						"No translation for text",
						"Examples of usage",
						"Single data-text attribute",
						"Multiple data-text attribute",
						"Title of element : data-title attribute",
						"Placeholder for input fields : data-placeholder attribute",
						"alt attribute for images  : data-alt attribute",
						"If there is no translation for the text, we will display text from data-text attribute."
					
					],
					'es' : [
						"Hola",
						"este es el enlace",
						"etiqueta",
						"Tu idea",
						"Crea algo increíble ...",
						"descripción alternativa de la imagen",
						"Ayudante de traductor de Google",
						"enlace",
						"Logotipo",
						"traducir",
						"Cambiar a inglés",
						"cambiar a eslovaco",
						"cambiar a español",
						"cambiar a polaco",
						"imagen de la bandera inglesa",
						"imagen de la bandera eslovaca",
						"imagen de la bandera española",
						"imagen de la bandera polaca",
						"Hogar",
						"Enlace",
						"Discapacitado",
						"Buscar",
						"Título del elemento: atributo de data-title",
						"Marcador de posición para campos de entrada: atributo de data-placeholder",
						"atributo alt para imágenes: atributo data-alt",
						"Sin traducción de texto",
						"Ejemplos de uso",
						"Atributo de data-text único",
						"Atributo de data-text datos múltiples",
						"Título del elemento: atributo de data-title",
						"Marcador de posición para campos de entrada: atributo de data-placeholder",
						"atributo alt para imágenes: atributo data-alt",
						"Si no hay traducción para el texto, mostraremos el texto del atributo de  data-text"
					
					
					],
					'sk' : [
						"Ahoj",
						"toto je odkaz",
						"Label",
						"Váš nápad",
						"Vytvor niečo úžasné ...",
						"obrázok alt description",
						"Pomocník prekladu Google",
						"Link",
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
						"Link",
						"Disabled",
						"Vyhľadávanie",
						"Názov prvku: atribút data-title",
						"Zástupný symbol pre vstupné polia: atribút data-placeholder",
						"alt attribute for images: data-alt attribute",
						"Žiadny preklad textu",
						"Príklady použitia",
						"Jedného atribút data-text",
						"Viacere atribúty data-text",
						"Názov prvku: atribút data-title",
						"Zástupný symbol pre vstupné polia: atribút data-placeholder",
						"alt attribute for images: data-alt atribút",
						"Ak text nie je preložený, zobrazíme text z atribútu data-text."
					
					
					],
					'pl' : [
						"Witaj",
						"to jest link",
						"etykieta",
						"Twój pomysł",
						"Stwórz coś niesamowitego ...",
						"opis obrazu alt",
						"Pomocnik tłumacza Google",
						"połączyć",
						"obraz logo",
						"Tłumaczyć",
						"Przełącz na angielski",
						"zmień na słowacki",
						"zmień na hiszpański",
						"zmień na polski",
						"obraz flagi angielskiej",
						"obraz flagi słowackiej",
						"obraz hiszpańskiej flagi",
						"obraz polskiej flagi",
						"Dom",
						"Połączyć",
						"Niepełnosprawny",
						"Szukaj",
						"Tytuł elementu: atrybut data-title",
						"Symbol zastępczy dla pól wejściowych: atrybut data-placeholder",
						"alt atrybut dla obrazów: data-alt atrybut",
						"Brak tłumaczenia tekstu",
						"Przykłady użycia",
						"Pojedynczy atrybut data-text",
						"Wiele atrybutów data-text",
						"Tytuł elementu: atrybut data-title",
						"Symbol zastępczy dla pól wejściowych: atrybutdata-placeholder ",
						"alt atrybut dla obrazów: data-alt atrybut",
						"Jeśli nie ma tłumaczenia tekstu, wyświetlimy tekst z atrybutu data-text"
					
					
					]
				};
				
				return plain[ language ];
			}
		
		
	} ) ();

