$ ( function ()
    {
	
	    $ ( '#user' ).append ( `<a class = " dropdown-toggle caret-off " href = "#" id = "initials"
                               data-toggle = "dropdown" aria-haspopup = "true" aria-expanded = "false" >
                                <div id="initials" class="user_initials d-flex justify-content-center align-items-center">
                                <i class="fa fa-user green"></i>
                                </div>
                            </a >
                            
                            <div class = "dropdown-menu dropdown-menu-right" id="user_drop_down" aria-labelledby = "initials" >
                                <h6 class = "dropdown-header"  id = "owner_name">
                                 <i class="fa fa-user  text-secondary "></i> &nbsp;</h6 >
                                <div class = "dropdown-divider" ></div >
                                ${ !sessionStorage.getItem ( 'authorized_owner' ) ?
	                               ` <a id = "login_details" class = "dropdown-item" href = "#" title = "Login form" >Owner Login</a >`
	                                                                              :
	                               `` }
                            </div >` );

//  IF OWNER LOGS IN INTO HIS ACCOUNT WE WILL DISPLAY HIS INITIALS
	
	    if ( sessionStorage.getItem ( 'authorized_owner' ) )
		    {
			
			    var full_name    = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).name;
			    var owner_name_a = full_name.split ( ' ' );
			    var initials     = owner_name_a.map ( user_initial ).join ( '' );
			    $ ( '.user_initials' ).text ( initials );


// GETTING INITIALS OF USER NAME
			    function user_initial ( str )
				    {
					    return str.charAt ( 0 ).toUpperCase ();
				    }
			
			
			    var user_drop_down = $ ( '#user_drop_down' );
			
			    user_drop_down.append ( `
                                
                                <span  class = "dropdown-header bg-secondary text-light"   >My rooms</span >` );
			
			
			    var ROOMS    = JSON.parse ( localStorage.getItem ( 'ROOMS' ) );
			    var room_ids = JSON.parse ( sessionStorage.getItem ( 'authorized_owner' ) ).room_ids;
			
			    if ( room_ids.length === 0 )
				    {
					    user_drop_down.append ( `
                               
                                <a class = "dropdown-header"
                                title = "No rooms yet" >No rooms yet</a >
								` );
				    }
//AND WE WILL APPEND NAMES OF ALL ROOMS HE HAS ADDED. SO THAT HE CAN SWITCH BETWEEN THEM FROM NAVIGATION
			
			    $.each ( room_ids, function ( key, value )
			    {
				    var room = ROOMS[ value ];
				    if ( room )
					    {
						
						    user_drop_down.append ( `
                                
                                <a id = "${ value }" class = "dropdown-item room_switch" href = "#"
                                title = "Switch to ${ room.p_address.property_name }" >${ room.p_address.property_name }</a >` );
					    }
				
				
			    } );


//AND WE WILL ADD LINK TO LOGOUT
			
			    user_drop_down.append ( `
                                 <div class = "dropdown-divider" ></div >
                                <a id = "logout" class = "dropdown-item bg_orange_light" href = "#" title = "Logout" >Logout</a >` );
			
			
			    $ ( '#owner_name' ).append (
				    `<a href="/owner.html" class="nav_link_property dashboard_link" title="Dashboard">${ full_name }</a>` );
			
			    $ ( '#add_room' ).remove ();
			    $ ( '#login_details' ).remove ();
			
		    }
	
    } );

