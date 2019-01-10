(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle").on('click',function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    
    $(".sidebar").toggleClass("toggled");
    toggleBody();
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  $(window).resize(function(){
    toggleBody();
  })

  // Scroll to top button appear
  $(document).on('scroll',function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  $(".dropdown-toggle").on("click", function(e){
    var target = $(this).data("target"); 
    if(target != undefined){
      e.stopPropagation();
      $("#" + target).toggle();
      if($(this).parent().hasClass("show")){
        $(this).parent().removeClass("show");
        //$(this).siblings(".dropdown-menu").find(".dropdown-menu").toggle("collapse");
      }
      else{
        $(this).parent().addClass("show");
      }
    }
  });

  if($(window).width()<768){
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  }

  $(".dropdown-menu").on("hide.bs.collapse",function(e){
    console.log("me cierro");
  });

})(jQuery); // End of use strict

function toggleBody(){
  if($(window).width()<500){
    if(!$("body").hasClass("sidebar-toggled")){
      $("#content-wrapper").addClass("noscroll");
    }
    else{
      $("#content-wrapper").removeClass("noscroll");
    }
  }
  else{
    $("#content-wrapper").removeClass("noscroll");
  }
}
