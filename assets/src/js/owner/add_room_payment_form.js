/*RENDERING ADD_ROOM_PAYMENT FORM.
 
 IF ALREADY LOGGED IN OWNER ADDING ANOTHER ROOM,
 NO NEED FOR EMAIL AND PASSWORD*/


export function add_payment_form ()
	{
		var payment = $ ( '#payment' );
		var owner   = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) );
		
		payment.html ( '' ).append ( `
			<form id="add_room_payment_form">
   <div class = "bg_green_dark text-light text-center mt-1 mb-3" data-cy="payment_form">
    
    <span class="___ " data-text="Payment details : 99 EUR per year + 9 % of each booking."></span>
	</div >
	<div class = "row" >
    <div class = "col-md-6" >
        <div class = "col-auto" >
            <label class = "sr-only ___" for = "total_price_" data-text="Total price" ></label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-credit-card green_dark" ></i >
                    </div >
                </div >
                <input type = "text" name = "total_price"
                       class = "form-control form-control-sm  border_bottom_only green_dark bg-transparent"
                       id = "total_price_" placeholder = ""
                       value = "99"
                       required readonly >
            </div >
        </div >
       
        <div class = "col-auto" >
            <label class = "sr-only ___" for = "fullname" data-text="Full Name"></label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only green_dark" >
                        <i class = "fas fa-user green_dark" ></i >
                    </div >
                </div >
                <input type = "text" name = "name" data-cy="name"
                       class = "form-control form-control-sm border_bottom_only ___ green_dark bg-transparent"
                       id = "fullname" data-placeholder = "Full Name" value="${ owner ? owner.name : '' }" required
                        ${ owner ? 'readonly' : '' }>
            </div >
        </div >
        <!--IF ALREADY LOGGED IN OWNER ADDING ANOTHER ROOM, NO NEED FOR EMAIL AND PASSWORD-->
         ${ owner ? '' : ` <div class = "col-auto" >
            <label class = "sr-only ___" for = "email_of_user" data-text="Email"></label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-at green_dark" ></i >
                    </div >
                </div >
                <input type = "text" name = "email_of_user"
                       class = "form-control form-control-sm  border_bottom_only ___ green_dark"
                       id = "email_of_user" data-placeholder = "Email" required data-cy="email"
                       >
            </div >
        </div >` }
          <!--IF ALREADY LOGGED IN OWNER ADDING ANOTHER ROOM, NO NEED FOR EMAIL AND PASSWORD-->
       ${ owner ? '' : `<div class = "col-auto" >
            <label class = "sr-only ___" for = "password" data-text="Password"></label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                       <i class="fas fa-lock green_dark"></i>
                    </div >
                </div >
                <input type = "password" name = "password"
                       class = "form-control form-control-sm  border_bottom_only ___ green_dark"
                       id = "password" data-placeholder = "Password" data-cy="password">
            </div >
        </div >` }
        
    </div >
    <div class = "col-md-6" >
        <div class = "col-auto " >
            <label class = "sr-only ___" for = "card_holder_name" data-text="Card Holder Name:"></label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only " >
                        <i class = "far fa-user green_dark" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm
							        			border_bottom_only ___ green_dark"
							        			id = "card_holder_name" name = "card_holder_name"
                       data-placeholder = "Card Holder Name" required data-cy="card_holder_name">
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only ___" for = "card_number" data-text="Card Number"></label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-credit-card green_dark" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm  border_bottom_only ___ green_dark"
                       id = "card_number" data-placeholder = "Card Number" name = "card_number" data-cy="card_number" required >
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only ___" for = "cvv" data-text="CVV"></label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-credit-card green_dark" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm  border_bottom_only ___ green_dark"
                       id = "cvv" data-placeholder = "CVV" required name = "cvv" data-cy="cvv" >
            </div >
        </div >
        <div class = "col-auto text-center" >
            <div id = "loader_holder" ></div >
            <a  class = "btn bg_green_dark text-light horizontally_aligned right-block ___"
                    id="pay_for_the_room"
                    data-title = "Payment"
                    data-text="Payment"
                    data-cy="pay_for_the_room">
               
            </a >
        </div >
    </div >
</div >
</form>
   ` );
	}
