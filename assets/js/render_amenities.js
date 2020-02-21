export function render_amenities( property ) {
	
	var amenities = $( '#amenities_' + property.p_id );
	var amenities_list = JSON.parse( localStorage.getItem( 'amenities_list' ) );
	
	$.each( property.amenities, function ( index, value ) {
		
		if ( index === 0 ) {
			amenities.append( `
			<div class = "row mt-3 no-gutters" >
			    <div class = "col-md-4 " >
			        <ul class = "list-group" id = "first_${property.p_id}" >
			            <li class = "list-group-item no_border p-2" ><input type = "checkbox" checked disabled > ${amenities_list[
							index ]}
			            </li >
			        </ul >
			    </div >
			    <div class = "col-md-4" >
			        <ul class = "list-group" id = "second_${property.p_id}" >
			        </ul >
			    </div >
			    <div class = "col-md-4" >
			        <ul class = "list-group" id = "third_${property.p_id}" >
			        </ul >
			    </div >
			</div >
			` );
			
		}
		else if ( index < 5 ) {
			$( '#first_' + property.p_id ).append( `<li class="list-group-item no_border p-2"><input type="checkbox" checked disabled> ${amenities_list[ index ]}</li>` )
		}
		else if ( index < 10 ) {
			$( '#second_' + property.p_id ).append( `<li class="list-group-item no_border p-2"><input type="checkbox" checked disabled> ${amenities_list[ index ]}</li>` )
		}
		else {
			$( '#third_' + property.p_id ).append( `<li class="list-group-item no_border p-2"><input type="checkbox" checked disabled> ${amenities_list[ index ]}</li>` )
		}
	} );
	
}