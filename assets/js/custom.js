(function ($) {

  "use strict";

  // Header Type = Fixed - Enhanced approach
  function updateHeaderBackground() {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  }

  // Apply on scroll
  $(window).scroll(updateHeaderBackground);

  // Apply on page load and resize
  $(window).on('load resize', function () {
    updateHeaderBackground();
  });

  // Initialize immediately when DOM is ready
  $(document).ready(function () {
    updateHeaderBackground();

    // Also check after animations might have completed
    setTimeout(updateHeaderBackground, 100);
    setTimeout(updateHeaderBackground, 500);
    setTimeout(updateHeaderBackground, 1000);
  });


  $('.loop').owlCarousel({
    center: true,
    items: 2,
    loop: true,
    nav: true,
    margin: 30,
    responsive: {

      992: {
        items: 4
      }
    }
  });


  // Menu Dropdown Toggle
  if ($('.menu-trigger').length) {
    $(".menu-trigger").on('click', function () {
      $(this).toggleClass('active');
      $('.mobile-nav').slideToggle(200);

      // Adjust mobile menu position based on header state
      setTimeout(function () {
        if ($('header').hasClass('background-header')) {
          $('.mobile-nav').css('top', '5rem'); // Fixed header height
        } else {
          $('.mobile-nav').css('top', '6rem'); // Normal header height
        }
      }, 10);
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

      var target = this.hash;
      var targetElement = $(this.hash);
      $('html, body').stop().animate({
        scrollTop: (targetElement.offset().top) + 1
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


  // Contact Form Submission
  $(document).ready(function () {
    $('#contact-form').on('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: $('#name').val().trim(),
        phone: $('#phone').val().trim(),
        email: $('#email').val().trim(),
        children: $('#children').val().trim(),
        service: $('#service').val(),
        message: $('#message').val().trim()
      };

      // Basic validation
      if (!formData.name || !formData.phone || !formData.email || !formData.children) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Show loading state
      const submitBtn = $('#form-submit');
      const submitText = $('#submit-text');
      const submitIcon = $('#submit-icon');

      submitBtn.prop('disabled', true);
      submitText.text('Sending...');
      submitIcon.removeClass('fa-paper-plane').addClass('fa-spinner fa-spin');

      // Send data to webhook
      $.ajax({
        url: 'https://hook.us2.make.com/mg4r1kqxumwo6lq65r7h2cde39moc4m9',
        method: 'POST',
        data: formData,
        success: function (response) {
          // Show success message
          $('#success-message').removeClass('hidden');
          $('#form-header').addClass('hidden');
          $('#form-fields').addClass('hidden');
          $('#form-submit-section').addClass('hidden');

          // Scroll to success message
          $('html, body').animate({
            scrollTop: $('#success-message').offset().top - 100
          }, 500);

          // Reset form fields
          $('#contact-form').trigger('reset');
        },
        error: function (xhr, status, error) {
          console.error('Form submission error:', error);
          alert('Sorry, there was an error sending your message. Please try again or contact me directly.');
        },
        complete: function () {
          // Reset button state
          submitBtn.prop('disabled', false);
          submitText.text('Send Message');
          submitIcon.removeClass('fa-spinner fa-spin').addClass('fa-paper-plane');
        }
      });
    });

    // Reset form function (if user wants to send another message)
    window.resetContactForm = function () {
      $('#success-message').addClass('hidden');
      $('#form-header').removeClass('hidden');
      $('#form-fields').removeClass('hidden');
      $('#form-submit-section').removeClass('hidden');

      // Clear all form fields
      // $('#contact')[0].reset();
      $("#contact-form").get(0).reset();

      // Scroll back to form header
      $('html, body').animate({
        scrollTop: $('#form-header').offset().top - 100
      }, 500);
    };
  });

})(window.jQuery);