/*FUNCTION TO RENDER ROOMS IMAGES GALLERY
 *
 * PRESENTING:
 *
 *   1.  IMAGE THAT ROOM IS DISPLAYED AS assets/images/bedrooms/b${image_id}.jpg
 *   2.  IMAGE OF THE VIEW TYPE OF THE room
 *   3.  NUMBER OF IMAGES OF FOOD ITEMS REPRESENTING BOARD TYPE:
 *
 *       a.  0 IMAGES => ROOM ONLY
 *       B.  1 IMAGE =>  B&B
 *       c.  2 IMAGES => B&D
 *       d.  3 IMAGES => ALL INCLUSIVE
 * */


export function render_gallery ( room )
	{
		
		var views   = JSON.parse ( localStorage.getItem ( 'views' ) );
		var gallery = $ ( '#gallery_' + room.p_id );
		
		var indicators = `<a class="carousel-control-prev" href="${ '#gallery_' + room.p_id }" role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only ___" data-text="Previous"></span>
			  </a>
			  <a class="carousel-control-next" href="${ '#gallery_' + room.p_id }" role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only ___" data-text="Next"></span>
			  </a>`;
		
		var room_view = `<div class="carousel-item active" >
			      <img src="assets/images/views/${ views[ room.p_view ] }.jpg" class="d-block w-100" alt="room view image" >
			      <div class="carousel-caption ">
			        <h5 class="images caption ___"
			        data-text=":view_type view"
			        data-view_type="${ views[ room.p_view ] }"> </h5>
			      </div>
			      
		    </div>`;
		
		var room_style = ` <div class="carousel-item ">
			      <img src="assets/images/bedrooms/b${ room.room_style }.jpg" class="d-block w-100" alt="bedroom image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption ___" data-text="bedroom"></h5>
			      </div>
		    </div>`;
		
		var breakfast = `<div class="carousel-item " >
			      <img src="assets/images/breakfast/br_${ room.food_id || 1 }.jpg" class="d-block w-100" alt="breakfast image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption ___" data-text="breakfast"></h5>
			       
			      </div>
		    </div>`;
		
		var lunch = ` <div class="carousel-item " >
			      <img src="assets/images/lunch/l_${ room.food_id || 1 }.jpg" class="d-block w-100" alt="lunch image" >
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption ___" data-text="lunch"></h5>
			       
			      </div>
		    </div>`;
		
		var dinner = `<div class="carousel-item " >
			      <img src="assets/images/dinner/d_${ room.food_id || 1 }.jpg" class="d-block w-100" alt="dinner image" >
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption ___" data-text="dinner"></h5>
			       
			      </div>
		    </div>`;
		
		
		var slide_to_0 = ` <li data-target="${ '#gallery_'
		                                       + room.p_id }" data-slide-to="0" class="active" ></li>`;
		var slide_to_1 = ` <li data-target="${ '#gallery_' + room.p_id }" data-slide-to="1"  ></li>`;
		var slide_to_2 = ` <li data-target="${ '#gallery_' + room.p_id }" data-slide-to="2"  ></li>`;
		var slide_to_3 = ` <li data-target="${ '#gallery_' + room.p_id }" data-slide-to="3"  ></li>`;
		
		/*IF IT IS B&D  WE ARE NOT DISPLAYING LUNCH SLIDE AND LAST SLIDE IS NUMBER 3*/
		var slide_to_4 = ` <li data-target="${ '#gallery_' + room.p_id }" data-slide-to="${ '3' in room.price ? 4
		                                                                                                      : 3 }"  ></li>`;
		
		//		All Inclusive
		if ( '3' in room.price )
			{
				gallery.append ( `
  			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			  <ol class="carousel-indicators">
		              ${ slide_to_0 }
		              ${ slide_to_1 }
		              ${ slide_to_2 }
		              ${ slide_to_3 }
		              ${ slide_to_4 }
			  </ol>
			  
					${ room_view }
					
					${ room_style }
				   
				    ${ breakfast }
				    
				    ${ lunch }
				    
				    ${ dinner }
				    
				    ${ indicators }
			</div>
		    <!--end of carousel-->
			
			
			` );
			}
//		Breakfast & Dinner
		else if ( '2' in room.price )
			{
				gallery.append ( `
			
			
			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			   <ol class="carousel-indicators">
			      ${ slide_to_0 }
	              ${ slide_to_1 }
	              ${ slide_to_2 }
	              ${ slide_to_4 }
  			 </ol>
			  
					${ room_view }
					
					${ room_style }
				   
				    ${ breakfast }
				    
				    ${ dinner }
				    
				    ${ indicators }
		    <!--end of carousel-->
			` );
			}
		//		Bed & Breakfast
		else if ( '1' in room.price )
			{
				gallery.append ( `
			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			   <ol class="carousel-indicators">
			      ${ slide_to_0 }
	              ${ slide_to_1 }
	              ${ slide_to_2 }
	           </ol>
			  
			${ room_view }
			
			${ room_style }
		   
		    ${ breakfast }
		    
		    ${ indicators }
		    <!--end of carousel-->
			` );
			}
		//	room only
		else if ( '0' in room.price )
			{
				gallery.append ( `
			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			   <ol class="carousel-indicators">
			   	  ${ slide_to_0 }
	              ${ slide_to_1 }
	          </ol>
			  
			${ room_view }
			
			${ room_style }
		    
		    ${ indicators }
		    <!--end of carousel-->
				` );
			}
		
		
	}