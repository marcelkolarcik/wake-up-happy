const path = require ( 'path' );

var config = {
	
	module : {}
};

var index = Object.assign ( {}, config, {
	
	entry  : [
		
		'./assets/js/src/shared/getWeek.js',
		'./assets/js/src/shared/create_DB.js',
		
		'./assets/js/src/index/create_map.js',
		'./assets/js/src/index/featured_rooms.js',
		'./assets/js/src/index/location_autocomplete.js',
		'./assets/js/src/index/search_results.js',
		
		'./assets/js/src/shared/translator/translator.js',
		'./assets/js/src/shared/translator/change_language.js',
		'./assets/js/src/shared/authorizations.js',
		'./assets/js/src/shared/booking_helpers.js',
		'./assets/js/src/shared/close_div.js',
		
		
		'./assets/js/src/shared/navigation.js',
		'./assets/js/src/shared/render_room_preview.js',
		'./assets/js/src/shared/translate.js',
		'./assets/js/src/shared/room_actions.js',
		'./assets/js/src/shared/render_language_dropdown.js'
	],
	output : {
		path     : path.resolve ( __dirname, 'assets/js/dist' ),
		filename : "index.js"
	},
	watch: true
} );
var owner = Object.assign ( {}, config, {
	
	entry  : [
		'./assets/js/src/shared/getWeek.js',
		'./assets/js/src/owner/add_room_form_render.js',
		'./assets/js/src/owner/add_room_interactions.js',
		'./assets/js/src/owner/add_room_payment_form.js',
		'./assets/js/src/owner/added_room_preview.js',
		'./assets/js/src/owner/get_location.js',
		'./assets/js/src/owner/how_to_alert.js',
		'./assets/js/src/owner/render_customers.js',
		
		'./assets/js/src/shared/translator/translator.js',
		'./assets/js/src/shared/translator/change_language.js',
		
		'./assets/js/src/shared/render_room_preview.js',
		
		'./assets/js/src/shared/authorizations.js',
		'./assets/js/src/shared/navigation.js',
		'./assets/js/src/shared/room_actions.js',
		'./assets/js/src/shared/close_div.js',
		'./assets/js/src/shared/translate.js',
		'./assets/js/src/shared/render_language_dropdown.js',
		'./assets/js/src/shared/booking_helpers.js',
	],
	output : {
		path     : path.resolve ( __dirname, 'assets/js/dist' ),
		filename : "owner.js"
	},
	watch: true
} );

var admin = Object.assign ( {}, config, {
	
	entry  : [
		'./assets/js/src/admin/admin.js',
		
		'./assets/js/src/shared/translator/translator.js',
		'./assets/js/src/shared/translator/change_language.js',
		'./assets/js/src/shared/render_language_dropdown.js',
		
		'./assets/js/src/shared/authorizations.js',
		'./assets/js/src/shared/navigation.js',
		'./assets/js/src/shared/getWeek.js',
		'./assets/js/src/shared/close_div.js',
		
	],
	output : {
		path     : path.resolve ( __dirname, 'assets/js/dist' ),
		filename : "admin.js"
	},
	watch: true
} );

// Return Array of Configurations
module.exports = [
	index, owner, admin
	
];