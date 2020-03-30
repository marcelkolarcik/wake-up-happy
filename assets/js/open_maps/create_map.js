/*TO DISPLAY MAP ON index.html, APPENDING MARKERS WITH POPUPS:
 *
 * USING openstreetmap.org WITH leaflet
 *
 * WHEN USER LOADS index.html PAGE, WE WILL LOAD MAP WITH
 * MARKERS, WHERE EACH MARKER REPRESENTS ONE ROOM
 *
 * WHEN USER CLICKS ON MARKER , A POPUP WILL POP WITH SHORT
 * ROOM DESCRIPTION AND more BUTTON
 *
 * WHEN USER CLICKS ON more BUTTON, WE WILL RENDER ROOM DETAILS
 * IN THE DIV ABOVE THE MAP, WHERE USER CAN PREVIEW ROOM'S FULL
 * AMENITIES, GALLERY, DESCRIPTION, AVAILABILITY AND HE CAN
 * BOOK THE ROOM AS WELL
 */
import { translate } from "../translator/translator.js";


export function create_map ( coordinates = null, show_p_id = null )
	{
		var tiles = L.tileLayer ( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom     : 18,
			attribution : '&copy; <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
		} );
		
		var container = L.DomUtil.get ( 'map_index' );
		
		if ( container != null )
			{
				/*
				 * WHEN USER CLICKS ON show_on_map BUTTON,FROM ROOM PREVIEW
				 * WE NEED TO RECREATE DIVS THAT ARE HOLDING MAP
				 * (AND REMOVE ANY LISTENERS THAT MIGHT BE ATTACHED TO THEM)
				 * TO AVOID CONTAINER ALREADY INITIATED OR CONTAINER NOT FOUND ERRORS
				 */
				container._leaflet_id = null;
				$ ( "#api_open_maps" ).html ( "" );
				$ ( "#map_index" ).empty ();
				$ ( "<div id=\"map_index\" ></div>" ).appendTo ( "#api_open_maps" );
			}
		
		/*IF WE HAVE COORDINATES FOR THE ROOM -> TWO POSSIBLE CASES :
		 
		 *       1.  USER CLICKS ON show on map BUTTON WHEN PREVIEWING ROOM
		 *       2.  OWNER CREATED NEW ROOM AND IS REDIRECTED TO index.html  AFTER STORING
		 *           NEWLY CREATED ROOM
		 *
		 *WE WILL USE THOSE    coordinates , AND SET zoom = 12  TO DISPLAY THIS PART OF THE MAP WITH THIS ZOOM
		 * WITH OPEN POPUP
		 * OTHERWISE DEFAULT COORDINATES AND ZOOM */
		
		var zoom = coordinates || ( sessionStorage.getItem ( 'lat' ) && sessionStorage.getItem ( 'lng' ) ) ? 12 : null;
		
		
		var map = L.map ( 'map_index', {
			center : L.latLng ( coordinates || 39.095963, -48.515625 ),
			zoom   : zoom || 2,
			layers : [ tiles ]
		} );
		
		var mcg = L.markerClusterGroup ( {
			                                 chunkedLoading    : true,
			                                 spiderfyOnMaxZoom : false
		                                 } );
		
		
		/*CREATING MARKERS ON THE MAP WITH ROOMS FROM LOCAL STORAGE, AS WELL AS
		 * POPUP WITH ROOM IMAGE AND SHORT ROOM DETAILS*/
		
		var room_types = JSON.parse ( localStorage.getItem ( 'room_types' ) );
		var views      = JSON.parse ( localStorage.getItem ( 'views' ) );
		var ROOMS      = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
		
		$.each ( ROOMS, function ( p_id, property )
		{
			
			if ( property )
				{
					var marker = L.marker (
						new L.LatLng ( property.lat, property.lng ), { title : property.city } );
					
					var popup =
						    `<img src="assets/images/bedrooms/b${ property.room_style }_s.jpg" class="___" data-alt="property image" alt = ""
							 style="width:140px;height:70px;">
							 <br><b><span class="text-capitalize">  ${ decodeURI ( property.location ) }</span></b>
							
							 <br> <span class="___" data-text="room :"></span>  ${ room_types[ property.room_type ] }
							 <br><span class="___" data-text="view :"> </span> ${ views[ property.p_view ] }
		
							 <a class="property_popup btn btn-sm bg_green_light ___"
							  data-title="See more information about the room."
							  id="${ p_id }"
							  data-image_id="${ property.room_style }"
							  data-text="more..."
							  
							  href="#" >more...</a> <span class="___" data-text="translation"></span>`;

//			IF OWNER ADDED NEW ROOM, WE WILL REDIRECT TO index.html AND OPEN POPUP WITH HIS NEWLY CREATED ROOM
					
					if ( parseInt ( sessionStorage.getItem ( 'new_p_id' ) ) === p_id
					     && sessionStorage.getItem ( 'lat' ) && sessionStorage.getItem ( 'lng' ) )
						{
							
							
							L.marker ( [ sessionStorage.getItem ( 'lat' ), sessionStorage.getItem ( 'lng' ) ] )
							 .addTo ( map )
							 .bindPopup ( popup )
							 .openPopup ();

//							BECAUSE WE ALREADY OPENED POPUP FOR NEWLY CREATED ROOM, WE ARE
//		                    REMOVING 	'new_p_id',	'lat','lng'FROM sessionStorage
//							OTHERWISE WE WOULD HAVE THIS MARKER OPEN UNTIL WE CLOSE BROWSER
//							AND sessionStorage WOULD BE CLEAR
							sessionStorage.removeItem ( 'new_p_id' );
							sessionStorage.removeItem ( 'lat' );
							sessionStorage.removeItem ( 'lng' );
							
						}
					
					/*OPEN POPUP FOR THE ROOM ON CLICK ON show_on_map BUTTON IN ROOM PREVIEW*/
					
					else if ( coordinates && p_id === show_p_id )
						{
							
							
							L.marker ( coordinates )
							 .addTo ( map )
							 .bindPopup ( popup )
							 .openPopup ();
						}
					/*ALL OTHER ROOMS */
					else
						{
							marker.bindPopup ( popup );
						}
					
					mcg.addLayer ( marker );
				}
		} );
		
		
		map.addLayer ( mcg );
		
	}


//INITIAL MAP WITH CURRENT ROOMS
$ ( function ()
    {
	    create_map ();
    } );

//WHEN USER CLICKS ON show_on_map BUTTON WHEN PREVIEWING THE ROOM WE WILL
// RECREATE THE MARKERS WITH OPEN POPUP FOR CLICKED PROPERTY
$ ( document ).on ( 'click', '.show_on_map', function ()
{
	
	var lat  = $ ( this ).data ( 'lat' );
	var lng  = $ ( this ).data ( 'lng' );
	var p_id = $ ( this ).data ( 'p_id' );
	
	create_map ( [ lat, lng ], p_id );

//	SCROLLING TO THE TOP OF THE PAGE => USER CAN SEE MAP
//	BECAUSE IF USER IS PREVIEWING ROOM FROM SEARCH RESULTS
//AND HE SCROLLED DOWN AND MAP IS NOT IN HIS CURRENT VIEW
// HE WOULDN'T SEE MAP OTHERWISE
	$ ( 'html, body' ).animate ( {
		                             scrollTop : $ ( "#content" ).offset ().top
	                             }, 11 );
	
	translate();
} );