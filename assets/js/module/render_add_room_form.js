import { room_types, board_types, room_styles, view_types, amenities} from './inventory.js';



function render_room_types() {
	var room_types_div = $( '#room_types' );
	
	
	$('#room_types_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="room_type_images" >
 										<strong>a) </strong>
                                    Select your room type. <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
                                    <span class="d-none d-md-block float-right">Click on any image to enlarge it !</span>
                                </p >` );
	
	for ( let room_type in room_types ) {
		room_types_div.append( `

						<div class = "card col-md-2  room_type_images " >
                                <img  src="assets/images/room_types/${room_types[ room_type ]}.jpg" class = "form_image img-thumbnail"
                                     alt = "${room_types[ room_type ]} bedroom image"  >
                               
                                            
                                <div class = "card-footer text-center bg-secondary text-light d-flex justify-content-around align-items-center room_type" id="room_type_${room_type}">
                                    <label for = "${room_types[ room_type ]}"  class="text-capitalize">${room_types[ room_type ]}  bedroom</label >
                                    <input id = "${room_types[ room_type ]}" name = "room_type" type = "radio" value = "${room_type}"  class="collapse_parent check"
                                    data-parent_div="room_type_images"
                                     data-parent_title="room_types_title"
                                     data-next_div="view_type_images"
                                     data-footer="room_type_${room_type}"
                                      data-type="room_type"
                                            >
                                </div >
                            </div >
							` )
	}
}

function render_view_types() {
	var view_types_div = $( '#view_types' );
	for ( let view_type in view_types ) {
		view_types_div.append( `

						<div class = "card col-md-2  text-center view_type_images d-none" >
                                <img  src="assets/images/views/${view_types[ view_type ]}.jpg" class = "form_image img-thumbnail"
                                     alt = "${view_types[ view_type ]} view" >
                               
                                            <div class = "card-footer text-center bg-secondary text-light d-flex justify-content-around align-items-center view_type" id="view_type_${view_type}">
                                    <label for = "${view_types[ view_type ]}"  class="text-capitalize">${view_types[ view_type ]}</label >
                                    <input id = "${view_types[ view_type ]}" name = "view_type" type = "radio" value = "${view_type}"  class="collapse_parent check"
                                    data-parent_div="view_type_images"
                                     data-parent_title="view_types_title"
                                     data-next_div="room_style_images"
                                     data-footer="view_type_${view_type}"
                                      data-type="view_type"
                                            >
                                </div >
                            </div >
							` )
	}
	$('#view_types_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="view_type_images" >
 											<strong>b) </strong>
                                    Select the view type your room has. <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
        
                                </p >` )
	
}
function render_room_styles() {
	var room_styles_div = $( '#room_styles' );
	$('#room_styles_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="room_style_images" >
 										<strong>c) </strong>
                                    Select image your room will be displayed as. <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
                                </p >` );
	
	for ( let room_style in room_styles ) {
		room_styles_div.append( `

						<div class = "card col-md-2 text-center room_style_images d-none" >
                                <img  src="assets/images/bedrooms/b${room_styles[ room_style ]}.jpg" class = "form_image img-thumbnail"
                                     alt = "${room_styles[ room_style ]} bedroom image" >
                                <div class = "card-footer text-center bg-secondary text-light d-flex justify-content-around align-items-center room_style" id="room_style_${room_style}">
                                    <label for = "${room_styles[ room_style ]}"  class="text-capitalize">style #${room_styles[ room_style ]}</label >
                                    <input id = "${room_styles[ room_style ]}" name = "room_style" type = "radio" value = "${room_style}"  class="collapse_parent check"
                                    data-parent_div="room_style_images"
                                     data-parent_title="room_styles_title"
                                     data-next_div="board_type_images"
                                     data-footer="room_style_${room_style}"
                                      data-type="room_style"
                                            >
                                </div >
                            </div >
							` )
	}
}

function render_board_types() {
	var board_types_div = $( '#board_types' );
	for ( let board_type in board_types ) {
		board_types_div.append( `

						 <div class = "card col-md-3  text-center board_type_images d-none" >
                            <img src="assets/images/board_types/${board_type}.jpg" class = "form_image img-thumbnail"
                                 alt = "${board_types[board_type]} image" >
                            <div class = "card-footer text-center bg-secondary text-light board_type_${board_type}" id="board_type_${board_type}">
                                <label for = "${board_types[board_type]}"  class="text-capitalize">${board_types[board_type]}</label >
                            </div >
                            <div class = "card-footer text-center  d-flex justify-content-around align-items-center "  >
                            
                                <input id = "board_${board_type}"   class="board_type check" name = "board_type_${board_type}"
                                type = "checkbox"
                             
                                data-type="board"
                                data-board_type="${board_type}"
                                data-parent_title="board_types_title"
                                data-footer="board_type_${board_type}"
                                 >
                                
                                
                              
                            </div >
                        </div >
							` )
	}
	$('#board_types_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="board_type_images" >
 													<strong>d) </strong>
                                      Select the board basis you can provide for your guests.
                                       <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
        
                                </p >` )
	
}

function render_amenities() {
	var amenities_div = $( '#amenities' );
	for ( let amenity in amenities ) {
		amenities_div.append( `

						 <div class = "card col-md-4 text-center amenities d-none" >
                            
                            <div class = "card-footer text-center bg-secondary text-light amenity${amenity}" id="amenity${amenity}" >
                                <label for = "${amenities[amenity]} "  class="text-capitalize">${amenities[amenity]}</label >
                            </div >
                            <div class = "card-footer text-center  d-flex justify-content-around align-items-center " >
                                <input id = "${amenities[amenity]}" class="amenity_type check" name = "amenities" type = "checkbox" value="${amenity}"
                                  data-type="amenity"
                                 data-parent_title="amenities_title"
                                 data-footer="amenity${amenity}"
                                 >
                               
                            </div >
                        </div >
							` )
	}
	$('#amenities_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="amenities" >
 													<strong>e) </strong>
                                      Select the amenities you can provide for your guests.
                                       <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
        
                                </p >` )
	
}
function render_description() {
	var description_div = $( '#description' );
	
	description_div.append( `

						  <div class = "input-group mb-2 description d-none" >
                            <div class = "input-group-prepend" >
                                <div class = "input-group-text bg-transparent border_bottom_only" title="Write description of your room, max 300 characters." >
                                    <i class="fas fa-feather-alt"></i>
                                    <br >
                                    <span id="room_description_length">300</span>
                                </div >
                            </div >
                           
                      
                            <textarea name = "description" form = "add_your_room" maxlength="300" oninput="countChars()" rows="4"
                                      class = "form-control " id = "room_description"
                                     
                                      required >
                               
                            </textarea >
                            
                           
                        </div >
							` );
	
	$('#description_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="description" >
 													<strong>f) </strong>
                                      <label class = "" for = "room_description" >Describe your room, make it attractive (max 300 characters)</label >
         								<i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
                                </p >` )
	
}

render_room_types();
render_view_types();
render_room_styles();
render_board_types();
render_amenities();
render_description();