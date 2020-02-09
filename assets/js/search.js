	$( document ).on( "click", "#search_btn", function ( e ) {
		/*we don't want to submit form to the server, because we have none*/
		e.preventDefault();
		
		var city = $( '#city' ).val().toLowerCase();
		var room_type = $( "#room_type" ).val();
		var board_type = $( "#board_type" ).val();
		var search_results = $( '#search_results' );
		
		let room_types =[
			'Single ( En Suite )',
			'Double ( En Suite )',
		];
		
		let board_types  =  [
			'Room only',
			'Bed & Breakfast',
			'Breakfast & Dinner',
			'All Inclusive'
		];
		
		
		search_results.html( '' );
		
		
		console.log(properties[0]);
		for ( var room in properties ) {
			
			var property = properties[ room ];
			
			if ( property.city.toString().toLowerCase() === city.toString() &&
				property.room_type.toString() === room_type.toString() &&
				property.board_type.toString() === board_type.toString() ) {
				
				search_results.append( `
					<div class="img-thumbnail">
							<img src="assets/images/avatar/avatar${property.p_id}.png">
							${property.p_address}  ${room_types[property.room_type]}  ${board_types[property.board_type]}
							</div>
				` )
			}
		}
		
		
	} );


