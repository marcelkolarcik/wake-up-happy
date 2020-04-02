/*FUNCTION TO RENDER:
 1.  ROOM WITH ROOM IMAGE ,
 2.  STARTING BOARD TYPE AND PRICE =>
 FROM ${ room.price[ Object.keys ( room.price )[ 0 ] ]} EUR per week
 3.  ROOM NAME
 4.  ROOM DESCRIPTION
 5. TABS AND DIVS TO DISPLAY about,gallery, amenities, availability, booking form*
 
 6. IF OWNER IS LOGGED IN AND PREVIEWING ROOM IN edit_mode =>
 WE WILL DISPLAY BUTTON How to block dates,
 THAT WILL FIRE ALERT WITH INFORMATION HOW TO BLOCK DATES
 FOR WHEN HE WANTS TO BLOCK SOME WEEKS FOR HIMSELF...*/


/*function render_room ( room, where, preview = false )
 *
 * room => CURRENT ROOM
 * where => DIV INTO WHICH TO RENDER THE ROOM :
 *          TWO POSSIBLE OPTIONS :
 *               1.  SEARCH RESULTS AND FEATURED PROPERTIES ARE RENDERED UNDER
 *                   SEARCH FORM AND MAP
 *
 *               2.  IF USER CLICKS ON more BUTTON ON THE POPUP IN THE MAP AFTER
 *                   CLICKING ON ROOM MARKER IN THE MAP WE WILL RENDER
 *                   ROOM ABOVE SEARCH FORM AND MAP, BECAUSE ON MOBILE DEVICES
 *                   ROOM WOULDN'T BE IN IMMEDIATE VIEW, BUT UNDER MAP...
 * preview => IF OWNER IS LOGGED*/
import { translate } from "./translator/translator.js";


export function render_room ( room, where, preview = false )
	{
		
		var where_div = $ ( '#' + where );

//	IF OWNER IS  ADDING NEW ROOM AND HE CLICKS ON PREVIEW
// WE CREATE AND RENDER CURRENTLY CREATED ROOM INTO DIV
//
// AND THEN IF HE GOES AND EDIT SOME FEATURES OF THE ROOM AND
// CLICKS ON PREVIEW AGAIN , WE WOULD APPEND NEWLY UPDATED ROOM ,
// INTO THE SAME DIV, SO WE COULD END UP WITH MULTIPLE DIFFERENT RENDERS / VERSIONS
// OF THE ROOM. AS MANY AS MANY TIMES OWNER PREVIEW NEWLY UPDATED ROOM
// SO WE JUST EMPTY THE DIV BEFORE RENDERING UPDATED ROOM TO AVOID THAT
		if ( preview ) where_div.html ( '' );
		
		
		var room_types = JSON.parse ( localStorage.getItem ( 'room_types' ) );
		
		where_div.append ( `

<div class = "card mb-3 mt-3" >
    <div class = "row no-gutters" >
        <div class = "col-md-4 vertically_aligned img-thumbnail" id="property_img">
       
            <img src = "assets/images/bedrooms/b${ room.room_style }.jpg" class = "card-img room_img" alt = "property image" >
          
            <h6 class = "bg_green text-light p-2 mt-2 text-center" >
			<span class="___" data-text="from"></span>
			${ room.price[ Object.keys ( room.price )[ 0 ] ] }&nbsp;EUR <!--getting first available price to display form-->
                <small class="___" data-text="per week"></small >
            </h6 >
             <span class=" d-md-none  text-capitalize"  >
					<h4 class="ml-2 nav_link_property">
			${ decodeURI ( room.p_address.property_name ) } | ${ decodeURI (
			room.location ) } | ${ room_types[ room.room_type ] }
                    </h4>
             </span >
             <span class="d-md-none ml-2" id="mobile_${room.p_id}">
              ${ decodeURI ( room.p_description ).substring ( 0, 30 ) }...
              </span>
             
              <!--ON MOBILE DEVICES WE WILL DISPLAY SHORTER VERSION OF THE ROOM AND more... / less... BUTTON
              TO SHOW / HIDE FULL PREVIEW-->
              <span class=" btn btn-sm bg_green text-light d-md-none float-right mr-3 show_tabs ___ more_${ room.p_id}"
			data-title="Display more info..."
			data-text="more..."
			 data-p_id="${ room.p_id }"
			></span>
			
			 <span class=" btn btn-sm bg_green text-light d-md-none float-right mr-3 show_tabs ___ d-none less_${ room.p_id}"
			data-title="Display less info..."
			data-text="less..."
			 data-p_id="${ room.p_id }"
			></span>
        </div >
        <div class = "col-md-8 d-none d-md-block parent" id="tabs_${ room.p_id }" style = "position:relative" >
            <div class = "list-group  list-group-horizontal-lg tabs"  role = "tablist" >
            
                <a class = "list-group-item list-group-item-action active nav_link_property ___"
                   data-toggle = "list" href = "#about_${ room.p_id }" role = "tab"
                   data-title = "Information about room" id="about" data-text="About" ></a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property ___"
                   data-toggle = "list" href = "#gallery_${ room.p_id }" role = "tab"
                   data-title = "Preview images of the property"
                   data-text="Gallery"></a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property ___"
                   data-toggle = "list" href = "#amenities_${ room.p_id }" role = "tab"
                   data-title = "See the amenities"
                   data-text="Amenities">
                   </a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property ___"
                   data-toggle = "list" href = "#availability_${ room.p_id }" role = "tab"
                   
                   data-title = "Preview the availability" id="#availability_${ room.p_id }"
                   data-text="Availability"></a >
                   
                <a class = "list-group-item list-group-item-action nav_link_property ___"
                    id="book_btn${room.p_id}"
                   data-toggle = "list" href = "#book_${ room.p_id }" role = "tab"
                   data-title = "Book your room !"
                   data-text="Book">
                   </a >
                  
                   
            </div >
            <div class = "tab-content" >
                <div class = "tab-pane active " id = "about_${ room.p_id }" role = "tabpanel" >
                 <div id="save_changes" class="float-right"></div>
                    <div class = "card-body " >
                        	<span class="pl-2 d-none d-md-block text-capitalize" >
											<h4 class="nav_link_property">
						${ decodeURI ( room.p_address.property_name ) } | ${ decodeURI (
			room.location ) } | ${ room_types[ room.room_type ] }
                                             </h4>
             				</span >
                        <p class = "card-text" >${ decodeURI ( room.p_description ) }</p >
                    </div >
                  
                  <!--ONLY SHOWING SHOW ON THE MAP ON index.html AND NOT ON owner.html-->
                    <span class="btn btn-sm bg_green text-light float-right mr-3 show_on_map ___
                 
						${ window.location.pathname === '/index.html' ? '' : 'd-none' }"
						data-title="Show room on the map..."
						data-lat="${ room.lat }"
						data-lng="${ room.lng }"
						data-p_id="${ room.p_id }"
						data-text="show on map"
						></span>
						
				
					<div class="child_at_bottom d-flex justify-content-center" id="address${ room.p_id }"></div>
					
					
                </div >
                <div class = "tab-pane images carousel slide text-center" id = "gallery_${ room.p_id }" role = "tabpanel" data-ride="carousel"></div>
                <div class = "tab-pane" id = "availability_${ room.p_id }" role = "tabpanel" >
                 <div class = "col-md-12" >
	                    <div class="row">
		                   
		                   
							<div class="card col-md-12">
								<div class="card-header p-0 bg-transparent">
								<span class="___" data-text="Boards"></span>
								
								<!--IF OWNER IS LOGGED IN AND IN edit_mode WE WILL DISPLAY  How to block weeks ?
								 THAT WILL FIRE POPUP WITH INFO HOW TO BLOCK WEEKS FOR HIMSELF...-->
                                   ${ sessionStorage.getItem ( 'edit_mode' )  && window.location.pathname !== '/index.html'? `

 									<button class = "btn btn-sm bg-danger text-light horizontally_aligned right-block float-right ___ "
 									id="how_to_block_dates"
 									data-title="Block selected dates"
 									data-text="How to block weeks ?">
                                
                                </button >` : '' }
								</div>
							 	<div id="boards_${ room.p_id }" class="col p-0"></div>
							 	 <div class = "row pl-3 pr-3 pt-1 pb-1 " id = "bookings_${ room.p_id }" > </div >
          
							 	<div class="card-footer bg-transparent">
							 	    <span class = "nav_link_property ___"
							 	     data-text="Select board and the week(s) and click on">
		                        </span >
		                         <strong
		                                    class = "bold" ><span class="___ nav_link_property img-thumbnail pl-2 pr-2 bg_green text-light" data-text="BOOK"></span></strong >
		                        <span class="___" data-text="button"></span>
		                        
		                        </div>
							</div>
							
						</div>
                    
                    </div >
                   
                   
                </div >
                <div class = "tab-pane" id = "amenities_${ room.p_id }" role = "tabpanel" ></div >
                <div class = "tab-pane" id = "book_${ room.p_id }" role = "tabpanel" ></div >
            </div >
        </div >
    </div >
</div >
` );
	
	
	}


