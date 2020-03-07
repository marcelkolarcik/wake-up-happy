export function render_booking_form( room ) {
	
	var booking_form = $( '#book_' + room.p_id );
	var room_types = JSON.parse ( localStorage.getItem ( 'room_types' ) );
	
	booking_form.append( `
			 <div class = "center-form" >
                        <form onsubmit = "return sendMail(this,${room.p_id},${room.room_style})" >
                       
                            <div class="row">
	                            <div class="col-md-6">
	                            <div class="bg_green text-light text-center  mt-1">
	                            	Room details
								</div>
	                             <div class = "col-auto" >
	                             
                                <label class = "sr-only" for = "room_details${room.p_id}" >Room</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-city" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "room_details"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "room_details${room.p_id}" placeholder = "Room"
                                           value = "${  decodeURI ( room.p_address.property_name  ) }  ${room.p_address.property_name ?'|':''} ${room_types[ room.room_type]  } "
                                           required readonly >
                                </div >
                            </div >
                             <div class = "col-auto" >
                                <label class = "" for = "weeks_${room.p_id}" >Week(s) booked</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                           <i class="far fa-calendar-alt"></i>&nbsp;
                                        </div >
                                    </div >
                                    <input type = "text" name = "weeks"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "weeks_${room.p_id}" placeholder = ""
                                           value = ""
                                           required readonly >
                                </div >
                            </div >
                             <div class = "col-auto" >
                                <label class = "" for = "board_${room.p_id}" >Board</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                           <i class="far fa-calendar-alt"></i>&nbsp;
                                        </div >
                                    </div >
                                    <input type = "text" name = "board"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "board${room.p_id}" placeholder = ""
                                           value = ""
                                           required readonly >
                                </div >
                            </div >
                            
                             <div class = "col-auto" >
                                <label class = "" for = "total_price_${room.p_id}" >Total price</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                          <i class="far fa-credit-card"></i>
                                        </div >
                                    </div >
                                    <input type = "text" name = "total_price"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "total_price_${room.p_id}" placeholder = ""
                                           value = ""
                                           required readonly >
                                </div >
                            </div >
                            <div class = "col-auto" >
                                <label class = "sr-only" for = "fullname${room.p_id}" >Full Name</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-user" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "name"
                                           class = "form-control form-control-sm border_bottom_only"
                                           id = "fullname${room.p_id}" placeholder = "Full Name" required >
                                </div >
                            </div >
                            <div class = "col-auto" >
                                <label class = "sr-only" for = "email_of_user${room.p_id}" >Email</label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-at" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "email_of_user"
                                           class = "form-control form-control-sm  border_bottom_only"
                                           id = "email_of_user${room.p_id}" placeholder = "Email" required >
                                </div >
                            </div >
								</div>
								<div class="col-md-6">
								 <div class="bg_green text-light text-center mt-1">
	                            	Payment details
								</div>
                             <div class = "col-auto " >
                        <label class = "sr-only" for = "card_holder_name${room.p_id}" >Card Holder Name:</label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "far fa-user" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm
							        			border_bottom_only" id = "card_holder_name${room.p_id}" name = "card_holder_name"
                                   placeholder = "Card Holder Name" required >
                        </div >
                    </div >
                    <div class = "col-auto" >
                        <label class = "sr-only" for = "card_numder${room.p_id}" >Card Number</label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "far fa-credit-card" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                                   id = "card_numder${room.p_id}" placeholder = "Card Number" name = "card_number" required >
                        </div >
                    </div >
                    <div class = "col-auto" >
                        <label class = "sr-only" for = "cvv${room.p_id}" >CVV</label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "fas fa-credit-card" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                                   id = "cvv${room.p_id}" placeholder = "CVV" required name = "cvv" >
                        </div >
                    </div >
                            <div class = "col-auto" >
                                <label class = "sr-only" for = "request_of_property${room.p_id}" >Property Request</label >
                                <div class = "input-group mb-2" >
                                    <textarea rows = "2" name = "request_of_property"
                                              class = "form-control form-control-sm form-control form-control-sm-lg border_bottom_only mb-2"
                                              id = "request_of_property${room.p_id}"
                                              placeholder = "Any Requests..."  ></textarea >
                                </div >
                            </div >
                             <div class = "col-auto" >
                                <label class = "sr-only" for = "address${room.p_id}" >address</label >
                                <div class = "input-group mb-2 d-none" >
                                    <input name = "form_address"
                                              class = "form-control form-control-sm form-control form-control-sm-lg border_bottom_only mb-2"
                                              id = "form_address${room.p_id}" value=""
                                               >
                                </div >
                            </div >
                          
                            <div class = "col-auto text-center" >
                            <div id="loader_holder${room.p_id}"></div>
    
                            ${( (sessionStorage.getItem('edit_mode') || sessionStorage.getItem('preview_mode')) && window.location.pathname === '/owner.html' )
                              ||sessionStorage.getItem('add_mode')
	                         /* || (!sessionStorage.getItem('edit_mode') && !sessionStorage.getItem('preview_mode'))*/? `
								<div class="bg_green_light_g">
								Your future customers will be able to book your room through this form.
								</div>`:
	                          
	                          `  <button type = "submit" class = "btn bg_green_light horizontally_aligned right-block " title="Submit & Pay">
                                    Pay
                                </button >`}
                              
                            </div >
								</div>
        
							</div>
                        
                        
                        </form >
                    </div >
			` );
	
}