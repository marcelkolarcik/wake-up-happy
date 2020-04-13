/*ADMIN DASHBOARD
 *
 * ADMIN CAN PREVIEW NEWLY CREATED ROOMS
 *
 * ADMIN CAN DISABLE / ENABLE ANY OF THE NEWLY CREATED ROOMS
 *
 * ADMIN CAN SEE OWNERS DETAILS TO CONTACT THEM*/

import { render_room_preview } from "../shared/render_room_preview.js";
import { translate }           from "../shared/translator/translator.js";


( function ()
	{
		
		
		if ( localStorage.admin )
			{
				$ ( '#admin' ).prepend ( `<h4>Welcome admin</h4> <p>Newly added rooms:</p>` );
				
				
				/*TO DISABLE OR ENABLE ROOM*/
				//var room = JSON.parse(localStorage.ROOMS)[96];
				//room.wuh_disabled = false;
				
				
				var ROOMS  = JSON.parse ( localStorage.ROOMS );
				var OWNERS = localStorage.OWNERS ? JSON.parse ( localStorage.OWNERS ) : null;
				
			
				/*GETTING ROOMS ADDED BY OWNERS
				 *
				 * WE HAVE 96 DEFAULT ROOMS CREATED
				 * INITIALLY, SO WE ARE OMITTING THOSE*/
				var new_rooms = ROOMS.reverse();;
				
				
				var rooms_div = $ ( '#rooms' );
				
				
				$.each ( new_rooms, function ( key, room )
				{
					
					/*IF WE HAVE room AND owner WE WILL DISPLAY IT*/
					if ( room )
						{
							/*IF WE DON'T HAVE ANY OWNERS ON THE SITE YET, WE WILL
							 * DISPLAY name and email AS DEFAULT NAME AND DEFAULT EMAIL + ROOM id*/
							var owner = !OWNERS ? null : OWNERS[ room.owner_id ];
							
							rooms_div.append ( `<div class="row no-gutters" data-cy="added_rooms">

											<div class = "list-group  list-group-horizontal-md tabs col-md-12"   data-cy="admin_room_${ room.p_id }" >
								            
								                <a class = "list-group-item list-group-item-action nav_link_property"
								                   
								                    >  <i class="fas fa-signature">&nbsp;</i> &nbsp;${ room.p_address.property_name }</a >
								                   
								                <a class = "list-group-item list-group-item-action nav_link_property "
								                  ><i class="fas fa-user">&nbsp;</i> &nbsp;${ owner ? owner.name
							                                                                        : 'Default Owner '
							                                                                          + room.p_id }</a >
								                  
								                <a class = "list-group-item list-group-item-action nav_link_property "
								                  ><i class="fas fa-at">&nbsp;</i> &nbsp;${ owner ? owner.email
							                                                                      : 'default@email.'
							                                                                        + room.p_id }
								                   </a >
								                    <a class="btn btn-sm bg_green text-light preview_room nav_link_property ___"
										            data-text="preview"
										            data-cy="preview_added_room_${ room.p_id }"
										         data-room_id="${ room.p_id }"
										 ></a>
								                
								                
								                <a class="btn btn-sm bg-danger text-light nav_link_property ${ room.wuh_disabled
							                                                                                   ? `d-none`
							                                                                                   : `` } disable_${ room.p_id } room_action ___"
										            data-text="DISABLE"
										         data-room_id="${ room.p_id }"
										         data-disabled="true"
										          data-opposite="enable"
										           data-cy="disable_room_${ room.p_id }"
										         
										 ></a>
										 
										 <a class="btn btn-sm bg_orange text-primary nav_link_property ${ !room.wuh_disabled
							                                                                              ? `d-none`
							                                                                              : `` }    enable_${ room.p_id } room_action ___"
										  data-text="ENABLE"
										         data-room_id="${ room.p_id }"
										         data-disabled="false"
										         data-opposite="disable"
										         data-cy="enable_room_${ room.p_id }"
										 ></a>
								            
								            
								            </div >

											
											
											 <div class="room_preview" id="room_preview_${ room.p_id }"></div>
										</div>
										<span class="p-1"></span> ` );
						}
					
					
				} );
				
				
			}
		
		$ ( document ).on ( 'click', '.preview_room', function ()
		{
			var room_id = $ ( this ).data ( 'room_id' );
			
			/*CLEARING ANY PREVIOUSLY RENDERED ROOM*/
			$ ( '.room_preview' ).html ( '' );
			
			/*RENDERING THE ROOM PREVIEW*/
			render_room_preview ( ROOMS[ room_id ], 'room_preview_' + room_id );
			
			$ ( '#room_preview_' + room_id ).prepend ( `
            <span
		            class = "btn btn-sm text-danger float-right btn-warning mr-2 close_div ___"
		            data-div = "${ 'room_preview_' + room_id }"
		            data-per = "now"
		            data-text = "x"
		            data-cy="close_preview"
		            data-title = "Close it for now."
		            id = "close"
            >
            </span > <br>` );
			
			/*TRANSLATING ROOM'S DETAILS*/
			translate ();
		} );
		
		/*IF ROOM IS ENABLED, WE WILL SHOW DISABLE BUTTON
		 * AND OPPOSITE, IF ROOM IS DISABLED, WE WILL SHOW
		 * ENABLE BUTTON*/
		$ ( document ).on ( 'click', '.room_action', function ()
		{
			var room_id  = $ ( this ).data ( 'room_id' );
			var disabled = $ ( this ).data ( 'disabled' );
			var opposite = $ ( this ).data ( 'opposite' );
			
			$ ( this ).addClass ( 'd-none' );
			$ ( '.' + opposite + '_' + room_id ).removeClass ( 'd-none' );
			
			
			/*TO DISABLE OR ENABLE ROOM*/
			var room          = ROOMS[ room_id ];
			room.wuh_disabled = disabled;
			ROOMS[ room_id ]  = room;
			
			/*UPDATE room IN ROOMS in localStorage*/
			localStorage.setItem ( 'ROOMS', JSON.stringify ( ROOMS ) );
			
			/*CONFIRMING ACTION TO ADMIB*/
			swal.fire ( {
				            html : `
										<span class="nav_link_property">
										<i class="fas fa-signature"></i>  &nbsp;
													${ room.p_address.property_name }
										</span>
				                          <hr class="${ disabled ? `bg-danger` : `bg_green` }">
										<span class="___ ${ disabled ? `bg-danger text-light` : `bg_green text-light` } p-2"
																data-text="${ disabled ? `was disabled` : `was enabled` }">
										</span>
											<hr class="${ disabled ? `bg-danger` : `bg_green` }">
										<a class="btn btn-sm bg_green_dark text-light pl-3 pr-3"
													onclick="swal.close();"
													data-cy="dismiss_alert"
													title="Dismiss">
													OK
										</a>`,
				
							showConfirmButton:false
									
												
		
			            } );
			translate ();
			
		} );
		
	} ) ();