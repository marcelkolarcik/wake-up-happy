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

/*clicking on more... link on the map in popup*/
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
		var food_id = image_id % 3 +1;
		
		
		var property = properties[p_id];
		search_results.append( `


			<div class="card mb-3 mt-3" >
			  <div class="row no-gutters">
			    <div class="col-md-4 vertically_aligned img-thumbnail">
			      <img src="assets/images/bedrooms/b${image_id}.jpg" class="card-img" alt="property image">
			       <h6 class="bg_green text-light p-2 mt-2 text-center">   ${property.p_price_per_w}&nbsp;EUR <small>per week</small></h6>
			    </div>
			    <div class="col-md-8" style="position:relative">
			    <div class="list-group list-group-mine list-group-horizontal-sm" id="myList" role="tablist">
			    
				    <a class="list-group-item list-group-item-action active nav_link_property "
				    data-toggle="list" href="#about" role="tab">About</a>
				    
				   <a class="list-group-item list-group-item-action nav_link_property "
				   data-toggle="list" href="#gallery" role="tab">Gallery</a>
				   
				    <a class="list-group-item list-group-item-action nav_link_property "
				    data-toggle="list" href="#availability" role="tab">Availability</a>
				    
				    <a class="list-group-item list-group-item-action nav_link_property "
				    data-toggle="list" href="#amenities" role="tab">Amenities</a>
				    
				     <a class="list-group-item list-group-item-action nav_link_property "
				    data-toggle="list" href="#book" role="tab">Book</a>
				    
				</div>
				<div class="tab-content">
				    <div class="tab-pane active" id="about" role="tabpanel">
				     <div class="card-body">
			        	<h4 class=""><span class="text-capitalize">${property.city}  | ${room_types[property.room_type]} | ${board_types[property.board_type]}</span></h4>
				        <p class="card-text">${property.p_description}</p>
				        
				        
			        </div>
				    </div>
				     <div class="tab-pane  " id="gallery" role="tabpanel"></div>
				    <div class="tab-pane" id="availability" role="tabpanel">...Availability</div>
				    <div class="tab-pane" id="amenities" role="tabpanel">...Amenities</div>
				    <div class="tab-pane" id="book" role="tabpanel">
					     <div class = "center-form" >
			                <form onsubmit = "return sendMail(this);" >
			                
			                <div class = "col-auto" >
                            <label class = "sr-only" for = "name" >Full Name</label >
                            <div class = "input-group mb-2" >
                                <div class = "input-group-prepend" >
                                    <div class = "input-group-text bg-transparent border_bottom_only" >
                                        <i class = "fas fa-user" ></i >
                                    </div >
                                </div >
                                <input type = "text" name = "name"
                                       class = "form-control  border_bottom_only"
                                       id = "fullname" placeholder = "Full Name" required >
                            </div >
                       	 	</div >
                       	 	
                       	 	 <div class = "col-auto" >
                            <label class = "sr-only" for = "email_of_user" >Email</label >
                            <div class = "input-group mb-2" >
                                <div class = "input-group-prepend" >
                                    <div class = "input-group-text bg-transparent border_bottom_only" >
                                        <i class = "fas fa-at" ></i >
                                    </div >
                                </div >
                                <input type = "text" name = "email_of_user"
                                       class = "form-control  border_bottom_only"
                                       id = "email_of_user" placeholder = "Email" required >
                            </div >
                       	 	</div >
                       	 	
                       	 	 <div class = "col-auto" >
                            <label class = "sr-only" for = "room" >Room</label >
                            <div class = "input-group mb-2" >
                                <div class = "input-group-prepend" >
                                    <div class = "input-group-text bg-transparent border_bottom_only" >
                                         <i class = "fas fa-city" ></i >
                                    </div >
                                </div >
                                <input type = "text" name = "room_details"
                                       class = "form-control  border_bottom_only"
                                       id = "room_details" placeholder = "Room"
                                       value="property id : ${property.p_id}  |${property.city}  | ${room_types[property.room_type]} | ${board_types[property.board_type]}| ${property.p_price_per_w} EUR"
                                        required  readonly>
                            </div >
                       	 	</div >
                       	 	
                       	 	 <div class = "col-auto" >
                            <label class = "sr-only" for = "request_of_property" >Property Request</label >
                            <div class = "input-group mb-2" >
                                <textarea rows = "3" name = "request_of_property" class = "form-control form-control-lg border_bottom_only mb-2" id = "request_of_property"
			                              placeholder = "Property Request" required ></textarea >
                            </div >
                       	 	</div >
			                 <div class = "col-auto text-center" >
			                 <button type = "submit" class = "btn border_green horizontally_aligned right-block " >Send Property Request</button >
			                 </div >
			                </form >
			            </div >
					</div>
				</div>
				
			   
			    </div>
			  </div>
			</div>
				
				` );
		var gallery = $('#gallery');
