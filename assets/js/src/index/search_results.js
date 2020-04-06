/*FUNCTION TO FIND MATCHES TO SEARCH QUERY AND DISPLAY
 RESULT TO THE USER
 
 
 TO DO SEARCH BY WEEKS AVAILABLE*/


import { render_room_preview } from '../shared/render_room_preview.js';
import { featured_rooms }      from './featured_rooms.js';
import { current_year , next_year_weeks, next_year }        from "../shared/getWeek.js";


(function (  )
	{
		
		function booked_out ( bookings, weeks )
			{
				/* CHECK IF ROOM HAS THOSE WEEKS AVAILABLE*/
				return weeks.some(v=>  bookings.indexOf(v) !== -1)
				
			}
		
		/* CHECKING AVAILABILITY OF THE ROOM */
		function is_available ( property, location, weeks = [] )
			{
				
				var room_type  = $ ( "#room_type" ).val ();
				var board_type = $ ( "#board_type" ).val ();
				
				var property_searchables = property.searchables;
				
				if ( room_type === 'any' && board_type === 'any' && !booked_out(property.bookings, weeks) && !property.wuh_disabled)
					{
						
						/*SEARCHING FOR location ONLY*/
						if ( property_searchables.indexOf ( location.toString () ) !== -1)
						 
							{
								return true;
							}
						
					}
				else if ( room_type === 'any' && board_type !== 'any' && !booked_out(property.bookings, weeks))
					{
						
						/*SEARCHING FOR location AND board_type*/
						if ( property_searchables.indexOf ( location.toString () ) !== -1 &&
						     ( board_type in property.price )
						     && !property.wuh_disabled
						)
							{
								return true;
							}
					}
				else if ( room_type !== 'any' && board_type === 'any' && !booked_out(property.bookings, weeks))
					{
						
						/*SEARCHING FOR location AND room_type*/
						if ( property_searchables.indexOf ( location.toString () ) !== -1 &&
						     property.room_type.toString () === room_type.toString ()
						     && !property.wuh_disabled)
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
							( board_type in property.price ) &&
							!booked_out(property.bookings, weeks)
							&& !property.wuh_disabled
						)
							{
								return true;
							}
					}
			}
		
		function parse_to_int ( num )
			{
				return parseInt ( num );
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
			
			var location_input = $('#location');
			var location = location_input.val ();
			
			var weeks = searched_weeks.val().split(',');
			weeks.pop();
			
			weeks   = weeks.map ( parse_to_int );
			
			searched_weeks.val('');
			
			
			/*AT LEAST location MUST BE SELECTED*/
			if ( location === '' )
				{
					location_input.addClass('bg-warning');
					
					
					return;
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
							if ( is_available ( property, location , weeks ) )
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
					form_search_results.append ( ` <div class = "img-thumbnail mt-3 bg_orange ___ " id="results"
                                                        data-text="Your search returned 0 results, try different search parameters or have a look at featured properties bellow."    >
					                             
					                           
					                             </div >` );
					featured_rooms ();
					
				}
			else
				{
					form_search_results.prepend (
						` <div class = "img-thumbnail mt-3 border_green pl-3" id="results">
                                <span class="___" data-text="Search results:"></span> ${ results } -
								<span class="___" data-text="weeks"></span>	 # ${weeks.join(',')}</div >` );
				}
			
			
			/*https://stackoverflow.com/questions/6677035/jquery-scroll-to-element*/
			/*SCROLLING TO SEARCH RESULTS*/
			$(form_search_results).get(0).scrollIntoView();

			
		} );
		
		
		/*CLICKING ON more... LINK IN MAP POPUP TO DISPLAY ROOM IN map_search_result*/
		$ ( document ).on ( "click", ".property_popup", function ()
		{
			var ROOMS = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
			$ ( '#form_search_results' ).html ( '' );
			
			var map_search_result = $ ( '#map_search_result' );
			map_search_result.html ( '' );
			
			var p_id     = $ ( this ).attr ( 'id' );
			var property = ROOMS[ p_id ];
			
			
			render_room_preview ( property, 'map_search_result' );
			
			/*SCROLLING TO SEARCH RESULTS*/
			$(map_search_result).get(0).scrollIntoView();
		} );
		
		
		var calendar = $('#calendar');
		$ ( document ).on ( "click", "#searched_weeks", function (){
			
			calendar.html('');
			calendar.append(`${ current_year }<br>`);
			for(var w=1; w<54;w++)
				{
					if(next_year_weeks.indexOf(w) === -1)
						{
							calendar.append(`<span class=" img-thumbnail s_week bg_green "
				
											title="${ w }  - ${ current_year }"
											 data-week="${ w }"
											>
											 ${ w }
											</span>`);
							
						}
					
					
				}
			calendar.append(`<br>${ next_year }<br>`);
			for( w=1; w<54;w++)
				{
					if(next_year_weeks.indexOf(w) !== -1)
						{
							calendar.append(`<span class="img-thumbnail s_week bg_grey_light"
				
											title="${ w }  - ${ next_year }"
											data-week="${ w }"
											>
											${ w }
											</span>`);
							
						}
				
					
				}
			calendar.append(` <br>  <div class = "text-right"> <button
		                                class = "btn  btn-sm bg_green  text-light   "
		                               
		                                id = "done"
                                >
                                    <span ><i class="fas fa-check-circle"></i></span >
                                </button ></div> `)
   
		});
		var searched_weeks = $("#searched_weeks");
		
		$(document).on('click', '.s_week', function (  )
		{
			
			/*IF WEEK IS SELECTED WE ADD IT TO searched_weeks*/
			if(!$(this).hasClass('selected'))
				{
					searched_weeks.val( searched_weeks.val() +  $(this).data('week')+','   );
					$(this).addClass('selected bg-danger');
					
				}
			else if($(this).hasClass('selected'))
				{
					searched_weeks.val( searched_weeks.val().replace( $(this).data('week')+',' ,'' ) );
					$(this).removeClass('selected bg-danger');
				}
			
		});
		
		
		
		$(document).on('click', '#done', function (  )
		{
			
			calendar.html('');
		});
		
	})();



