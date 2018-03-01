module.exports.register = function(Handlebars, options) {
	'use strict';

	function isValidString(string) {
		return typeof string != 'undefined' && string != '';
	}

	Handlebars.registerHelper('replaceStr', function(haystack, needle, replacement) {

		if (haystack && needle) {
			return haystack.replace(needle, replacement);
		} else {
			return '';
		}

	});

	// Pass in the name of the JSON fixture file in assemble/fixtures for scope
	Handlebars.registerHelper('parseFixture', function(path, options) {

		if (!path || typeof path !== 'string') {
			return false;
		}

		var fs = require('fs');
		var nodePath = require('path');
		var fixture;

		path = nodePath.join(__dirname, '../fixtures/' + path);

		try {
			fixture = fs.readFileSync(path);
			fixture = fixture.toString('utf8');
			fixture = JSON.parse(fixture);
		} catch (err) {
			return console.error(err);
		}

		return options.fn(fixture);

	});

	Handlebars.registerHelper('log', function(data) {
		return console.log(data);
	});

	Handlebars.registerHelper('stringCompare', function(a, b, opts) {

		if (a == b) {
			return opts.fn(this);
		} else {
			return opts.inverse(this);
		}

	});

	Handlebars.registerHelper('toLowerCase', function(str) {
		return str.toLowerCase();
	});

	Handlebars.registerHelper('math', function(lvalue, operator, rvalue, options) {
		lvalue = parseFloat(lvalue);
		rvalue = parseFloat(rvalue);

		return {
			'+': lvalue + rvalue,
			'-': lvalue - rvalue,
			'*': lvalue * rvalue,
			'/': lvalue / rvalue,
			'%': lvalue % rvalue
		}[operator];

	});

	Handlebars.registerHelper('ifOr', function(a, b, opts) {

	    if (a || b) {
	        return opts.fn(this);
	    } else {
	        return opts.inverse(this);
	    }

	});

	Handlebars.registerHelper('ifAnd', function(a, b, opts) {

	    if (a && b) {
	        return opts.fn(this);
	    } else {
	        return opts.inverse(this);
	    }

	});

	Handlebars.registerHelper('svg', function(name) {
		return new Handlebars.SafeString('<svg class="icon icon-' + name + '"><use xlink:href="#icon-' + name + '"></use></svg>');
	});

	Handlebars.registerHelper('link', function(link) {
		var url = (isValidString(link.url)) ? link.url : '#';
		var icon = (isValidString(link.icon)) ? '{{svg "' + link.icon + '"}}' : '';
		var title = (isValidString(link.title)) ? link.title : '';
		var style = (isValidString(link.style)) ? ' class="' + link.style + '"' : '';
		var alt = (isValidString(link.alt)) ? ' title="' + link.alt + '"' : ' title="' + title + '"';
		var link = '';

		if (url != '' && title != '') {
			link = '<a href="' + url + '"{0}{1}>{2}' + new Handlebars.SafeString(title) + '</a>';
			link = link.replace('{0}', alt);
			link = link.replace('{1}', style);
			link = link.replace('{2}', Handlebars.compile(icon));
		}

		return new Handlebars.SafeString(link);

	});

	Handlebars.registerHelper('socialMediaLink', function(socialMediaLink) {
		var url = (isValidString(socialMediaLink.url)) ? socialMediaLink.url : '#';
		var icon = (isValidString(socialMediaLink.icon)) ? '{{svg "' + socialMediaLink.icon + '"}}' : '';
		var title = (isValidString(socialMediaLink.title)) ? socialMediaLink.title : '';
		var style = (isValidString(socialMediaLink.style)) ? ' class="' + socialMediaLink.style + '"' : '';
		var alt = (isValidString(socialMediaLink.alt)) ? ' title="' + socialMediaLink.alt + '"' : ' title="' + title + '"';
		var socialMediaLink = '';

		if (url != '' && title != '') {
			socialMediaLink = '<a href="' + url + '"{0}{1}>{2}<span class="show-for-sr">' + new Handlebars.SafeString(title) + '</span></a>';
			socialMediaLink = socialMediaLink.replace('{0}', alt);
			socialMediaLink = socialMediaLink.replace('{1}', style);
			socialMediaLink = socialMediaLink.replace('{2}', Handlebars.compile(icon));
		}

		return new Handlebars.SafeString(socialMediaLink);

	});

	Handlebars.registerHelper('backgroundImage', function(backgroundImage) {
		var url = (isValidString(backgroundImage.url)) ? backgroundImage.url : '#';
		var alt = (isValidString(backgroundImage.alt)) ? backgroundImage.alt : '';
		var style = (isValidString(backgroundImage.style)) ? ' class="image ' + backgroundImage.style + '"' : ' class="image"';
		var id = (isValidString(backgroundImage.id)) ? ' id="' + backgroundImage.id + '"' : '';
		var backgroundImage = '';

		if (url != '') {
			backgroundImage = '<div style="background-image: url(' + url + ');"{0}{1} title="' + new Handlebars.SafeString(alt) + '" role="img"></div>';
			backgroundImage = backgroundImage.replace('{0}', style);
			backgroundImage = backgroundImage.replace('{1}', id);
		}

		return new Handlebars.SafeString(backgroundImage);

	});

	Handlebars.registerHelper('placeholderImage', function(w, h, text) {
		var width = (isValidString(w)) ? w : '300';
		var height = (isValidString(h)) ? 'x' + h : '';
		var text = (isValidString(text)) ? '?text=' + encodeURI(text) : '';
		var url = 'http://via.placeholder.com/' + width + height + text;

		return new Handlebars.SafeString('<img src="' + url + '" alt="Placeholder Image" />')

	});

	// Type can be short, medium, or long
	Handlebars.registerHelper('placeholderText', function(type) {

		var placeholderTextString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

		if (type == 'medium') {
			placeholderTextString += ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
		} else if (type == 'long') {
			placeholderTextString += ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.';
		}

		return new Handlebars.SafeString(placeholderTextString);

	});

};
