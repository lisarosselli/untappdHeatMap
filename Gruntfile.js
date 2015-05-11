module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['js/controller.js', 'js/dataparse.js', 'js/googlemapview.js', 'js/main.js', 
						'js/mainuiview.js', 'js/model.js', 'js/untappd.js', 'js/user.js', 'js/view.js']
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
					options: {
						sourceMap: true
					},
		      files: {
		        'js/output.min.js': ['js/controller.js', 'js/dataparse.js', 'js/googlemapview.js', 'js/main.js', 
																'js/mainuiview.js', 'js/model.js', 'js/untappd.js', 'js/user.js', 'js/view.js']
		      }
		    }
		  },
			cssmin: {
			  options: {
			    shorthandCompacting: false,
			    roundingPrecision: -1
			  },
			  target: {
			    files: {
			      'css/output.css': ['css/styles.css']
			    }
			  }
			}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build', ['uglify', 'cssmin']);

	grunt.registerTask('default', [
		'jshint',
		'csslint',
		'uglify',
		'cssmin'
	]);
};