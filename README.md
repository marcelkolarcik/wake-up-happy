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
- [Version Control](#Version-Control)
- [Deployment](#deployment)
- [Future Features](#future-features)
- [Browser support](#Browser-support)

## Inspiration 

I was inspired to create this application to help thousands of families to create additional income for themselves, by renting 
out a room in their home.
 
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
  [TESTING.md](TESTING.md)
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
 
 In the webpack.config.js file I decide how to bundle my <code>src</code> files and where to output them.
 
 [webpack.config.js](https://github.com/marcelkolarcik/wake-up-happy/blob/master/webpack.config.js) 
 
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
   
	 I used pencil and paper to draw initial wireframe design ...
	 The initial drawings can be found here
	 [Wireframes](WIREFRAMES.md)
	 
 - ### Colors 
 
 	I decided on color scheme of shades of turquoise for the website and created few classes to easily
    apply color styles as needed. I chose these colors as they are not intrusive and are easy to look at.
    And they are associated with meaning of refreshment, sophistication and energy.
    
    These are the feelings I would like my users to feel when they arrive at landing page of wake-up-happy. 
    
    ```css
   .bg_green {
   	background-color: #0fbeba;
   	}
   
   .bg_green_dark {
   	background-color: #005a5b}
   
   .green_dark {color: #005a5b}
   
   .border_green_dark {border: 1px solid #005a5b;}
   
   .green {
   	color: rgba(0, 195, 209, 1);
   	font-weight: bold;
   	}
   
   .bg_green_light {
   	background-color: rgba(0, 195, 209, 0.85);
   	}
   
   .border_green {
   	border: 1px solid #0fbeba;
   	}
    ```
	 
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

Detailed description of how the application works can be found here

 [HOW-IT-WORKS.md](HOW-IT-WORKS.md)
 
 ## Testing
 
 I decided to learn about cypress.io for testing and writing test for the application.
 
 I wrote tests for the most of the features of the app and they can be watched here
 
  [TESTING.md](TESTING.md)
   
  I tested my website on 5in and 6in phones, 10in tablet 18in laptop and 22in desktop with good response from
  all of the devices.
  
   ## Version Control
   
   During development, I was creating new branch for every new feature I wanted to create, or update existing feature,
   then I would merge it with master branch and then create new branch again to create new feature again.
   
   To create new branch: 
   
   ```cl
   $ git checkout master
   $ git branch new-branch
   $ git checkout new-branch
   ```
   
> develop some code, add, commit, push, repeat...;-)

To merge branch with master:
 ```cl
   $ git checkout master
   $ git merge new-branch
   $ git push origin master
   ```

   
   At the moment I left them in the repository. The branches at the moment are :
   
  - ROOM-SEARCH
  - ADD-YOUR-ROOM
  - TRANSLATOR
  - ROOM-SEARCH-2.0
  - ADMIN
  - MOBILE-DEVICES
  - TRANSLATOR
  - TESTING 
  
  ## Deployment
  
  I deployed wake-up-happy application by going to my github repository and then clicking on setting button,
  scrolling down until I reached Github Pages section and then selecting master branch as source.
  
  Deploying to Github Pages allows me to see changes to the code, right after I merge current branch with master branch.
  
  It also allows me to test my application on multiple devices.
  
  For anyone wanting to test or preview the applications locally, I would recommend following steps :
  
   1. Sign in to your Github account 
   2. navigate to https://github.com/marcelkolarcik/wake-up-happy
   3. click on fork button in the top right corner of the screen
   4. that's it, now you should have copy of wake-up-happy in your github 
   
   OR
   
   1. navigate to https://github.com/marcelkolarcik/wake-up-happy
   2. click on green button reading Clone or download and download
   zip file to your computer
   3. unzip downloaded file to your working directory
   4. that's it, now you should have copy of wake-up-happy 
   
   
   Once you have your copy of wake-up-happy,if developing locally, 
   you will need to run HTTP server. One of them can be found at
   
   <a href = "https://github.com/lwsjs/local-web-server">local web server</a >.
   
   To install server
     
  ```cl 
     $ cd /your/project/path
     $ npm install -g local-web-server
   ```
  
  To start server 
  
 ```cl 
    $ cd /your/project/path
    $ ws
          Listening on http://mbp.local:8000, http://127.0.0.1:8000, http://192.168.0.100:8000
 ```
  
    
 
   
 To launch the application locally, navigate your browser to 
   
 ```
   http://127.0.0.1:8000/index.html or http://127.0.0.1:8000/owner.html
````  
  
   # Browser support
   
   Currently supporting
   
   - Firefox
   - Chrome
   - Opera 
   - Edge and UC Browser might behave strangely :  jQuery's $.getJSON() is not loading language files, sometimes...
      ( looking for fix )
      
   - Apple Safari responds with Error:  Can't Establish a Secure Connection to the Server github.com .
 



 
 
 





 