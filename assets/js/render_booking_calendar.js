/*FUNCTION TO RENDER  BOOKING CALENDAR FOR EACH ROOM*/


export function render_booking_calendar ( property )
	{
		var board_types = JSON.parse ( localStorage.getItem ( 'board_types' ) );
		
		/*WHEN CREATING DEFAULT ROOMS IN create_DB.js , I OPTED FOR 10 BOOKED DAYS PER ROOM,
		 WHICH ARE 10 RANDOM NUMBERS BETWEEN 1 - 53
		 * SO ON ROOM PREVIEW, IN AVAILABILITY TAB
		 * WE ARE DISPLAYING BOOKED WEEKS IN YELLOW COLOR
		 * AND NOT BOOKED WEEKS IN GREEN COLOR*/
		var bookings = $ ( '#bookings_' + property.p_id );
		
		/*RANDOMLY CREATED TYPES OF BOARDS
		 ( ROOM ONLY, B&B, B&D, ALL INCLUSIVE) ANY PROPERTY CAN HAVE
		 AT LEAST ONE UP TO ALL BOARDS WITH RANDOM PRICES BETWEEN 150 - 300*/
		var boards = $ ( '#boards_' + property.p_id );
		
		/*WEEKS IN CURRENT YEAR:
		 BOOKED => bg_orange
		 NOT BOOKED => bg_green*/
		$.each ( weeks_till_end_of_year, function ( index, week )
		{
			
			if ( property.bookings.indexOf ( week ) !== -1 )
				{
					//			booked out weeks
					bookings.append ( `
				<div class="col img-thumbnail  bg_orange " title="week ${ week } - ${ current_year } booked already !">
				<span class="no_padding"> ${ week }</span></div>
			` );
				}
			
			else
				{
					//			   available weeks
					bookings.append ( `
				<div class="col img-thumbnail week bg_green " title="week: ${ week } - ${ current_year } : available !"
				 data-p_id="${ property.p_id }"
				 data-week="${ week }"
				 data-price="${ property.price[ Object.keys ( property.price )[ 0 ] ] }"
				 data-board_selected_${ property.p_id } = "false"
				 >
			
				  <span> ${ week }</span>
				 </div>
			` );
				}
		} );
		
		/*WEEKS IN NEXT YEAR TO FILL THE GAP AFTER
		 PASSED WEEKS IN CURRENT YEAR:
		 BOOKED => bg_orange
		 NOT BOOKED => bg_green*/
		$.each ( next_year_weeks, function ( index, week )
		{
			
			if ( property.bookings.indexOf ( week ) !== -1 )
				{
					//			booked out weeks
					bookings.append ( `
				<div class="col img-thumbnail  bg_orange " title="week ${ week } - ${ next_year } booked already !"> <span> ${ week }</span></div>
			` );
				}
			
			else
				{
					//			   available weeks
					bookings.append ( `
				<div class="col img-thumbnail week bg_green " title="week: ${ week } - ${ next_year } : available !"
				 data-p_id="${ property.p_id }"
				 data-week="${ week }"
				 data-price="${ property.price[ Object.keys ( property.price )[ 0 ] ] }"
				 data-board_selected_${ property.p_id } = "false"
				 >
			
				  <span> ${ week }</span>
				 </div>
			` );
				}
		} );


//	AVAILABLE BOARDS FOR THE PROPERTY
		
		$.each ( property.price, function ( index, value )
		{
			boards.append ( `
			
				 <input id = "${ index }" name = "board" type = "radio" value = "${ value }"  class="board_type"
				  		data-p_id="${ property.p_id }" data-index="${ index }"	>
                 <label for = "${ index }"  class="nav_link_property board p-2">${ board_types[ index ] } : ${ value } EUR</label >
			
	` );
		} );
		
	}

