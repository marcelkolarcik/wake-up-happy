/*FUNCTION TO RENDER BOOKING FORM , THROUGH WHICH USER CAN BOOK THE ROOM
 *
 * WHEN USER IS SELECTING / DESELECTING BOARDS AND WEEKS HE WANTS,
 * WE ARE UPDATING INPUT FIELDS WITH RELEVANT DETAILS:
 *
 *   1.  BOARD TYPE
 *   2.  TOTAL PRICE FOR THE BOOKING
 *   3.  WEEKS BOOKED
 *
 *   IN booking_helpers.js
 *
 *   WHEN USER CLICKS ON PAY BUTTON, WE ARE
 *   UPDATING ROOM'S BOOKED WEEKS AND ROOMS OBJECT IN localStorage
 *   SO THAT WHEN OWNER LOGS IN INTO HIS ACCOUNT AND PREVIEW HIS ROOM(S)
 *   HE WILL SEE BOOKED WEEK(S) IF HE HAS ANY
 *
 *   ALSO, WHEN OWNER IS IN edit_mode WHEN LOGGED INTO HIS ACCOUNT
 *   WE WILL DISPLAY  Block selected dates BUTTON INSTEAD OF Pay
 *   BUTTON, SO THAT
 *   HE WILL HAVE OPTION OF BLOCKING SOME WEEKS, IF HE NEEDS TO
 *   FOR EXAMPLE FOR PERSONAL REASONS...*/





