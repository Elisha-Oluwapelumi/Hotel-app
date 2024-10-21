(function ($) {
    "use strict";
    
    new WOW().init();
    
    $('#header').after('<div class="mobile-menu d-xl-none">');
    $('.top-menu').clone().appendTo('.mobile-menu');
    $('.mobile-menu-btn').click(function () {
        $('.mobile-menu').stop().slideToggle();
    });
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    $('#date-1, #date-2, #date-3, #date-4').datetimepicker({
        format: 'L'
    });
    $('#time-1, #time-2').datetimepicker({
        format: 'LT'
    });
    
    $('.port-slider').delay(10000);
    $('.port-slider').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.port-slider-nav'
    });
    $('.port-slider-nav').slick({
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.port-slider',
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });
    
    $('#popover-content-download').hide();
    $("[data-toggle=popover]").each(function (e) {
        $(this).popover({
            html: true,
            content: function () {
                var id = $(this).attr('id')
                return $('#popover-content-' + id).html();
            }
        });

    });
})(jQuery);




(function() {
    emailjs.init("2YqYr7l5SXL6S99X5"); 
})();

document.querySelector('#subscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const templateParams = {
        
        email: document.querySelector('.subscribe-form input[type="email"]').value
    };

    emailjs.send('service_rh3b7ij', 'template_xq6bo2e', templateParams)
        .then(function(response) {
            Swal.fire({
                title: "Good job!",
                text: "Subscription successful! Check your email for confirmation.!",
                icon: "success"
              });
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to send subscription confirmation. Please try again later.!",
                icon: "error"
              });
            console.log('FAILED...', error);
        });
});


const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', function () {
    navMenu.classList.toggle('show');
});