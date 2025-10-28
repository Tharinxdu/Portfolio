(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the WOW.js for animations
    new WOW().init();

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        }
    });

    // Smooth scrolling on navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Typed text animation
    if ($('.typed-text-output').length === 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });

    $('#videoModal').on('shown.bs.modal', function () {
        $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
    });

    $('#videoModal').on('hide.bs.modal', function () {
        $("#video").attr('src', '');
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Skills Progress Bar Animation
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    // Portfolio Modal
    window.openProjectModal = function (title, imageUrl, description, projectLink) {
        // Set modal content
        $('#projectModalLabel').text(title);
        $('#modalImage').attr('src', imageUrl);
        $('#modalDescription').html(description);
        $('#modalLink').attr('href', projectLink);

        // Show the modal
        var modal = new bootstrap.Modal(document.getElementById('projectModal'));
        modal.show();
    };

    // Fetch IP Address
    function fetchIpAddress(callback) {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                callback(data.ip);
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
                callback(null);
            });
    }

    // Handle CV download
    $('#downloadCV').on('click', function (event) {
        event.preventDefault();

        const userAgent = navigator.userAgent;
        let ipAddress = null;

        fetchIpAddress((ip) => {
            ipAddress = ip;

            const emailData = {
                name: 'CV Download Event',
                email: 'info@yourdomain.com', // Replace with your email
                subject: 'CV Download Notification',
                message: `
                    A user has downloaded the CV:
                    - IP Address: ${ipAddress || 'Unavailable'}
                    - User Agent: ${userAgent}
                `,
            };

            const serviceId = ENV.EMAILJS_SERVICE_ID;
            const templateId = ENV.EMAILJS_TEMPLATE_ID;
            const publicKey = ENV.EMAILJS_PUBLIC_KEY;

            // Initialize EmailJS with the public key
            emailjs.init(publicKey);

            // Send email using EmailJS
            // Immediately open the CV
            window.open('./pdf/Tharindu-Attygalle.pdf', '_blank');

            // Send email using EmailJS in the background
            emailjs.send(serviceId, templateId, emailData)
                .then(function () {
                    console.log('CV success');
                })
                .catch(function (error) {
                    // Log the error for debugging purposes
                    console.error('CV error', error);
                });

        });
    });

    // Contact Form Submission
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val(),
        };

        const serviceId = ENV.EMAILJS_SERVICE_ID;
        const templateId = ENV.EMAILJS_TEMPLATE_ID;
        const publicKey = ENV.EMAILJS_PUBLIC_KEY;

        // Initialize EmailJS with the public key
        emailjs.init(publicKey);

        // Send email using EmailJS
        emailjs.send(serviceId, templateId, formData)
            .then(function () {
                alert('Message sent successfully!');
                $('#contactForm')[0].reset(); // Reset the form
            }, function (error) {
                alert('Failed to send the message. Please try again.');
                console.error('Error:', error);
            });
    });

})(jQuery);
