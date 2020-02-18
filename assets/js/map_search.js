
import { render_index } from './render_index.js';
/*clicking on more... link in the map popup */
$ ( document ).on ( "click", ".property_popup", function () {
	var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
	$ ( '#form_search_results' ).html ( '' );
	$ ( '#map_search_result' ).html ( '' );
	
	var p_id = $ ( this ).attr ( 'id' );
	var property = ROOMS[ p_id ];
	var image_id = $ ( this ).data ( 'image_id' );
	
	render_index ( property, image_id, 'map_search_result' );
	
} );

