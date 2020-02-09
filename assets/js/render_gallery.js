function render_gallery(property,food_id)
{
	var gallery = $('#gallery_'+property.p_id);
	
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
//	room only
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
}