$ ( document ).on ( 'click', '.tabs', function (){
	/*SCROLLING TO THE TAB-PANE*/
	$('.tabs').get(0).scrollIntoView();
});
// ALERT FOR USER TO SHOW, HOW TO BLOCK DATES
$ ( document ).on ( 'click', '#how_to_block_dates', function ()
{
	swal.fire ( {
		           
		
		            html              : `
				<h4 class="___" data-text="How to block weeks ?"></h4>
				<div class = "col-auto" >
				<p class="___" data-text="1) Select any board"></p>
		      	<p class="___" data-text="2) Select the weeks you want to block."> </p>
		      	<p class="___" data-text="3) Click on"> </p><strong class="nav_link_property"><span class="___" data-text="BOOK"></span></strong>
		      	<br>
		      	<p class="___" data-text="Click on"> &nbsp;
           			
                 </p>
                 <button  class = "btn bg_green_light horizontally_aligned right-block ___"
           			         data-title="Block selected dates"
           			         data-text="Block selected dates">
                       
                     </button >
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
		            showConfirmButton : false
	            } );
	translate();
	return false;
} );
//ON MOBILE DEVICES, more..., less... BUTTON TO SHOW / HIDE TABS TO PREVIEW ROOM
$ ( document ).on ( 'click', '.show_tabs', function ()
{
	var p_id = $ ( this ).data ( 'p_id' );
	
	
	/*SWITCHING BUTTON'S  AND CHANGING COLOR OF THE BUTTON WHEN CLICKING ON more.../ less...*/
	if($ ( this ).data ('text') ===  'more...')
		{
			$ ( '.less_'+p_id ).removeClass('d-none').addClass ( 'bg-danger' );
			$ ( '.more_'+p_id ).addClass('d-none');
		}
	else
		{
			$ ( '.more_'+p_id ).removeClass('d-none');
			$ ( '.less_'+p_id ).addClass('d-none').removeClass ( 'bg-danger' );
		}
	
	$ ( '#tabs_' + p_id ).toggleClass ( 'd-none d-md-block' );
	
	$('#mobile_'+p_id).get(0).scrollIntoView();
	
} );





