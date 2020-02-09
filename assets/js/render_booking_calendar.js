function render_booking_calendar(property)
{
	var current_week = current_date.getWeek();
	
	var bookings = $('#bookings_'+property.p_id);
	
	while ( current_week < 54 )
	{

//			booked out weeks
		if(property.bookings.indexOf(current_week) !== -1)
		{
			bookings.append(`
				<div class="col img-thumbnail  bg_orange " title="booked already !"> <span> ${current_week}</span></div>
			`);
		}
//			   available weeks
		else
		{
			bookings.append(`
				<div class="col img-thumbnail week bg_green " title="week: ${current_week} - available !"
				 data-p_id="${property.p_id}"
				 data-week="${current_week}"
				 data-price="${property.p_price_per_w}">
				 
				  <span> ${current_week}</span>
				 </div>
			`);
		}
		
		current_week++;
	}
}