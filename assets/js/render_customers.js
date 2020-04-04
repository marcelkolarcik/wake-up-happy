( function ()
	{
		/*IF ROOM HAS ANY CUSTOMERS => WE WILL DISPLAY CUSTOMERS TO OWNER*/
		if (sessionStorage.room_to_edit && ( customers = JSON.parse ( localStorage.CUSTOMERS )[ JSON.parse ( sessionStorage.room_to_edit ).p_id ]) )
			{
				var customers_table = $ ( '#customers_table' );
				
				customers_table.append ( `<h4>Your customers</h4>
                <div class="table-responsive">
				           <table class="table table-sm table-bordered">
							 <thead class="bg-secondary text-light">
							    <tr>
							      <th scope="col">#</th>
							      <th scope="col">Name</th>
							      <th scope="col">Email</th>
							      <th scope="col">Weeks</th>
							      <th scope="col">Board</th>
							      <th scope="col">Total price</th>
							      <th scope="col">Request</th>
							      <th scope="col">Booked at</th>
							    </tr>
							  </thead> <tbody id="table_body">` );
				$.each ( customers, function ( key, customer )
				{
					$('#table_body').append ( `<tr id="table_row${key}">` );
					
					$.each ( customer, function ( index, value )
					{
						$('#table_row'+key).append ( `<td >${ value }</td>` );
					} );
					
					
					customers_table.append ( `</tr>` );
				} );
				
				
				customers_table.append ( ` </tbody></table>
			                </div>` );
				
				console.log ( customers );
			}
		
		
	} ) ();