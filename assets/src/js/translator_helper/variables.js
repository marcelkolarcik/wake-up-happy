var user_name = "Marcel";
var city      = "Cork";
$ ( '#variable_text' ).append ( ` <span class="___"
                                            data-text="This user's name is |user and he is from |city"
                                            data-user="${ user_name }"
                                            data-city="${ city }"
                                           >
</span>` );


var first_variable  = 'Marcel';
var second_variable = 'Cork';
var gender  =   'male';

$ ( '#multi_variable_text' ).append ( ` <span class="___"
                                            data-text="This user's name is |user and he is from |city and he is :gender"
                                            data-user="${ first_variable }"
                                            data-city="${ second_variable }"
                                            data-gender="${gender}"
                                          
                                           
                                           >
</span>` );
var room_type = 'single';
$ ( '#translatable_variable' ).append ( `
				<span class="___"
                      data-text="This is :room_type bedroom"
                      data-room_type="${ room_type }">
                </span>
` );




