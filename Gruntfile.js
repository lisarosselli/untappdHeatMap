module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['js/*.js']
		},
		csslint: {
			all: ['css/*.css']
		},
		watch: {
			html: {
				files: ['*.html']
			},
			js: {
				files: ['js/*.js'],
				tasks: ['jshint']
			},
			css: {
				files: ['css/*.css'],
				tasks: ['csslint']
			}
		},
		uglify: {
		    my_target: {
		      files: {
		        'js/output.min.js': ['js/controller.js', 'js/dataparse.js', 'js/googlemapview.js', 'js/view.js',
												'js/main.js', 'js/mainuiview.js', 'js/model.js', 'js/untappd.js', 'js/user.js']
		      }
		    }
		  }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [
		'jshint',
		'csslint',
		'uglify'
	]);
};