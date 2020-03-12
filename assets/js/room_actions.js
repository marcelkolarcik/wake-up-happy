$ ( function () { append_room_actions (); } );

(
	function () {
		
		$ ( document ).on ( 'click', '#preview_mode', function () {
			
			sessionStorage.removeItem ( 'edit_mode' );
			sessionStorage.removeItem ( 'add_mode' );
			sessionStorage.removeItem ( 'block_mode' );
			
			sessionStorage.setItem ( 'preview_mode', true );
			
			set_description_id ( 'preview_mode' );
			
		} );
		$ ( document ).on ( 'click', '#edit_mode', function () {
			
			sessionStorage.removeItem ( 'preview_mode' );
			sessionStorage.removeItem ( 'add_mode' );
			sessionStorage.removeItem ( 'block_mode' );
			
			sessionStorage.setItem ( 'edit_mode', true );
			
			set_description_id ( 'edit_mode' );
			
		} );
		$ ( document ).on ( 'click', '#add_mode', function () {
			
			sessionStorage.removeItem ( 'preview_mode' );
			sessionStorage.removeItem ( 'edit_mode' );
			sessionStorage.removeItem ( 'block_mode' );
			sessionStorage.removeItem ( 'room_to_edit' );
			
			sessionStorage.setItem ( 'add_mode', true );
			
			set_description_id ( 'add_mode' );
			
		} );
		$ ( document ).on ( 'click', '#block_mode', function () {
			
			sessionStorage.removeItem ( 'edit_mode' );
			sessionStorage.removeItem ( 'add_mode' );
			sessionStorage.removeItem ( 'preview_mode' );
			
			sessionStorage.setItem ( 'block_mode', true );
			
			set_description_id ( 'block_mode' );
			
		} );
		
		$ ( document ).on ( 'click', '#delete_mode', function () {
			
			//console.log(JSON.parse(sessionStorage.getItem('room_to_edit')))
			var room      = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
			var room_id   = room.p_id;
			var room_name = room.p_address.property_name;
			var ROOMS     = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
			
			var OWNERS = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
			var owner  = OWNERS[ sessionStorage.getItem ( 'hashed_login' ) ];
			
			Swal.fire ( {
				            title             : `Delete ${room_name} ?`,
				            text              : "You won't be able to revert this!",
				            imageUrl          : `assets/images/bedrooms/b${room.room_style}.jpg`,
				            imageWidth        : 400,
				            imageHeight       : 200,
				            imageAlt          : 'Custom image',
				            showCancelButton  : true,
				            confirmButtonColor: '#3085d6',
				            cancelButtonColor : '#dd3333',
				            confirmButtonText : `Yes, delete ${room_name} !`
			            } ).then ( ( result ) => {
				if ( result.value ) {

//			DELETING ROOM FROM LOCAL STORAGE
					delete ROOMS[ room_id ];
					
					localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
//			DELETING room_id FROM OWNER'S room_ids, SO THAT IT WON'T SHOW UP IN NAVIGATION DROP DOWN, WHICH WOULD
// CAUSE ERRORS....
					owner.room_ids = owner.room_ids.filter ( function ( item ) {
						return item !== room_id;
					} );
					
					if ( owner.room_ids[ 0 ] ) {
						console.log ( 'we have room' );
						
						owner.room_id = owner.room_ids[ 0 ];
						if ( ROOMS[ owner.room_id ] !== null ) {
							//				SETTING CURRENT ROOM TO INTERACT WITH IF IT IS NOT NULL,
							// BECAUSE delete ROOMS[room_id] IS SETTING  ROOMS[room_id] TO NULL
							sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( ROOMS[ owner.room_ids[ 0 ] ] ) );
							
						}
						
					}
					else {
//				IF OWNER DELETED LAST ROOM, HE HAS NO ROOM TO INTERACT WITH => ROOM ACTION  IN add_room_helpers.js
//              (function append_room_actions()) IS ONLY ADD ROOM
						owner.room_id  = null;
						owner.room_ids = [];
						sessionStorage.removeItem ( 'room_to_edit' );
					}

//			UPDATING OWNERS IN LOCAL STORAGE
					OWNERS[ sessionStorage.getItem ( 'hashed_login' ) ] = owner;
					localStorage.setItem ( 'OWNERS', JSON.stringify ( OWNERS ) );
					sessionStorage.setItem ( 'authorized_owner', JSON.stringify ( owner ) );
					
					Swal.fire (
						'Deleted!',
						`${room_name} has been deleted.`,
						'success'
					);
					
					sessionStorage.removeItem ( 'preview_mode' );
					sessionStorage.removeItem ( 'edit_mode' );
					sessionStorage.removeItem ( 'block_mode' );
					
					sessionStorage.setItem ( 'add_mode', true );
					
					set_description_id ( 'add_mode' );
				}
			} );
			
		} );
		
	} ) ();


