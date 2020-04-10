/*WHEN USER CLICK ON '#how_alert,#block_mode' BUTTON, WE WILL DISPLAY APPROPRIATE HOW TO DESCRIPTION
* DEPENDING ON WHICH PART (step) OF THE FORM USER CLICKED,
*
* I'M STORING DESCRIPTION'S TEXTUAL CONTENT IN  description_content ( step ) FUNCTION
* step          =>      WHICH PART (step) OF THE FORM USER CLICKED
*
* I'VE CREATED COMPONENT FUNCTION description_component ( description, step, gif )
* WHICH TAKES 3 PARAMETERS description, step, gif
* WHERE
*
* description   =>      TEXTUAL DESCRIPTION
* step          =>      WHICH PART (step) OF THE FORM USER CLICKED
* gif           =>      WHICH GIF TO INCLUDE AS DEMONSTRATION VIDEO
*
* gifs ARE NAMED SAME AS steps FOR EASE OF USE
*
* SO WHEN USER CLICKS ON '#how_alert,#block_mode'
* render_description ( step ) FUNCTION WILL FIRE
* step          =>      WHICH PART (step) OF THE FORM USER CLICKED
* WHERE step IS DECIDING FACTOR AS TO WHAT DESCRIPTION WILL BE DISPLAYED*/


import { translate } from "../shared/translator/translator.js";


