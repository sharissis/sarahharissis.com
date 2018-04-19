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

			$('#js-navigation').on('click mouseenter', function () {
				$(this).removeClass('navigation--interact-with-me');
			});

			$('#js-navigation .navigation__link').on('click', function (event) {
				event.preventDefault();

				var href = $(this).attr('href');
				var $el = $(href);
				var offset = -($('#js-navigation__nav').height());

				_this.scrollToElement($el, offset);

			});

			$('#js-navigation__toggle').on('click', function (event) {
				event.preventDefault();
				$navigation.toggleClass('navigation--active');
			});

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

		}

	};

})(window.jQuery, window.Modernizr, window, window.document, window.bowser);

$(function () {

	'use strict';

	sh.main.init();

});
