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
                                <div class = "card-footer text-center bg-secondary text-light d-flex justify-content-around align-items-center" >
                                    <label for = "${room_types[ room_type ]}_bedroom"  class="text-capitalize">${room_types[ room_type ]} bedroom</label >
                                    <input id = "${room_types[ room_type ]}_bedroom" name = "room_type" type = "radio" value = "${room_type}"
                                            >
                                </div >
                            </div >
							` )
	}
}
function render_room_styles() {
	var room_styles_div = $( '#room_styles' );
	$('#room_styles_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="room_style_images" >
 										<strong>d) </strong>
                                    Select image your room will be displayed as. <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
                                </p >` );
	
	for ( let room_style in room_styles ) {
		room_styles_div.append( `

						<div class = "card col-md-2 text-center room_style_images d-none" >
                                <img  src="assets/images/bedrooms/b${room_styles[ room_style ]}.jpg" class = "form_image img-thumbnail"
                                     alt = "${room_styles[ room_style ]} bedroom image" >
                                <div class = "card-footer text-center bg-secondary text-light d-flex justify-content-around align-items-center" >
                                    <label for = "${room_styles[ room_style ]}_style"  class="text-capitalize">style #${room_styles[ room_style ]}</label >
                                    <input id = "${room_styles[ room_style ]}_style" name = "room_style" type = "radio" value = "${room_style}"
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
                                <div class = "card-footer text-center bg-secondary text-light d-flex justify-content-around align-items-center" >
                                    <label for = "${view_types[ view_type ]}" class="text-capitalize">${view_types[ view_type ]}</label >
                                    <input id = "${view_types[ view_type ]}" name = "view_type" type = "radio" value = ${view_type}
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
function render_board_types() {
	var board_types_div = $( '#board_types' );
	for ( let board_type in board_types ) {
		board_types_div.append( `

						 <div class = "card col-md-3  text-center board_type_images d-none" >
                            <img src="assets/images/board_types/${board_type}.jpg" class = "form_image img-thumbnail"
                                 alt = "${board_types[board_type]} image" >
                            <div class = "card-footer text-center bg-secondary text-light" >
                                <label for = "${board_types[board_type]}"  class="text-capitalize">${board_types[board_type]}</label >
                            </div >
                            <div class = "card-footer text-center  d-flex justify-content-around align-items-center"  id="board_type_${board_type}">
                            
                                <input id = "${board_types[board_type]}" class="board_type" name = "board_type_${board_type}"
                                type = "checkbox"
                                value = "${board_type}"
                                data-board_type="${board_type}"
                                 >
                                
                                
                              
                            </div >
                        </div >
							` )
	}
	$('#board_types_title').append( ` <p class = "card-text p-2 show_content" data-hidden_class="board_type_images" >
 													<strong>c) </strong>
                                      Select the board basis you can provide for your guests.
                                       <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
        
                                </p >` )
	
}

function render_amenities() {
	var amenities_div = $( '#amenities' );
	for ( let amenity in amenities ) {
		amenities_div.append( `

						 <div class = "card col-md-4 text-center amenities d-none" >
                            
                            <div class = "card-footer text-center bg-secondary text-light" >
                                <label for = "${amenities[amenity]} "  class="text-capitalize">${amenities[amenity]}</label >
                            </div >
                            <div class = "card-footer text-center  d-flex justify-content-around align-items-center" >
                                <input id = "${amenities[amenity]}" name = "amenities" type = "checkbox" value = "${amenity}"  >
                               
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


render_room_types();
render_view_types();
render_room_styles();
render_board_types();
render_amenities();