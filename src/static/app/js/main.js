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

			setTimeout(function() {
				$body.removeClass('recently-loaded');
			}, 5000);

		},

		bindUIEvents: function () {
			var _this = this;

			$(window).on('load scroll resize orientationchange', function (event) {

			});

			$(window).on('scroll', function () {

				if (!navInteraction) {
					_this.navigationPeek();
				}

				navInteraction = true;

			});

			$('#js-navigation').on('click mouseenter', function () {
				navInteraction = true;
				$(this).removeClass('navigation--no-interaction');
			});

			$('#js-navigation .navigation__link').on('click', function (event) {
				event.preventDefault();

				var href = $(this).attr('href');
				var $el = $(href);
				var offset = -($('#js-navigation__nav').height());

				_this.scrollToElement($el, offset);

			});

			// $('#js-navigation__toggle').on('click', function (event) {
			// 	event.preventDefault();
			// 	$navigation.toggleClass('navigation--active');
			// });

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

		},

		scrollToElement: function ($el, offset) {

			$('html, body').animate({
				scrollTop: $el.offset().top + offset
			}, 1250);

		},

		navigationPeek: function () {

			$navigation.addClass('navigation--active').removeClass('navigation--no-interaction');

			setTimeout(function() {
				$navigation.removeClass('navigation--active');
			}, 3000);

		}

	};

})(window.jQuery, window.Modernizr, window, window.document, window.bowser);

$(function () {

	'use strict';

	sh.main.init();

});
