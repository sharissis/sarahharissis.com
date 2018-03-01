module.exports = function(grunt, options){
	var yeoman = options.yeoman;
	return {
		dist: {
			files: [{
				dot: true,
				src: ['.tmp', yeoman.dist + '/*', '!' + yeoman.dist + '/.git*']
			}]
		},
		distmodernizr: {
			src: [yeoman.dist + '/js/plugins/modernizr.optimized.js']
		},
		deploy: {
			options: {
				force: true
			},
			src: [yeoman.deploy]
		},
		server: '.tmp',
		assemble: {
			src: [yeoman.app + '/*.html',
				yeoman.app + '/modules/*.html'
			]
		}
	};
};
