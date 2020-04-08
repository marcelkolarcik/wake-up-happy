/*ADDING LITTLE INFO TO FIRST TIME USER ABOUT INITIAL AUTOCOMPLETE LOCATIONS
 ON index.html
 AND MESSAGE TO LANDLORDS IN IRELAND ON owner.html
 
 * IF IT IS DISPLAYING   =>  USER HAS TWO OPTIONS :
 *
 *   1. OPTION OF CLOSING DIV PER VIEW ( x BUTTON)
 *   2. OPTION OF CLOSING DIV PER SESSION ( don't show again BUTTON)
 *
 * EVERY BUTTON HAS 2 DATA ATTRIBUTES :
 *
 *  1.  data-div => DIV TO CLOSE
 *  2.  data-per => IT COULD BE :
 *
 *                  a.  view => CLOSES DIV PER VIEW
 *                              DIV WILL REAPPEAR AFTER PAGE RELOAD
 *
 *                  b.  session =>  CLOSES DIV PER SESSION
 *                                  DIV WILL REAPPEAR AFTER CLOSING AND
 *                                  REOPENING BROWSER AGAIN
 */






/*  WHEN USER CLICKS ON BUTTON WITH .close_div CLASS
 *  WE WILL DATA ATTRIBUTES :
 *   1.  data-div => WHICH DIV TO CLOSE
 *   2. data-per    =>  FOR HOW LONG TO KEEP DIV CLOSED :
 *    */
$ ( document ).on ( 'click', '.close_div', function ()
{
	var per = $ ( this ).data ( 'per' );
	var div = $ ( this ).data ( 'div' );
	
	
	/*IF USER CLICKS ON x BUTTON , CLEARING DIV FROM THE VIEW*/
	if ( per === 'now' )
		{
			$ ( '#' + div ).html ( '' );
		}
	
	/*IF USER CLICKS ON x BUTTON , REMOVING DIV FROM THE VIEW*/
	if ( per === 'view' )
		{
			$ ( '#' + div ).remove ();
		}
	
	/*IF USER CLICKS ON don't show again BUTTON , REMOVING DIV FROM THE VIEW
	 * AND SETTING DIV NAME TO localStorage FOR LATER CHECK, WHETHER TO
	 * DISPLAY IT OR NOT*/
	else if ( per === 'session' ) /*" session" might be misleading.....*/
		{
			localStorage.setItem ( div, true );
			$ ( '#' + div ).fadeOut ( 350 );
		}
	
	console.log(div)
} );


/*CHECKING WHETHER TO DISPLAY HELLO MESSAGE TO LANDLORDS OR AUTOCOMPLETE LOCATIONS*/
( function ()
	{
		
		var divs_to_show = [ 'hello', 'initial_locations' ];
		
		$.each ( divs_to_show, function ( key, div )
		{
			/*IF ANY OF THE DIVS ARE IN THE localStorage, WE WILL HIDE
			 * IT FROM THE VIEW*/
			
			if ( localStorage.getItem ( div ) )
				{
					$ ( '#' + div ).addClass ( 'd-none' );
				}
		} );
		
		
	} ) ();