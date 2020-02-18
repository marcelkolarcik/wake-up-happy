function render_gallery(property,food_id,image_id)
{
	
	var views = JSON.parse( localStorage.getItem('views') );
	var gallery = $('#gallery_'+property.p_id);
	
	//console.log(('1' in property.price),property.price,Object.values(property.price), Object.keys(property.price), typeof(property.price))
	//		All Inclusive
 if ('3' in property.price  ) {
	gallery.append(`
  			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			   <ol class="carousel-indicators">
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="0" class="active"></li>
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="1"></li>
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="2"></li>
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="3"></li>
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="4"></li>
			  </ol>
			  
			<div class="carousel-item active" >
			      <img src="assets/images/views/${views[property.p_view]   }.jpg" class="d-block w-100" alt="property view image" >
			      <div class="carousel-caption ">
			        <h5 class="images caption">${views[property.p_view]} view</h5>
			       
			      </div>
		    </div>
		    <div class="carousel-item ">
			      <img src="assets/images/bedrooms/b${image_id}.jpg" class="d-block w-100" alt="bedroom image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">bedroom</h5>
			       
			      </div>
		    </div>
		     <div class="carousel-item " >
			      <img src="assets/images/breakfast/br_${food_id}.jpg" class="d-block w-100" alt="breakfast image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">breakfast</h5>
			       
			      </div>
		    </div>
		     <div class="carousel-item " >
			      <img src="assets/images/lunch/l_${food_id}.jpg" class="d-block w-100" alt="lunch image" >
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">lunch</h5>
			       
			      </div>
		    </div>
		    
		    <div class="carousel-item " >
			      <img src="assets/images/dinner/d_${food_id}.jpg" class="d-block w-100" alt="dinner image" >
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">dinner</h5>
			       
			      </div>
		    </div>
		     <a class="carousel-control-prev" href=${'#gallery_'+property.p_id} role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href=${'#gallery_'+property.p_id} role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
		    <!--end of carousel-->
			
			
			`);
}
//		Breakfast & Dinner
	else if ('2' in property.price  ) {
		gallery.append(`
			
			
			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			   <ol class="carousel-indicators">
			    <li data-target=${'#gallery_' + property.p_id} data-slide-to="0" class="active"></li>
			    <li data-target=${'#gallery_' + property.p_id} data-slide-to="1"></li>
			    <li data-target=${'#gallery_' + property.p_id} data-slide-to="2"></li>
			    <li data-target=${'#gallery_' + property.p_id} data-slide-to="3"></li>
			   
			  </ol>
			  
			<div class="carousel-item active" >
			      <img src="assets/images/views/${views[property.p_view]}.jpg" class="d-block w-100" alt="property view image" >
			      <div class="carousel-caption ">
			        <h5 class="images caption">${views[property.p_view]} view</h5>
			       
			      </div>
		    </div>
		    <div class="carousel-item ">
			      <img src="assets/images/bedrooms/b${image_id}.jpg" class="d-block w-100" alt="bedroom image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">bedroom</h5>
			       
			      </div>
		    </div>
		     <div class="carousel-item " >
			      <img src="assets/images/breakfast/br_${food_id}.jpg" class="d-block w-100" alt="breakfast image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">breakfast</h5>
			       
			      </div>
		    </div>
		   
		    
		    <div class="carousel-item " >
			      <img src="assets/images/dinner/d_${food_id}.jpg" class="d-block w-100" alt="dinner image" >
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">dinner</h5>
			       
			      </div>
		    </div>
		     <a class="carousel-control-prev" href=${'#gallery_'+property.p_id} role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href=${'#gallery_'+property.p_id} role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
		    <!--end of carousel-->
			`);
	}
	//		Bed & Breakfast
	else if('1' in property.price )
	{
		gallery.append(`
			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			   <ol class="carousel-indicators">
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="0" class="active"></li>
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="1"></li>
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="2"></li>
			  
			  </ol>
			  
			<div class="carousel-item active" >
			      <img src="assets/images/views/${views[property.p_view]}.jpg" class="d-block w-100" alt="property view image" >
			      <div class="carousel-caption ">
			        <h5 class="images caption">${views[property.p_view]} view</h5>
			       
			      </div>
		    </div>
		    <div class="carousel-item ">
			      <img src="assets/images/bedrooms/b${image_id}.jpg" class="d-block w-100" alt="bedroom image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">bedroom</h5>
			       
			      </div>
		    </div>
		     <div class="carousel-item " >
			      <img src="assets/images/breakfast/br_${food_id}.jpg" class="d-block w-100" alt="breakfast image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">breakfast</h5>
			       
			      </div>
		    </div>
		    
		     <a class="carousel-control-prev" href=${'#gallery_'+property.p_id} role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href=${'#gallery_'+property.p_id} role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
		    <!--end of carousel-->
			`);
	}
	//	room only
 else if('0' in property.price)
	{
		gallery.append(`
			<!--carousel-->
  			 <div class="images carousel-inner" >
  			 
  			   <ol class="carousel-indicators">
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="0" class="active"></li>
			    <li data-target=${'#gallery_'+property.p_id} data-slide-to="1"></li>
			   
			  </ol>
			  
			<div class="carousel-item active" >
			      <img src="assets/images/views/${views[property.p_view]}.jpg" class="d-block w-100" alt="property view image" >
			      <div class="carousel-caption ">
			        <h5 class="images caption">${views[property.p_view]} view</h5>
			       
			      </div>
		    </div>
		    <div class="carousel-item ">
			      <img src="assets/images/bedrooms/b${image_id}.jpg" class="d-block w-100" alt="bedroom image">
			      <div class="carousel-caption d-none d-md-block">
			        <h5 class="images caption">bedroom</h5>
			       
			      </div>
		    </div>
		    
		     <a class="carousel-control-prev" href=${'#gallery_'+property.p_id} role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href=${'#gallery_'+property.p_id} role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
		    <!--end of carousel-->
				`);
	}
	
	

}