( function () {
	
	/*WHEN USER CLICKS ON HOW-TO BUTTON, WE WILL FIRE POPUP WITH APPROPRIATE DESCRIPTION
	* DEPENDING ON THE STEP OF THE FORM*/
	$ ( document ).on ( 'click', '#how_alert,#block_mode', function () {
		
		var step = $ ( this ).data ( 'step' );

		swal.fire ( {
			            width             : $ ( window ).width (),
			            position          : 'top-end',
			            html              : `${ render_description ( step ) }`,
			            showConfirmButton : false
		            }
		);
		
		translate();
	} );
	
	/*RENDERING OF ALERT AFTER USER CLICKS ON HOW TO BUTTON*/
	function render_description ( step ) {
		
		var descriptions = {
			
			preview_mode : description_component ( description_content ( 'preview_mode' ), step, 'edit_mode' ),
			edit_mode    : description_component ( description_content ( 'edit_mode' ), step, 'edit_mode' ),
			block_mode   : description_component ( description_content ( 'block_mode' ), step, 'block_mode' ),
			
			add_mode : description_component ( description_content ( 'location' ), step, 'location' ),
			
			location : description_component ( description_content ( 'location' ), step, 'location' ),
			
			room     : description_component ( description_content ( 'room' ), step, 'room' ),
			services : description_component ( description_content ( 'services' ), step, 'services' ),
			preview  : description_component ( description_content ( 'preview' ), step, 'edit_mode' ),
			payment  : description_component ( description_content ( 'payment' ), step, 'payment' )
			
		};
		
		return descriptions[ step ];
	}
	
	/*HTML "COMPONENT" IN WHICH TO DISPLAY ALERT*/
	function description_component ( description, step, gif ) {
		
		return `<div class="row">
				
				<div class = "col-md-3 description" >
						
						
						${ sessionStorage.getItem ( 'edit_mode' )
		                   ? `<h4 class="___ " data-text="you are in editing mode"></h4> ` : sessionStorage.getItem ( 'preview_mode' )
		                                                 ? ` <h4 class="___ " data-text="you are in preview mode"></h4>` : sessionStorage.getItem ( 'add_mode' )
		                                                                               ? `  <h4 class="___ " data-text="you are in add mode"></h4>` : sessionStorage.getItem ( 'block_mode' )
		                                                                                                         ? ` <h4 class="___" data-text="you are in block mode"></h4>` : `` }
						 <br>
						 <hr class="bg_green">
						  ${ sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'add_mode' ) || sessionStorage.getItem ( 'block_mode' )
		                     ? description :
		                     `${ sessionStorage.getItem ( 'preview_mode' ) ? `
												<span class="___" data-text="Click on"></span>
										        <span class = " no_padding bg-secondary text-light " >
										            <i class = "far fa-edit" ></i >
										          <span class="___" data-text="Edit"></span>
										        </span >
										        
										        <span class="___" data-text="button, if you would like to edit your room."></span>
										         <hr class="bg_green">`
		                                                                   : `` }
							` }
						  
						  <a class = " bg_orange text-primary pl-3 pr-3 pt-1 pb-1 img-thumbnail ___" id = "ok" onclick = "swal.close()"
					   		data-title = "OK, got it !"
					   		 data-text="OK, got it !"
					   		 data-cy="close_how_to">
					    		
						 </a > <br>
				 </div >
				 <div class = "col-md-9 text-center" >
						 	<img src="assets/src/images/screenshots/${ gif }.gif" class="card-img-top" alt="${ gif } gif image">
						 	<div class="">
						 	<span class="___" data-text="By clicking on"></span>
						  <span  class = " btn btn-sm bg-danger  text-light no_padding" >
                          <i class="far fa-question-circle"></i>
                          <span class="___" data-text="How to"></span>
	                       
	                      </span >
	                       <span class="___" data-text="you will get information that will assist on every step of your journey...;-)."></span>
				</div>
				 </div >
						 <hr >
						 
						
       
						 
		  	</div>`;
		
	}
	
	/*DESCRIPTION OF HOW TO STEP DEPENDING ON THE STEP*/
	function description_content ( step ) {
		var description_content = {
			location : `
					<span class="___" data-text="Find location of your property on the map and then click the map to display coordinates."></span>
					<span class="___" data-text="Then click on"></span>
					<button class = "bg_orange ___" data-text="get details" ></button >
					
					
					<span class="___" data-text="button, to display location details."></span>
					<span class="___" data-text="You can correct these details."></span>
					<span class="___" data-text="Once you're happy with the location details, click on"></span>
					
					
					<span class = "green ___" data-text="room" ></span >
					<span class = "green" >&nbsp;>>></span >
					<hr class = "bg-danger" >
					<p class = " text-danger ___" data-text="Remember to add your property name! (min 3 characters) to be able to continue to next step." >
					
					</p >
					<hr class = "bg-danger" >
					`,
			
			room         : `<span class="___" data-text="Define your room by selecting appropriate radio buttons."></span>
							<span class="___" data-text="Once all options are selected"></span>
					 <span class="green ___" data-text="services"></span>
					  <span class="green">&nbsp;>>></span>
					  <span class="___" data-text="will appear and you can progress to next step."></span>
					  
 					<hr class="bg_green">`,
			services     : `<span class="___" data-text="Define your services by selecting appropriate check buttons."></span>
							<span class="___" data-text="You can select multiple options."></span>
							<span class="___" data-text="When at least one of each options are selected and description is entered"></span>
							<span class="green ___" data-text="preview"></span>
							<span class="green">&nbsp;>>></span>
							<span class="___" data-text="will appear and you can progress to next step."></span>
 						

							
							
						<hr class="bg-danger">
						<p class = " text-danger ___" data-text="Description of the room must be at least 30 characters!" ></p>
						<p class = " text-danger ___" data-text="When selecting board type, you must enter price for the board." > </p>
						<hr class="bg-danger">`,
			preview      : `
						<span class="___"  data-text="Preview your work of art, by clicking on the tabs"></span>
  						<span class="nav_link_property ___" data-text="ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK."> </span>
  						
  						<hr class="bg_green">
  						
  						<span class="___"  data-text="You can edit your work if needed!"></span>
  						
  						<hr class="bg_green">
  						
  						<span class="___"  data-text="Once you are happy with your work, preview it by clicking on"></span>
  						
  						<br><br>
						<span class="img-thumbnail ___" data-text="preview"></span>
						
						<hr class="bg_green">
						
						<span class="___"  data-text="Click on"></span>
						
  						${ sessionStorage.getItem ( 'edit_mode' ) ? `
						
						 <span class = "ml-1 img-thumbnail  bg_orange p-1  ___"
                       
                                  data-title = "Save your changes !" data-text="Update"></span >
								<br>
								<span class="___"  data-text="to save your changes."></span>
								` : `` }
		      
						${ sessionStorage.getItem ( 'add_mode' ) ? `
					
						<span class="green ___" data-text="payment"></span>
						<span class="green">&nbsp;>>></span>
						 <span class="___"  data-text="to proceed with payment."></span>
						 
						` : `` }
						<hr class="bg_green">`,
			payment      : `
						<span class="___" data-text="Here you can proceed with payment. Thank you for choosing"></span>
						
						 <b><span >wake up happy!</span></b>
					
  						<hr class="bg_green">
  						<span class="___" data-text="Once you pay, you will be redirected to landing page to see your room live on the site."></span>
  						
  						<hr class="bg_green">
  						
  						<span class="___" data-text="You will be logged in into your account, and in the top right corner, you will see your initials, with your room listed in the dropdown menu."></span>
  						<span class="___" data-text="You can click on your name or room name, to get to your account dashboard,where you can further edit your room, or add new one!"></span>
  						
  						<br><br>
						
						<hr class="bg_green">`,
			block_mode   : `
						<span class="___" data-text="Click on"></span>
						
 						 <span class = "no_padding bg-secondary text-light " ><i class="far fa-edit"></i> <span class="___" data-text="Edit"></span></span >
 						 
 						 <span class="___" data-text="if you want to block some of the dates."></span>
 						 
 						  <hr class = "bg_green" >
 						  <span class="___" data-text="Then click on"></span>
 						  
              			 <span class="img-thumbnail ___" data-text="preview"></span >,
              			 <hr class = "bg_green" >
              			 <span class="___" data-text="then click on"></span>
              			  <strong class="nav_link_property ___" data-text="AVAILABILITY"></strong>
                		 <span class="___" data-text="tab."></span>
 						<hr class = "bg_green" >
 						<span class="___" data-text="For more details click on"></span>
 						
								<span class = "btn btn-sm bg-danger text-light ___"
 									 data-title="How to block weeks ?"
 									 data-text="How to block weeks ?">
                                
                                </span >
						<hr class = "bg_green" >`,
			edit_mode    : `
                            <span class="___" data-text="Edit your room to your liking."></span>
                            
								<hr class = "bg_green" >
								<span class="___" data-text="Once you are happy with your work, preview it by clicking on"></span>
								
  						<br><br>
						<span class="img-thumbnail ___" data-text="preview"></span>
						<hr class="bg_green">
						<span class="___" data-text="Click on"></span>
						
  						 <span class = "ml-1 img-thumbnail  bg_orange p-1  ___"
                       
                                  data-title = "Save your changes !" data-text="Update" ></span >
								<br>
								<span class="___" data-text="to save your changes."></span>
								
								<hr class="bg_green">`,
			preview_mode : `
                                <span class="___" data-text=" If you would like to edit room, click on"></span>
                               
						        <span class = " no_padding bg-secondary text-light " >
						            <i class = "far fa-edit" ></i >
						            
						        </span >
						        <span class="___" data-text="Edit"></span>
						       <span class="___" data-text="button"></span>
								`
			
		};
		
		return description_content[ step ];
	}
} ) ();