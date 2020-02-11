function render_room( p_id, image_id, where ) {
	var where_div = '#' + where;
	var search_results = $( where_div );
	
	counter = 0;
	
	let room_types = [
		'Single ( En Suite )',
		'Double ( En Suite )'
	];
	
	let board_types = [
		'Room only',
		'Bed & Breakfast',
		'Breakfast & Dinner',
		'All Inclusive'
	];
	
	var property = properties[ p_id ];
	
	search_results.append( `

<div class = "card mb-3 mt-3" >
    <div class = "row no-gutters" >
        <div class = "col-md-4 vertically_aligned img-thumbnail" >
            <img src = "assets/images/bedrooms/b${image_id}.jpg" class = "card-img" alt = "property image" >
            <h6 class = "bg_green text-light p-2 mt-2 text-center" > ${property.p_price_per_w}&nbsp;EUR
                <small >per week</small >
            </h6 >
        </div >
        <div class = "col-md-8" style = "position:relative" >
            <div class = "list-group list-group-mine list-group-horizontal-sm" id = "myList" role = "tablist" >
                <a class = "list-group-item list-group-item-action active nav_link_property "
                   data-toggle = "list" href = "#about_${p_id}" role = "tab" title = "Informations about room" >About</a >
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#gallery_${p_id}" role = "tab"
                   title = "Preview images of the property" >Gallery</a >
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#amenities_${p_id}" role = "tab" title = "See the amenities" >Amenities</a >
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#availability_${p_id}" role = "tab" title = "Preview the availability" >Availability</a >
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#book_${p_id}" role = "tab" title = "Book your room !" >Book</a >
            </div >
            <div class = "tab-content" >
                <div class = "tab-pane active" id = "about_${p_id}" role = "tabpanel" >
                    <div class = "card-body" >
                        <h4 class = "" >
                            <span class = "text-capitalize" >${property.city} | ${room_types[ property.room_type ]} |
                                                             ${board_types[ property.board_type ]}
                            </span >
                        </h4 >
                        <p class = "card-text" >${property.p_description}</p >
                    </div >
                </div >
                <div class = "tab-pane" id = "gallery_${p_id}" role = "tabpanel" ></div>
                <div class = "tab-pane" id = "availability_${p_id}" role = "tabpanel" >
                    <div class = "row pl-3 pr-3 pt-1 pb-1 " id = "bookings_${p_id}" >
                    </div >
                    <div class = "col-md-12 text-center" >
                        <span class = "nav_link_property" >Pick the week(s) you wat to book
                                                           the room for and click on <strong
                                    class = "bold" >BOOK</strong > button
                        </span >
                    </div >
                </div >
                <div class = "tab-pane" id = "amenities_${p_id}" role = "tabpanel" >...Amenities</div >
                <div class = "tab-pane" id = "book_${p_id}" role = "tabpanel" >
                    <div class = "center-form" >
                        <form onsubmit = "return sendMail(this,${image_id});" >
                            <div class="row">
	                            <div class="col-md-6">
	                            <div class="bg_green text-light text-center  mt-1">
	                            	Room details
								</div>
	                             <div class = "col-auto" >
	                             
                                <label class = "sr-only" for = "room_details" >Room</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-city" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "room_details"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "room_details" placeholder = "Room"
                                           value = "${property.city} | ${room_types[ property.room_type ]} | ${board_types[ property.board_type ]}"
                                           required readonly >
                                </div >
                            </div >
                             <div class = "col-auto" >
                                <label class = "" for = "weeks_${property.p_id}" >Week(s) booked</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                           <i class="far fa-calendar-alt"></i>&nbsp;
                                        </div >
                                    </div >
                                    <input type = "text" name = "weeks"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "weeks_${property.p_id}" placeholder = ""
                                           value = ""
                                           required readonly >
                                </div >
                            </div >
                            
                             <div class = "col-auto" >
                                <label class = "" for = "total_price_${property.p_id}" >Total price</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                          <i class="far fa-credit-card"></i>
                                        </div >
                                    </div >
                                    <input type = "text" name = "total_price"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "total_price_${property.p_id}" placeholder = ""
                                           value = ""
                                           required readonly >
                                </div >
                            </div >
                            <div class = "col-auto" >
                                <label class = "sr-only" for = "fullname" >Full Name</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-user" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "name"
                                           class = "form-control form-control-sm border_bottom_only"
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
                                           class = "form-control form-control-sm  border_bottom_only"
                                           id = "email_of_user" placeholder = "Email" required >
                                </div >
                            </div >
								</div>
								<div class="col-md-6">
								 <div class="bg_green text-light text-center mt-1">
	                            	Payment details
								</div>
                             <div class = "col-auto " >
                        <label class = "sr-only" for = "card_holder_name" >Card Holder Name:</label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "far fa-user" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm
							        			border_bottom_only" id = "card_holder_name" name = "card_holder_name"
                                   placeholder = "Card Holder Name" required >
                        </div >
                    </div >
                    <div class = "col-auto" >
                        <label class = "sr-only" for = "card_numder" >Card Number</label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "far fa-credit-card" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                                   id = "card_numder" placeholder = "Card Number" name = "card_number" required >
                        </div >
                    </div >
                    <div class = "col-auto" >
                        <label class = "sr-only" for = "cvv" >CVV</label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "fas fa-credit-card" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                                   id = "cvv" placeholder = "CVV" required name = "cvv" >
                        </div >
                    </div >
                            <div class = "col-auto" >
                                <label class = "sr-only" for = "request_of_property" >Property Request</label >
                                <div class = "input-group mb-2" >
                                    <textarea rows = "2" name = "request_of_property"
                                              class = "form-control form-control-sm form-control form-control-sm-lg border_bottom_only mb-2"
                                              id = "request_of_property"
                                              placeholder = "Any Requests..."  ></textarea >
                                </div >
                            </div >
                            <div class = "col-auto text-center" >
                            <div id="loader_holder"></div>
                                <button type = "submit" class = "btn bg_green_light horizontally_aligned right-block " title="Submit & Pay">
                                   Submit & Pay
                                </button >
                            </div >
								</div>
        
							</div>
                        
                        
                        </form >
                    </div >
                </div >
            </div >
        </div >
    </div >
</div >
				
				` );
}