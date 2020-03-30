import { path_to_language_files, default_language } from "../translator/settings.js";


( function ()
	{
		
		$ ( '#create_JSON' ).on ( 'click', function ( {} )
		{
			
			var to_language = $ ( '#to_language' ).val ();
			
			var default_translation     =  plain_translation ( default_language );
			var to_language_translation =  plain_translation ( to_language );
			
			
			
			
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
						"room :" ,
						"view :" ,
						"See more information about the room." ,
						"Coordinates : " ,
						"get details" ,
						"Property Name" ,
						"Click on any image to enlarge it !" ,
						"single" ,
						"double" ,
						"Room type selected." ,
						"Select your room type." ,
						"single bedroom image" ,
						"double bedroom image" ,
						"mountain view" ,
						"sea view" ,
						"river  view" ,
						"pool view" ,
						"beach view" ,
						"forrest view" ,
						"skyline view" ,
						"fields view" ,
						"desert view" ,
						"mountain" ,
						"sea" ,
						"lake" ,
						"river" ,
						"pool" ,
						"beach" ,
						"forrest" ,
						"skyline" ,
						"fields" ,
						"desert" ,
						"View type selected." ,
						"Select your view type." ,
						"Select the view type your room has." ,
						"Room style selected." ,
						"Select your room style." ,
						"bedroom image" ,
						"Room only" ,
						"B & B" ,
						"B & D" ,
						"All Inclusive" ,
						"Room only image" ,
						"B & B image" ,
						"B & D image" ,
						"All Inclusive image" ,
						"price" ,
						"Board type(s) selected." ,
						"Select your board type(s)." ,
						"Add price for the board !" ,
						"Select the board basis you can provide for your guests." ,
						"Amenity selected." ,
						"Select amenities you provide!" ,
						"Select the amenities you can provide for your guests." ,
						"fresh linens" ,
						"extra blankets" ,
						"puzzle turn down service" ,
						"elevator bartender" ,
						"celebrity wake up call" ,
						"fast Wi-Fi" ,
						"in-room cocktail station" ,
						"in-room workout and meditation" ,
						"USB charger ports" ,
						"smart TV with Netflix" ,
						"in-room coffee machine" ,
						"office corner" ,
						"welcome gift" ,
						"local flavor gifts" ,
						"in-room beer tap" ,
						"shower mini fridge" ,
						"pop corn delivery" ,
						"complementary smart phone" ,
						"complementary BMW SUV" ,
						"Write description of your room, min 30 -  max 300 characters." ,
						"Your room description" ,
						"Describe your room, make it attractive (min 30 - max 300 characters)" ,
						"location" ,
						"room" ,
						"services" ,
						"preview" ,
						"payment" ,
						"Please review these fields:" ,
						"Payment details : 99 EUR per year + 9 % of each booking." ,
						"Total price" ,
						"Full Name" ,
						"Email" ,
						"Password" ,
						"Card Holder Name:" ,
						"Card Number" ,
						"CVV" ,
						"Pay" ,
						"Owner login" ,
						"Login" ,
						"Not registered yet?" ,
						"No Problem!" ,
						"Just take the first step...." ,
						"Right on this site !" ,
						"Add your room now!" ,
						"Select location of your property first !" ,
						"ok" ,
						"If you are already registered, check your login credentials, or CAPS Lock...;-)" ,
						"Oops..." ,
						"Please, select board!" ,
						"Please,select at least one week!" ,
						"Your dates were blocked !" ,
						"Week(s):" ,
						"Thank you for booking with us !" ,
						"Name:" ,
						"Email:" ,
						"Room:" ,
						"Week:" ,
						"Total price:" ,
						"address:" ,
						"Request:" ,
						"save as PDF" ,
						"Reservation ID:" ,
						"Dismiss" ,
						"Your room is not booked !" ,
						"How to:" ,
						"you are in editing mode" ,
						"you are in preview mode" ,
						"you are in add mode" ,
						"you are in block mode" ,
						"Click on" ,
						"button, if you would like to edit your room." ,
						"OK, got it !" ,
						"By clicking on" ,
						"you will get information that will assist on every step of your journey...;-)." ,
						"Find location of your property on the map and then click the map to display coordinates." ,
						"Then click on" ,
						"button, to display location details." ,
						"You can correct these details." ,
						"Once you're happy with the location details, click on" ,
						"Remember to add your property name! (min 3 characters) to be able to continue to next step." ,
						"Define your room by selecting appropriate radio buttons." ,
						"Once all options are selected" ,
						"Define your services by selecting appropriate check buttons." ,
						"You can select multiple options." ,
						"When at least one of each options are selected and description is entered" ,
						"will appear and you can progress to next step." ,
						"Description of the room must be at least 30 characters!" ,
						"When selecting board type, you must enter price for the board." ,
						"Preview your work of art, by clicking on the tabs" ,
						"ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK." ,
						"You can edit your work if needed!" ,
						"Once you are happy with your work, preview it by clicking on" ,
						"Update" ,
						"to proceed with payment." ,
						"Here you can proceed with payment. Thank you for choosing" ,
						"wake up happy!" ,
						"Once you pay, you will be redirected to landing page to see your room live on the site." ,
						"You will be logged in into your account, and in the top right corner, you will see your initials, with your room listed in the dropdown menu." ,
						"You can click on your name or room name, to get to your account dashboard,where you can further edit your room, or add new one!" ,
						"if you want to block some of the dates." ,
						"then click on" ,
						"AVAILABILITY" ,
						"tab." ,
						"For more details click on" ,
						"Edit your room to your liking." ,
						"to save your changes." ,
						"If you would like to edit room, click on" ,
						"My rooms" ,
						"No rooms yet" ,
						"Logout" ,
						"Dashboard" ,
						"Room details" ,
						"Week(s) booked" ,
						"Board" ,
						"Payment details" ,
						"Property Request" ,
						"Any Requests..." ,
						"Your future customers will be able to book your room through this form." ,
						"Previous" ,
						"Next" ,
						":view view" ,
						"bedroom" ,
						"breakfast" ,
						"lunch" ,
						"dinner" ,
						
						"property image" ,
						"from" ,
						"EUR" ,
						"per week" ,
						"more..." ,
						"Information about room" ,
						"About" ,
						"Preview images of the property" ,
						"Gallery" ,
						"See the amenities" ,
						"Amenities" ,
						"Preview the availability" ,
						"Availability" ,
						"Book your room !" ,
						"Book" ,
						"show on map" ,
						"Boards" ,
						"Block selected dates" ,
						"How to block weeks ?" ,
						"Select board and the week(s) and  click on" ,
						"BOOK" ,
						"button" ,
						"1) Select any board" ,
						"2) Select the weeks you want to block." ,
						"3) Click on" ,
						"less..." ,
						"You won't be able to revert this!" ,
						"Yes, delete" ,
						"How to" ,
						"Preview" ,
						"Edit" ,
						"Delete" ,
						"Block Dates" ,
						"Add new room" ,
						"select location" ,
						"Your search returned 0 results, try different search parameters or have a look at featured properties bellow." ,
						"Search results:" ,
						
						"Wake up happy !" ,
						"logo image" ,
						"wake up happy | rooms with the view" ,
						"Menu" ,
						"owner?" ,
						"english" ,
						"english flag image" ,
						"switch to english" ,
						"slovak" ,
						"slovak flag image" ,
						"switch to slovak" ,
						"spanish" ,
						"switch to spanish" ,
						"spanish flag image" ,
						"polish" ,
						"switch to polish" ,
						"polish flag image" ,
						"don't show again" ,
						"Initial locations are" ,
						"they will update with new rooms added in different locations" ,
						"Room type" ,
						"Room type (any)" ,
						"Single ( En Suite )" ,
						"Double ( En Suite )" ,
						"Board type (any)" ,
						"Bed & Breakfast" ,
						"Breakfast & Dinner" ,
						"All inclusive" ,
						"Search" ,
						"Search for your property" ,
						"Copyright" ,
						"Close it for now." ,
						"Don't show again" ,
						"NEW" ,
						"Do you live in Ireland ?" ,
						"If you have spare room and want to earn up to €14,000 tax free, come and join thousands of happy landlords !" ,
						"more info" ,
						"Location" ,
						"Room" ,
						"Services" ,
						"Choose your location" ,
						"Define your room" ,
						"Define your services" ,
						"Preview your work of art!" ,
						"Payment" ,
						"Save your changes !"
					
					]
					
					
					
					
					
					
					
					
					,
					'es' : [
						"habitación :",
						"ver:",
						"Ver más información sobre la habitación",
						"Coordenadas:",
						"Obtén detalles",
						"Nombre de la propiedad",
						"Haga clic en cualquier imagen para ampliarla",
						"soltero",
						"doble",
						"Tipo de habitación seleccionada",
						"Seleccione su tipo de habitación",
						"imagen de habitación individual",
						"imagen de la habitación doble",
						"vista desde la montaña",
						"vista marítima",
						"vista del rio",
						"vista a la piscina",
						"vista a la playa",
						"Forrest view",
						"vista del horizonte",
						"vista de campos",
						"vista al desierto",
						"montaña",
						"mar",
						"lago",
						"río",
						"piscina",
						"playa",
						"para descanso",
						"horizonte",
						"campos",
						"Desierto",
						"Ver tipo seleccionado",
						"Seleccione su tipo de vista",
						"Seleccione el tipo de vista que tiene su habitación",
						"Estilo de habitación seleccionado",
						"Seleccione el estilo de su habitación",
						"imagen del dormitorio",
						"Solo habitación",
						"B & B",
						"B & D",
						"Todo incluido",
						"Imagen de solo habitación",
						"Imagen B & B",
						"Imagen de B & D",
						"Imagen todo incluido",
						"precio",
						"Tipo (s) de placa seleccionados",
						"Seleccione su (s) tipo (s) de tablero",
						"Añadir precio para el tablero!",
						"Seleccione la base del tablero que puede proporcionar a sus invitados",
						"Amenidad seleccionada",
						"¡Servicios selectos que proporcionas!",
						"Seleccione las comodidades que puede proporcionar a sus invitados",
						"ropa de cama fresca",
						"mantas extra",
						"servicio de rechazo de rompecabezas",
						"barman del ascensor",
						"llamada de atención de celebridades",
						"Wi-Fi rápido",
						"estación de cócteles en la habitación",
						"entrenamiento y meditación en la habitación",
						"Puertos de cargador USB",
						"televisión inteligente con Netflix",
						"cafetera en la habitación",
						"rincón de la oficina",
						"regalo de bienvenida",
						"regalos de sabor local",
						"grifo de cerveza en la habitación",
						"mini nevera de ducha",
						"entrega de palomitas de maíz",
						"teléfono inteligente complementario",
						"SUV BMW complementario",
						"Escriba la descripción de su habitación, mínimo 30 - máximo 300 caracteres",
						"Descripción de tu habitación",
						"Describe tu habitación, hazla atractiva (mínimo 30 - máximo 300 caracteres)",
						"ubicación",
						"habitación",
						"servicios",
						"avance",
						"pago",
						"Revise estos campos:",
						"Detalles del pago: 99 EUR por año + 9% de cada reserva",
						"Precio total",
						"Nombre completo",
						"Email",
						"Contraseña",
						"Nombre del titular de la tarjeta:",
						"Número de tarjeta",
						"CVV",
						"Pagar",
						"Inicio de sesión del propietario",
						"Iniciar sesión",
						"¿Todavía no estas registrado?",
						"¡No hay problema!",
						"Solo da el primer paso ...",
						"Justo en este sitio!",
						"¡Agrega tu habitación ahora!",
						"¡Seleccione la ubicación de su propiedad primero!",
						"Okay",
						"Si ya está registrado, verifique sus credenciales de inicio de sesión o Bloq Mayús ... ;-)",
						"Vaya ...",
						"¡Por favor, seleccione tablero!",
						"¡Por favor, seleccione al menos una semana!",
						"¡Tus fechas fueron bloqueadas!",
						"Semanas):",
						"Gracias por reservar con nosotros !",
						"Nombre:",
						"Email:",
						"Habitación:",
						"Semana:",
						"Precio total:",
						"habla a:",
						"Solicitud:",
						"Guardar como pdf",
						"ID de reserva:",
						"Descartar",
						"¡Tu habitación no está reservada!",
						"Cómo:",
						"estás en modo de edición",
						"estás en modo de vista previa",
						"estás en modo agregar",
						"estás en modo bloque",
						"Haga clic en",
						"botón, si desea editar su habitación",
						"Ok lo tengo !",
						"Al hacer clic en",
						"obtendrá información que lo ayudará en cada paso de su viaje ... ;-)",
						"Encuentre la ubicación de su propiedad en el mapa y luego haga clic en el mapa para mostrar las coordenadas",
						"Luego haga clic en",
						"para mostrar los detalles de la ubicación",
						"Puede corregir estos detalles",
						"Una vez que esté satisfecho con los detalles de la ubicación, haga clic en",
						"Recuerde agregar el nombre de su propiedad (mínimo 3 caracteres) para poder continuar con el siguiente paso",
						"Defina su habitación seleccionando los botones de radio apropiados",
						"Una vez que todas las opciones están seleccionadas",
						"Defina sus servicios seleccionando los botones de verificación apropiados",
						"Puede seleccionar múltiples opciones",
						"Cuando se selecciona al menos una de cada una de las opciones y se ingresa la descripción",
						"aparecerá y podrás avanzar al siguiente paso",
						"¡La descripción de la sala debe tener al menos 30 caracteres!",
						"Al seleccionar el tipo de tablero, debe ingresar el precio del tablero",
						"Obtenga una vista previa de su obra de arte haciendo clic en las pestañas",
						"SOBRE, GALERÍA, SERVICIOS, DISPONIBILIDAD, LIBRO",
						"¡Puedes editar tu trabajo si es necesario!",
						"Una vez que esté satisfecho con su trabajo, haga una vista previa haciendo clic en",
						"Actualizar",
						"para proceder con el pago",
						"Aquí puede continuar con el pago. Gracias por elegir",
						"despierta feliz!",
						"Una vez que pague, será redirigido a la página de destino para ver su habitación en vivo en el sitio",
						"Iniciará sesión en su cuenta y, en la esquina superior derecha, verá sus iniciales, con su habitación en el menú desplegable",
						"¡Puede hacer clic en el nombre de su habitación o sala para acceder al panel de control de su cuenta, donde puede editar aún más su sala o agregar una nueva!",
						"si quieres bloquear algunas de las fechas",
						"luego haga clic en",
						"DISPONIBILIDAD",
						"lengüeta.",
						"Para más detalles, haga clic en",
						"Edita tu habitación a tu gusto",
						"para guardar sus cambios",
						"Si desea editar la sala, haga clic en",
						"Mis habitaciones",
						"Aún no hay habitaciones",
						"Cerrar sesión",
						"Tablero",
						"Detalles de la habitación",
						"Semana (s) reservada (s)",
						"Tablero",
						"Detalles del pago",
						"Solicitud de propiedad",
						"Cualquier solicitud...",
						"Sus futuros clientes podrán reservar su habitación a través de este formulario",
						"Anterior",
						"Próximo",
						": ver vista",
						"dormitorio",
						"desayuno",
						"almuerzo",
						"cena",
						"imagen de propiedad",
						"desde",
						"EUR",
						"por semana",
						"más...",
						"Información sobre la habitación",
						"Acerca de",
						"Vista previa de imágenes de la propiedad",
						"Galería",
						"Ver las comodidades",
						"Comodidades",
						"Vista previa de la disponibilidad",
						"Disponibilidad",
						"Reserve su habitación!",
						"Libro",
						"mostrar en el mapa",
						"Tablas",
						"Bloquear fechas seleccionadas",
						"¿Cómo bloquear semanas?",
						"Seleccione el tablero y la (s) semana (s) y haga clic en",
						"LIBRO",
						"botón",
						"1) Seleccione cualquier tablero",
						"2) Seleccione las semanas que desea bloquear",
						"3) Haga clic en",
						"Menos...",
						"¡No podrás revertir esto!",
						"Sí, eliminar",
						"Cómo",
						"Avance",
						"Editar",
						"Eliminar",
						"Bloquear fechas",
						"Agregar nueva habitación",
						"seleccionar ubicación",
						"Su búsqueda arrojó 0 resultados, pruebe diferentes parámetros de búsqueda o eche un vistazo a las propiedades destacadas a continuación",
						"Resultados de la búsqueda:",
						
						"¡Despierta feliz!" ,
						"Logotipo" ,
						"Despierta feliz | habitaciones con vista",
						"Menú",
						"¿propietario?" ,
						"Inglés" ,
						"imagen de la bandera inglesa",
						"Cambiar a inglés" ,
						"eslovaco",
						"imagen de la bandera eslovaca",
						"cambiar a eslovaco",
						"Español" ,
						"cambiar a español",
						"imagen de la bandera española",
						"polaco" ,
						"cambiar a polaco",
						"imagen de la bandera polaca",
						"no mostrar de nuevo",
						"Las ubicaciones iniciales son",
						"se actualizarán con nuevas salas agregadas en diferentes ubicaciones",
						"Tipo de habitación" ,
						"Tipo de habitación (cualquiera)",
						"Individual (En Suite)",
						"Doble (En Suite)",
						"Tipo de placa (cualquiera)",
						"Cama y Desayuno" ,
						"Desayuno y cena",
						"Todo incluido" ,
						"Buscar" ,
						"Busque su propiedad",
						"Copyright",
						"Ciérralo por ahora" ,
						"No mostrar de nuevo",
						"NUEVO",
						"¿Vives en Irlanda?" ,
						"Si tiene espacio libre y desea ganar hasta € 14,000 libres de impuestos, ¡únase a miles de propietarios felices!" ,
						"más información" ,
						"Ubicación" ,
						"Habitación" ,
						"Servicios",
						"Selecciona tu ubicación" ,
						"Define tu habitación",
						"Define tus servicios",
						"Vista previa de tu obra de arte!" ,
						"Pago",
						"¡Guarda tus cambios!"
					],
					'sk' :[
						"Izba:" ,
						"vyhliadka :" ,
						"Viac informácií o miestnosti." ,
						"Súradnice:" ,
						"získať podrobnosti" ,
						"Názov nehnuteľnosti" ,
						"Kliknutím na obrázok ho zväčšíte!" ,
						"Single" ,
						"Double" ,
						"Zvolený typ izby." ,
						"Vyberte typ izby." ,
						"obraz jednposteľovej spálne" ,
						"obraz dvojposteľovej izby" ,
						"Horský výhľad" ,
						"výhľad na more" ,
						"výhľad na rieku" ,
						"pohľad na bazén" ,
						"výhľad na pláž" ,
						"výhľad na les" ,
						"panoráma" ,
						"zobrazenie polí" ,
						"púšťový pohľad" ,
						"vrch" ,
						"more" ,
						"Jazero" ,
						"Rieka" ,
						"Pool" ,
						"Pláž" ,
						"Les" ,
						"Skyline" ,
						"Pole" ,
						"Púšť" ,
						"Zobraziť vybratý typ." ,
						"Vyberte typ zobrazenia." ,
						"Vyberte typ zobrazenia, ktorý má vaša izba." ,
						"Zvolený štýl miestnosti." ,
						"Vyberte si štýl svojej izby." ,
						"image spálne" ,
						"Iba izbu" ,
						"B & B" ,
						"B & D" ,
						"All Inclusive" ,
						"Obrázok iba pre izbu" ,
						"B & B image" ,
						"B & D image" ,
						"All inclusive image" ,
						"cena" ,
						"Vybrané typy dosiek." ,
						"Vyberte vaše typy kariet." ,
						"Pridať cenu za tabuľu!" ,
						"Vyberte základňu, ktorú môžete poskytnúť svojim hosťom." ,
						"Zariadenie vybrané." ,
						"Vyberte vybavenie, ktoré poskytujete!" ,
						"Vyberte vybavenie, ktoré môžete poskytnúť svojim hosťom." ,
						"čerstvé bielizeň" ,
						"prikrývky" ,
						"hádanka odmietne službu" ,
						"barman výťahu" ,
						"výzva na budenie celebrít" ,
						"rýchle Wi-Fi" ,
						"koktailová stanica na izbe" ,
						"cvičenie a meditácia na izbe" ,
						"Porty USB nabíjačky" ,
						"smart TV with Netflix" ,
						"kávovar na izbe" ,
						"kancelársky kút" ,
						"darček na privítanie" ,
						"miestne chuťové dary" ,
						"kohútik na pivo na izbe" ,
						"sprchovacia mini chladnička" ,
						"dodávka pop kukurice" ,
						"doplnkový chytrý telefón" ,
						"doplnkové BMW SUV" ,
						"Napíšte popis svojej izby, min. 30 - max. 300 znakov." ,
						"Popis vašej izby" ,
						"Popíšte svoju izbu, urobte ju atraktívnou (min. 30 - max. 300 znakov)" ,
						"Location" ,
						"Room" ,
						"Služby" ,
						"Náhľad" ,
						"Platba" ,
						"Skontrolujte tieto polia:" ,
						"Podrobnosti o platbe: 99 EUR ročne + 9% z každej rezervácie." ,
						"Celková cena" ,
						"Celé meno" ,
						"E-mail" ,
						"Heslo" ,
						"Meno držiteľa karty:" ,
						"Číslo karty" ,
						"CVV" ,
						"Platba" ,
						"Prihlasovacie meno vlastníka" ,
						"Prihlásiť sa" ,
						"Ešte nie ste zaregistrovaní?" ,
						"Žiaden problém!" ,
						"Len urob prvý krok ...." ,
						"Priamo na tomto webe!" ,
						"Pridajte svoju izbu teraz!" ,
						"Najprv vyberte polohu svojho majetku!" ,
						"Ok" ,
						"Ak ste už zaregistrovaní, skontrolujte svoje prihlasovacie údaje alebo zámok CAPS ... ;-)" ,
						"Och ..." ,
						"Prosím, vyberte stravovanie!" ,
						"Prosím, vyberte aspoň jeden týždeň!" ,
						"Vaše dáta boli zablokované!" ,
						"Týždeň:" ,
						"Ďakujeme za rezerváciu u nás!" ,
						"Názov:" ,
						"E-mail" ,
						"Room" ,
						"Týždeň" ,
						"Celková cena:" ,
						"Adresa" ,
						"Žiadosť" ,
						"uložiť ako PDF" ,
						"ID rezervácie:" ,
						"Zatvoriť" ,
						"Vaša izba nie je rezervovaná!" ,
						"Ako:" ,
						"ste v režime úprav" ,
						"ste v režime ukážky" ,
						"ste v režime pridania" ,
						"ste v blokovom režime" ,
						"Kliknite na" ,
						", ak chcete upraviť svoju izbu." ,
						"OK Mám to !" ,
						"Kliknutím na" ,
						"získate informácie, ktoré vám pomôžu pri každom kroku vašej cesty ... ;-)." ,
						"Vyhľadajte polohu svojho majetku na mape a potom kliknutím na mapu zobrazte súradnice." ,
						"Potom kliknite na" ,
						", ak chcete zobraziť podrobnosti o polohe." ,
						"Tieto údaje môžete opraviť." ,
						"Keď budete spokojní s podrobnosťami o polohe, kliknite na" ,
						"Nezabudnite pridať názov svojej nehnuteľnosti! (Min. 3 znaky), aby ste mohli pokračovať v ďalšom kroku." ,
						"Definujte svoju izbu výberom vhodných prepínačov." ,
						"Po výbere všetkých možností" ,
						"Definujte svoje služby výberom vhodných kontrolných tlačidiel." ,
						"Môžete vybrať viac možností." ,
						"Ak vyberiete aspoň jednu z možností a zadáte popis" ,
						"sa zobrazí a môžete prejsť na ďalší krok." ,
						"Opis miestnosti musí mať najmenej 30 znakov!" ,
						"Pri výbere typu dosky musíte zadať cenu dosky." ,
						"Zobrazte ukážku svojho umeleckého diela kliknutím na karty" ,
						"O GALÉRII, ZARIADENÍ, DOSTUPNOSŤ, KNIHA" ,
						"Svoju prácu môžete v prípade potreby upraviť!" ,
						"Až budete so svojou prácou spokojní, ukážte ju kliknutím na" ,
						"Editovať" ,
						"pokračovať v platbe." ,
						"Tu môžete pokračovať v platbe. Ďakujeme, že ste si vybrali" ,
						"zobuď sa šťastný!" ,
						"Po zaplatení budete presmerovaní na vstupnú stránku, aby ste videli svoju izbu na webe." ,
						"Budete prihlásený / -á do svojho účtu a v pravom hornom rohu sa zobrazia vaše iniciály a vaša izba bude uvedená v rozbaľovacej ponuke." ,
						"Kliknutím na svoje meno alebo názov miestnosti sa dostanete na hlavný panel účtu, kde môžete svoju izbu ďalej upravovať alebo pridať novú!" ,
						"ak chcete zablokovať niektoré z dátumov." ,
						"potom kliknite na" ,
						"DOSTUPNOSŤ" ,
						"Tab." ,
						"Pre viac informácií kliknite na" ,
						"Upravte si izbu podľa svojich predstáv." ,
						"uložte svoje zmeny." ,
						"Ak chcete upraviť miestnosť, kliknite na" ,
						"Moje izby" ,
						"Zatiaľ žiadne izby" ,
						"Odhlásiť sa" ,
						"Prístrojová doska" ,
						"Podrobnosti o izbe" ,
						"Rezervované týždne" ,
						"Board" ,
						"Platobné údaje" ,
						"Žiadosť o nehnuteľnosť" ,
						"Všetky žiadosti ..." ,
						"Vaši zákazníci si budú môcť prostredníctvom tohto formulára rezervovať izbu." ,
						"Predchádzajúci" ,
						"Ďalšie" ,
						": view view" ,
						"Spálňa" ,
						"Raňajky" ,
						"Obed" ,
						"Večeru" ,
						"obraz vlastníctva" ,
						"Z" ,
						"EUR" ,
						"za týždeň" ,
						"Viac ..." ,
						"Informácie o izbe" ,
						"O" ,
						"Ukážka obrázkov nehnuteľnosti" ,
						"Galéria" ,
						"Prezrite si vybavenie" ,
						"Vybavenie" ,
						"Ukážka dostupnosti" ,
						"Dostupnosť" ,
						"Rezervuj si izbu!" ,
						"Rezervovať" ,
						"zobraziť na mape" ,
						"Dosky" ,
						"Blokovať vybrané dátumy" ,
						"Ako blokovať týždne?" ,
						"Vyberte dosku a týždne a kliknite na" ,
						"REZERVOVAŤ" ,
						"Tlačidlo" ,
						"1) Vyberte akúkoľvek dosku" ,
						"2) Vyberte týždne, ktoré chcete zablokovať." ,
						"3) Kliknite na" ,
						"Menej ..." ,
						"Nebudete sa môcť vrátiť späť!" ,
						"Áno, odstrániť" ,
						"Ako" ,
						"Náhľad" ,
						"Editovať" ,
						"Zrušiť" ,
						"Blokové dátumy" ,
						"Pridať novú izbu" ,
						"vyberte miesto" ,
						"Vaše vyhľadávanie vrátilo 0 výsledkov, skúste iné parametre vyhľadávania alebo si pozrite nižšie uvedené vlastnosti." ,
						"Výsledky vyhľadávania:",
						
						"Zobuď sa šťastný!" ,
						"logo obrázok",
						"prebudiť šťastné | izby s výhľadom",
						"Ponuka" ,
						"Majiteľ?" ,
						"Angličtina" ,
						"anglický obrázok vlajky",
						"prejsť na angličtinu",
						"slovenský",
						"obrázok slovenskej vlajky",
						"prejsť na slovenčinu",
						"španielsky",
						"prejsť na španielčinu",
						"španielsky obrázok vlajky",
						"poľský",
						"prepnúť na poľský",
						"poľský obrázok vlajky",
						"nezobrazovať znova",
						"Počiatočné polohy sú",
						"aktualizujú sa o nové miestnosti pridané na rôznych miestach",
						"Typ izby" ,
						"Typ izby (akýkoľvek)",
						"Jednoposteľová (En Suite)",
						"Dvojposteľová (En Suite)",
						"Typ starvovania (akýkoľvek)",
						"Izba & Raňajky",
						"Raňajky a večere",
						"All inclusive",
						"Vyhľadávanie" ,
						"Vyhľadaj svoju izbu",
						"Autorské práva",
						"Teraz to zatvorte." ,
						"Nezobrazovať znova",
						"NOVÝ" ,
						"Žiješ v Írsku?" ,
						"Ak máte voľný priestor a chcete zarobiť až 14 000 EUR bez dane, príďte a pripojte sa k tisícom šťastných majiteľov!" ,
						"viac informácií" ,
						"Miesto",
						"Izba",
						"Služby",
						"Vyberte si svoju polohu",
						"Definujte svoju izbu",
						"Definujte svoje služby",
						"Prezrite si svoje umelecké dielo!" ,
						"Platba",
						"Uložte svoje zmeny!"
					],
					'pl' : [
						"Pokój :",
						"widok:",
						"Zobacz więcej informacji o pokoju.",
						"Współrzędne:",
						"uzyskać szczegółowe informacje",
						"Nazwa właściwości",
						"Kliknij dowolny obraz, aby go powiększyć!",
						"pojedynczy",
						"podwójnie",
						"Wybrano typ pokoju.",
						"Wybierz typ pokoju.",
						"obraz jednej sypialni",
						"obraz podwójnej sypialni",
						"widok na góry",
						"Widok morza",
						"widok na rzekę",
						"widok na basen",
						"widok na plażę",
						"widok lasu",
						"widok na panoramę",
						"widok pól",
						"widok na pustynię",
						"Góra",
						"morze",
						"jezioro",
						"rzeka",
						"basen",
						"plaża",
						"las",
						"sylwetka na tle nieba",
						"pola",
						"pustynia",
						"Wybrano typ widoku.",
						"Wybierz typ widoku.",
						"Wybierz typ widoku, jaki ma Twój pokój.",
						"Wybrano styl pokoju.",
						"Wybierz styl pokoju.",
						"obraz sypialni",
						"Tylko pokój",
						"B & B",
						"B & D",
						"Wszystko w cenie",
						"Obraz tylko pokoju",
						"Obraz B & B",
						"Obraz B&R",
						"All Inclusive obraz",
						"Cena EUR",
						"Wybrano typ (y) planszy.",
						"Wybierz typ (y) swojej planszy.",
						"Dodaj cenę za żywność!",
						"Wybierz podstawę forum, którą możesz zapewnić swoim gościom.",
						"Wybrane udogodnienia.",
						"Wybierz udogodnienia, które zapewnisz!",
						"Wybierz udogodnienia, które możesz zapewnić swoim gościom.",
						"świeża pościel",
						"dodatkowe koce",
						"łamigłówka odmawia usługi",
						"barman windy",
						"budzenie gwiazd",
						"szybkie Wi-Fi",
						"stanowisko koktajlowe w pokoju",
						"trening i medytacja w pokoju",
						"Porty ładowarki USB",
						"smart TV z Netflix",
						"ekspres do kawy w pokoju",
						"kącik biurowy",
						"prezent powitalny",
						"prezenty o smaku lokalnym",
						"kran piwny w pokoju",
						"mini lodówka z prysznicem",
						"dostawa kukurydzy pop",
						"uzupełniający inteligentny telefon",
						"uzupełniający SUV BMW",
						"Napisz opis swojego pokoju, min. 30 - maks. 300 znaków.",
						"Opis Twojego pokoju",
						"Opisz swój pokój, spraw, aby był atrakcyjny (min. 30 - maks. 300 znaków)",
						"Lokalizacja",
						"Pokój",
						"usługi",
						"zapowiedź",
						"Zapłata",
						"Przejrzyj następujące pola:",
						"Szczegóły płatności: 99 EUR rocznie + 9% każdej rezerwacji.",
						"Cena całkowita",
						"Pełne imię i nazwisko",
						"E-mail",
						"Hasło",
						"Imię właściciela karty:",
						"Numer karty",
						"CVV",
						"Zapłacić",
						"Login właściciela",
						"Zaloguj sie",
						"Jeszcze nie zarejestrowany?",
						"Nie ma problemu!",
						"Po prostu zrób pierwszy krok ...",
						"Bezpośrednio na tej stronie!",
						"Dodaj swój pokój teraz!",
						"Najpierw wybierz lokalizację swojej nieruchomości!",
						"dobrze",
						"Jeśli jesteś już zarejestrowany, sprawdź dane logowania lub CAPS Lock ... ;-)",
						"Ups…",
						"Proszę wybrać planszę!",
						"Wybierz przynajmniej tydzień!",
						"Twoje daty zostały zablokowane!",
						"Tydzień (y):",
						"Dziękujemy za rezerwację u nas!",
						"Nazwa:",
						"E-mail:",
						"Pokój:",
						"Tydzień:",
						"Cena całkowita:",
						"adres:",
						"Żądanie:",
						"zapisz jako PDF",
						"Identyfikator rezerwacji:",
						"Odwołać",
						"Twój pokój nie jest zarezerwowany!",
						"Jak:",
						"jesteś w trybie edycji",
						"jesteś w trybie podglądu",
						"jesteś w trybie dodawania",
						"jesteś w trybie blokowym",
						"Kliknij",
						"przycisk, jeśli chcesz edytować swój pokój.",
						"Ok, rozumiem !",
						"Klikając na",
						"otrzymasz informacje, które pomogą na każdym etapie podróży ... ;-).",
						"Znajdź lokalizację swojej nieruchomości na mapie, a następnie kliknij mapę, aby wyświetlić współrzędne.",
						"Następnie kliknij",
						"przycisk, aby wyświetlić szczegóły lokalizacji.",
						"Możesz poprawić te dane.",
						"Gdy będziesz zadowolony ze szczegółów lokalizacji, kliknij",
						"Pamiętaj, aby dodać nazwę swojej nieruchomości! (Min 3 znaki), aby móc przejść do następnego kroku.",
						"Zdefiniuj swój pokój, wybierając odpowiednie przyciski radiowe.",
						"Po wybraniu wszystkich opcji",
						"Zdefiniuj swoje usługi, wybierając odpowiednie przyciski wyboru.",
						"Możesz wybrać wiele opcji.",
						"Po wybraniu co najmniej jednej z każdej opcji i wprowadzeniu opisu",
						"pojawi się i możesz przejść do następnego kroku.",
						"Opis pokoju musi mieć co najmniej 30 znaków!",
						"Wybierając typ tablicy, musisz wprowadzić cenę tablicy.",
						"Przejrzyj swoje dzieło sztuki, klikając zakładki",
						"O, GALERIA, UDOGODNIENIA, DOSTĘPNOŚĆ, KSIĄŻKA.",
						"W razie potrzeby możesz edytować swoją pracę!",
						"Gdy będziesz zadowolony ze swojej pracy, wyświetl podgląd, klikając",
						"Aktualizacja",
						"aby kontynuować płatność.",
						"Tutaj możesz kontynuować płatność. Dziękujemy za wybranie",
						"obudź się szczęśliwy!",
						"Po zapłaceniu nastąpi przekierowanie do strony docelowej, aby zobaczyć swój pokój na żywo w witrynie.",
						"Zostaniesz zalogowany na swoje konto, aw prawym górnym rogu zobaczysz swoje inicjały, z pokojem wymienionym w menu rozwijanym.",
						"Możesz kliknąć swoje imię lub nazwę pokoju, aby przejść do pulpitu nawigacyjnego konta, gdzie możesz dalej edytować swój pokój lub dodać nowy!",
						"jeśli chcesz zablokować niektóre daty.",
						"następnie kliknij",
						"DOSTĘPNOŚĆ",
						"patka.",
						"Aby uzyskać więcej informacji, kliknij",
						"Edytuj swój pokój według własnych upodobań.",
						"aby zapisać zmiany.",
						"Jeśli chcesz edytować pokój, kliknij",
						"Moje pokoje",
						"Nie ma jeszcze pokoi",
						"Wyloguj",
						"Deska rozdzielcza",
						"Szczegóły pokoju",
						"Zarezerwowane tygodnie",
						"Tablica",
						"Szczegóły płatności",
						"Zapytanie o nieruchomość",
						"Jakieś wymagania...",
						"Twoi przyszli klienci będą mogli zarezerwować pokój za pomocą tego formularza.",
						"Poprzedni",
						"Kolejny",
						": widok widoku",
						"sypialnia",
						"śniadanie",
						"lunch",
						"obiad",
						"obraz nieruchomości",
						"z",
						"EUR",
						"na tydzień",
						"więcej...",
						"Informacje o pokoju",
						"O",
						"Podgląd zdjęć nieruchomości",
						"Galeria",
						"Zobacz udogodnienia",
						"Udogodnienia",
						"Podgląd dostępności",
						"Dostępność",
						"Zarezerwuj pokój!",
						"Książka",
						"Pokaż na mapie",
						"żywność",
						"Blokuj wybrane daty",
						"Jak blokować tygodnie?",
						"Wybierz wyżywienie i tygodnie (tygodnie) i kliknij",
						"KSIĄŻKA",
						"przycisk",
						"1) Wybierz dowolną tablicę",
						"2) Wybierz tygodnie, które chcesz zablokować.",
						"3) Kliknij",
						"mniej...",
						"Nie będzie można tego cofnąć!",
						"Tak, usuń",
						"Jak",
						"Zapowiedź",
						"Edytować",
						"Usunąć",
						"Blokuj daty",
						"Dodaj nowy pokój",
						"Wybierz lokalizację",
						"Twoje wyszukiwanie zwróciło 0 wyników, wypróbuj inne parametry wyszukiwania lub spójrz na wyróżnione właściwości poniżej.",
						"Wyniki wyszukiwania:",
						
						"Obudź się szczęśliwy!" ,
						"obraz logo" ,
						"obudźcie się szczęśliwi | pokoje z widokiem",
						"Menu" ,
						"właściciel?" ,
						"angielski" ,
						"obraz flagi angielskiej",
						"Przełącz na angielski" ,
						"słowacki",
						"obraz flagi słowackiej",
						"zmień na słowacki",
						"hiszpański" ,
						"zmień na hiszpański",
						"obraz hiszpańskiej flagi",
						"polski" ,
						"zmień na polski",
						"obraz polskiej flagi",
						"nie pokazuj więcej",
						"Początkowe lokalizacje to",
						"zaktualizują się, dodając nowe pokoje w różnych lokalizacjach",
						"Rodzaj pokoju" ,
						"Rodzaj pokoju (dowolny)",
						"Jedna (En Suite)",
						"Podwójna (En Suite)",
						"Rodzaj płytki (dowolny)",
						"Łóżko i śniadanie" ,
						"Śniadaniowy obiad" ,
						"Wszystko w cenie" ,
						"Szukaj" ,
						"Wyszukaj swoją nieruchomość",
						"Prawo autorskie" ,
						"Na razie zamknij" ,
						"Nie pokazuj więcej",
						"NOWY" ,
						"Czy mieszkasz w Irlandii?" ,
						"Jeśli masz wolne miejsce i chcesz zarobić do 14 000 € bez podatku, dołącz do tysięcy szczęśliwych właścicieli!" ,
						"więcej informacji" ,
						"Lokalizacja" ,
						"Pokój" ,
						"Usługi",
						"Wybierz swą lokalizację" ,
						"Zdefiniuj swój pokój",
						"Zdefiniuj swoje usługi",
						"Wyświetl podgląd swojego dzieła sztuki!" ,
						"Zapłata" ,
						"Zapisz zmiany!"
					]
					
				};
				
				return plain[ language ];
			}
		
		
		
		
		
	} ) ();

