module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jade: {
			compile: {
				files: {
					"index.html": "jade/*"
				}
			}
		},

		stylus: {
			compile: {
				files: {
					"public/stylesheets/style.css": "stylus/style.styl"
				}
			}
		},

		watch: {
			scripts: {
				files: ['jade/*', 'stylus/*', 'js/*'],
				tasks: ['make']
			},
		}
	});

	grunt.registerTask('make', 'Compile jade, stylus', function() {
		grunt.task.run("jade");
		grunt.task.run("stylus");
	});

	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
}