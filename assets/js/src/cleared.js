(function (  )
	{
		/*CLEARING localStorage AND sessionStorage ON USER EXITING THE SITE*/
		localStorage.removeItem ( 'ROOMS_created' );
		localStorage.removeItem ( 'ROOMS' );
		localStorage.removeItem ( 'OWNERS' );
		localStorage.removeItem ( 'CUSTOMERS' );
		localStorage.removeItem ( 'autocomplete_searchables' );
		localStorage.removeItem ( 'hello' );
		localStorage.removeItem ( 'initial_locations' );
		localStorage.removeItem ( 'language' );
		sessionStorage.clear();
		location.replace ( 'cleared.html' );
	})();