function set_description_id ( step ) {
	sessionStorage.setItem ( 'how_to', step );
	
	if ( step !== 'block_mode' ) window.location.reload ();

//		SETTING set_description_id FOR HOW-TO DESCRIPTION AFTER RELOAD FROM sessionStorage.getItem('how_to')
//		BECAUSE SETTING IT DIRECTLY  $ ( '#how_alert' ).data ( 'step', 'preview_mode');
//		AFTER RELOAD IS NOT WORKING
	$ ( '#how_alert' ).data ( 'step', sessionStorage.getItem ( 'how_to' ) );
}


(
	function () {
		
		$ ( document ).on ( 'click', '#how_alert,#block_mode', function () {
			
			var step = $ ( this ).data ( 'step' );
			
			$ ( '.ht_description' ).append ( ` <a class = "btn btn-sm bg_green text-light pl-3 pr-3 float-right"  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >` );
			swal.fire ( {
				            width            : $ ( window ).width (),
				            position         : 'top-end',
				            html             : `${how_to_descriptions ( step )}`,
				            showConfirmButton: false
			            }
			);
		} );
	} ) ();

$ ( document ).on ( 'click', '.room_switch', function () {
	
	//	SETTING ROOM TO INTERACT WITH AS room_to_edit
	sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( JSON.parse ( localStorage.getItem ( 'ROOMS' ) )[ $ ( this ).attr ( 'id' ) ] ) );
	
	sessionStorage.removeItem ( 'edit_mode' );
	sessionStorage.removeItem ( 'add_mode' );
	
	sessionStorage.setItem ( 'preview_mode', true );
	set_description_id ( 'preview_mode' );
	window.location.replace ( "/owner.html" );
	
} );
$ ( document ).on ( 'click', '.add_your_room', function () {
	sessionStorage.setItem ( 'add_mode', true );
} );


function how_to_descriptions ( step ) {
	
	var descriptions = {
		
		preview_mode: render_how_to_info ( description_content ( 'preview_mode' ), step, 'edit_mode' ),
		edit_mode   : render_how_to_info ( description_content ( 'edit_mode' ), step, 'edit_mode' ),
		block_mode  : render_how_to_info ( description_content ( 'block_mode' ), step, 'block_mode' ),
		
		add_mode: render_how_to_info ( description_content ( 'location' ), step, 'location' ),
		
		location: render_how_to_info ( description_content ( 'location' ), step, 'location' ),
		
		room    : render_how_to_info ( description_content ( 'room' ), step, 'room' ),
		services: render_how_to_info ( description_content ( 'services' ), step, 'services' ),
		preview : render_how_to_info ( description_content ( 'preview' ), step, 'edit_mode' ),
		payment : render_how_to_info ( description_content ( 'payment' ), step, 'payment' )
		
	};
	
	return descriptions[ step ];
}


function append_room_actions () {
	
	$ ( '#room_actions' ).append ( `<div class="d-flex justify-content-between">
					<div class = "  mb-2"  >
					<button id = "how_alert" class = "bg-danger text-light  no_padding mb-1"
                        data-step="${sessionStorage.getItem ( 'how_to' ) ? sessionStorage.getItem ( 'how_to' ) : "location"}"   style="cursor:pointer">
                      <i class="far fa-question-circle"></i>
                       How to
                      </button >
					
					${(
		                                                                                                                                                                                  sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' && sessionStorage.getItem ( 'room_to_edit' ) !== null ) ?
	                  `

 					 <button class = "  no_padding  mb-1" id="room_name"
                        
                         title="${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}" >
                         <i class="fas fa-signature"></i>&nbsp;
                        
                          ${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}</button >
                          
                      <button class = "  mb-1 no_padding ${sessionStorage.getItem ( 'preview_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'}  " id="preview_mode"
                        
                         title="Preview mode" ><i class="far fa-eye"></i> Preview</button >
                         
                      <button class = " mb-1  no_padding ${sessionStorage.getItem ( 'edit_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="edit_mode"
                        
                         title="Edit mode" ><i class="far fa-edit"></i> Edit</button >
                       
                         
                          <button class = "  mb-1 no_padding ${sessionStorage.getItem ( 'delete_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="delete_mode"
                        
                         title="Delete mode" data-room_id="${JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).room_id}"><i class="far fa-trash-alt"></i> Delete</button >
                         <button class = " mb-1 no_padding ${sessionStorage.getItem ( 'block_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} "
                         id="block_mode" data-step="block_mode"
                        
                         title="Block dates" ><i class="far fa-plus-square"></i> Block dates</button >

						` : ``}
 					
                         
                         
                          <button class = " mb-1 no_padding
								${sessionStorage.getItem ( 'add_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'}"
                           id="add_mode"
                        
                         title="Add new room" ><i class="far fa-plus-square"></i> Add new room</button >
                         
                        </div>
                        <div   >
                       
                       </div>
                  </div >
               
            
             ` );
	
}