$ ( document ).on ( 'click', '#make_money', function ()
{
	
	swal.fire ( {
//		width: ($(window).width() - 20) ,
		            html              : `
<div id = "revenue" >
    <span class = "btn btn-sm text-danger float-right btn-warning" onclick = "swal.close()" >x</span >
    <h1 >
        Rent-a-Room Relief
    </h1 >
    <h2 >What conditions must be met?</h2 >
    <p >For you to qualify for Rent-a-Room Relief in Ireland the following conditions must be met:</p >
    <ul class = "list-group list-group-flush mb-3" >
        <li class = "list-group-item list-group-item-secondary mb-1" >the gross income from the rent must be below the exemption limit</li >
        <li class = "list-group-item list-group-item-secondary mb-1" >there must be a minimum continuous-letting period (with exceptions)</li >
        <li class = "list-group-item list-group-item-secondary" >the room must be in a &rsquo;qualifying residence&rsquo;.</li >
    </ul >
    <h3 >Exclusions</h3 >
    <p >You cannot claim the relief against income received for the use of the room or rooms from:</p >
    <ul class = "list-group list-group-flush mb-3" >
        <li class = "list-group-item list-group-item-secondary mb-1" > your child or civil partner</li >
        <li class = "list-group-item list-group-item-secondary mb-1" > an employer</li >
        <li class = "list-group-item list-group-item-secondary " > short-term guests (including those who book accommodation through online booking
                                       sites).
        </li >
    </ul >
    <p class = "card-title" >Note</p >
    <p >The relief can apply to lettings used as residential accommodation for students in an
                            academic year or term.</p >
    <h2 >Exemption limit</h2 >
    <p >There is an annual exemption limit for Rent-a-Room Relief.&nbsp;This limit applies to the gross amount of
        <a title = "Irish rental income" class = "sys_0 sys_t0"
           href = "https://www.revenue.ie/en/property/rental-income/irish-rental-income/index.aspx" >income</a >&nbsp;received
        for the room or rooms in your home.</p >
    <table class = "table table-sm table-dark" >
        <caption >Annual exemption limit for Rent-a-Room Relief</caption >
        <thead >
        <tr >
            <th >Year</th >
            <th >Income amount exempt</th >
        </tr >
        </thead >
        <tbody >
        <tr >
            <td >
                <p >2015</p >
            </td >
            <td >
                <p >&euro;12,000</p >
            </td >
        </tr >
        <tr >
            <td >
                <p >2016</p >
            </td >
            <td >
                <p >&euro;12,000</p >
            </td >
        </tr >
        <tr >
            <td >
                <p >2017</p >
            </td >
            <td >
                <p >&euro;14,000</p >
            </td >
        </tr >
        <tr >
            <td >
                <p >2018</p >
            </td >
            <td >
                <p >&euro;14,000</p >
            </td >
        </tr >
        <tr >
            <td >
                <p >2019</p >
            </td >
            <td >
                <p >&euro;14,000</p >
            </td >
        </tr >
        </tbody >
    </table >
    <p >The gross income is the total income before you deduct expenses.&nbsp;</p >
    <p >Expenses include the maintenance of the room let and
        <a target = "_blank" title = "Capital allowances and deductions" class = "sys_0 sys_t0"
           href = "https://www.revenue.ie/en/companies-and-charities/corporation-tax-for-companies/corporation-tax/capital-allowances-and-deductions.aspx" >
           capital allowances</a >
        due on fixtures and fittings.</p >
    <p >If your gross rental income does not exceed the exemption limit, you do not pay:</p >
    <ul class = "list-group list-group-flush mb-3" >
        <li class = "list-group-item list-group-item-secondary mb-1" ><a target = "_blank" title = "Calculating your Income Tax" class = "sys_0 sys_t0"
                                          href = "https://www.revenue.ie/en/jobs-and-pensions/calculating-your-income-tax/index.aspx" >
                                          Income Tax&nbsp;(IT)</a >
        </li >
        <li class = "list-group-item list-group-item-secondary mb-1" ><a target = "_blank" class = "external-links"
                                          title = "Pay Related Social Insurance"
                                          href = "http://www.welfare.ie/en/Pages/PRSI---Pay-Related-Social-Insurance---Contributions-and-Clas.aspx" >
                                          Pay Related Social Insurance (PRSI)</a >
        </li >
        <li class = "list-group-item list-group-item-secondary" ><a target = "_blank" title = "What is USC?" class = "sys_0 sys_t0"
                                          href = "https://www.revenue.ie/en/jobs-and-pensions/usc/what-is-usc.aspx" >
                                          Universal Social Charge (USC)</a >.
        </li >
    </ul >
    <p >If the gross rental income does exceed the exemption limit, the total amount of income is taxed.</p >
    <h2 >Minimum continuous letting period</h2 >
    <p >From 1 January 2019, the relief does not apply to income arising from letting periods which do not exceed 28
        consecutive days.</p >
    <h3 >Exceptions</h3 >
    <p >Relief will apply to shorter term residential accommodation which is not leisure or business , for example:</p >
    <ul class = "list-group list-group-flush mb-3" >
        <li class = "list-group-item list-group-item-secondary mb-1" >lettings for respite care for incapacitated individuals</li >
        <li class = "list-group-item list-group-item-secondary mb-1" >accommodation for full or part time students, including language students,</li >
        <li class = "list-group-item" >four-day-a-week &lsquo;digs&rsquo;.</li >
    </ul >
   
    <button class="btn btn-secondary text-light" onclick="swal.close()" title="Good to know !">OK</button>
    <hr class="bg-secondary">
     <small >source:
        <a target = "_blank"
           href = "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/land-and-property/rent-a-room-relief/what-conditions-must-be-met.aspx" >
            Revenue.ie</a >
    </small >
</div >`,
		            showConfirmButton : false
	            } );
	
} );