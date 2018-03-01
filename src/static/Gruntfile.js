var brei = require('./brei-config.json');
var yosay = require('yosay');

var options = {
	config: {
		src: 'grunt-config/*.js'
	},
	yeoman: {
		app: 'app',
		dist: 'dist',
		deploy: brei.deploy
	}
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
	'use strict';

	var configs = require('load-grunt-configs')(grunt, options);
	var nconf = require('nconf');

	// build a custom version of modernizr
	grunt.loadNpmTasks('grunt-modernizr');

	// load all grunt tasks
	require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

	// Show elapsed time after tasks run
	require('time-grunt')(grunt);

	// For executing the updateScss.js script in app/assemble/helpers
	grunt.loadNpmTasks('grunt-execute');

	grunt.initConfig(configs);

	grunt.registerTask('server', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		}
		grunt.task.run([
			'execute-sync',
			'clean:assemble',
			'assemble',
			'clean:server',
			'concurrent:server',
			'browserSync',
			'watch'
		]);
	});

	grunt.registerTask('check', [
		'jshint',
		'execute-sync',
		'scsslint'
	]);

	grunt.registerTask('build', [
		'clean:assemble',
		'assemble',
		'clean:dist',
		'useminPrepare',
		'compass:dist',
		'autoprefixer',
		'concat',
		'cssmin',
		'uglify',
		'concurrent:dist',
		'copy:dist',
		'usemin',
		'clean:distmodernizr',
		'modernizr:dist'
	]);

	grunt.registerTask('deploy', [
		'clean:deploy',
		'copy:deploy'
	]);

	grunt.registerTask('default', [
		'check',
		'build'
	]);

	grunt.registerTask('execute-sync', function(s) {
		var done = this.async();

		grunt.task.run('execute:target');

		done();
	});

	grunt.registerTask('debug', function(s) {
		var done = this.async();

		nconf.file({
			file: './brei-config.json'
		});
		nconf.load();

		if (s === 'on') {
			nconf.set('debug', 'true');
			nconf.save(function(err) {
				if (err) {
					console.error(err.message);
					done();
					return;
				}
				console.log(yosay('Debug mode activated!'));
				done();
			});

		} else {
			var debug = nconf.get('debug');

			if (typeof debug !== 'undefined' && debug !== '') {
				if (debug === 'true') {
					debug = 'false';
				} else {
					debug = 'true';
				}
			} else {
				debug = 'false';
			}
			nconf.set('debug', debug);
			nconf.save(function(err) {
				if (err) {
					console.log('error! ' + err.message);
					console.error(err.message);
					done();
					return;
				}
				if (debug) {
					console.log(yosay('Debug mode activated!'));
				} else {
					console.log(yosay('Debug mode deactivated!'));
				}
				done();
			});
		}
	});
};
