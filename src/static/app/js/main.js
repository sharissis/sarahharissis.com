/*global window:false */
/*global $:false */

var sh = sh || {};

(function ($, Modernizr, window, document, bowser) {

	'use strict';

	// Variables
	var loadDelay = 1000;
	var $panels = $('#panels');
	var $currentYear = $('#js-current-year');

	sh.main = {

		init: function () {

			// Initialize panels
			setTimeout(function () {
				$panels.addClass('panels--ready');
			}, loadDelay);

			// Add year to footer copyright
			$currentYear.text((new Date()).getFullYear());

			this.bindUIEvents();

		},

		bindUIEvents: function () {
			var _this = this;

			$(window).on('load scroll resize orientationchange', function (event) {

			});

			$('#js-navigation .navigation__link').on('click', function (event) {
				event.preventDefault();

				var href = $(this).attr('href');
				var $el = $(href);
				var offset = -($('#js-navigation__nav').height());

				_this.scrollToElement($el, offset);

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
