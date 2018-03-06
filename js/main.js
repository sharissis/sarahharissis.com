$(function() {

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var currentYear = (new Date).getFullYear();

	$('#year').text(currentYear);

	if (!isMobile) {
		$('body.home').addClass('bg-fixed');
	}

	if (navigator.appName == "Microsoft Internet Explorer") {
		$('html').addClass('ie');
	}

	// Add error message if it's an old browser
	if ($('.lt-ie9').length > 0) {
		$('body').hide();
		$('html').append('<body id="old-browser" class="old-browser"><div class="old-browser-message"><p>It looks like you are using a browser that is no longer supported.<br><a href="https://www.google.com/chrome/" title="Download Google Chrome">Please upgrade your browser to view this website.</a></p></div></body>');
	}

	$('#scroll-arrow').on('click', function(event){
		event.preventDefault();
		$("html, body").animate({
        	scrollTop: $('#main').offset().top
	    }, 1000);
	});

	$('.accordion-trigger').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('open');
		var accordion = $(this).next('.accordion-body');
		accordion.slideToggle(750);
	});

	$('#overlap-button').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('overlap-on');
		toggleOverlap();
	})

	function toggleOverlap() {
		var overlapOn = $('#overlap-button').hasClass('overlap-on');
		var transitionTime = 750;
		var cssLogo = $('#css-column');
		var imageLogo = $('#image-column');
		if (!overlapOn) {
			cssLogo.animate({
	            left: '0%'
	        }, transitionTime);
	        imageLogo.animate({
	            right: '0%'
	        }, transitionTime);
	        $('#css-column h3, #image-column h3').animate({
	            opacity: '1'
	        }, 500);
		} else {
			cssLogo.animate({
	            left: '25%'
	        }, transitionTime);
	        imageLogo.animate({
	            right: '25%'
	        }, transitionTime);
	        $('#css-column h3, #image-column h3').animate({
	            opacity: '0'
	        }, 500);
		}
	}

});
