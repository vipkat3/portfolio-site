/*************************************************
      Single Site White JS 
      http://www.responsivewebmobile.com
**************************************************/
jQuery(document).ready(function(){
	
//GLOBALS 
	//Navigation variables
	var timeline = new Array();
	var offsets = new Array();
	var current;

	//Section dimensions
	var sectionWidth = 0;
	var sectionHeight = 0;

	var page = $('.page');
	

	sizeSection();
	generateNavigationTimeline();
	var indicator = closestSection($(window).scrollTop());
	navSelect(timeline[indicator]);

/**********************************
			EVENTS
***********************************/

  //VK - Scrolls to Top when clicked
	$('.Sclose').click(function(){
	    $("html, body").animate({ scrollTop: 780 }, 700);
	   // return false;
	});




	//CLICK
    $("a.scroll").bind('click', function(e){
    	e.preventDefault();

    	current = $(this).attr('href'); //set the current active page
    	scrollToElement(current, 500); //scroll to the clicked element
    });

    //Scrolls to Top when clicked
	$('#scrollToTop').click(function(){
	    $("html, body").animate({ scrollTop: 0 }, 700);
	    return false;
	});

    //RESIZE
    $(window).bind('resize', function() {
		sizeSection();
	});

	//SCROLL	
	$(window).bind('scroll', function() {
		//Calls the function to retrieve the closest section to top and and highlight it
		var indicator = closestSection($(window).scrollTop());
		navSelect(timeline[indicator]);
		
		//show or hide the scroll to top button depending on the position from top
		if ($(this).scrollTop() > 300) {
	        $('#scrollToTop').fadeIn('fast');
	    } else {
	        $('#scrollToTop').fadeOut('fast');
	    }  
	});

	


/**********************************
			FUNCTIONS
***********************************/
	//Gets the closest section to Top
	function closestSection(currentPos) {
		y = currentPos; //the current position of scroll passed from the scroll event.
        var controls = []; //new array to contain abs values of distance.

        $.each(offsets, function(){
        	controls.push(Math.abs(this - y + 100));       
            //stores the abs value of the distance from current scroll position to
            //offsetTop of each section.
        })
        min = Math.min.apply( Math, controls ); //which abs value is smallest?

        return $.inArray(min, controls); //returns the array index of lowest abs value.
    }

    //Selects and deselect menu voices
	function navSelect(selector) {
    	$('.scroll').removeClass('enabled');
    	$('a[href="'+selector+'"].scroll').addClass('enabled');
    }

	//Generate the Array with Navigation Timeline
	function generateNavigationTimeline() {
		$(page).each(function(index) {
			timeline[index] = '#'+$(this).attr('id');
			offsets[index] = Math.round($(this).position().top);
		})
	}

    //Sets the size of each section depending on window dimensions
    function sizeSection() {
   	sectionHeight = $(window).height();
   	sectionWidth = $(window).width();
   	
    	$(page2).css({'min-height': sectionHeight}); //sets the min-height of all the sections
		
    }

    //Scrolls to the clicked element
    function scrollToElement(selector, time) {
	    time = typeof(time) != 'undefined' ? time : 2000;
	    element = $(selector);
	    offset = element.position().top + $(selector).scrollTop();

	    $('html, body').animate({
	        scrollTop: offset,
	    }, time);
	}


/*******************************
   		KIND OF ISOTOPE EFFECT 
********************************/
	$('#portfolio-filter > li > a').click(function(e) {
		e.preventDefault();

		//filter button highlight
		$('#portfolio-filter > li').each(function() {
			$(this).removeClass('active');
		});
		$(this).parent().addClass('active');

		//sets the filter and makes the animations
		var filter = $(this).attr('data-filter');
		items = $('.portfolio-item');

		if (filter == '*') {
			items.animate({ height: 'show', opacity: 1 }, 'slow');  
		}
		else if (filter != '*') {
			items.animate({width: 'hide', height: 'hide', opacity: 0 }, 'slow');
			items.filter('.'+filter).animate({ width: 'show', height: 'show',opacity: 1 }, 'slow'); 
		}
	});	
});


/*******************************
   		WORK FADE 
********************************/

