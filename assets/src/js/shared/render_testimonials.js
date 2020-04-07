import { getRandom } from "./create_DB.js";


(function (  )
	{
		
		var classes = [
			"col-xs-6 col-sm-6 col-md-4 col-lg-3  col-xl-3",
			"col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 d-none d-sm-block",
			"col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 d-none d-md-block",
			"col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 d-none d-lg-block"
		];
		
		var stars = [
			`	<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span><i class="far fa-star"></i></span>
						<span><i class="far fa-star"></i></span>`,
			`	<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span><i class="far fa-star"></i></span>`,
			
			`	<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>
						<span class="green"><i class="fas fa-star"></i></span>`
		];
		
		var page = window.location.pathname.includes('index') ? 'index' : 'owner' ;
		var testimonials = {
			index : [
				'This was our 2nd stay at The Edison and we will be sure to have a 3rd. '
				+ 'The signature room we stayed in was clean and comfortable and the staff are always polite and helpful.'
				,
				'The room is literally just one minute walk to University where i study and the best bar in city...;-),'
				+ 'The Mai Tai’s there are fantastic! '
				,
				'This room located in a prime location close so many major attractions greatly enhanced our stay.'
				+ 'Our Signature room was wonderful.'
				,
				'I was upgraded to a signature king room based on my wake-up-happy.com status and it was a big room. The bathroom was nicely updated too.'
				,
				'Ms Justina and Mr Eric helped us enormously.'
				+ ' Ms Justina went super extra miles to accommodate us in signature suite to enjoy the New Year Eve with my elderly parents'
				,
				'There are so many positives to this property I don’t know where to start. '
				+ 'Firstly, the location is perfect. Located On the corner of Times Square, perfect for the low cost broadway ticket box'
				,
				'The room was surprisingly very large and spotlessly clean. It has the feeling of home. Our room was signature king room,'
				+ ' that means a large room with a huge bed, a closet that contains an iron and a bathrobe, a TV and a desk'
				,
				'I stayed here for 3 weeks and had a pleasant time. The room met my expectations.'
				+ ' It was a super nice location within less than 5 mins walking distance from the sea and seconds walking distance from gym.'
				,
				'The room had a coffee machine with the added bonus of decaf coffee which delighted my fellow traveller.'
				+ ' Location of room is steps away from Times Square where you can get on the hop on bus tours'
				,
				'The location was amazing, situated centrally to everything you could possibly want access to without being too noisy from the busy streets outside!! '
				,
				'The room was bigger and better than expected. We booked the Classic double room (we were expecting quite basic and a bit '
				+ 'outdated compared to other rooms based on other reviews) '
				+ 'and we were either upgraded without my knowledge or it’s just a really spacious great room, especially for somewhere in the heart of the city!'
				,
				'I stayed in here for 4 weeks in January 2018 & was very impressed. Having read some of the reviews I was a bit worried but '
				+ 'was pleasingly surprised. We were given a newly refurbished room on the top floor & couldn\'t fault it.'
			],
			owner : [
				'The best decision I could ever make, I have achieved over 85% occupancy in last two years. Highly recommended.'
				,
				'Very easy to update any details about the room, and I like the fact that you can block the dates, if you need room for yourself!'
				,
				'Ease and efficiency. That\'s all I can say about this site. And extra 14 000 EUR tax free....;-)'
				,
				'This room located in a prime location close so many major attractions greatly enhanced our position to charge more.'
				+ 'It attracts lots of tourists from around the world.'
				,
				'We have upgraded to a signature king room and are able to get much higher rent then before renovation.'
				,
				'Marcel was very helpful when we wanted to add our room to wake-up-happy.com. And now we are reaping benefits of the cooperation.'
				,
				'Extra income for me and my young family. We are renting our spare room to students, and it has been just positive experience so far!'
				,
				'Renting out two rooms on this site, both of them to students. And extra cash is going towards our holidays...'
				,
				'Easy to add the room, easy to see customers, and easy to earn money ! Recommending very much!'
				,
				'Great way to make additional income, especially in Ireland, 14 000 EUR tax free ? Yes, please!'
				,
				'Thinking of adding another room, as one we already have here is almost booked out for the next year!'
				,
				'If you\'re wanting additional income, tax free, look no further!'
			]
		
		};
		
		var names = [
			'J. Edgar',
			'O. Smith',
			'E. Parker',
			'M. Newman',
			'K. Obama',
			'T. Turmam',
			'S. Gretto',
			'A. Schwacke',
			'U. Zajko',
			'I. Noshow',
			'A. Forrest',
			'E. O\'Sullivan'
		];
		function shuffle(array) {
			array.sort(() => Math.random() - 0.5);
		}
		
		shuffle(names);
		
		var page_testimonials =testimonials[page];
		shuffle(page_testimonials);
		
		var img_id = [1,2,3,4,5,6,7,8,9,10,11,12];
		shuffle(img_id);
		var testi_div = $('#testi_holder');
		var c = -1;
		var b=0;
		for(var a=0;a<12;a++)
			{
				
				if(a%4 === 0)
					{
						
						
						testi_div.append(`<div class="carousel-item ${ a === 0 ? 'active': ''}" data-interval="10000">
	                                            <div class = "row d-flex justify-content-center" id="slide_${a}">
												</div>
											</div>`);
						
						
						for( b=0;b<4;b++)
							{
								c++;
								
								$('#slide_'+a).append(`
								 <div class="${classes[b]}">
									     <!-- testimonial long -->
							            <div class = "card" >
								            <div class="row no-gutters">
							
									                <div class = "d-flex justify-content-around align-items-end" >
									               
									                ${page === 'index' ?
								                      `<img src="assets/src/images/avatars/${ img_id[c]  }.png" class="avatar" alt="avatar image">`
								                                       :
								                      `<img src="assets/src/images/bedrooms/b${img_id[c]}_s.jpg" class="avatar" alt="bedroom image">`}
									                  
										                <div>
											               ${stars[getRandom(0,2)]}
										                </div>
										                
									                </div >
									               
									                <div class = "card-body" >
									                
									                <span class="float-right">
									                <footer class = "blockquote-footer" >
									                      ${names[c]}
									                    </footer >
									                   <hr class="bg_green">
									                 </span>
									               
									               
									                    <h3 class = "nav_link_property" >${ page_testimonials[c].substring(0, 20)} ...</h3 >
									                   
									                    <p class = "card-text quote_text" >
									                        <span class = "quote_mark" >“</span >
									                   <cite>${page_testimonials[c]}</cite>
									                        <span class = "quote_mark" >“</span >
									                    </p >
									                   
									                </div >
							
								            </div>
							            </div >
									     <!--end of testimonial long -->
								  </div>
								`)
							}
					}
				
				
				
			}
		
	})();