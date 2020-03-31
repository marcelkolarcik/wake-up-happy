/*FUNCTION TO RENDER / APPEND AMENITIES THAT ROOM CAN PROVIDE TO ROOM PREVIEW*/

export function render_amenities ( property )
	{
		
		/*AMENITIES DIV*/
		var amenities_div = $ ( '#amenities_' + property.p_id );
		
		/*LIST OF AMENITIES FROM localStorage*/
		var amenities_list = JSON.parse ( localStorage.getItem ( 'amenities_list' ) );
		
		$.each ( property.amenities, function ( index, value )
		{
			
			/*WHEN CREATING DEFAULT ROOMS IN create_DB.js , I OPTED FOR 15 AMENITIES PER ROOM,
			 * SO ON ROOM PREVIEW, IN AMENITIES TAB I WANTED TO DISPLAY THEM IN 3 COLUMNS,
			 *
			 * WHEN WE'RE APPENDING FIRST AMENITY, WE WILL ALSO CREATE 3 X   <div class = "col-md-4" ></div >
			 * WITH  :
			 *       <ul class = "list-group" id = "first_${property.p_id}" > </ul >
			 *       <ul class = "list-group" id = "second_${property.p_id}" > </ul >
			 *       <ul class = "list-group" id = "third_${property.p_id}" > </ul >
			 *
			 * AND THEN IN A LOOP WE APPEND 5 AMENITIES TO EACH  ul         */
			if ( index === 0 )
				{
					amenities_div.append ( ` <span class="___" data-text="translation"></span>
			<div class = "row mt-3 no-gutters" >
			    <div class = "col-md-4 " >
			        <ul class = "list-group" id = "first_${ property.p_id }" >
			            <li class = "list-group-item no_border p-2" ><input type = "checkbox" checked disabled > <span class="___" data-text="${ amenities_list[ value ] }"></span>
			            </li >
			        </ul >
			    </div >
			    <div class = "col-md-4" >
			        <ul class = "list-group" id = "second_${ property.p_id }" >
			        </ul >
			    </div >
			    <div class = "col-md-4" >
			        <ul class = "list-group" id = "third_${ property.p_id }" >
			        </ul >
			    </div >
			</div >
			` );
				
				}
			else if ( index < 5 )
				{
					$ ( '#first_' + property.p_id ).append (
						`<li class="list-group-item no_border p-2"><input type="checkbox" checked disabled><span class="___" data-text="${ amenities_list[ value ] }"></span> </li>` );
				}
			else if ( index < 10 )
				{
					$ ( '#second_' + property.p_id ).append (
						`<li class="list-group-item no_border p-2"><input type="checkbox" checked disabled> <span class="___" data-text="${ amenities_list[ value ] }"></li>` );
				}
			else
				{
					$ ( '#third_' + property.p_id ).append (
						`<li class="list-group-item no_border p-2"><input type="checkbox" checked disabled> <span class="___" data-text="${ amenities_list[ value ] }"></li>` );
				}
		} );
		
	}