export function render_booking_form ( room )
	{
		
		var booking_form = $ ( '#book_' + room.p_id );
		var room_types   = JSON.parse ( localStorage.getItem ( 'room_types' ) );
		
		booking_form.append ( `
			 <div class = "center-form" >
                        <form   id="bookings${ room.p_id }">
                      
                            <div class="row">
	                            <div class="col-md-6">
	                            <div class="bg_green text-light text-center  mt-1 ___" data-text="Room details">
	                            
								</div>
	                             <div class = "col-auto" >
	                             
                                <label class = "sr-only ___" for = "room_details${ room.p_id }" data-text="Room"></label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-city" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "room_details"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light ___"
                                           id = "room_details${ room.p_id }" data-placeholder = "Room"
                                           value = "${ decodeURI (room.p_address.property_name ) }
												${ room.p_address.property_name ? '|' : '' }
												${ room_types[ room.room_type ] }"
                                           required readonly >
                                </div >
                            </div >
                             <div class = "col-auto" >
                                <label class = "___" for = "weeks_${ room.p_id }" data-text="Week(s) booked" ></label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                           <i class="far fa-calendar-alt"></i>&nbsp;
                                        </div >
                                    </div >
                                    <input type = "text" name = "weeks"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "weeks_${ room.p_id }" placeholder = ""
                                           value = ""
                                           required readonly >
                                </div >
                            </div >
                            
                            
                             <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? 'd-none' : '' }" >
                                <label class = "___" for = "board_${ room.p_id }" data-text="Board"></label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                           <i class="far fa-calendar-alt"></i>&nbsp;
                                        </div >
                                    </div >
                                    <input type = "text" name = "board"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light
													"
                                           id = "board${ room.p_id }" placeholder = ""
                                           value = ""
                                           ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? '' : 'required' } readonly >
                                </div >
                            </div >
                            
                             <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? 'd-none' : '' }" >
                                <label class = "___" for = "total_price_${ room.p_id }" data-text="Total price"></label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                          <i class="far fa-credit-card"></i>
                                        </div >
                                    </div >
                                    <input type = "text" name = "total_price"
                                           class = "form-control form-control-sm  border_bottom_only bg_green_light"
                                           id = "total_price_${ room.p_id }" placeholder = ""
                                           value = ""
                                           ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? '' : 'required' } readonly >
                                           <span>EUR</span>
                                </div >
                            </div >
                            <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' )  && window.location.pathname !== '/index.html'? 'd-none' : '' }" >
                                <label class = "sr-only ___" for = "fullname${ room.p_id }" data-text="Full Name"></label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-user" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "name"
                                           class = "form-control form-control-sm border_bottom_only ___"
                                           id = "fullname${ room.p_id }" data-placeholder = "Full Name"
										${ sessionStorage.getItem ('edit_mode' ) && window.location.pathname !== '/index.html'? '' : 'required' } >
                                </div >
                            </div >
                            <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? 'd-none' : '' }" >
                                <label class = "sr-only ___" for = "email_of_user${ room.p_id }" data-text="Email"></label >
                                <div class = "input-group mb-2" >
                                    <div class = "input-group-prepend" >
                                        <div class = "input-group-text bg-transparent border_bottom_only" >
                                            <i class = "fas fa-at" ></i >
                                        </div >
                                    </div >
                                    <input type = "text" name = "email_of_user"
                                           class = "form-control form-control-sm  border_bottom_only"
                                           id = "email_of_user${ room.p_id }" placeholder = "Email"
											${ sessionStorage.getItem ('edit_mode' ) && window.location.pathname !== '/index.html' ? '' : 'required' } >
                                </div >
                            </div >
								</div>
								<div class="col-md-6">
								 <div class="bg_green text-light text-center mt-1 ___
											${ sessionStorage.getItem ('edit_mode' )  && window.location.pathname !== '/index.html'? 'd-none' : '' }"
											data-text="Payment details">
	          
								</div>
                             <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? 'd-none' : '' }" >
                        <label class = "sr-only ___" for = "card_holder_name${ room.p_id }" data-text="Card Holder Name"></label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "far fa-user" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm ___
							        			border_bottom_only" id = "card_holder_name${ room.p_id }" name = "card_holder_name"
                                   data-placeholder = "Card Holder Name" ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? ''
		                                                                                                      : 'required' } >
                        </div >
                    </div >
                    <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' )  && window.location.pathname !== '/index.html'? 'd-none' : '' }" >
                        <label class = "sr-only ___" for = "card_numder${ room.p_id }" data-text="Card Number" ></label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "far fa-credit-card" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm  border_bottom_only ___"
                                   id = "card_numder${ room.p_id }" data-placeholder = "Card Number" name = "card_number" ${ sessionStorage.getItem (
			'edit_mode' )  && window.location.pathname !== '/index.html' ? '' : 'required' } >
                        </div >
                    </div >
                    <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' ) && window.location.pathname !== '/index.html' ? 'd-none' : '' }" >
                        <label class = "sr-only ___" for = "cvv${ room.p_id }" data-text="CVV"></label >
                        <div class = "input-group mb-2" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" >
                                    <i class = "fas fa-credit-card" ></i >
                                </div >
                            </div >
                            <input type = "text" class = "form-control form-control-sm  border_bottom_only ___"
                                   id = "cvv${ room.p_id }" data-placeholder = "CVV"
									${ sessionStorage.getItem ('edit_mode' )  && window.location.pathname !== '/index.html'? '' : 'required' }  name = "cvv" >
                        </div >
                    </div >
                            <div class = "col-auto ${ sessionStorage.getItem ( 'edit_mode' )  && window.location.pathname !== '/index.html'? 'd-none' : '' }" >
                                <label class = "sr-only ___" for = "request_of_property${ room.p_id }" data-text="Property Request" ></label >
                                <div class = "input-group mb-2" >
                                    <textarea rows = "2" name = "request_of_property"
                                              class = "form-control form-control-sm form-control form-control-sm-lg border_bottom_only mb-2 ___"
                                              id = "request_of_property${ room.p_id }"
                                              data-placeholder = "Any Requests..."  ></textarea >
                                </div >
                            </div >
                            
                          
                            <div class = "col-auto text-center" >
                            <div id="loader_holder${ room.p_id }"></div>
    
                          
                             ${ window.location.pathname === '/index.html' ? `
								<a  class = "btn bg_green_light horizontally_aligned right-block ___ pay_for_booking"
								
								data-room_id="${ room.p_id }"
								 data-title="Submit & Pay"
								 data-text="Payment">
                                
                                </a >` : '' }
                            
                            ${ sessionStorage.getItem ( 'edit_mode' )  && window.location.pathname !== '/index.html' ? `<a  id="block_dates"
								 class = "btn bg_green_light horizontally_aligned right-block mt-2  ___ pay_for_booking"
								 data-room_id="${ room.p_id }"
								 data-blocking_dates= 1
								 data-title="Block selected dates"
								 data-text="Block selected dates">
                                
                                </a >` : '' }
                            
                              ${ ( sessionStorage.getItem ( 'preview_mode' ) || sessionStorage.getItem ( 'add_mode' ) )
		                         && window.location.pathname !== '/index.html'
		                         ?
		                         `	<div class="bg_green_light_g ___"
										data-text="Your future customers will be able to book your room through this form.">
									
									</div>`
		                         : '' }
                              
                            </div >
								</div>
        
							</div>
                        
                        
                        </form >
                    </div >
			` );
		
	}