/*HERE WE ARE APPENDING ROOM ACTIONS ON owner.HTML
 *
 * IF IT IS UNAUTHORIZED USER OR
 * LOGGED IN USER IS ADDING NEW ROOM,
 * WE WILL DISPLAY how-to AND add_new_room BUTTONS ONLY
 *
 * IF IT IS LOGGED IN USER WE WILL DISPLAY ALL ROOM
 * ACTION BUTTONS : how-to, preview, edit, delete, block_dates, add_new_room
 *
 * BY CLICKING ON ANY OF THE ROOM ACTION BUTTON
 * WE WILL REMOVE ANY PREVIOUSLY SET ACTIONS FROM sessionStorage
 * WE WILL SET CURRENT ACTION INTO sessionStorage
 *
 * BECAUSE WE WILL NEED TO KNOW WHAT CURRENT ACTION IS
 * FOR DISPLAYING :
 *      1.  ROOM ACTION BUTTONS
 *           FOR EXAMPLE: a.) WHEN OWNER IS EDITING EXISTING ROOM, INSTEAD OF payment BUTTON
 *                       WE WILL DISPLAY update BUTTON
 *                       b.) WHEN OWNER IS IN EDIT MODE, WE WILL DISPLAY how_to_block_dates
 *                       BUTTON ON AVAILABILITY TAB IN ROOM PREVIEW
 *                       c.) WHEN OWNER IS BLOCKING SAME DATES, WE WILL
 *                       DISPLAY SHORTER VERSION OF THE FORM TO INCLUDE ONLY
 *                       SELECTED WEEKS AND ROOM NAME
 *                       ...
 *
 *      2. SETTING data-step ATTRIBUTE FOR '#how_alert' BUTTON FOR DISPLAYING
 *       CORRECT HOW-TO DESCRIPTION
 *
 * */




$ ( function ()
    {
	    append_room_actions ();
	  
    } );

