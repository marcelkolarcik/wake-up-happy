/*WHEN WE LOAD index.html FOR THE FIRST TIME, OR IF SEARCH RESULTS ARE null,
 * WE WILL DISPLAY 3 FEATURED  PROPERTIES TO HAVE SOME CONTENT ON
 * THE PAGE*/
import { render_room_preview } from './render_room_preview.js';


export function featured_rooms ()
	{
		var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
		
		$ ( '#form_search_results' ).append (
			` <div class = "img-thumbnail mt-3 border_green pl-3" >Featured properties</div >` );
		var e       = 0;
		var randoms = [];
		
		while ( e < 3 )
			{
				var random_id = Math.floor ( Math.random () * ROOMS.length );
				
				/*TO AVOID DISPLAY OF SAME PROPERTIES ... */
				if ( randoms.indexOf ( random_id ) === -1 )
					{
						randoms.push ( random_id );
						
						var property = ROOMS[ random_id ];
						
						//				OMITTING DELETED ROOMS
						if ( property !== null )
							{
								
								
								render_room_preview ( property, 'form_search_results' );
								
								e++;
							}
					}
			}
	}


$ ( function ()
    {
	    featured_rooms ();
    } );

