$(function() { append_room_actions() });

(function (  ) {
	
	
	$ ( document ).on ( 'click', '#preview_mode', function () {
		
		
		sessionStorage.removeItem('edit_mode');
		sessionStorage.removeItem('add_mode');
		sessionStorage.removeItem('block_mode');
		
		sessionStorage.setItem('preview_mode',true);
		
		set_description_id('preview_mode');
		
	});
	$ ( document ).on ( 'click', '#edit_mode', function () {
		
		
		
		sessionStorage.removeItem('preview_mode');
		sessionStorage.removeItem('add_mode');
		sessionStorage.removeItem('block_mode');
		
		sessionStorage.setItem('edit_mode',true);
		
		set_description_id('edit_mode');
		
		
	});
	$ ( document ).on ( 'click', '#add_mode', function () {
		
		
		
		sessionStorage.removeItem('preview_mode');
		sessionStorage.removeItem('edit_mode');
		sessionStorage.removeItem('block_mode');
		sessionStorage.removeItem('room_to_edit');
		
		sessionStorage.setItem('add_mode',true);
		
		set_description_id('add_mode');
		
		
	});
	$ ( document ).on ( 'click', '#block_mode', function () {
		
		sessionStorage.removeItem('edit_mode');
		sessionStorage.removeItem('add_mode');
		sessionStorage.removeItem('preview_mode');
		
		sessionStorage.setItem('block_mode',true);
		
		set_description_id('block_mode');
		
	});
	$ ( document ).on ( 'click', '#delete_mode', function () {
		
		
		//console.log(JSON.parse(sessionStorage.getItem('room_to_edit')))
		var room = JSON.parse(sessionStorage.getItem('room_to_edit'));
		var room_id = room.p_id ;
		var room_name = room.p_address.property_name ;
		var ROOMS = JSON.parse(localStorage.getItem('ROOMS'));
		
		var OWNERS = JSON.parse(localStorage.getItem('OWNERS'));
		var owner = OWNERS[sessionStorage.getItem('hashed_login')];
		
		Swal.fire({
			          title: `Delete ${room_name} ?`,
			          text: "You won't be able to revert this!",
			          imageUrl: `assets/images/bedrooms/b${room.room_style}.jpg`,
			          imageWidth: 400,
			          imageHeight: 200,
			          imageAlt: 'Custom image',
			          showCancelButton: true,
			          confirmButtonColor: '#3085d6',
			          cancelButtonColor: '#d33',
			          confirmButtonText: `Yes, delete ${room_name} !`
		          }).then((result) => {
			if (result.value) {

//			DELETING ROOM FROM LOCAL STORAGE
				delete ROOMS[room_id];
				
				localStorage.setItem('ROOMS', JSON.stringify(ROOMS));
//			DELETING room_id FROM OWNER'S room_ids, SO THAT IT WON'T SHOW UP IN NAVIGATION DROP DOWN, WHICH WOULD CAUSE ERRORS....
				owner.room_ids = owner.room_ids.filter(function(item) {
					return item !== room_id
				});
				
				
				
				if(owner.room_ids[0])
				{
					console.log('we have room');
					
					owner.room_id = owner.room_ids[0];
					if(ROOMS[owner.room_id] !== null){
						//				SETTING CURRENT ROOM TO INTERACT WITH IF IT IS NOT NULL,
						// BECAUSE delete ROOMS[room_id] IS SETTING  ROOMS[room_id] TO NULL
						sessionStorage.setItem('room_to_edit', JSON.stringify(ROOMS[owner.room_ids[0]])   );
						
					}
					
				}
				else
				{
//				IF OWNER DELETED LAST ROOM, HE HAS NO ROOM TO INTERACT WITH => ROOM ACTION  IN add_room_helpers.js
//              (function append_room_actions()) IS ONLY ADD ROOM
					owner.room_id = null;
					owner.room_ids = [];
					sessionStorage.removeItem('room_to_edit');
				}

//			UPDATING OWNERS IN LOCAL STORAGE
				OWNERS[sessionStorage.getItem('hashed_login')] = owner;
				localStorage.setItem('OWNERS', JSON.stringify(OWNERS));
				sessionStorage.setItem('authorized_owner',JSON.stringify(owner)  );
				
				Swal.fire(
					'Deleted!',
					`${room_name} has been deleted.`,
					'success'
				);
				
				
				sessionStorage.removeItem('preview_mode');
				sessionStorage.removeItem('edit_mode');
				sessionStorage.removeItem('block_mode');
				
				sessionStorage.setItem('add_mode',true);
				
				set_description_id('add_mode');
			}
		});
		
		
	});
	
	
	function set_description_id(step)
	{
		sessionStorage.setItem('how_to',step);
		
		window.location.reload();

//		SETTING set_description_id FOR HOW-TO DESCRIPTION AFTER RELOAD FROM sessionStorage.getItem('how_to')
//		BECAUSE SETTING IT DIRECTLY  $ ( '#how_alert' ).data ( 'step', 'preview_mode');
//		AFTER RELOAD IS NOT WORKING
		$ ( '#how_alert' ).data ( 'step', sessionStorage.getItem('how_to') );
	}
	
})();

