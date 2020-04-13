## How it works 

I am using localStorage and sessionStorage to add interactivity to the application.

On the initial load of the site, we will dynamically create first 95 rooms in several locations and
store them in Object in localStorage. As localStorage and sessionStorage can only store strings we need to stringify it
on the way in and parse it on the way out of the storage .

```javascript
localStorage.setItem('ROOMS', JSON.stringify( ROOMS ));

var ROOMS = JSON.parse( localStorage.getItem('ROOMS'));
````   

When Customer tries to search for the room and clicks on location input field, a little note about initial locations will show up,
so that he can type one of those location to get any search results.

This array of locations for autocomplete functionality is updating dynamically, whenever new room is added to the site in different location than one of initial locations.

The booking system on the site allows customers to book the room by the weeks. As I created yearly calendar divided by weeks, rather then days for displaying.

The booking system allows customer to choose board type ( Room Only, B&B, B&D, All Inclusive, Any ), and room type ( Single, Double, Any ).

When there are no search results for the selected criteria, we are displaying 3 featured rooms, which are created dynamically.

Customer can preview any room by clicking on appropriate buttons, and has option to book the room, if he starts to book a room and later he
changes his mind and starts to book another room, we will clear all the data from previous room, to avoid errors.

Customer will see alert, if he tries to book the weeks, before selecting board first, or submiting payment form without
 filling in required fields. Once the board is selected, he can select the weeks he wants to book
and in the top right corner of the preview div, he will see total price for the booking.

While he is selecting the weeks, we are calculating total price for the bookings and appending property name together with board selected
and weeks selected to payment form, that can be viewed by clicking on red BOOK button.

If customer decide to deselect some weeks, or change board type, we will recalculate the price and update all the fields in the form.

When customer clicks on the Pay button, we will :

1. record the booking, with room.id, weeks_booked, board_booked, name and email and store it
into CUSTOMERS Object into localStorage, so that when owner of the room logs in into his account, he can see this booking in his dashboard with
the information that will help him manage this booking.
2. show booking confirmation alert to customer, so he can save to his device

When owner of the room clicks on OWNER? link in the top navigation, he will be redirected to owner.html, where he will see welcome message
asking him whether he has room with the view, and if yes to add it to our site and join thousands happy landlords...

Also, there he will see possibility of earning 14.000 EUR tax free if he lives in Ireland. When he clicks on more onfo button,
he will see alert informing him how to achieve that. I took information from revenue.ie.

When he decide to add his room, there is always red how-to button available, to show written and visual instruction as how to 
proceed with every step. As he clicks on how-to button at different stages of adding room, different information and video ( gif ) will display.

>	There is also form progress bar display in a form of circles
    with numbers in them form 1 -> 5,
	as owner progresses through the form, 
		they are changing color from 
		white background with green text to 
		green background with white text.

The First step is to find location of the room and get location details. He can zoom in and out or drag the map th find the location
of the property, once he thinks that this is it, he can click on the map, and then green popup will appear with coordinates and
yellow button with get details text, once he click that yellow button, we will display location details using Nominatim reverse search.

Owner of the room can edit those details, or try again if the details are wrong. He needs to input property name that is alt
least 3 characters long, otherwise he won't be able to proceed to next step.
 
 >   ( next step button is not visible at the moment, 
    and will only be visible,when property name is longer
    then 3 characters, as you type in, you can see that 
    button room >>> is not visible, but as you type and
     the length of the name > 2  it will appear,
    and if you delete some characters and property
     name.lenght < 3 it will disappear again )
    

Once property name is typed in and is longer then 2 characters, room >>>  button will appear and he can proceed to second step.

In the parts to follow, once any option is selected ,image's ( no image when selecting amenities ) footer should have turquoise color, 
instead of darker turquoise, and title of each part should have turquoise circle with check icon, instead of red circle with question mark icon

The Second step is to define room:
1. Room type ( Single or Double ), I am using images with radio buttons, so owner can click radio under single bedroom or double bedroom,
labels of the radio's read single and double respectively, in case user had any doubts.
2. Room view. Again I am using 10 different images with radio button,  with different views, so that owner can choose what type of the view best 
 describe his room has.
3. Room style. Same again,I am using images with radio buttons owner can choose what image best describes style of his room.

Once all options are selected services >>> button will appear and he can proceed to third step.

The Third step is to define services:
1. Board types, he can provide for his customers. When he selects any board, image's footer should have yellow color and title's icon should
turn lightSalmon color, once he inputs the price for the board that is numeric, image's footer should change color to turquoise and
titles icon should change to turquoise with check icon. When owner deselects the board or delete price of the board, the board will 
return to original state and if it was only board, then the title will return to original state as well.
2.Amenities, owner must select at least one of the amenities, as he selects amenities, background color should change form dark
turquoise to light turquoise, and opposite when deselecting.  
3.Description of the room: Must be at least 30 characters long. There is a little feather icon with counter that initially
 has value 300 and red color, as you type your description it counts down and when it reaches 270 it turns green, and if
 at least one amenity and one of the boards is selected step 4 button preview >>>  will appear and will disappear when
 there is at least one of the three missing. 
 
 The fourth step is preview:
 Owner can preview room as potential customer and go back and make any necessary changes.
 Once owner clicked on preview >>> button step 5 button payment >>> appeared.
 
 The fifth step is payment:
 Owner has to fill in all required fields and submit the payment form, if he tries to submit without the required fields,
 he will see alert with missing fields. Once he fills in all required fields and clicks on pay button, we will:
  1. record the room and add it to already created rooms ( ROOMS ) in localStorage
  2. create new owner and add it to already created owners ( OWNERS ), if we have any, or create first owner and store it in localStorage
  3. will log new owner in and set  authorized_owner as true in session_storage
  4. we will change user icon appearance in top right corner of the navigation, instead of user icon, we will display user's initials 
  5. in the dropdown menu, he will see:
        - his name, which if clicked will take him to his dashboard
        - his room(s) name(s) ( could be multiple names if he added multiple rooms), when clicked, it will switch view to that room's 
         preview mode and will set that room as room_to_edit in sessionStorage.
        -  logout link, when clicked, it will log him out
        - delete LocalStorage, when clicked, it will clear localStorage and redirect to cleared.html
  6. will set newly created room as room_to_edit in session_storage
  ```javascript
    sessionStorage.setItem('authorized_owner',true);
    sessionStorage.setItem('room_to_edit',JSON.stringify(new_room));
  ```
  7. we will redirect owner to index.html and show him his room already added to the system, with popup open on the map
  with his room's picture, room type, view type and button to click for more info.
  
At this point, his room is live and showing in search results. 

> If the location of the room is different from initial locations,
when user starts typing newly created room's location, it should show as one of the autocomplete options.

He can try and pretend to be a customer and book the room, he will have to click on availability tab and select board first,
then select any weeks he likes, he will see total price changing as he selects the weeks or changing the boards, he can also
preview booking form by clicking on red BOOK button and see the changes as it happens.

Once he is ready to book, he can click on red BOOK button and fill in all the required fields and pay for the room.

>	If for any reason he decides, that he wants to book another room 
	before clicking on payment button on the current room payment form
	and he chooses to select another room, the moment he selects board 
	on next room, current room's selection 
    in payment form and on booking calendar will be reset. 
    To test it:
    1. select any room from search results and select board and couple of weeks
    2.click on red BOOK button to see payment form
    3. select room under or above current room
    4. and as you select board type on next room, current room's details should reset.
    
When all the required fields are filled and he decides to pay for the bookings, we will:
1. record the booking, with room.id, weeks_booked, board_booked, name and email 
and store it into CUSTOMERS Object into localStorage, so that when owner of the room logs in into his account, 
he can see this booking in his dashboard with the information that will help him manage this booking.
2. show booking confirmation alert to customer, so he can save to his device

Then he can click on his initial in the top right corner and select his room, he will be redirected to owner.html
where he can interact with his room: 

1. He can read or preview how to instructions assist him with anything he is currently working on. 
2. He can preview it
3. He can edit it
4. He can delete it
5. He can block off some dates for himself
6. He can check customers, total income and occupancy per room
7. he can add new room

He can logout, and login with his email and password used when paying for the room.

When admin tries to login with these credentials :
 -   email : admin@wuh.com 
 -   password: password
 
 He will see all the rooms created so far and he will have option of disabling or re-enabling it.
 
 Anyone using this application can click on the user icon in the top right corner of the navigation and click on clear localStorage
 to clear localStorage form data created by wake-up-happy app.
 
 Anyone using this application can see testimonials, that are created dynamically, depending on <code>window.location.pathName</code>.
 On every reload op the page the arrays with details are shuffled, so the visitor will have impression of different testimonials.
 
 I am using bootstrap's carousel with 3 carousel-items, where each item is holding 4 testimonials initially.
 Each testimonial has bootstrap classes applied in a way, that on every break point we will loose 1, 
 so on mobile devices we will end up with 1 testimonial per carousel-item. 
 
  <img src="https://raw.githubusercontent.com/marcelkolarcik/wake-up-happy/master/assets/src/images/readme/testimonials.png" title="testimonials" alt="testimonials image">