module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['js/main.js']
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');

	grunt.registerTask('default', [
		'jshint',
		'csslint'
	]);
};