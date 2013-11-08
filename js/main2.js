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
            currentPageIndex = $(".pt-page").index($(hash));
        }

       $('.pt-wrapper').queryLoader2({
            onComplete: function() {
                backgroundColor: "#8b0101";
                $(".pt-wrapper").fadeIn();
                $pages.eq(currentPageIndex).addClass('pt-page-current');
                Animate(currentPageIndex);
            }
        });

        // Adding click event to .pt-trigger
        $('.pt-trigger').click(function() {
            var $pageIndex = $(this).parents("nav").find('.pt-trigger').index($(this));
            window.location.hash = $pages.eq($pageIndex).attr("id");

            Animate($pageIndex);
        });

    }

    // All pt-trigger click event calls this function
    // This function gets the animation id, goto page that we define in `data-animation` and 'data-goto' repectively.
    function Animate($pageIndex) {
        var gotoPage, inClass, outClass, selectedAnimNumber;

        $('.row').tooltip('destroy');

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

        $('.scroll-button').click(function() {
            Animate(1);
        })

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
                    if (goTo <= pagesCount - 1) Animate(goTo);
                }
                if (deltaY>0) {
                    goTo--;
                    if (goTo >= 0) Animate(goTo);
                }

            }
        });
                $('.pt-wrapper').swipe( {
        //Generic swipe handler for all directions
        swipeLeft:function(event, direction, distance, duration, fingerCount) {

            var swipeTo;
            if (!isAnimating) {
            swipeTo = currentPageIndex;
            swipeTo++;
            if (swipeTo <= pagesCount - 1) Animate(swipeTo);
            };
          
        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {

            var swipeTo2;
            if (!isAnimating) {
            swipeTo2 = currentPageIndex;
            swipeTo2--;
            if (swipeTo2 >= 0) Animate(swipeTo2);
            };
          
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:50
      });
            $('.pt-wrapper').swipe( {
        //Generic swipe handler for all directions
        swipeRight:function(event, direction, distance, duration, fingerCount) {

            var swipeTo2;
            if (!isAnimating) {
            swipeTo2 = currentPageIndex;
            swipeTo2--;
            if (swipeTo2 >= 0) Animate(swipeTo2);
            };
          
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:50
      }); 

           
          /*Mouse wheel function END*/


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

/***************************SLIDE TRANSITION ************************/
var SlideTransitions = (function () {

    var startPageIndex = 0,
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

        if (window.location.hash) {
            var hash = window.location.hash;
            currentSlideIndex = $(".slide").index($(hash));
        }

        // Adding click event to .pt-trigger
        $('.slider-container a').click(function() {
            var $pageIndex =  $('.slider-container a').index($(this));
            window.location.hash = $pages.eq($pageIndex).attr("id");

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
                    endCurrentPage = true;
                    if(endNextPage) {
                        onEndAnimation($currentPage, $nextPage);
                    }
                });

                $nextPage.addClass(inClass).on(animEndEventName, function() {
                    $nextPage.off(animEndEventName);
                    endNextPage = true;
                    if(endCurrentPage) {
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
            console.log(currentSlideIndex);


        $('.slide').mousewheel(function(event, delta, deltaX,deltaY) {
            event.preventDefault();
            var goTo;
            if (!isAnimating) {
                goTo = currentPageIndex;
                if (deltaY<0) {
                    goTo++;
                    if (goTo <= pagesCount - 1) Animate(goTo);
                }
                if (deltaY>0) {
                    goTo--;
                    if (goTo >= 0) Animate(goTo);
                }

            }
        });
          /* switch(currentSlideIndex) {
            case 0:
              $("#slide1 ,#slide2,#slide3,#slide4,#slide5").removeClass('active').data("animation", 17);
               $("#slide1 span,#slide2 span, #slide3 span,#slide4 span,#slide5 span").removeClass('active')
               $("#slide1 span").addClass("active");
              break;
            case 1:
              $("#slide1 span,#slide2 span, #slide3 span,#slide4 span,#slide5 span").removeClass('active')
              $("#slide3,#slide4,#slide5").data("animation", 17);
              $("#slide1,#slide2").data("animation", 18);
              $("#slide2 span").addClass("active");
              break;
            case 2:
              $("#slide1 span,#slide2 span, #slide3 span,#slide4 span,#slide5 span").removeClass('active')
              $("#slide3,#slide4,#slide5").data("animation", 17);
              $("#slide1,#slide2").data("animation", 18);
              $("#slide3 span").addClass("active");
              break;
            case 3:
              $("#slide1 span,#slide2 span, #slide3 span,#slide4 span,#slide5 span").removeClass('active')
              $("#slide4,#slide5").data("animation", 17);
              $("#slide1,#slide2,#slide3").data("animation", 18);
              $("#slide4 span").addClass("active");
              break;
            case 4:
              $("#slide1 span,#slide2 span, #slide3 span,#slide4 span,#slide5 span").removeClass('active')
              $("#slide5").data("animation", 17);
              $("#slide1,#slide2,#slide3,#slide4").data("animation", 18);
              $("#slide5 span").addClass("active");
              break;
            case 5:
              $("#slide1 span,#slide2 span, #slide3 span,#slide4 span,#slide5 span").removeClass('active')
              $("#slidej").data("animation", 17);
              $("#slide1,#slide2,#slide3,#slide4,#slide5").data("animation", 18);
              break;
            case 6:
              $("#slide1,#slide2,#slide3,#slide4,#slide5").data("animation", 18);
              break;
        }
*/

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

  
    //$("#a").trigger('click');
    $("#slide1 .yell-btn").trigger('click')
    
    $('input, textarea').placeholder();
    
    $('.nutritional-facts-button').mouseover(function() {
        $('.nutritional-tool-tip').fadeIn(400);
    });
    $('.nutritional-facts-button').mouseleave(function() {
      	 $('.nutritional-tool-tip').fadeOut(400);
    });
    
    $('.slider__button').mouseover(function() {
       
      	   $('.slide-tool-tip').fadeIn(400); 

               var offset =  $(this).position();
    buttonLeft = offset.left;
        $('.slide-tool-tip').css("left", (buttonLeft+$('.slider__button').width()/2-$('.slide-tool-tip').width()/2) )

    $('.slide-tool-tip').html($(this).data("title")+'<span class="slide-tool-tip__triangle"></span>')
    });
    $('.control-b-buttons__item').mouseleave(function() {
      	   $('.slide-tool-tip').fadeOut(400);
    });
    
    $(".yell-btn").click(function(){
        $(".yell-btn").removeClass('active');
        $(this).addClass('active');
    });
    
    $('.slide').hover(function(){
        $(".nutritional-facts-button").fadeIn();
    });
     $('.slide').mouseleave(function(){
        $(".nutritional-facts-button").fadeOut();
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
    
    $(".nutritional-facts-button").click(function(){
        $(".lightbox").fadeIn( function(){
        $(".lightbox-img").fadeIn();                
        })
    })
    $(".lightbox").click(function(){
        $(".lightbox-img").fadeOut(function(){
        $(".lightbox").fadeOut();
        })                
    });


    /* 
                $('.slider-wrap').carouFredSel({
                    auto: false,
                    prev: '.slider-b__left-arrow',
                    next: '.slider-b__right-arrow',
                    pagination: ".control-b-buttons__item",
                    mousewheel: true,
                    swipe: {
                        onMouse: true,
                        onTouch: true
                    }
                });*/


    $(window).resize(function() {
      var height = $(window).height();
    

      if ($(window).height() > 870){


      }
      if ($(window).height() < 870) {

      }
    }).trigger("resize");

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

        $(".contact-form .control").each(function(){

            if($(this).val() == "" || $(this).val() == $(this).attr('placeholder')) {
                errors = true;
                $(this).parents('.row').tooltip('destroy');
                if ($(this).attr('type') == 'email') {
                    $(this).parents('.row').tooltip({
                        placement: 'right',
                        title: 'This Field is Required',
                        trigger: 'manual',
                        animation: true
                    });
                } else {
                    $(this).parents('.row').tooltip({
                        placement: 'left',
                        title: 'This Field is Required',
                        trigger: 'manual',
                        animation: true
                    });
                }
                $(this).parents('.row').tooltip('show');
            } else if ($(this).attr('type') == 'email' && !email_regex.test($(this).val())) {
                errors = true;
                $(this).parents('.row').tooltip('destroy');
                $(this).parents('.row').tooltip({
                    placement: 'right',
                    title: 'Invalid Email Address',
                    trigger: 'manual',
                    animation: true
                });
                $(this).parents('.row').tooltip('show');
            } else {
                $(this).parents('.row').tooltip('hide');
            }


        });

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
    })


});