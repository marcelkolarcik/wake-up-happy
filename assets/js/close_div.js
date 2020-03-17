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


/*FUNCTION TO DETERMINE WHETHER TO SHOW OR CLOSE initial_locations DIV ON focusin
 *
 * EVERY INPUT FIELD IN SEARCH FORM ON index.html HAS DATA ATTRIBUTE data-add_in_lo
 *                                                                   ( in_lo => short for initial_locations)
 * AND IT CAN BE true or false :
 *
 *  1.  locations INPUT HAS data-add_in_lo = true
 *  2.  board_type, room_type, search_btn ALL HAVE
 *      data-add_in_lo = false
 *
 *      SO IF USER FOCUSES INTO location FIELD WE WILL DISPLAY LITTLE INFO
 *      ABOUT INITIAL autocomplete_locations IF IT'S NOT SET AS don't display again
 *
 *      AND IF USER FOCUSES INTO, board_type, room_type, search_btn
 *      WE WILL REMOVE INFO DIV*/
function initial_locations ( add = true )
	{
		if ( !sessionStorage.getItem ( 'initial_locations' ) )
			{
				var initial = $ ( '#initial_locations' );
				add ? initial.fadeIn ( 1000 ).removeClass ( 'd-none' ) : initial.fadeOut ( 350 );
			}
		
		
	}


/*  ON FOCUSING INTO SEARCH INPUT FIELDS,
 *  DEPENDING ON DATA ATTRIBUTE add_in_lo
 *  SHOWING OF HIDING INFO DIV*/
$ ( document ).on ( 'focusin', '.add_initial_locations', function ()
{
	var add = $ ( this ).data ( 'add_in_lo' );
	
	initial_locations ( add );
} );


/*  WHEN USER CLICKS ON BUTTON WITH .close_div CLASS
 *  WE WILL DATA ATTRIBUTES :
 *   1.  data-div => WHICH DIV TO CLOSE
 *   2. data-per    =>  FOR HOW LONG TO KEEP DIV CLOSED :
 *    */
$ ( document ).on ( 'click', '.close_div', function ()
{
	var per = $ ( this ).data ( 'per' );
	var div = $ ( this ).data ( 'div' );
	
	/*IF USER CLICKS ON x BUTTON , REMOVING DIV FROM THE VIEW*/
	if ( per === 'view' )
		{
			$ ( '#' + div ).remove ();
		}
	
	/*IF USER CLICKS ON don't show again BUTTON , REMOVING DIV FROM THE VIEW
	 * AND SETTING DIV NAME TO sessionStorage FOR LATER CHECK, WHETHER TO
	 * DISPLAY IT OR NOT*/
	else if ( per === 'session' )
		{
			sessionStorage.setItem ( div, true );
			$ ( '#' + div ).fadeOut ( 350 );
		}
	
	
} );


/*CHECKING WHETHER TO DISPLAY HELLO MESSAGE TO LANDLORDS OR AUTOCOMPLETE LOCATIONS*/
( function ()
	{
		
		var divs_to_show = [ 'hello', 'initial_locations' ];
		
		$.each ( divs_to_show, function ( key, div )
		{
			/*IF ANY OF THE DIVS ARE IN THE sessionStorage, WE WILL HIDE
			 * IT FROM THE VIEW*/
			
			if ( sessionStorage.getItem ( div ) )
				{
					$ ( '#' + div ).addClass ( 'd-none' );
				}
		} );
		
		
	} ) ();