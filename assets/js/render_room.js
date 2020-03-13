
export function render_room ( room, image_id, where, preview = false ) {
	//var where_div = '#' + where;
	var where_div = $ ( '#' + where );
//	IF USER IS CLICKING BACK AND FORTH,WHILE ADDING NEW ROOM, WE WOULD APPEND SAME THING MULTIPLE TIMES, SO WE JUST
// EMPTY THE DIV BEFORE APPENDING...
	if ( preview ) where_div.html ( '' );

//	counter = 0;
	var room_types = JSON.parse ( localStorage.getItem ( 'room_types' ) );
	
	where_div.append ( `

<div class = "card mb-3 mt-3" >
    <div class = "row no-gutters" >
        <div class = "col-md-4 vertically_aligned img-thumbnail" id="property_img">
       
            <img src = "assets/images/bedrooms/b${room.room_style}.jpg" class = "card-img room_img" alt = "property image" >
            <h6 class = "bg_green text-light p-2 mt-2 text-center" >
			from	${ room.price[ Object.keys ( room.price )[ 0 ] ]}&nbsp;EUR <!--getting first available price to display form-->
                <small >per week</small >
            </h6 >
             <span class=" d-md-none  text-capitalize"  >
					<h4 class="ml-2 nav_link_property">
			${  decodeURI ( room.p_address.property_name ) } | ${ decodeURI ( room.location ) } | ${room_types[ room.room_type ]}
                    </h4>
             </span >
             <span class="d-md-none ml-2">
             <!--to keep two spans on one line ...-->
              ${   decodeURI ( room.p_description ).substring ( 0, 30 ) }...
              </span>
              <!---->
              <span class="display_tabs btn btn-sm bg_green text-light d-md-none float-right mr-3 show_tabs"
			title="Display more info..." data-p_id="${room.p_id}"
			>more...</span>
        </div >
        <div class = "col-md-8 d-none d-md-block parent" id="tabs_${room.p_id}" style = "position:relative" >
            <div class = "list-group  list-group-horizontal-lg"  role = "tablist" >
            
                <a class = "list-group-item list-group-item-action active nav_link_property "
                   data-toggle = "list" href = "#about_${room.p_id}" role = "tab"
                   title = "Informations about room" id="about" >About</a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#gallery_${room.p_id}" role = "tab"
                   title = "Preview images of the property" >Gallery</a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#amenities_${room.p_id}" role = "tab"
                   title = "See the amenities" >Amenities</a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#availability_${room.p_id}" role = "tab"
                   title = "Preview the availability" id="availability" >Availability</a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property "
                   data-toggle = "list" href = "#book_${room.p_id}" role = "tab" title = "Book your room !" >Book
                   <div class="bg_green text-light p-1" id="preview_total_price_${room.p_id}"></div></a >
                   
            </div >
            <div class = "tab-content" >
                <div class = "tab-pane active " id = "about_${room.p_id}" role = "tabpanel" >
                 <div id="save_changes" class="float-right"></div>
                    <div class = "card-body " >
                        	<span class="pl-2 d-none d-md-block text-capitalize" >
											<h4 class="nav_link_property">
						${  decodeURI ( room.p_address.property_name ) || decodeURI ( room.p_address.city )}  | ${room_types[ room.room_type ]}
                                             </h4>
             				</span >
                        <p class = "card-text" >${  decodeURI ( room.p_description )}</p >
                    </div >
                  
                    <span class="btn btn-sm bg_green text-light float-right mr-3 show_on_map   ${window.location.pathname === '/index.html' ? '' : 'd-none'}"
						title="Show room on the map..."
						data-lat="${room.lat}" data-lng="${room.lng}" data-p_id="${room.p_id}"
						>show on map</span>
						
				
					<div class="child_at_bottom d-flex justify-content-center" id="address${room.p_id}"></div>
					
					
                </div >
                <div class = "tab-pane images carousel slide text-center" id = "gallery_${room.p_id}" role = "tabpanel" data-ride="carousel"></div>
                <div class = "tab-pane" id = "availability_${room.p_id}" role = "tabpanel" >
                 <div class = "col-md-12" >
	                    <div class="row">
		                   
		                   
							<div class="card col-md-12">
								<div class="card-header p-0 bg-transparent">
								Boards
								
                                   ${sessionStorage.getItem ( 'edit_mode' ) ? `

 									<button class = "btn btn-sm bg-danger text-light horizontally_aligned right-block float-right "
 									id="how_to_block_dates" title="Block selected dates">
                                   How to block weeks ?
                                </button >` : ''}
								</div>
							 	<div id="boards_${room.p_id}" class="col p-0"></div>
							 	 <div class = "row pl-3 pr-3 pt-1 pb-1 " id = "bookings_${room.p_id}" > </div >
          
							 	<div class="card-footer bg-transparent"> <span class = "nav_link_property" >Select board and the week(s) and  click on <strong
		                                    class = "bold" >BOOK</strong > button
		                        </span >
		                        </div>
							</div>
							
						</div>
                    
                    </div >
                   
                   
                </div >
                <div class = "tab-pane" id = "amenities_${room.p_id}" role = "tabpanel" ></div >
                <div class = "tab-pane" id = "book_${room.p_id}" role = "tabpanel" ></div >
            </div >
        </div >
    </div >
</div >
` );
	

	
}

// ALERT FOR USER TO SHOW, HOW TO BLOCK DATES
$ ( document ).on ( 'click', '#how_to_block_dates', function () {
	swal.fire({
		          title   : 'How to block some weeks.',
		
		          html             : `
				<div class = "col-auto" >
				<p>1) Select any board</p>
		      	<p>2) Select the weeks you want to block. </p>
		      	<p>3) Click on <strong class="nav_link_property">BOOK</strong></p>
		      	<p>4) Click on &nbsp;
           			<button  class = "btn bg_green_light horizontally_aligned right-block " title="Block selected dates">
                                   Block selected dates
                     </button >
                 </p>
		      	 <hr class="bg_green">
		      
		        </div >
		       
		         <div class = "col-auto text-center" >
           			
           			<br>
           			<br>
		            <a  class = "btn btn-sm bg_green text-light pl-3 pr-3" id="ok" onclick="swal.close()"
		                    title = "ok" >
		               ok
		            </a >
        		</div >
        		
		`,
		          showConfirmButton: false
	          });
	return false;
});
//ON MOBILE DEVICES, more... BUTTON TO SHOW TABS TO PREVIEW ROOM
$ ( document ).on ( 'click', '.show_tabs', function () {
	var p_id = $ ( this ).data ( 'p_id' );
	$ ( '#tabs_' + p_id ).toggleClass ( 'd-none d-md-block' );
} );




