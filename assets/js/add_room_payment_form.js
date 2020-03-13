/*RENDERING ADD_ROOM_PAYMENT FORM,
IF ALREADY LOGGED IN OWNER ADDING ANOTHER ROOM,
 NO NEED FOR EMAIL AND PASSWORD*/


function add_room_payment_form ()
{
	var payment = $('#payment');
	var owner = JSON.parse(sessionStorage.getItem('authorized_owner')) ;
	
	payment.html('').append(`
			<form id="add_room_payment_form">
   <div class = "bg_green text-light text-center mt-1 mb-3" >
    Payment details : 99 EUR per year + 9 % of each booking.
	</div >
	<div class = "row" >
    <div class = "col-md-6" >
        <div class = "col-auto" >
            <label class = "sr-only" for = "total_price_" >Total price</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-credit-card" ></i >
                    </div >
                </div >
                <input type = "text" name = "total_price"
                       class = "form-control form-control-sm  border_bottom_only bg_green_light"
                       id = "total_price_" placeholder = ""
                       value = "99"
                       required readonly >
            </div >
        </div >
       
        <div class = "col-auto" >
            <label class = "sr-only" for = "fullname" >Full Name</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-user" ></i >
                    </div >
                </div >
                <input type = "text" name = "name"
                       class = "form-control form-control-sm border_bottom_only"
                       id = "fullname" placeholder = "Full Name" value="${owner ? owner.name: ''}" required
                        ${owner ? 'readonly': ''}>
            </div >
        </div >
        <!--IF ALREADY LOGGED IN OWNER ADDING ANOTHER ROOM, NO NEED FOR EMAIL AND PASSWORD-->
         ${owner ? '': ` <div class = "col-auto" >
            <label class = "sr-only" for = "email_of_user" >Email</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-at" ></i >
                    </div >
                </div >
                <input type = "text" name = "email_of_user"
                       class = "form-control form-control-sm  border_bottom_only"
                       id = "email_of_user" placeholder = "Email" required
                       >
            </div >
        </div >`}
          <!--IF ALREADY LOGGED IN OWNER ADDING ANOTHER ROOM, NO NEED FOR EMAIL AND PASSWORD-->
       ${owner ? '': `<div class = "col-auto" >
            <label class = "sr-only" for = "password" >Password</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                       <i class="fas fa-lock"></i>
                    </div >
                </div >
                <input type = "password" name = "password"
                       class = "form-control form-control-sm  border_bottom_only"
                       id = "password" placeholder = "Password" >
            </div >
        </div >`}
        
    </div >
    <div class = "col-md-6" >
        <div class = "col-auto " >
            <label class = "sr-only" for = "card_holder_name" >Card Holder Name:</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-user" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm
							        			border_bottom_only" id = "card_holder_name" name = "card_holder_name"
                       placeholder = "Card Holder Name" required >
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only" for = "card_numder" >Card Number</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "far fa-credit-card" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                       id = "card_numder" placeholder = "Card Number" name = "card_number" required >
            </div >
        </div >
        <div class = "col-auto" >
            <label class = "sr-only" for = "cvv" >CVV</label >
            <div class = "input-group mb-2" >
                <div class = "input-group-prepend" >
                    <div class = "input-group-text bg-transparent border_bottom_only" >
                        <i class = "fas fa-credit-card" ></i >
                    </div >
                </div >
                <input type = "text" class = "form-control form-control-sm  border_bottom_only"
                       id = "cvv" placeholder = "CVV" required name = "cvv" >
            </div >
        </div >
        <div class = "col-auto text-center" >
            <div id = "loader_holder" ></div >
            <a  class = "btn bg_green_light horizontally_aligned right-block " id="pay_for_the_room"
                    title = "Submit & Pay" >
                Pay
            </a >
        </div >
    </div >
</div >
</form>
   `);
}
