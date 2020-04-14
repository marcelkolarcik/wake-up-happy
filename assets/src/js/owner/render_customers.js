import { translate } from "../shared/translator/translator.js";


( function ()
	{
		
		$ ( document ).on ( 'click', '#customers', function ()
		{
			
			var customers_table = $ ( '#customers_table' );
			var customers;
			var total_income    = 0;
			var weeks_booked    = [];
			/*IF ROOM HAS ANY CUSTOMERS => WE WILL DISPLAY CUSTOMERS TO OWNER*/
			if ( sessionStorage.room_to_edit && localStorage.CUSTOMERS && ( customers = JSON.parse (
				localStorage.CUSTOMERS )[ JSON.parse (
				sessionStorage.room_to_edit ).p_id ] ) )
				{
					/*CREATING CUSTOMER TABLE TO DISPLAY*/
					customers_table.append ( `
						
                <div class="table-responsive" data-cy="customers_table">
				           <table class="table table-sm table-bordered">
							 <thead class="bg_green text-light">
							     <tr><th scope="col" class="___ nav_link_property" data-text="Customers"></th></tr>
							    <tr>
							     
							      <th scope="col" class="___" data-text="name"></th>
							      <th scope="col" class="___" data-text="Email"></th>
							      <th scope="col" class="___" data-text="weeks"></th>
							      <th scope="col" class="___" data-text="Board"></th>
							      <th scope="col" class="___" data-text="Total price"></th>
							      <th scope="col" class="___" data-text="Request"></th>
							      <th scope="col" class="___" data-text="Booked at"></th>
							    </tr>
							   
							  </thead> <tbody id="table_body">` );
					$.each ( customers, function ( key, customer )
					{
						$ ( '#table_body' ).append ( `<tr id="table_row_${ key }">` );
						
						$.each ( customer, function ( index, value )
						{
							if ( index !== 'p_id' )
								$ ( '#table_row_' + key ).append ( `<td >${ value }</td>` );
							
							if ( index === 'weeks' )
								{
									$.each ( value.split ( '-' ), function ( key, week )
									{
										weeks_booked.push ( week );
									} );
									
								}
							
							if ( index === 'total_price' )
								{
									total_income = parseFloat ( total_income ) + parseFloat ( value );
								}
						} );
						
						
						customers_table.append ( `</tr>` );
					} );
					
					
					customers_table.append ( ` </tbody></table>
			                </div>` );
					
					customers_table.prepend ( `
								<div class = "list-group  list-group-horizontal-md tabs col-md-12 mb-2"    >
								 <a class = "list-group-item list-group-item-action nav_link_property bg_green_dark text-light">
								    ${ JSON.parse ( sessionStorage.room_to_edit ).p_address.property_name }
								  </a >
								   <a class = "list-group-item list-group-item-action nav_link_property ___ border_green_dark" data-text="Total income">
								   
								  </a >
								  
								   <a class = "list-group-item list-group-item-action nav_link_property border_green_dark" >
								    ${ total_income } &euro;
								  </a >
								  
								   <a class = "list-group-item list-group-item-action nav_link_property ___ border_green_dark" data-text="Yearly occupancy">
								   
								  </a >
								  <a class = "list-group-item list-group-item-action nav_link_property border_green_dark" >
								    ${ ( ( parseInt ( weeks_booked.length ) / 53 ) * 100 ).toFixed ( 2 ) }&percnt;
								  </a >
								</div>
		
							` );
					
					customers_table.append ( ` <button id="close_alert"
																	data-cy="dismiss_alert"
																	class="bg_green_dark text-light p-2" >OK</button>` );
					
					
				}
			else
				{
					customers_table.append ( ` <h4 class="___" data-text="Your room has no customers yet!"></h4>
                                    <button id="close_alert"
																	data-cy="dismiss_alert"
																	class="bg_green_dark text-light p-2" >OK</button>` );
				}
			/*POPUP TO OWNER WITH OR WITHOUT CUSTOMERS*/
			swal.fire ( {
				            width             : $ ( window ).width (),
				            html              : customers_table,
				            showConfirmButton : false
			            } );
			translate ();
			/*CLEARING customers_table , BECAUSE IF OWNER WOULD CLICK MULTIPLE TIMES
			 * ON customers BUTTON, HE WOULD SEE MULTIPLE TABLES....*/
			customers_table.html ( '' );
			
		} );
		
	} ) ();