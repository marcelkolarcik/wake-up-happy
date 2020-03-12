import { render_room }             from './render_room.js';
import { render_address }          from './render_address.js';
import { render_gallery }          from './render_gallery.js';
import { render_amenities }        from './render_amenities.js';
import { render_booking_calendar } from './render_booking_calendar.js';
import { render_booking_form }     from './render_booking_form.js';


export function render_index ( property, image_id, where, preview = false ) {
	
	var food_id = image_id % 3 + 1;///// because i am applying random image to  a food style
	// ( breakfast style, lunch style, dinner style)and i have only 3 images per style ...
	
	render_room ( property, image_id, where, preview );
	render_gallery ( property, food_id, image_id );
	render_amenities ( property );
	render_booking_calendar ( property );
	render_booking_form ( property );
	render_address ( property );
}


export function getImageId ( property_id ) {
	return (
		       property_id % 16 ) + 1; /////  because i am applying random image to  a room and i have only 16 images
                                       // and > 16 rooms to display...
	
}
