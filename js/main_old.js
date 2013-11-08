$(document).ready(function(){
	$('.field').jScrollPane();
});

$(document).ready(function(){
    $('a[data-target]').click(function() {
    	var target = $(this).data('target');
        $.scrollTo( $("#" + target), 1000, {offset:40} );
    });

    $('#services').click(function() {
        $.scrollTo( $('#page1'), 1000 );
    });

 $(function(){
      //Keep track of last scroll
      var lastScroll = 0;
      $(window).scroll(function(event){
          //Sets the current scroll position
          var st = $(this).scrollTop();
          //Determines up-or-down scrolling
          console.log (st)
         if ( st > 517){
             //Replace this with your function call for downward-scrolling
             $.scrollTo($("#page2"), 1000);
          }
          else if (st > 3000) {
             //Replace this with your function call for upward-scrolling
              $.scrollTo($("#page6"), 1000);
          }
          //Updates scroll position

          lastScroll = st;
      });
    });
});