function render_how_to_info ( description, step, gif ) {
	
	return `<div class="row">
				
				<div class = "col-md-3 description" >
						 <h4> How to: ${step.replace ( '_', ' ' )}</h4>
						
						${sessionStorage.getItem ( 'edit_mode' )
	                      ? `you are in editing mode` : sessionStorage.getItem ( 'preview_mode' )
	                                                    ? `you are in preview mode` : sessionStorage.getItem ( 'add_mode' )
	                                                                                  ? `you are in add mode` : sessionStorage.getItem ( 'block_mode' )
	                                                                                                            ? `you are in block mode` : ``}
						 <br>
						 <hr class="bg_green">
						  ${sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'add_mode' ) || sessionStorage.getItem ( 'block_mode' )
	                        ? description :
	                        `${sessionStorage.getItem ( 'preview_mode' ) ? `Click on
										        <span class = " no_padding bg-secondary text-light " >
										            <i class = "far fa-edit" ></i >
										            Edit
										        </span >
										        button, if you would
										        like to edit your room. <hr class="bg_green">`
	                                                                     : ``}
							`}
						  
						  <a class = "btn btn-sm bg_green text-light pl-3 pr-3 " id = "ok" onclick = "swal.close()"
					   		title = "Got it !" >
					    		OK, got it !
						 </a >
				 </div >
				 <div class = "col-md-9 text-center" >
						 	<img src="assets/images/screenshots/${gif}.gif" class="card-img-top" alt="${gif} gif image">
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


function description_content ( step ) {
	var description_content = {
		location: `Find location of your property on the map and then click the map to display coordinates.
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
		
		room        : `Define your room by selecting appropriate radio buttons. Once all options are selected
					 <span class="green">services&nbsp;>>></span> will appear and you can progress to next step.
 					<hr class="bg_green">`,
		services    : `Define your services by selecting appropriate check buttons.
						
 							You can select multiple options.

							When at least one of each options are selected and description is entered
							<span class="green">preview&nbsp;>>></span> will appear and you can progress to next step.
						<hr class="bg-danger">
						<p class = " text-danger" >Description of the room must be at least 30 characters!</p>
						<p class = " text-danger" > When selecting board type,
							you must enter price for the board.</p>
						<hr class="bg-danger">`,
		preview     : `Preview your work of art, by clicking on the tabs
  						<span class="nav_link_property"> ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK.</span>
  						<hr class="bg_green">
  						You can edit your work if needed!
  						<hr class="bg_green">
  						Once you are happy with your work, preview it by clicking on
  						<br><br>
						<span class="img-thumbnail">preview</span>
						<hr class="bg_green">
						Click on
  						${sessionStorage.getItem ( 'edit_mode' ) ? `
						
						 <span class = "ml-1 img-thumbnail  bg_orange p-1  "
                       
                                  title = "Save your changes !" >Update</span >
								<br> to save your changes.` : ``}
		                       
						${sessionStorage.getItem ( 'add_mode' ) ? `
					
						<span class="green">payment&nbsp;>>></span> to proceed with payment.
						` : ``}
						<hr class="bg_green">`,
		payment     : `Here you can proceed with payment. Thank you for choosing <b>wake up happy!</b>
					
  						<hr class="bg_green">
  						Once you pay, you will be redirected to landing page to see your room live on the site.
  						<hr class="bg_green">
  						You will be logged in into your account, and in the top right corner, you will see your
  						 initials, with your room listed in the dropdown menu. You can click on your name or room name,
  						 to get to your account dashboard,where you can further edit your room, or add new one!
  						<br><br>
						
						<hr class="bg_green">`,
		block_mode  : ` If you want to block some of the dates, click on
 						 <span class = "no_padding bg-secondary text-light " ><i class="far fa-edit"></i> Edit</span > ,
 						  <hr class = "bg_green" >
 						  then click on
              			 <span class="img-thumbnail">preview</span >,
              			 <hr class = "bg_green" >then click on <strong class="nav_link_property">AVAILABILITY</strong>
                		 tab.
 						<hr class = "bg_green" >For more details click on
								<span class = "btn btn-sm bg-danger text-light "
 									 title="Block selected dates">
                                   How to block weeks ?
                                </span >
						<hr class = "bg_green" >`,
		edit_mode   : ` Edit your room to your liking .
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
		preview_mode: ` If you would
						        like to edit room, click on
						        <span class = " no_padding bg-secondary text-light " >
						            <i class = "far fa-edit" ></i >
						            Edit
						        </span >
						        button`
		
	};
	
	return description_content[ step ];
}

