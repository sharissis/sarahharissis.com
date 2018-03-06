$(function () {

	var loadDelay = 1000;
	var $panels = $('#panels');
	var $currentYear = $('#js-current-year');

	setTimeout(function () {
		$panels.addClass('panels--ready');
	}, loadDelay);

	$currentYear.text((new Date).getFullYear());

});
