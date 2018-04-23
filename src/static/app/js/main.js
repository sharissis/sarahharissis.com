/*global window:false */
/*global $:false */

var sh = sh || {};

(function ($, Modernizr, window, document, bowser) {

	'use strict';

	// Variables
	var $body = $('body');
	var loadDelay = 1000;
	var $panels = $('#panels');
	var $currentYear = $('#js-current-year');
	var $portrait = $('#js-portrait');
	var eyebrowRaiseTimeout = 400;
	var eyebrowRaiseTimeoutActive = false;
	var $navigation = $('#js-navigation');
	var navInteraction = false;

	sh.main = {

		init: function () {

			// Initialize panels
			setTimeout(function () {
				$panels.addClass('panels--ready');
			}, loadDelay);

			// Add year to footer copyright
			$currentYear.text((new Date()).getFullYear());

			this.bindUIEvents();
			this.portraitFacialExpressions();

			setTimeout(function() {
				$body.removeClass('recently-loaded');
			}, 5000);

		},

		bindUIEvents: function () {
			var _this = this;

			// $(window).on('load scroll resize orientationchange', function (event) {});

			$(window).on('scroll', function () {

				if (!navInteraction) {
					$navigation.removeClass('navigation--no-interaction');
					_this.navigationPeek();
					navInteraction = true;
				}

			});

			$('#js-navigation').on('click mouseenter touchstart', function () {

				navInteraction = true;
				$(this).removeClass('navigation--no-interaction');

			}).on('click touchstart', '.navigation__link', function (event) {
				event.preventDefault();

				var href = $(this).attr('href');
				var $el = $(href);
				var offset = -($('#js-navigation__nav').height());

				_this.scrollToElement($el, offset);

			});

			// Toggle nav on click, but only on touch devices
			$('#js-navigation__toggle').on('click touchstart', function (event) {
				var isTouchDevice = $('.md-touchevents').length;

				if (isTouchDevice) {
					event.preventDefault();
					$navigation.toggleClass('navigation--active');
				}

			});

			console.log($('.md-touchevents').length);

		},

		scrollToElement: function ($el, offset, callback) {

			$('html, body').animate({
				scrollTop: $el.offset().top + offset
			}, 1250, function () {

				if (callback) {
					callback();
				}

			});

		},

		navigationPeek: function () {

			$navigation.addClass('navigation--active');

			setTimeout(function() {
				$navigation.removeClass('navigation--active');
			}, 3000);

		},

		portraitFacialExpressions: function () {

			// Hovers trigger the portrait image to change, but with timeouts so it's not strobey
			$('a, .tooltip').on('mouseenter', function () {

				$portrait.addClass('portrait--show-eyebrow-raise');

				if (!eyebrowRaiseTimeoutActive) {

					eyebrowRaiseTimeoutActive = true;

					setTimeout(function() {
						eyebrowRaiseTimeoutActive = false;
					}, eyebrowRaiseTimeout);

				}

			}).on('mouseleave', function () {

				setTimeout(function() {

					if (!eyebrowRaiseTimeoutActive) {
						$portrait.removeClass('portrait--show-eyebrow-raise');
						eyebrowRaiseTimeoutActive = false;
					}

				}, eyebrowRaiseTimeout);

			});

		}

	};

})(window.jQuery, window.Modernizr, window, window.document, window.bowser);

$(function () {

	'use strict';

	sh.main.init();

});
