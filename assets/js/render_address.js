export function render_address ( room ) {
	var total = Object.keys ( room.p_address ).length;
	var div = $ ( '#address' + room.p_id );
	var div_form = $ ( '#form_address' + room.p_id );
	
	var e = 0;
	var address = '';
	$.each ( room.p_address, function ( key, value ) {
		
		
		if(e === total - 1){
			
			div.append ( `${ value}	` );
			address += `<b>`+ key.replace('_',' ')+`</b>`+' : '+ value ;
		}
		else{
			
			div.append ( `${ value + ','}` );
			address += `<b>`+  key.replace('_',' ')+`</b>`+' :'+value+',';
		}
		
		e++;
		
	} );
	
	div_form.val(address) ;
}