<a href="https://marcelkolarcik.github.io/wake-up-happy/index.html">
<img src="https://raw.githubusercontent.com/marcelkolarcik/wake-up-happy/master/assets/src//images/logo_bg_green.png" title="https://marcelkolarcik.github.io/wake-up-happy/" alt="https://marcelkolarcik.github.io/wake-up-happy/"></a>


## wake-up-happy

A booking site, where customers can find rooms with the view...


## Table of Contents

- [Inspiration](#inspiration)

- [Technologies](#technologies)

	- [cypress.io](#cypressio)
	- [webpack](#webpack)
	- [emailjs](#emailjs)
	- [leaflet.js](#maps)
	- [openstreetmaps](#maps)
	- [mapbox](#maps)
	- [Nominatim](#Nominatim)
	- [sweetalert.js](#sweetalert)
	- [simple-jQuery-translator](#simple-jQuery-translator)
	- [javascript,HTML,CSS](#javascriptHTMLCSS)
	
- [User Experience](#User-Experience)
	- [User story](#User-story)
	
		- [Customer](#Customer)
		- [Room owner](#Room-owner)
		- [Admin](#Admin)
		- [Person testing](#Person-testing)
		
	- [Wireframes](#Wireframes)
	- [Colors](#Colors)
- [Features](#Features)	
- [How it works](#How-it-works)		
- [Testing](#testing)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)
- [Future Features](#future-features)

## Inspiration 

I was inspired to create this application to help thousands of families to create additional income for themselves.
 
## Technologies 
### cypress.io
> Fast, easy and reliable testing for anything that runs in a browser.

I decided to learn about and write tests for my application in cypress.io. 
I Installed Cypress via npm: 

```cl 
cd /your/project/path
```

```cl 
npm install cypress --save-dev
```

And whenever I want to run tests, I use
```cl 
./node_modules/.bin/cypress open
```

Cypress allows me to set up and start writing tests every day while I build my application locally.

As I've learnt about cypress.io, I believe in my next project, I will start writing test from the beginning
of development, which will save me time on manual testing and make sure,
 that my application is doing, what it's supposed to do from the start.
 
 Test Driven Development at its best!
 
 As I wanted to preserve localStorage between Cypress tests as I use localStorage for my application to function
 and Cypress is clearing localStorage between the tests, I installed another package, that is preserving localStorage
 between the tests.
 
> cypress-localstorage-commands
    
```cl 
    npm i --save-dev cypress-localstorage-commands
```
 
 ### webpack
 
 > A bundler for javascript and friends. Packs many modules into a few bundled assets.
 
 On advice of my mentor Aaron Sinnott, I learnt about webpack and how to use it in my project.
 Webpack allows my to keep my js code in as many different directories and files as I see fit, to easily manage and
 find and debug my code, while webpack will bundle all of the code that is required for any page
 into one single minified file.
 Webpack is also watching all of my files during the development, and as I update my code, webpack will automatically
 update bundle with newly updated code.
 
 I installed it via npm:
 
 ```cl 
 cd /your/project/path
 ```
 
 ```cl 
 npm install webpack webpack-cli --save-dev
 ```
 
 And followed documentation here
 <a href="https://webpack.js.org/guides/getting-started/#basic-setup" target="_blank">
 webpack
 </a>
 
### emailjs

> Send email directly from your client-side Javascript code – no server side code required.

I am using emailjs to send email to admin of the site, whenever there is new room added to the site.
When admin logs into his account @wake-up-happy, he can see all rooms created and has option of disabling it ( removing it from the search results )
or re-enabling it ( adding it back to search results ). I've created account @emailjs, where I created template for the email received
and also I got token to use on my site for emailjs to function properly.

 <a href="https://www.emailjs.com" target="_blank">
 www.emailjs.com
 </a>
 
### maps

- openstreenmap

> The web site OpenStreetMap.org provides a slippy map interface based on the Leaflet JavaScript library
 , displaying map tiles rendered by the Mapnik rendering engine, and tiles from other sources including OpenCycleMap.org
 Custom maps can also be generated from OSM data through various software including Jawg Maps, Mapnik, 
 Mapbox Studio, Mapzen's Tangrams.
 
  <a href="https://www.openstreetmap.org" target="_blank">
   www.openstreetmap.org
   </a>
   
 I decided to use OpenStreetMap.org mainly, because leaflet.js and their extensive and clear documentation and examples.

 
  
 - leaflet.js
 
 >  Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.
 
  <a href="https://leafletjs.com" target="_blank">
     leafletjs.com
     </a>
     
 As OpenStreetMap.org provides a slippy map interface based on the Leaflet JavaScript library.
  I begun to learn about some of the features and possibilities with leaflet.js. 
  
  
 
 - mapbox
 
 > Mapbox provides us with the map design tools and mapping libraries needed
  to make dynamic, performant, and customized maps that suit our needs.
  
  
### Nominatim 

 > Nominatim is a search engine for OpenStreetMap data. 
  You may search for a name or address (forward search) or look up data by its geographic coordinate (reverse search)
  
  <a href="https://nominatim.openstreetmap.org" target="_blank">
       nominatim.openstreetmap.org
       </a>
       
  I use Nominatim to get room's location details, when adding new room to the site.
  
### sweetalert

> A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes. Zero dependencies.

 <a href="https://sweetalert2.github.io" target="_blank">
     sweetalert2
      </a>
      
I am using sweetalert2, because it allows me to customize my alerts to my users with my HTML code, which means that alerts
 can be matched with colors and styles and feels with the rest of application, which will in my opinion,
  provide much smoother and more pleasant experience for the users. 
  
  
      

### simple-jQuery-translator

 > Simple jQuery translator for translating text, title of element, placeholder for input fields and 
 alt attribute for images. If you need to include variables, simple-jQuery-translator can handle it as well.
 
 During the development of wake-up-happy application, I wanted to have website translated to several languages.
 I didn't find any package that would solve my problem completely, so I tried to write my own translating script and 
 simple-jQuery-translator is result of my tries...
 
 I have created separate repository for it, with it's own README file and live site with HTML examples for
 any developers that might need it.
 
 It is my hope that it will be useful for other developers in their projects, as it is useful for me in my current project
 and perhaps future projects as well.
 
 The basic idea of the translator is :
  
  > Every element that need translating must have class
       ___ ( three underscores )
      
  > and any combination of
      data-text, data-title, data-placeholder, data-alt
      
  > with values written in default language
  
  #### Single data-text attribute
  
  ```html
  <span class = "___" data-text="hello" ></span>
  ```
  
  #### Multiple data-text attribute
  
  ```html
  <p>
  <span class = "___" data-text = "This is" > </span >
  <strong class = "___ " data-text = "bold text." > </strong >
  <span class = "___  text-info bg-secondary p-3" data-text = "And this is green text on grey background" > </span >
  </p>
  ```
     
  #### Title of element : data-title attribute
    
  ```html
    <a class = "___" data-title = "this is link" data-text = "link" href = "#" > </a >
  ```
    
  #### Placeholder for input fields : data-placeholder attribute
      
  ```html
      <label class = "___ " data-text = "Your idea" for = "placeholder" ></label >
      <textarea class = "___ form-control col-md-6" data-placeholder = "Create something amazing..." id = "placeholder" ></textarea>
  ```
   #### alt attribute for images : data-alt attribute
      
  ```html
     <img class="___" src = "/assets/images/non_existing_file.png" data-alt = "image alt description" alt=" " >
  ```
  
   #### If there is no translation for the text, we will display text from data-text attribute.
      
  ```html
     <p class="___" data-text="Not translated string" ></p>
  ```
 
 #### If you need to include variable(s) in the text.
 
 ```html
 <span class="___"
 data-text="This user's name is |user and he is from |city"
 data-user ="${ user_name }"
 data-city ="${ city }"
 > </span>
 ```
 
 #### If you need to include variable(s) in the text, and translate it as well.
 
 ```html
 <span class="___"
 data-text="This is :room_type bedroom"
 data-room_type="${ room_type }">
 </span>
  ```
  In simple-jQuery-translator, I included helper scripts that I used for this site to create translation files needed for
  translator.js to function properly.
  
  Please visit two links bellow for more detailed instruction how to use simple-jQuery-translator.
 
  <a href="https://github.com/marcelkolarcik/simple-jQuery-translator" target="_blank"> simple-jQuery-translator repository</a>
       
 <a href="https://marcelkolarcik.github.io/simple-jQuery-translator/" target="_blank">simple-jQuery-translator live Demo</a>
 
 ### javascript,HTML,CSS
 
   - javascript 
   > JavaScript is a scripting or programming language that allows you to implement complex features on web pages
   
   - HTML
   > HTML is the standard markup language for creating Web pages.
   
   - CSS
   > CSS is is a style sheet language used for describing the presentation of a document written in 
    a markup language like HTML.CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.
    
## User Experience

 - ### User story
 
    - #### Customer
     
    
   As a customer I would like to be able to:
  
        -  select from several languages to use the site
        -  find room with the view
        -  find the room on the map to see exact location of the property
        -  search for the room based on my preferred location, dates, board type or room type using search form
        -  in a room preview, to click on a button to see room's location on the map
        -  preview the room's images, amenities, availability,description
        -  book the room with ease
        -  see and download confirmation of my booking to my device
        -  have great experience using this application on any device from mobile to desktop
        -  see testimonials from other customers
     
   - #### Room owner
          
         
   As a Room owner I would like to be able to:
        
          -  select from several languages to use the site
          -  have account on the site
          -  add multiple rooms to the site
          -  have my room's location appear in autocomplete option in location field, if it's not included yet
          -  get exact location of my room using site's map service
          -  delete any of my rooms from the site
          -  have a clear written and visual instruction how to add and interact with my room
          -  edit my room's details
          -  block off some of the dates for myself
          -  see my customers details, board they booked, and date they booked
          -  see total earnings and occupancy for each room
          -  have great experience using this application on any device from mobile to desktop
          -  see testimonials from other owners
          
   - #### Admin
                    
                   
   As a Admin of the site I would like to be able to:
                 
          -  have account on the site
          -  get notified whenever there is new room added to the site
          -  disable or re-enable any room if management deemed it appropriate
             or owner of the room violates our T&C 
          -  have great experience using this application on any device from mobile to desktop
             
   - #### Person testing
  
   As a Person testing or previewing the site I would like to be able to:
   
            -  select from several languages to use the site    
            -  clear data from wake-up-happy  in localStorage in my browser after 
	            visiting the site.
            -  have great experience using this application on any device from mobile to desktop
            
 - ### Wireframes  
   
	 I used pencil and paper to wireframe design ...
	 They can be found at 
	 [Wireframes](WIREFRAMES.md)
	 
 - ### Colors 
 
 	I decided on color scheme of shades of turquoise for the website and created few classes to easily
    apply color styles as needed. I chose these colors as they are not intrusive and are easy to look at.
    And they are associated with meaning of refreshment, sophistication and energy.
    
    These are the feelings I would like my users to feel when they arrive at landing page of wake-up-happy. 
	 
 ## Features
 
 - ### Customer 
 
 Customer can :
    
   -  select from several languages to use the site    
   -  find the room on the map to see exact location of the property
   -  search for the room based on preferred location, dates, board type or room type using search form
   -  in a room preview, to click on a button to see room's location on the map
   -  preview the room's images, amenities, availability,description
   -  book the room with ease
   -  see and download confirmation of the booking to my device
   -  have great experience using this application on any device from mobile to desktop
   -  see testimonials from other customers
             
             
- ### Room owner 
     
 Room owner can :
        
  -  select from several languages to use the site
  -  have account on the site
  -  add multiple rooms to the site
  -  have room's location appear in autocomplete option in location field, if it's not included yet
  -  get exact location of the room using site's map service
  -  delete any of his rooms from the site
  -  have a clear written and visual instruction how to use the site's features
  -  edit his room's details
  -  block off some of the dates for himself
  -  see customers details, board they booked, and date they booked
  -  see total earnings and occupancy for each room
  -  have great experience using this application on any device from mobile to desktop
  -  see testimonials from other owners
 
- ### Admin 
     
Admin can :
                     
  -  have account on the site
  
  - for anyone testing :  When trying to log in as admin use these credentials:
    - email : admin@wuh.com
    - password : password
    
  -  get notified whenever there is new room added to the site by email
  
  -  disable or re-enable any room if management deemed it appropriate
             or owner of the room violates our T&C 
             
  -  have great experience using this application on any device from mobile to desktop
  
  - ### Person testing 
       
  Person testing  can :
  
 -  select from several languages to use the site    
 
 -  clear data from wake-up-happy  in localStorage the browser after 
	            visiting th site.
	            
 -  have great experience using this application on any device from mobile to desktop
  
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
3. He ca edit it
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
 
 ## Testing
 
 I decided to learn about cypress.io for testing and writing test for the appliations.
 
 I wrote tests for the most of the features of the app and they can be watched 
  [Testing](TESTING.md)
 



 
 
 





 