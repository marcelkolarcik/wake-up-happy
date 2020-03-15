import { render_room }             from './render_room.js';
import { render_address }          from './render_address.js';
import { render_gallery }          from './render_gallery.js';
import { render_amenities }        from './render_amenities.js';
import { render_booking_calendar } from './render_booking_calendar.js';
import { render_booking_form }     from './render_booking_form.js';


export function render_room_preview ( property, where, preview = false ) {
	
	
	
	render_room ( property, where, preview );
	render_gallery ( property );
	render_amenities ( property );
	render_booking_calendar ( property );
	render_booking_form ( property );
	render_address ( property );
}


