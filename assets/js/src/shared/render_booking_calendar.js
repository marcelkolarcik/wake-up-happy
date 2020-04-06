/*FUNCTION TO RENDER  BOOKING CALENDAR FOR EACH ROOM*/
import { current_year, next_year, weeks_till_end_of_year, next_year_weeks} from "./getWeek.js";
import { board_types }        from './inventory.js';

export function render_booking_calendar ( property )
	{
		
		
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
		
		/*ADDING .need_translation CLASS TO EACH WEEK,
		* SO THAT WHEN USER FORGETS TO SELECT BOARD FIRST ,
		* AND WE ARE FIRING ALERT TO USER =>
		* WE WILL TRANSLATE ALERT TO SELECTED LANGUAGE
		*
		* WHEN USER SELECTS BOARD , WE WILL REMOVE CLASS .need_translation
		* FROM WEEKS RENDERED FOR THIS PROPERTY -> booking_helpers.js ( ~ line 69 )
		* SO THAT translate() FUNCTION IS NOT CALLED...*/
		$.each ( weeks_till_end_of_year, function ( index, week )
		{
			
			if ( property.bookings.indexOf ( week ) !== -1 )
				{
					//			booked out weeks
					bookings.append ( `
				<div class="col img-thumbnail  bg_orange ___"
				data-title="week |week - |year booked already !"
				data-week="${ week }"
				data-year="${ current_year }">
				<span class="no_padding"> ${ week }</span>
				</div>
			` );
				}
			
			else
				{
					//			   available weeks
					bookings.append ( `
				<div class="col img-thumbnail week bg_green need_translation ___"
					data-title="week |week - |year available !"
					data-week="${ week }"
					data-year="${ current_year }"
					data-p_id="${ property.p_id }"
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
				<div class="col img-thumbnail  bg_orange ___"
				
				data-title="week |week - |year booked already !"
				data-week="${ week }"
				data-year="${ next_year }">
				 <span class="no_padding"> ${ week }</span>
				</div>
			` );
				}
			
			else
				{
					//			   available weeks
					bookings.append ( `
				<div class="col img-thumbnail week bg_green need_translation ___"
				 data-title="week |week - |year available !"
				 data-year="${ next_year }"
				 data-week="${ week }"
				 data-p_id="${ property.p_id }"
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
                 <label for = "${ index }"
                 class="nav_link_property board p-2 ___"
                 data-text="${ board_types[ index ] }"> :</label >
                 <span class="nav_link_property"> ${ value } EUR</span>
			
	` );
		} );
		
		boards.append ( `<span class="bg-danger text-light  float-right" id="preview_total_price_${ property.p_id }"></span>` );
		
	}

