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

			$(window).on('load scroll resize orientationchange', function (event) {

			});

		}

	};

})(window.jQuery, window.Modernizr, window, window.document, window.bowser);

$(function () {

	'use strict';

	sh.main.init();

});
