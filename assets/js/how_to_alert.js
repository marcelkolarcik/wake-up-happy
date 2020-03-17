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


( function () {
	
	/*WHEN USER CLICKS ON HOW-TO BUTTON, WE WILL FIRE POPUP WITH APPROPRIATE DESCRIPTION
	* DEPENDING ON THE STEP OF THE FORM*/
	$ ( document ).on ( 'click', '#how_alert,#block_mode', function () {
		
		var step = $ ( this ).data ( 'step' );
		
		$ ( '.ht_description' ).append ( ` <a class = "btn btn-sm bg_green text-light pl-3 pr-3 float-right"  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >` );
		swal.fire ( {
			            width             : $ ( window ).width (),
			            position          : 'top-end',
			            html              : `${ render_description ( step ) }`,
			            showConfirmButton : false
		            }
		);
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
						 <h4> How to: ${ step.replace ( '_', ' ' ) }</h4>
						
						${ sessionStorage.getItem ( 'edit_mode' )
		                   ? `you are in editing mode` : sessionStorage.getItem ( 'preview_mode' )
		                                                 ? `you are in preview mode` : sessionStorage.getItem ( 'add_mode' )
		                                                                               ? `you are in add mode` : sessionStorage.getItem ( 'block_mode' )
		                                                                                                         ? `you are in block mode` : `` }
						 <br>
						 <hr class="bg_green">
						  ${ sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'add_mode' ) || sessionStorage.getItem ( 'block_mode' )
		                     ? description :
		                     `${ sessionStorage.getItem ( 'preview_mode' ) ? `Click on
										        <span class = " no_padding bg-secondary text-light " >
										            <i class = "far fa-edit" ></i >
										            Edit
										        </span >
										        button, if you would
										        like to edit your room. <hr class="bg_green">`
		                                                                   : `` }
							` }
						  
						  <a class = "btn btn-sm bg_green text-light pl-3 pr-3 " id = "ok" onclick = "swal.close()"
					   		title = "Got it !" >
					    		OK, got it !
						 </a >
				 </div >
				 <div class = "col-md-9 text-center" >
						 	<img src="assets/images/screenshots/${ gif }.gif" class="card-img-top" alt="${ gif } gif image">
						 	<div class="">By clicking on
						  <span  class = " btn btn-sm bg-danger  text-light no_padding" >
                          <i class="far fa-question-circle"></i>
	                       How to
	                      </span > you will get information that will assist on every step of your journey...;-).
				</div>
				 </div >
						 <hr >
						 
						
       
						 
		  	</div>`;
		
	}
	
	/*DESCRIPTION OF HOW TO STEP DEPENDING ON THE STEP*/
	function description_content ( step ) {
		var description_content = {
			location : `Find location of your property on the map and then click the map to display coordinates.
					Then click on
					<button class = "bg_orange" >get details</button >
					button, to display location details.
					You can correct these details.
					Once you're happy with the location details, click on
					<span class = "green" >room&nbsp;>>></span >
					<hr class = "bg-danger" >
					<p class = " text-danger" >
					Remember to add your property name! (min 3 characters)
					to be able to continue to next step.
					</p >
					<hr class = "bg-danger" >
					`,
			
			room         : `Define your room by selecting appropriate radio buttons. Once all options are selected
					 <span class="green">services&nbsp;>>></span> will appear and you can progress to next step.
 					<hr class="bg_green">`,
			services     : `Define your services by selecting appropriate check buttons.
						
 							You can select multiple options.

							When at least one of each options are selected and description is entered
							<span class="green">preview&nbsp;>>></span> will appear and you can progress to next step.
						<hr class="bg-danger">
						<p class = " text-danger" >Description of the room must be at least 30 characters!</p>
						<p class = " text-danger" > When selecting board type,
							you must enter price for the board.</p>
						<hr class="bg-danger">`,
			preview      : `Preview your work of art, by clicking on the tabs
  						<span class="nav_link_property"> ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK.</span>
  						<hr class="bg_green">
  						You can edit your work if needed!
  						<hr class="bg_green">
  						Once you are happy with your work, preview it by clicking on
  						<br><br>
						<span class="img-thumbnail">preview</span>
						<hr class="bg_green">
						Click on
  						${ sessionStorage.getItem ( 'edit_mode' ) ? `
						
						 <span class = "ml-1 img-thumbnail  bg_orange p-1  "
                       
                                  title = "Save your changes !" >Update</span >
								<br> to save your changes.` : `` }
		      
						${ sessionStorage.getItem ( 'add_mode' ) ? `
					
						<span class="green">payment&nbsp;>>></span> to proceed with payment.
						` : `` }
						<hr class="bg_green">`,
			payment      : `Here you can proceed with payment. Thank you for choosing <b>wake up happy!</b>
					
  						<hr class="bg_green">
  						Once you pay, you will be redirected to landing page to see your room live on the site.
  						<hr class="bg_green">
  						You will be logged in into your account, and in the top right corner, you will see your
  						 initials, with your room listed in the dropdown menu. You can click on your name or room name,
  						 to get to your account dashboard,where you can further edit your room, or add new one!
  						<br><br>
						
						<hr class="bg_green">`,
			block_mode   : `Click on
 						 <span class = "no_padding bg-secondary text-light " ><i class="far fa-edit"></i> Edit</span >
 						 if you want to block some of the dates.
 						  <hr class = "bg_green" >
 						  Then click on
              			 <span class="img-thumbnail">preview</span >,
              			 <hr class = "bg_green" >then click on <strong class="nav_link_property">AVAILABILITY</strong>
                		 tab.
 						<hr class = "bg_green" >For more details click on
								<span class = "btn btn-sm bg-danger text-light "
 									 title="Block selected dates">
                                   How to block weeks ?
                                </span >
						<hr class = "bg_green" >`,
			edit_mode    : ` Edit your room to your liking .
								<hr class = "bg_green" >
								Once you are happy with your work, preview it by clicking on
  						<br><br>
						<span class="img-thumbnail">preview</span>
						<hr class="bg_green">
						Click on
  						 <span class = "ml-1 img-thumbnail  bg_orange p-1  "
                       
                                  title = "Save your changes !" >Update</span >
								<br> to save your changes.
								<hr class="bg_green">`,
			preview_mode : ` If you would
						        like to edit room, click on
						        <span class = " no_padding bg-secondary text-light " >
						            <i class = "far fa-edit" ></i >
						            Edit
						        </span >
						        button`
			
		};
		
		return description_content[ step ];
	}
} ) ();