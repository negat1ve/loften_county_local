var base_url = "http://dev-gl.ru/loften_county";
var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
/*PAGE TRANSITION*/
var PageTransitions = (function () {

    var currentPageIndex = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        $pageWrapper = $('.pt-wrapper'),
        $pages = $pageWrapper.children('div.pt-page'),
        pagesCount = $pages.length,
        animEndEventNames = {
            'WebkitAnimation'   : 'webkitAnimationEnd',
            'OAnimation'        : 'oAnimationEnd',
            'msAnimation'       : 'MSAnimationEnd',
            'animation'         : 'animationend'
        },

        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],

        // support css animations
        // 
        support = Modernizr.cssanimations;

    function init() {

        // Get all the .pt-page div.
        $('.pt-page').each( function() {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        if (window.location.hash) {
            var hash = window.location.hash;
            hash = hash.replace("#", "");
            currentPageIndex = $(".pt-page").index($("[data-id=" + hash + "]"));
        }

       $('.pt-wrapper').queryLoader2({
            onComplete: function() {
                backgroundColor: "#8b0101";
                $(".pt-wrapper").fadeIn();
                $pages.eq(currentPageIndex).addClass('pt-page-current');
                Animate(currentPageIndex);
                $(window).trigger('resize');
            }
        });

        // Adding click event to .pt-trigger
        $('.pt-trigger').click(function() {
            var $pageIndex = $(this).parents("nav").find('.pt-trigger').index($(this));
            window.location.hash = $pages.eq($pageIndex).data("id");

            Animate($pageIndex);
        });

        $('.scroll-button').click(function() {
            Animate(1);
        });
    }

    // All pt-trigger click event calls this function
    // This function gets the animation id, goto page that we define in `data-animation` and 'data-goto' repectively.
    function Animate($pageIndex) {
        var gotoPage, inClass, outClass, selectedAnimNumber;
        $('.contact-form .tooltip').remove();


        if ($pageIndex > currentPageIndex)
            selectedAnimNumber = 13;
        else
            selectedAnimNumber = 14;

        switch(selectedAnimNumber) {
            case 13:
                inClass = 'pt-page-moveFromRight';
                outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
                break;
            case 14:
                inClass = 'pt-page-moveFromLeft';
                outClass = 'pt-page-moveToRightEasing pt-page-ontop';
                break;
        }

        gotoPage = $pageIndex;

        // check if 'data-goto' value is greater than total pages inside 'pt-wrapper'
        if (!(pagesCount < gotoPage)) {
            
           // tempPageIndex = currentPageIndex;

            if(isAnimating) {
                return false;
            }

            // Setting the isAnimating property to true.
            isAnimating = true;

            // Current page to be removed.
            var $currentPage = $pages.eq(currentPageIndex);

            // Check if the current page is same as the next page then do not do the animation
            // else reset the 'isAnimatiing' flag
            if (currentPageIndex != gotoPage) {

                // Next page to be animated.
                var $nextPage = $pages.eq(gotoPage).addClass('pt-page-current');

                $currentPage.addClass(outClass).on(animEndEventName, function() {
                    $currentPage.off(animEndEventName);
                    endCurrPage = true;
                    if(endNextPage) {
                        onEndAnimation($currentPage, $nextPage);
                    }
                });

                $nextPage.addClass(inClass).on(animEndEventName, function() {
                    $nextPage.off(animEndEventName);
                    endNextPage = true;
                    if(endCurrPage) {
                        onEndAnimation($currentPage, $nextPage);
                    }
                });

                // Check if the animation is supported by browser and reset the pages.
                if(!support) {
                    onEndAnimation($currentPage, $nextPage);
                }

                currentPageIndex = gotoPage;

            }
            else {
                isAnimating = false;
            }

        }

          /*Mouse wheel function*/

        $(window).mousewheel(function(event, delta, deltaX,deltaY) {
            event.preventDefault();
            var goTo;
            if (!isAnimating) {
                goTo = currentPageIndex;
                if (deltaY<0) {
                    goTo++;
                    if (goTo > pagesCount - 1) goTo = pagesCount - 1;
                }
                if (deltaY>0) {
                    goTo--;
                    if (goTo < 0) goTo = 0;
                }

                if (goTo != currentPageIndex) Animate(goTo);
                window.location.hash = $pages.eq(goTo).data("id");
            }
        });

        $('.header-page,.about-page,.products-page .title-b,.products-page .block-for-swipe,.products-page .control-b,.contact-page').not('.slider-b').swipe( {
        //Generic swipe handler for all directions
        swipeLeft:function(event, direction, distance, duration, fingerCount) {

            var swipeTo;
            if (!isAnimating) {
            swipeTo = currentPageIndex;
            swipeTo++;
            if (swipeTo > pagesCount - 1) swipeTo = pagesCount - 1;
            if (swipeTo != currentPageIndex) Animate(swipeTo);
            window.location.hash = $pages.eq(swipeTo).data("id");
            };
          
        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {

            var swipeTo2;
            if (!isAnimating) {
            swipeTo = currentPageIndex;
            swipeTo--;
            if (swipeTo < 0) swipeTo = 0;
            if (swipeTo != currentPageIndex) Animate(swipeTo);
            window.location.hash = $pages.eq(swipeTo).data("id");
            };
          
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:50
      });
         


    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
    }

    return {
        init : init,
    };

})();

/*PAGE TRANSITION END*/

var SlideTransitions = (function () {

    var currentSlideIndex = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        $pageWrapper = $('.slider-container'),
        $pages = $pageWrapper.children('div.slide'),
        pagesCount = $pages.length,
        animEndEventNames = {
            'WebkitAnimation'   : 'webkitAnimationEnd',
            'OAnimation'        : 'oAnimationEnd',
            'msAnimation'       : 'MSAnimationEnd',
            'animation'         : 'animationend'
        },

        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],

        // support css animations
        support = Modernizr.cssanimations;

    function init() {

        // Get all the .pt-page div.
        $('.slide').each( function() {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(currentSlideIndex).addClass('current-slide');
        Animate(currentSlideIndex);

        // Adding click event to .pt-trigger
        $('.slider__button').click(function() {
            var $pageIndex =  $('.slider__button').index($(this));
            Animate($pageIndex);
        });

    }

    // All slider__number-after click event calls this function
    // This function gets the animation id, goto page that we define in `data-animation` and 'data-goto' repectively.
    function Animate($pageIndex) {
        var gotoPage, inClass, outClass, selectedAnimNumber;
     

        if ($pageIndex > currentSlideIndex)
            selectedAnimNumber = 17;
        else
            selectedAnimNumber = 18;

        switch(selectedAnimNumber) {
            case 17:
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                outClass = 'pt-page-scaleDown';
                break;
            case 18:
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                outClass = 'pt-page-scaleDown';
                break;
        }

        gotoPage = $pageIndex;


        // check if 'data-goto' value is greater than total pages inside 'pt-wrapper'
        if (!(pagesCount < gotoPage)) {
            
             // tempPageIndex = currentPageIndex;

            if(isAnimating) {
                return false;
            }

            // Setting the isAnimating property to true.
                isAnimating = true;
            // Current page to be removed.
            var $currentPage = $pages.eq(currentSlideIndex);

            // Check if the current page is same as the next page then do not do the animation
            // else reset the 'isAnimatiing' flag
            if (currentSlideIndex != gotoPage)  {

                // Next page to be animated.
                var $nextPage = $pages.eq(gotoPage).addClass('current-slide');

                $currentPage.addClass(outClass).on(animEndEventName, function() {
                    $currentPage.off(animEndEventName);
                    endCurrPage = true;
                    if(endNextPage) {
                        onEndAnimation($currentPage, $nextPage);
                    }
                });

                $nextPage.addClass(inClass).on(animEndEventName, function() {
                    $nextPage.off(animEndEventName);
                    endNextPage = true;
                    if(endCurrPage) {
                        onEndAnimation($currentPage, $nextPage);
                    }
                });
        // Check if the animation is supported by browser and reset the pages.
            if(!support) {
            onEndAnimation($currentPage, $nextPage);
        }

         currentSlideIndex = gotoPage;

        }
        else {
            isAnimating = false;
        }
}

   $('.slide').swipe( {
        //Generic swipe handler for all directions
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            var goTo = currentSlideIndex;
            goTo++;
            if (goTo <= pagesCount-1) Animate(goTo); 
            $(".yell-btn").removeClass('active');
            $(".yell-btn").eq(currentSlideIndex).addClass('active');
        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {
            var goTo = currentSlideIndex;
            goTo--;
            if (goTo >= 0) Animate(goTo);
            $(".yell-btn").removeClass('active');
            $(".yell-btn").eq(currentSlideIndex).addClass('active');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:50
      });
            console.log(currentSlideIndex);
         $('.slider-b__right-arrow').click(function() {
            var goTo = currentSlideIndex;
            goTo++;
            if (goTo <= pagesCount-1) Animate(goTo); 
            $(".yell-btn").removeClass('active');
            $(".yell-btn").eq(currentSlideIndex).addClass('active');
        });
        $('.slider-b__left-arrow').click(function() {
            var goTo = currentSlideIndex;
            goTo--;
            if (goTo >= 0) Animate(goTo);
            $(".yell-btn").removeClass('active');
            $(".yell-btn").eq(currentSlideIndex).addClass('active');

        });

    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' current-slide');
    }

    return {
        init : init,
    };

})();
/***************************SLIDE TRANSITION END************************/


$(document).ready(function(){

    PageTransitions.init();
    SlideTransitions.init();
    if( window.isMsIe == 8 ) { 
        $('.header-page-img-b').append( '<img src="' + base_url + '/img/header_soc_02.jpg" class="" />' );      
    };
  
    //$("#a").trigger('click');
    $("#slide1 .yell-btn").trigger('click')
    
    $('input, textarea').placeholder();
    
    $('.nutritional-facts-button').hover(
        function() {
        $('.nutritional-tool-tip').stop(false,true).fadeIn();
    }, function() {
      	 $('.nutritional-tool-tip').stop(false,true).fadeOut();
    });
    
    $('.slider__button').hover(
        function() {
      	var offset =  $(this).position();
        buttonLeft = offset.left;
        $('.slide-tool-tip').stop(false,true).fadeIn(); 
        $('.slide-tool-tip').css("left", (buttonLeft+$('.slider__button').width()/2-$('.slide-tool-tip').width()/2) );
        $('.slide-tool-tip').html($(this).data("title")+'<span class="slide-tool-tip__triangle"></span>');
        }, function() {
           $('.slide-tool-tip').stop(false,true).fadeOut();
    });
    

    $('.slide').hover(
        function() {
        $(".nutritional-facts-button").stop(false,true).fadeIn();
    }, function() {
        $(".nutritional-facts-button").stop(false,true).fadeOut();
    });

if (isMobile) {
        $('.slide img').swipe( {

        pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom) {
            $(".nutritional-facts-button").stop(false,true).fadeIn();
            $('.nutritional-tool-tip').stop(false,true).fadeIn();
        },
        fingers:2,  
        pinchThreshold:0  
      });
       

}





    $(".yell-btn").click(function(){
        $(".yell-btn").removeClass('active');
        $(this).addClass('active');
    });
    

    $('.slider-b__left-arrow').hover(function(){
        $(".slider-b__left-arrow").addClass('wobble-left')
    });
    $('.slider-b__left-arrow').mouseleave(function(){
        $(".slider-b__left-arrow").removeClass('wobble-left')
    });
    
    $('.slider-b__right-arrow').hover(function(){
       $(".slider-b__right-arrow").addClass('wobble-right')
    });
    $('.slider-b__right-arrow').mouseleave(function(){
      $(".slider-b__right-arrow").removeClass('wobble-right')
    });
    
    $(".nutritional-facts-button").click(function(e){
        e.preventDefault();
        img = $(this).attr('href');
        $(".lightbox-img").attr('src', img);
        $(".lightbox").fadeIn( function(){
        $(".lightbox-img").fadeIn();                
        })
    })
    $(".lightbox").click(function(){
        $(".lightbox-img").fadeOut(function(){
        $(".lightbox").fadeOut();
        })                
    });

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||( window.isMsIe == 8  )) {
        $('.lightbox-close').fadeIn();
}

    var wheelDistance = function(evt){
        if (!evt) evt = event;
        var w=evt.wheelDelta, d=evt.detail;
        if (d){
            if (w) return w/d/40*d>0?1:-1; // Opera
            else return -d/3;              // Firefox;         TODO: do not /3 for OS X
        } else return w/120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
    };
    var wheelDirection = function(evt){
        if (!evt) evt = event;
        return (evt.detail<0) ? 1 : (evt.wheelDelta>0) ? 1 : -1;
    };
    function showResults(evt){
        var distance  = wheelDistance(evt);
        var direction = wheelDirection(evt);
        //console.log("event.wheelDelta: "+evt.wheelDelta+"<br>event.detail: "+evt.detail+"<br>Normalized Wheel Distance: "+distance+"<br>Wheel Direction: "+direction);
    }

    if (window.addEventListener){
        window.addEventListener( 'mousewheel', showResults, false );     // Chrome/Safari/Opera
        window.addEventListener( 'DOMMouseScroll', showResults, false ); // Firefox
    } else if (window.attachEvent){
        window.attachEvent('onmousewheel',showResults);                  // IE
    }


    $("#form-send-message .control").focus(function () {
        $(this).parents('.row').tooltip('hide');
    });

    $("#form-send-message .control").each(function(){
        if($(this).val().length == 0) {
            $(this).addClass("empty");
        } else {
            $(this).removeClass("empty");
        }
    })

    $(".contact-form .send-button").click(function(e){

        e.preventDefault();
        //console.log($("#form-send-message .empty").length);
        var errors = false;
        var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        $('.contact-form .tooltip').remove();
        $(".contact-form .control").each(function(){
            if ($(this).data('required') == true) {  
                if($(this).val() == "" || $(this).val() == $(this).attr('placeholder')) {
                    errors = true;

                    $(this).parents('.row').append('<div class="tooltip fade right in" ><div class="tooltip-arrow"></div><div class="tooltip-inner">This Field is Required</div></div>');
                
                } else if ($(this).attr('type') == 'email' && !email_regex.test($(this).val())) {
                    errors = true;
                    $(this).parents('.row').append('<div class="tooltip fade right in" ><div class="tooltip-arrow"></div><div class="tooltip-inner">Invalid Email Address</div></div>');
                }
            
            }


        });

        $(".tooltip").fadeIn();

        if (errors == false) {
            $.ajax({
                type : "POST",
                url : "send_email.php",
                data : {
                    name : $("#name").val(),
                    phone : $("#phone").val(),
                    email : $("#email").val(),
                    comment : $("#comment").val()
                }
            }).done(function(msg) {
                alert('Thank you. We have received your message.');
            });
        }
    });

    $('input, textarea').focus(function(){
        $(this).nextAll('.tooltip').remove();
    });

  var bgWidth = 1152,
      bgHeight = 447,
      aspectRatio = bgWidth / bgHeight;

  function resizeBg($parent) {
    if (($parent.width() / $parent.height()) >= aspectRatio) {
      $parent.children('img').width($parent.width());
      $parent.children('img').height($parent.width() / aspectRatio);
      $parent.children('img').css('top', -1 * ($parent.width() / aspectRatio - $parent.height()) / 2);
      $parent.children('img').css('left', 0);
    } else {
      $parent.children('img').height($parent.height());
      $parent.children('img').width($parent.height() * aspectRatio);
      $parent.children('img').css('top', 0);
      $parent.children('img').css('left', -1 * ($parent.height() * aspectRatio - $parent.width()) / 2);
    }
  }
     
    
  
  
  $(window).resize(function() {
    resizeBg($('.header-page-img-b'));


  }).trigger("resize");



});