//		Bed & Breakfast
		if(property.board_type === 1 )
		{
			gallery.append(`
			<div class="d-flex justify-content-around mt-3">
			  <div class="card" style="width: 10rem;">
				  <img src="assets/images/views/${property.p_view}.jpg" class="card-img-top" alt="...">
				  <div class="card-footer p-0 ">
				    <p class="card-text text-center"><span class="text-capitalize">${property.p_view}</span> view</p>
				  </div>
				</div>
				
				<div class="card" style="width: 10rem;">
				  <img src="assets/images/breakfast/br_${food_id}.jpg" class="card-img-top" alt="...">
				  <div class="card-footer p-0 ">
				    <p class="card-text text-center">Style of breakfast</p>
				  </div>
				</div>
			</div>
			`);
		}
		//		Breakfast & Dinner
		else if (property.board_type === 2  ) {
			gallery.append(`
			
				
			<div class="d-flex justify-content-around mt-3">
			<div class="card" style="width: 10rem;">
				  <img src="assets/images/views/${property.p_view}.jpg" class="card-img-top" alt="...">
				  <div class="card-footer p-0 ">
				    <p class="card-text text-center"><span class="text-capitalize">${property.p_view}</span> view</p>
				  </div>
				</div>
				
			<div class="card" style="width: 10rem;">
			  <img src="assets/images/breakfast/br_${food_id}.jpg" class="card-img-top" alt="...">
			  <div class="card-footer p-0">
			    <p class="card-text text-center">Style of breakfast</p>
			  </div>
			</div>
			<div class="card" style="width: 10rem;">
			  <img src="assets/images/lunch/l_${food_id}.jpg" class="card-img-top" alt="...">
			  <div class="card-footer p-0">
			    <p class="card-text text-center">Style of lunch</p>
			  </div>
			</div>
			</div>
			`);
		}
		//		All Inclusive
		else if (property.board_type === 3  ) {
			gallery.append(`

			
				
			<div class="d-flex justify-content-around mt-3">
			<div class="card" style="width: 10rem;">
				  <img src="assets/images/views/${property.p_view}.jpg" class="card-img-top" alt="...">
				  <div class="card-footer p-0 ">
				    <p class="card-text text-center"><span class="text-capitalize">${property.p_view}</span> view</p>
				  </div>
				</div>
			<div class="card" style="width: 10rem;">
			  <img src="assets/images/breakfast/br_${food_id}.jpg" class="card-img-top" alt="...">
			  <div class="card-footer p-0">
			    <p class="card-text text-center">Style of breakfast</p>
			  </div>
			</div>
			<div class="card" style="width: 10rem;">
			  <img src="assets/images/lunch/l_${food_id}.jpg" class="card-img-top" alt="...">
			  <div class="card-footer p-0">
			    <p class="card-text text-center">Style of lunch</p>
			  </div>
			</div>
			<div class="card" style="width: 10rem;">
			  <img src="assets/images/dinner/d_${food_id}.jpg" class="card-img-top" alt="...">
			  <div class="card-footer p-0">
			    <p class="card-text text-center ">Style of dinner</p>
			  </div>
			</div>
			</div>
			`);
		}
		else
		{
			gallery.append(`
			<div class="d-flex justify-content-around align-items-start">
				<div class="card" style="width: 10rem;">
				  <img src="assets/images/views/${property.p_view}.jpg" class="card-img-top" alt="...">
				  <div class="card-footer p-0 ">
				    <p class="card-text text-center">Style of view</p>
				  </div>
				</div>
				<div class="card" style="width: 10rem;">
				   <img src="assets/images/bedrooms/b${image_id}.jpg" class="card-img" alt="property image">
				  <div class="card-footer p-0 ">
				    <p class="card-text text-center">Room only rate</p>
				  </div>
				</div>
			</div>
			`);
		}
		
		
	});
