
import {getImageId,render_index} from './render_index.js';

export function featured_rooms()
{
	var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
	
	$('#form_search_results').append(` <div class = "img-thumbnail mt-3 border_green pl-3" >Featured properties</div >`);
	let e =0;
	let randoms = [];
	
	while( e < 3)
	{
		var random_id = Math.floor(Math.random() * ROOMS.length ) ;
		
		if(randoms.indexOf(random_id) === -1) // to avoid display of same properties....
		{
			randoms.push(random_id) ;
			
			var property = ROOMS[ random_id ];
			if(property !== null){
//				OMITTING DELETED ROOMS
				var image_id = getImageId(property.p_id);
				
				render_index( property, image_id, 'form_search_results');
				
				e++;
			}
			
			
			
		}
	}
}
/// because when we load index.html we want to show user some feature rooms on document ready
$(function() { featured_rooms() });

