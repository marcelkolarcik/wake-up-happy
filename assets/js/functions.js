//toggling  content of room details part of the form
$( document ).on( "click", ".show_content", function () {
	
	var hidden_class = $( this ).data( 'hidden_class' );
	
	$( '.' + hidden_class ).toggleClass( 'd-none' );
} );
//toggling size of images on form
$( document ).on( "click", ".form_image", function () {
	
	$( this ).parent().toggleClass( 'col-md-2' );
	
} );
// showing input for board price only when user selects board. removing input when user deselects board
$( document ).on( "click", ".board_type", function () {
	
	var board_type = $(this).data('board_type');
	var board_div = $('#board_type_'+board_type);
	var board_price =  $('#board_price_'+board_type);
	
	
	if($(this). is(":checked")) {
		
		board_div.append(`<input title = "price" type = "number" name = "board_type_${board_type}_price" id="board_price_${board_type}"
                                       placeholder = "price" class = "ml-1 form-control"  value="">
                            </div >`);
	}
	else if($(this). is(":not(:checked)"))
	{
		
		board_price.remove();
	}
	
	
} );
