// JavaScript Document

// navbar clickover hide
//$(document).click(function (event) {
 //   var clickover = $(event.target);
 //   var $navbar = $(".navbar-collapse");               
  //  var _opened = $navbar.hasClass("in");
  //  if (_opened === true && !clickover.hasClass("navbar-toggle")) {      
   //     $navbar.collapse('hide');
    //}
//});


//sticky header start

$(window).scroll(function(){
    if ($(window).scrollTop() >= 760) {
        $('header').addClass('sticky');
    }
    else {
        $('header').removeClass('sticky');
   
    }
});
//sticky header end 
