/*FUNCTION TO FIND MATCHES TO SEARCH QUERY AND DISPLAY
 RESULT TO THE USER
 
 
 TO DO SEARCH BY WEEKS AVAILABLE*/


import { render_room_preview } from './render_room_preview.js';
import { featured_rooms }      from './featured_rooms.js';

(function (  )
	{
		/* CHECKING AVAILABILITY OF THE ROOM */
		function is_available ( property, location )
			{
				
				var room_type  = $ ( "#room_type" ).val ();
				var board_type = $ ( "#board_type" ).val ();
				
				var property_searchables = property.searchables;
				
				
				if ( room_type === 'any' && board_type === 'any' )
					{
						
						/*SEARCHING FOR location ONLY*/
						if ( property_searchables.indexOf ( location.toString () ) !== -1 )
							{
								return true;
							}
						
					}
				else if ( room_type === 'any' && board_type !== 'any' )
					{
						
						/*SEARCHING FOR location AND board_type*/
						if ( property_searchables.indexOf ( location.toString () ) !== -1 &&
						     ( board_type in property.price )
						)
							{
								return true;
							}
					}
				else if ( room_type !== 'any' && board_type === 'any' )
					{
						
						/*SEARCHING FOR location AND room_type*/
						if ( property_searchables.indexOf ( location.toString () ) !== -1 &&
						     property.room_type.toString () === room_type.toString () )
							{
								return true;
							}
						
					}
				else
					{
						/*SEARCHING FOR location,room_type,board_type*/
						if (
							property_searchables.indexOf ( location.toString () ) !== -1 &&
							property.room_type.toString () === room_type.toString () &&
							( board_type in property.price )
						)
							{
								return true;
							}
					}
			}
		
		
		/* DISPLAYING AVAILABLE ROOMS IN form_search_results*/
		$ ( document ).on ( "click", "#search_btn", function ( e )
		{
			
			/*PREVENTING SUBMITTING / RELOADING THE PAGE*/
			e.preventDefault ();
			
			var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
			
			
			var form_search_results = $ ( '#form_search_results' );
			/*WE WILL CLEAR CONTENT OF DIVS CONTAINING SEARCH RESULTS*/
			form_search_results.html ( '' );
			$ ( '#map_search_result' ).html ( '' );
			
			
			var location = $ ( '#location' ).val ();
			
			
			/*AT LEAST location MUST BE SELECTED*/
			if ( location === '' )
				{
					swal.fire ( ( 'select location' ) );
				}
			
			var results = 0;
			for ( var room in ROOMS )
				{
					
					var property = ROOMS[ room ];
					
					if ( property )
					
					/*COULD BE null, BECAUSE, WHEN OWNER DELETES ROOM, IT IS ACTUALLY SET TO NULL
					 * SO NEED TO FILTER OUT THOSE DELETED ROOMS*/
						{
							/*IF property IS AVAILABLE APPEND IT TO SEARCH RESULTS*/
							if ( is_available ( property, location ) )
								{
									
									render_room_preview ( property, 'form_search_results' );
									results++;
								}
						}
					
					
				}
			
			if ( results === 0 )
				{
					
					
					/*IF SEARCH RESULTS ARE EMPTY, WE WILL DISPLAY INFO TO THE USER ABOUT 0 RESULTS
					 * AND DISPLAY featured_rooms INSTEAD*/
					form_search_results.append ( ` <div class = "img-thumbnail mt-3 bg_orange ___"
                                                        data-text="Your search returned 0 results, try different search parameters or have a look at featured properties bellow."    >
					                             
					                           
					                             </div >` );
					featured_rooms ();
					
				}
			else
				{
					form_search_results.prepend (
						` <div class = "img-thumbnail mt-3 border_green pl-3" ><span class="___" data-text="Search results:"></span> ${ results }</div >` );
				}
			
		} );
		
		
		/*CLICKING ON more... LINK IN MAP POPUP TO DISPLAY ROOM IN map_search_result*/
		$ ( document ).on ( "click", ".property_popup", function ()
		{
			var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
			$ ( '#form_search_results' ).html ( '' );
			$ ( '#map_search_result' ).html ( '' );
			
			var p_id     = $ ( this ).attr ( 'id' );
			var property = ROOMS[ p_id ];
			
			
			render_room_preview ( property, 'map_search_result' );
			
		} );
	})();



