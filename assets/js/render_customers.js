import { translate } from "./translator/translator.js";


( function ()
	{
		
		$ ( document ).on ( 'click', '#customers', function ()
		{
			
			var customers_table = $ ( '#customers_table' );
			var customers;
			var total_income = 0;
			var weeks_booked = [];
			/*IF ROOM HAS ANY CUSTOMERS => WE WILL DISPLAY CUSTOMERS TO OWNER*/
			if ( sessionStorage.room_to_edit && ( customers = JSON.parse ( localStorage.CUSTOMERS )[ JSON.parse (
				sessionStorage.room_to_edit ).p_id ] ) )
				{
					/*CREATING CUSTOMER TABLE TO DISPLAY*/
					customers_table.append ( `<h4 class="___" data-text="Customers"></h4>
						<p id="room_name" class="bg_orange_light">${JSON.parse (
						sessionStorage.room_to_edit ).p_address.property_name}</p>
                <div class="table-responsive">
				           <table class="table table-sm table-bordered">
							 <thead class="bg-secondary text-light">
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
							if(index !== 'p_id')
								$ ( '#table_row_' + key ).append ( `<td >${ value }</td>` );
							
							if(index === 'weeks')
								{
									$.each(value.split('-'), function ( key, week )
									{
										weeks_booked.push(week);
									})
									
								}
							
							if(index === 'total_price')
								{
									total_income = parseFloat(total_income)  + parseFloat(value) ;
								}
						} );
						
						
						customers_table.append ( `</tr>` );
					} );
					
					
					customers_table.append ( ` </tbody></table>
			                </div>` );
					
					customers_table.prepend( `<p >
								<h4 class="___ " data-text="Total income"></h4>
								<span class="bg_green_light text-light p-2">${total_income} &euro;</span> <br><br>
								<h4 class="___ " data-text="Yearly occupancy"></h4>
								<span class="bg_green_light text-light p-2">${( (parseInt(weeks_booked.length)  / 53) * 100).toFixed(2) } &nbsp; &percnt;</span><br>
				
							</p>` );
					
					
					
				}
			else
				{
					customers_table.append ( ` <h4 class="___" data-text="Your room has no customers yet!"></h4>` );
				}
			/*POPUP TO OWNER WITH OR WITHOUT CUSTOMERS*/
			swal.fire ( {
				            width : $ ( window ).width (),
				            html  : customers_table,
				            confirmButtonColor : '#ffdd00',
				            confirmButtonText  : `<i class="fas fa-check-circle text-primary"></i>`,
			            } );
			translate();
			/*CLEARING customers_table , BECAUSE IF OWNER WOULD CLICK MULTIPLE TIMES
			 * ON customers BUTTON, HE WOULD SEE MULTIPLE TABLES....*/
			customers_table.html('');
			
		} );
		
	} ) ();