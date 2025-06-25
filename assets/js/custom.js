(function ($) {

  "use strict";

  // Header Type = Fixed
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var bannerHeight = $('.main-banner').height();
    var header = $('header').height();

    // Apply sticky when scrolled past 100px or when banner is mostly out of view
    if (scroll >= 100) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });


  $('.loop').owlCarousel({
    center: true,
    items: 2,
    loop: true,
    nav: true,
    dots: true,
    margin: 30,
    navText: ['', ''], // Empty nav text since we're using CSS for arrows
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true
      },
      768: {
        items: 2,
        nav: true,
        dots: false
      },
      992: {
        items: 4,
        nav: true,
        dots: false
      }
    }
  });


  // Menu Dropdown Toggle
  if ($('.menu-trigger').length) {
    $(".menu-trigger").on('click', function () {
      $(this).toggleClass('active');
      $('.mobile-nav').slideToggle(200);

      // Adjust mobile menu position based on header state
      if ($('header').hasClass('background-header')) {
        $('.mobile-nav').css('top', '5rem'); // 80px (h-20)
      } else {
        $('.mobile-nav').css('top', '6rem'); // 96px (h-24)
      }
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.mobile-nav').slideUp(200);
        }
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $('.scroll-to-section a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');

      // Also add active class to corresponding link in other menu
      var href = $(this).attr('href');
      $('.desktop-nav a[href="' + href + '"], .mobile-nav a[href="' + href + '"]').addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $('html, body').stop().animate({
        scrollTop: (target.offset().top) + 1
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.desktop-nav a, .mobile-nav a').removeClass("active");
        currLink.addClass("active");
        // Also add active class to corresponding link in other menu
        var href = currLink.attr('href');
        $('.desktop-nav a[href="' + href + '"], .mobile-nav a[href="' + href + '"]').addClass("active");
      }
      else {
        currLink.removeClass("active");
      }
    });
  }



  // Page loading animation
  $(window).on('load', function () {

    $('#js-preloader').addClass('loaded');

  });



  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function () {
      if (width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }




})(window.jQuery);