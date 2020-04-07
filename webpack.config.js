/*
 *
 * AS I NEEDED TO OUTPUT DIFFERENT JS FILES TO DIFFERENT HTML PAGES*
 * FILES, I FOUND SOLUTION AT
 *
 *
 * https://stackoverflow.com/questions/35903246/how-to-create-multiple-output-paths-in-webpack-config
 */
const path = require ( 'path' );

var config = {
	
	module : {}
};

var index = Object.assign ( {}, config, {
	
	entry  : [
		'./assets/src/js/shared/redirect_admin.js',
		'./assets/src/js/shared/getWeek.js',
		'./assets/src/js/shared/create_DB.js',
		
		'./assets/src/js/index/create_map.js',
		'./assets/src/js/index/featured_rooms.js',
		'./assets/src/js/index/location_autocomplete.js',
		'./assets/src/js/index/search_results.js',
		
		
		'./assets/src/js/shared/translator/change_language.js',
		'./assets/src/js/shared/authorizations.js',
		'./assets/src/js/shared/booking_helpers.js',
		'./assets/src/js/shared/close_div.js',
		'./assets/src/js/shared/render_testimonials.js',
		'./assets/src/js/shared/render_footer.js',
		
		
		'./assets/src/js/shared/navigation.js',
		'./assets/src/js/shared/render_room_preview.js',
		'./assets/src/js/shared/translate.js',
		'./assets/src/js/shared/room_actions.js',
		'./assets/src/js/shared/render_language_dropdown.js',
		'./assets/src/js/shared/translator/translator.js'
	],
	output : {
		path     : path.resolve ( __dirname, 'assets/dist/js' ),
		filename : "index.js"
	},
	watch  : true
} );
var owner = Object.assign ( {}, config, {
	
	entry  : [
		'./assets/src/js/shared/redirect_admin.js',
		'./assets/src/js/shared/getWeek.js',
		'./assets/src/js/owner/add_room_form_render.js',
		'./assets/src/js/owner/add_room_interactions.js',
		'./assets/src/js/owner/add_room_payment_form.js',
		'./assets/src/js/owner/added_room_preview.js',
		'./assets/src/js/owner/get_location.js',
		'./assets/src/js/owner/how_to_alert.js',
		'./assets/src/js/owner/render_customers.js',
		
		
		'./assets/src/js/shared/translator/change_language.js',
		
		'./assets/src/js/shared/render_room_preview.js',
		
		'./assets/src/js/shared/authorizations.js',
		'./assets/src/js/shared/navigation.js',
		'./assets/src/js/shared/room_actions.js',
		'./assets/src/js/shared/close_div.js',
		'./assets/src/js/shared/translate.js',
		'./assets/src/js/shared/render_language_dropdown.js',
		'./assets/src/js/shared/booking_helpers.js',
		'./assets/src/js/shared/render_testimonials.js',
		'./assets/src/js/shared/render_footer.js',
		'./assets/src/js/shared/translator/translator.js'
	],
	output : {
		path     : path.resolve ( __dirname, 'assets/dist/js' ),
		filename : "owner.js"
	},
	watch  : true
} );

var admin = Object.assign ( {}, config, {
	
	entry  : [
		'./assets/src/js/admin/admin.js',
		
		
		'./assets/src/js/shared/translator/change_language.js',
		'./assets/src/js/shared/render_language_dropdown.js',
		
		'./assets/src/js/shared/authorizations.js',
		'./assets/src/js/shared/navigation.js',
		'./assets/src/js/shared/getWeek.js',
		'./assets/src/js/shared/close_div.js',
		'./assets/src/js/shared/render_footer.js',
		'./assets/src/js/shared/translator/translator.js'
	
	],
	output : {
		path     : path.resolve ( __dirname, 'assets/dist/js' ),
		filename : "admin.js"
	},
	watch  : true
} );

var cleared = Object.assign ( {}, config, {
	
	entry  : [
		'./assets/src/js/shared/render_footer.js',
		'./assets/src/js/cleared.js'
	
	
	],
	output : {
		path     : path.resolve ( __dirname, 'assets/dist/js' ),
		filename : "cleared.js"
	},
	watch  : true
} );


// Return Array of Configurations
module.exports = [
	index, owner, admin, cleared

];