(
	function ()
		{
			
			/*WHEN DELETING ROOM, ALERT WILL POP UP TO CONFIRM DELETION.
			 *
			 * WHEN CONFIRMED, WE NEED TO :
			 *
			 *       1. GET THE CURRENT ROOM => var room      = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
			 *
			 *       2.DELETE room FROM ROOMS OBJECT FROM localStorage:
			 *
			 *           a.) RETRIEVE ROOMS OBJECT FROM localStorage => var ROOMS     = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
			 *           b.) DELETE ROOM BY room_id delete ROOMS[ room_id ];
			 *           c.) UPDATE ROOMS OBJECT IN localStorage localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
			 *
			 *       3.DELETE room_id FROM authorized_owner OBJECT
			 *           a.) RETRIEVE OWNERS OBJECT FROM localStorage => var OWNERS = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
			 *           b.) RETRIEVE CURRENT OWNER =>   var owner  = OWNERS[ sessionStorage.getItem ( 'hashed_login' ) ];
			 *           c.) DELETE CURRENT room_id FROM OWNER'S room_ids ARRAY
			 *           d.) SET OWNER'S room_id TO FIRST AVAILABLE ROOM FROM OWNER'S room_ids
			 *               HE HAS ANY ROOMS LEFT, OR SET IT TO null IF THAT WAS LAST ROOM
			 *               AND REMOVING ROOM FROM sessionStorage.removeItem ( 'room_to_edit' )
			 * */
			$ ( document ).on ( 'click', '#delete_mode', function ()
			{
				
				
				var room = JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) );
				
				
				Swal.fire ( {   html : ` <div class = "col-md-9 text-center" >
				                            <h4 class="___" data-text="Delete |room_name ?"
				                            data-room_name="${ room.p_address.property_name }">
				                            
											</h4>
										    <img src="assets/src/images/bedrooms/b${ room.room_style }.jpg" class="card-img-top" alt="room image">
										    <hr class="bg-danger">
										    <p class="___" data-text="You won't be able to revert this!"></p>
										    <hr class="bg-danger">
						 	
										</div>`,
					           
					            showCancelButton   : true,
					            confirmButtonColor : '#0fbeba',
					            cancelButtonColor  : '#dd3333',
					            confirmButtonText  : `<i class="fas fa-check-circle"></i>`,
					            cancelButtonText  : `<i class="fas fa-times-circle"></i>`
				            } ).then ( ( result ) =>
				                       {
					
					                       if ( result.value )
						                       {
							
							                       var room_id = room.p_id;
							                       var ROOMS   = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
							                       var OWNERS  = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
							                       var owner   = OWNERS[ sessionStorage.getItem ( 'hashed_login' ) ];

//			DELETING ROOM FROM LOCAL STORAGE
							                       delete ROOMS[ room_id ];
							
							                       localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );

//			DELETING room_id FROM OWNER'S room_ids, SO THAT IT WON'T SHOW UP IN NAVIGATION DROP DOWN, WHICH WOULD
//          CAUSE ERRORS....
							                       owner.room_ids = owner.room_ids.filter ( function ( item )
							                                                                {
								                                                                return item !== room_id;
							                                                                } );
							
							                       if ( owner.room_ids[ 0 ] )
								                       {
									
									
									                       owner.room_id = owner.room_ids[ 0 ];
									                       if ( ROOMS[ owner.room_id ] !== null )
										                       {

//				SETTING CURRENT ROOM TO INTERACT WITH IF IT IS NOT NULL,
//              BECAUSE delete ROOMS[room_id] IS SETTING  ROOMS[room_id] TO NULL
											                       sessionStorage.setItem (
												                       'room_to_edit', JSON.stringify (
													                       ROOMS[ owner.room_ids[ 0 ] ] ) );
											
										                       }
									
								                       }
							                       else
								                       {

//				IF OWNER DELETED LAST ROOM, HE HAS NO ROOM TO INTERACT WITH => ROOM ACTION  IN
// add_room_interactions.js (function append_room_actions()) IS ONLY ADD ROOM
									                       owner.room_id  = null;
									                       owner.room_ids = [];
									                       sessionStorage.removeItem ( 'room_to_edit' );
								                       }

//			UPDATING OWNERS IN LOCAL STORAGE
							                       OWNERS[ sessionStorage.getItem ( 'hashed_login' ) ] = owner;
							                       localStorage.setItem ( 'OWNERS', JSON.stringify ( OWNERS ) );
							                       sessionStorage.setItem (
								                       'authorized_owner', JSON.stringify ( owner ) );

//					CONFIRMATION OF DELETION
							                       Swal.fire ({
								                       html : `<div >
								                                    <h4 class="bg-_green  text-light" ><i class="fas fa-check-circle"></i></h4>
																	
															 </div>`,
								                       
							                                  }
							                                  
							                       );
							
							
							                       set_current_mode ( 'add_mode' );
						                       }
				                       } );
				
			} );
			
			$ ( document ).on ( 'click', '#preview_mode', function ()
			{
				
				set_current_mode ( 'preview_mode' );
			} );
			
			$ ( document ).on ( 'click', '#edit_mode', function ()
			{
				set_current_mode ( 'edit_mode' );
			} );
			
			$ ( document ).on ( 'click', '#add_mode', function ()
			{
				sessionStorage.removeItem ( 'room_to_edit' );
				set_current_mode ( 'add_mode' );
				
			} );
			
			
			$ ( document ).on ( 'click', '.room_switch', function ()
			{
				
				//	SETTING ROOM TO INTERACT WITH AS room_to_edit
				sessionStorage.setItem (
					'room_to_edit', JSON.stringify (
						JSON.parse ( localStorage.getItem ( 'ROOMS' ) )[ $ ( this ).attr ( 'id' ) ] ) );
				
				set_current_mode ( 'preview_mode' );
				set_last_room_id ();
				window.location.replace ( "owner.html" );
				
				
				
			} );
			
			$ ( document ).on ( 'click', '.add_your_room', function ()
			{

				sessionStorage.setItem ( 'add_mode', true );
				set_current_mode ( 'add_mode' );
			} );
			
		} ) ();


//		SETTING CURRENT MODE INTO sessionStorage
//		REMOVING OTHER MODES FROM sessionStorage
//       + set_description_id ( step )
function set_current_mode ( current_mode )
	{
		
		var modes = [ 'add_mode', 'preview_mode', 'block_mode', 'edit_mode' ];
		
		$.each ( modes, function ( key, mode )
		{

//		SETTING CURRENT MODE INTO sessionStorage
			if ( current_mode === mode )
				{
					sessionStorage.setItem ( current_mode, true );
				}

//		REMOVING OTHER MODES FROM sessionStorage
			else
				{
					sessionStorage.removeItem ( mode );
				}
			
		} );
		
		set_description_id ( current_mode );
		
	}


//		SETTING DATA ATTRIBUTE data-step  FOR $ ( '#how_alert' ) BUTTON, WHICH IS
//	    TRIGGERING 	ALERT WITH HOW-TO DESCRIPTION => WHEN USER CLICKS ON
//	    $ ( '#how_alert' ) OR $ ('#block_mode' )  BUTTON ,
//	    WE WILL GET step ATTRIBUTE, AND DISPLAY APPROPRIATE HOW-TO DESCRIPTION
function set_description_id ( step )
	{
		
		sessionStorage.setItem ( 'how_to', step );
		
		if ( step !== 'block_mode' ) window.location.reload ();
		
		$ ( '#how_alert' ).data ( 'step', sessionStorage.getItem ( 'how_to' ) );
		$ ( "html, body" ).animate ( { scrollTop : 0 }, "slow" );
	}


