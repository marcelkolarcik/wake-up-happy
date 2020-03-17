/*FUNCTION TO RENDER ROOM PREVIEW
 *
 * WE ARE USING THIS FUNCTION TO RENDER ROOM WHEN DISPLAYING:
 *
 *   1.  FEATURED PROPERTIES
 *   2.  SEARCH RESULT PROPERTIES
 *   3.  ON PREVIEW OF NEWLY CREATED ROOM
 *
 *   FIRST OF ALL WE RENDER SCAFFOLDING FOR THE ROOM render_room ( property, where, preview );
 *   AND THEN WE RENDER DIFFERENT PARTS OF THE PREVIEW INTO THEIR APPROPRIATE DIVS
 *   SO THAT, WHEN USER CLICKS ON TABS about, gallery, amenities, availability, book
 *   HE WILL SEE THIS PART OF THE ROOM PREVIEW*/

import { render_room }             from './render_room.js';
import { render_address }          from './render_address.js';
import { render_gallery }          from './render_gallery.js';
import { render_amenities }        from './render_amenities.js';
import { render_booking_calendar } from './render_booking_calendar.js';
import { render_booking_form }     from './render_booking_form.js';


export function render_room_preview ( property, where, preview = false )
	{
		
		render_room ( property, where, preview );
		render_gallery ( property );
		render_amenities ( property );
		render_booking_calendar ( property );
		render_booking_form ( property );
		render_address ( property );
	}