$(function() {      
        $("div#work .workbox").css("opacity","1.0");       
        $("div#work .workbox").hover(function () {     
                $(this).siblings().stop().animate({opacity: 0.3}, "slow");   
        },          
        function () {      
                $("div#work .workbox").stop().animate({opacity: 1.0}, "slow");       
        });   
});




/*******************************
   		Follow mouse
********************************/


var mouseX = 0, mouseY = 0;
$(document).mousemove(function(e){
   mouseX = e.pageX;
   mouseY = e.pageY; 
});

// cache the selector
var follower = $("#follower");
var xp = 0, yp = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp += (mouseX - xp) / 822;
    yp += (mouseY - yp) / 522;
    follower.css({right:xp, top:yp});
    
}, 30);

// cache the selector
var follower2 = $("#follower2");
var xp2 = 0, yp2 = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp2 += (mouseX - xp2) / 522;
    yp2 += (mouseY - yp2) / 722;
    follower2.css({left:xp2, top:yp2});
    
}, 20);

/*******************************
   		random circles
********************************/


(function() {
    var paper, circs, i, nowX, nowY, timer, props = {}, toggler = 0, elie, dx, dy, rad, cur, opa;
    // Returns a random integer between min and max  
    // Using Math.round() will give you a non-uniform distribution!  
    function ran(min, max)  
    {  
        return Math.floor(Math.random() * (max - min + 1)) + min;  
    } 
    
    function moveIt()
    {
        for(i = 0; i < circs.length; ++i)
        {            
              // Reset when time is at zero
            if (! circs[i].time) 
            {
                circs[i].time  = ran(30, 100);
                circs[i].deg   = ran(-179, 180);
                circs[i].vel   = ran(1, 5);  
                circs[i].curve = ran(0, 1);
                circs[i].fade  = ran(0, 1);
                circs[i].grow  = ran(-2, 2); 
            }                
                // Get position
            nowX = circs[i].attr("cx");
            nowY = circs[i].attr("cy");   
               // Calc movement
            dx = circs[i].vel * Math.cos(circs[i].deg * Math.PI/180);
            dy = circs[i].vel * Math.sin(circs[i].deg * Math.PI/180);
                // Calc new position
            nowX += dx;
            nowY += dy;
                // Calc wrap around
            if (nowX < 0) nowX = 890 + nowX;
            else          nowX = nowX % 890;            
            if (nowY < 0) nowY = 890 + nowY;
            else          nowY = nowY % 890;
            
                // Render moved particle
            circs[i].attr({cx: nowX, cy: nowY});
            
                // Calc growth
            rad = circs[i].attr("r");
            if (circs[i].grow > 0) circs[i].attr("r", Math.min(30, rad +  .1));
            else                   circs[i].attr("r", Math.max(10,  rad -  .1));
            
                // Calc curve
            if (circs[i].curve > 0) circs[i].deg = circs[i].deg + 2;
            else                    circs[i].deg = circs[i].deg - 2;
            
                // Calc opacity
            opa = circs[i].attr("fill-opacity");
            if (circs[i].fade > 1) {
                circs[i].attr("fill-opacity", Math.max(.1, opa -  .01));
                circs[i].attr("stroke-opacity", Math.max(.1, opa -  .01)); }
            else {
                circs[i].attr("fill-opacity", Math.min(.1, opa +  .01));
                circs[i].attr("stroke-opacity", Math.min(.1, opa +  .01)); }

            // Progress timer for particle
            circs[i].time = circs[i].time - 1;
            
                // Calc damping
            if (circs[i].vel < 1) circs[i].time = 0;
            else circs[i].vel = circs[i].vel - .05;              
       
        } 
        timer = setTimeout(moveIt, 60);
    }
    
    window.onload = function () {
        paper = Raphael("stuff");
        circs = paper.set();
        for (i = 0; i < 30; ++i)
        {
            opa = ran(3,10)/10;
            circs.push(paper.circle(ran(0,500), ran(0,500), ran(10,30)).attr({"fill-opacity": opa,
                                                                           "stroke-opacity": opa}));
        }
        circs.attr({fill: "#87ab89", stroke: "#87ab89"});
        moveIt();
        elie = document.getElementById("toggle");
        elie.onclick = function() {
            (toggler++ % 2) ? (function(){
                    moveIt();
                    elie.value = " Stop ";
                }()) : (function(){
                    clearTimeout(timer);
                    elie.value = " Start ";
                }());
        }
    };
}());