(function (  ) {
	
	$ ( document ).on ( 'click', '#how_alert', function () {
		
		var step = $ ( this ).data ( 'step' );
		swal.fire ( {
			            position         : 'top-end',
			            html             : `${ how_to_descriptions(step)}`,
			            showConfirmButton: false
		            }
		);
	} );
})();



$ ( document ).on ( 'click', '.room_switch', function () {
	
	
	
	//	SETTING ROOM TO INTERACT WITH AS room_to_edit
	sessionStorage.setItem ( 'room_to_edit', JSON.stringify ( JSON.parse ( localStorage.getItem ( 'ROOMS' ) )[$(this).attr('id')] ) );
	
	sessionStorage.removeItem('edit_mode');
	sessionStorage.removeItem('add_mode');
	
	sessionStorage.setItem('preview_mode',true);
	window.location.replace ( "/owner.html" );
	
});
$ ( document ).on ( 'click', '.add_your_room', function () {
	sessionStorage.setItem('add_mode',true);
});


function how_to_descriptions(step)
{
	var descriptions = {
		'preview_mode': `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						 
						 You are previewing your room , if you would
						 like to edit it, click on <button class = " no_padding bg-secondary text-light " ><i class="far fa-edit"></i> Edit</button > button
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'edit_mode'   : `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						 Edit your room to your liking and when you are
						 ready to save it, click on <span class="img-thumbnail">preview</span> button, and then on

						<a  class = "btn btn-sm m-0 bg_orange horizontally_aligned right-block "
                   		title = "Save your changes" >
               			Save your changes
                         </a >
                         <hr class="bg_green">
                         
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'block_mode'  : `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						 
						 If you want to block some dates click on
 						 <button class = " no_padding bg-secondary text-light " ><i class="far fa-edit"></i> Edit</button > above, then click on
              			 <span class="img-thumbnail">preview</span >, then click on <strong class="nav_link_property">AVAILABILITY</strong>
                		 button.
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'add_mode'    : `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}
						  </h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						 
						 ${sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'add_mode' )  ? `

 						Find location of your property on the map and then click the map to display coordinates.
              			Then click on
                			<button class = "bg_orange" >get details</button >
                			button, to display location details.
                 	
               				You can correct these details.
               				Once you're happy with the location details, click on
		                  <span class="green">room&nbsp;>>></span>
		                  <hr class="bg-danger">
						<p class = " text-danger" >Remember to add your property name! (min 3 characters) to be able to continue to next step.</p>
						
						<hr class="bg-danger">`
							 : ``}
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'location'    : `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						  ${sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'add_mode' )  ? `
 						Find location of your property on the map and then click the map to display coordinates.
              			Then click on
                			<button class = "bg_orange" >get details</button >
                			button, to display location details.
                 	
               				You can correct these details.
               				Once you're happy with the location details, click on
		                  <span class="green">room&nbsp;>>></span>
		                  <hr class="bg-danger">
						<p class = " text-danger" >Remember to add your property name! (min 3 characters) to be able to continue to next step.</p>
						
						<hr class="bg-danger">`
							 : ``}
						
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'room'        : `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						  ${sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'add_mode' ) ? `

							Define your room by selecting appropriate radio buttons. Once all options are selected
						 <span class="green">services&nbsp;>>></span> will appear and you can progress to next step.`
							 : ``}
						
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'services'    : `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						 ${sessionStorage.getItem ( 'edit_mode' ) || sessionStorage.getItem ( 'add_mode' ) ? `
							Define your services by selecting appropriate check buttons.
						
 							You can select multiple options.

							When at least one of each options are selected and description is entered
							<span class="green">preview&nbsp;>>></span> will appear and you can progress to next step.
						<hr class="bg-danger">
						<p class = " text-danger" >Description of the room must be at least 30 characters!</p>
						<p class = " text-danger" > When selecting board type,
							you must enter price for the board.</p>
						<hr class="bg-danger">`
							 : ``}
						
							
							
						
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'preview'     : `<div class = "col-auto" >
						 <h4> How to: ${step.replace('_',' ')}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						 
						Preview your work of art, by clicking on the tabs
  						<span class="nav_link_property"> ABOUT, GALLERY, AMENITIES, AVAILABILITY, BOOK.</span>
  						
  						
  						${sessionStorage.getItem ( 'edit_mode' )  ? `Once you are happy with your work, you can click on
						<a  class = "btn btn-sm m-0 bg_orange horizontally_aligned right-block "
                   		title = "Save your changes" >
               			Save your changes
                         </a >`
							 : ``}
  						
  						${sessionStorage.getItem ( 'add_mode' ) ? `
						Once you are happy with your work, you can click on

						<span class="green">payment&nbsp;>>></span> proceed with payment.`
							 : ``}
						
						
						 <br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`,
		'payment'     : `<div class = "col-auto" >
						 <h4> How to: ${step.replace ( '_', ' ' )}</h4>
						
						 <hr class="bg_green">
						  <img src="assets/images/screenshots/potential_student.gif" class="card-img-top" alt="property image">
						 </div >
						 <div class = "col-auto text-center" >
						 
						Here you can proceed with payment. Thank you for choosing <b>wake up happy!</b>
  					 	<br>
						 <br>
						 <a class = "btn btn-sm bg_green text-light pl-3 pr-3 "  id="ok" onclick="swal.close()"
						 title="Got it !" >
						 Got it !
						 </a >
						 </div >
						 <hr >
						 <small>This info is always available! </small>`
		
	};
	
	return descriptions[step];
}
function append_room_actions (  ) {
	
	$ ( '#room_actions' ).append ( `<div class="d-flex justify-content-between">
					<div class = "list-group list-group-horizontal  mb-2"  >
					
					${(
		                                             sessionStorage.getItem ( 'room_to_edit' ) !== 'undefined' && sessionStorage.getItem ( 'room_to_edit' ) !== null ) ?
	                  ` <button class = "list-group-item  no_padding " id="room_name"
                        
                         title="${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}" >
                         <i class="fas fa-signature"></i>&nbsp;
                        
                          ${JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name}</button >
                          
                      <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'preview_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'}  " id="preview_mode"
                        
                         title="Preview mode" ><i class="far fa-eye"></i> Preview</button >
                         
                      <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'edit_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="edit_mode"
                        
                         title="Edit mode" ><i class="far fa-edit"></i> Edit</button >
                       
                         
                          <button class = "list-group-item  no_padding ${sessionStorage.getItem ( 'delete_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="delete_mode"
                        
                         title="Delete mode" data-room_id="${ JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).room_id }"><i class="far fa-trash-alt"></i> Delete</button >
                         <button class = "list-group-item no_padding ${sessionStorage.getItem ( 'block_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'} " id="block_mode"
                        
                         title="Block dates" ><i class="far fa-plus-square"></i> Block dates</button >

						` : ``}
 					
                         
                         
                          <button class = "list-group-item no_padding ${sessionStorage.getItem ( 'add_mode' ) === null ? 'bg-secondary text-light' : 'bg_green text-light'}"
                           id="add_mode"
                        
                         title="Add new room" ><i class="far fa-plus-square"></i> Add new room</button >
                         
                        </div>
                        <div class = "list-group list-group-horizontal  mb-2"  >
                       <button id = "how_alert" class = "bg-info text-light list-group-item no_padding"
                        data-step=${sessionStorage.getItem('how_to') ? sessionStorage.getItem('how_to')  : "location"}   style="cursor:pointer">
                      <i class="far fa-question-circle"></i>
                       How to
                      </button >
                       </div>
                  </div >
               
            
             ` );
	
}

