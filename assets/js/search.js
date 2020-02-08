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
	$( document ).on( "click", ".property_pop", function (  ) {
		
		var search_results = $( '#search_results' );
		let  room_types =[
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
		
		var p_id = $(this).attr('id');
		var image_id = $(this).data('image_id');
		
		
		var property = properties[p_id];
		search_results.append( `


			<div class="card mb-3 mt-3" >
			  <div class="row no-gutters">
			    <div class="col-md-4 vertically_aligned img-thumbnail">
			      <img src="assets/images/bedrooms/b${image_id}.jpg" class="card-img" alt="property image">
			    </div>
			    <div class="col-md-8">
			    <div class="list-group list-group-mine list-group-horizontal-sm" id="myList" role="tablist">
				    <a class="list-group-item list-group-item-action active nav_link_property " data-toggle="list" href="#about" role="tab">About</a>
				    <a class="list-group-item list-group-item-action nav_link_property " data-toggle="list" href="#availability" role="tab">Availability</a>
				    <a class="list-group-item list-group-item-action nav_link_property " data-toggle="list" href="#amenities" role="tab">Amenities</a>
				    <a class="list-group-item list-group-item-action nav_link_property " data-toggle="list" href="#gallery" role="tab">Gallery</a>
				</div>
				<div class="tab-content">
				    <div class="tab-pane active" id="about" role="tabpanel">
				     <div class="card-body">
			        	<h5 class="card-title"> ${property.city} | ${room_types[property.room_type]} | ${board_types[property.board_type]}</h5>
				        <p class="card-text">${property.p_description}</p>
				        
				        <h6 class="bg_green text-light p-2 mt-2 ">   ${property.p_price_per_w}&nbsp;EUR <small>per week</small></h6>&nbsp;
			        </div>
				    </div>
				    <div class="tab-pane" id="availability" role="tabpanel">...Availability</div>
				    <div class="tab-pane" id="amenities" role="tabpanel">...Amenities</div>
				    <div class="tab-pane" id="gallery" role="tabpanel">...Gallery</div>
				</div>
			    
			      <button class="btn btn-lg border_green float-right nav_link_property" title="Request call back about the room from landlord.">request call back</button>
			   
			    </div>
			  </div>
			</div>
				
				` )
	});