/*SETTING NEWLY CREATED ROOM'S ID AS ID OF LASTLY INTERACTED ROOM WITH
 * SO IF OWNER HAS MORE THEN ONE ROOM, AND IF HE LOGS OUT RIGHT
 * AFTER ADDING THIS ROOM,
 * LATER WHEN HE LOGS IN, HE WILL SEE THIS ROOM AS CURRENT ROOM*/
export function set_last_room_id ()
	{
		var OWNERS                                          = JSON.parse ( localStorage.getItem ( 'OWNERS' ) );
		var owner                                           = OWNERS[ sessionStorage.getItem ( 'hashed_login' ) ];
		
		owner.room_id                                       = JSON.parse (
			sessionStorage.getItem ( 'room_to_edit' ) ).p_id;
		
		OWNERS[ sessionStorage.getItem ( 'hashed_login' ) ] = owner;
		
		localStorage.setItem ( 'OWNERS', JSON.stringify ( OWNERS ) );
	}


function append_room_actions ()
	{
		/*INITIALLY, WHEN USER LANDS ON owner.html, WE WILL SET add_mode TO
		* TRUE, SO HE CAN SEE HOW-TO ALERT FOR THAT MODE*/
		if(!sessionStorage.room_to_edit)
			{
				sessionStorage.setItem('add_mode',true);
			}
		
		$ ( '#room_actions' ).append ( `<div class="d-flex justify-content-between">
					<div class = "  mb-2"  >
					<button id = "how_alert" class = "bg-danger text-light  no_padding mb-1 "
                        data-step="${ sessionStorage.getItem ( 'how_to' ) ? sessionStorage.getItem ( 'how_to' )
		                                                                  : "location" }"   style="cursor:pointer">
                      <i class="far fa-question-circle"></i>
                      <span class="___ need_translation" data-text="How to"></span>
                      </button >
                      
                       <button class = " mb-1 no_padding
								${ sessionStorage.getItem ( 'add_mode' ) === null ? 'bg-secondary text-light'
		                                                                          : 'bg_green text-light' }"
                           id="add_mode"
                        
                         title="Add new room" ><i class="far fa-plus-square">&nbsp;</i> <span class="___" data-text="Add new room"></span></button >
					
					<!--IF WE HAVE ROOM TO EDIT WE WILL DISPLAY CONTROLS TO INTERACT WITH THE ROOM :
					Preview, Edit, Delete, Block Dates-->
					${ ( sessionStorage.room_to_edit && sessionStorage.authorized_owner  )
		               ?
		               `
						
 					 <button class = "  no_padding  mb-1" id="room_name"
                        
                         title="${ JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name }" >
                         <i class="fas fa-signature">&nbsp;</i>&nbsp;
                        
                          ${ JSON.parse ( sessionStorage.getItem ( 'room_to_edit' ) ).p_address.property_name }</button >
                          
                      <button class = "___  mb-1 no_padding ${ sessionStorage.getItem ( 'preview_mode' ) === null
		                                                    ? 'bg-secondary text-light' : 'bg_green text-light' }  " id="preview_mode"
                        
                         data-title="Preview mode" ><i class="far fa-eye">&nbsp;</i> <span class="___" data-text="Preview"></span> </button >
                         
                      <button class = " mb-1  no_padding ${ sessionStorage.getItem ( 'edit_mode' ) === null
		                                                    ? 'bg-secondary text-light' : 'bg_green text-light' } " id="edit_mode"
                        
                         title="Edit mode" ><i class="far fa-edit">&nbsp;</i><span class="___" data-text="Edit"></span> </button >
                       
                         
                          <button class = " need_translation mb-1 no_padding ${ sessionStorage.getItem ( 'delete_mode' ) === null
		                                                        ? 'bg-secondary text-light' : 'bg_green text-light' } " id="delete_mode"
                        
                         title="Delete mode" data-room_id="${ JSON.parse (
			               sessionStorage.getItem ( 'authorized_owner' ) ).room_id }"><i class="far fa-trash-alt">&nbsp;</i><span class="___" data-text="Delete"></span> </button >
                         
                         
                         <button class = " mb-1 no_padding ${ sessionStorage.getItem ( 'block_mode' ) === null
		                                                      ? 'bg-secondary text-light' : 'bg_green text-light' } "
                         id="block_mode" data-step="block_mode"
                        
                         title="Block dates" ><i class="far fa-stop-circle">&nbsp;</i><span class="___" data-text="Block Dates"></span> </button >
                         
                         
                           <button class = " mb-1 no_padding bg_orange text-primary "
                         id="customers"
                        
                         title="Customers" ><i class="far fa-address-book">&nbsp;</i><span class="___" data-text="Customers"></span> </button >
                         <div id="customers_table"></div>

	

						` : `` }
 					
                         
                         
                        
                         
                        </div>
                        <div   >
                       
                       </div>
                  </div >
               
            
             ` );
		
	}






