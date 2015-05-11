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
		concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      src: ['js/*.js'],
		      dest: 'dist/heatmap.js',
		    },
		  },
		uglify: {
		    my_target: {
					options: {
						sourceMap: true
					},
		      files: {
		        'dist/heatmap.min.js': ['dist/heatmap.js']
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
			      'dist/output.css': ['css/styles.css']
			    }
			  }
			}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build', ['csslint', 'jshint', 'concat', 'uglify', 'cssmin']);
};