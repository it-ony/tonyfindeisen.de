module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jekyll: {
            dist: {
                options: {
                    serve: false,
                    watch: false,
                    safe: true
                }
            },
            dev: {
                options: {
                    serve: true,
                    watch: true,
                    drafts: true,
                    safe: true
                }
            }
        },

        uglify: {
            options: {
                preserveComments: 'some'
            },
            dist: {
                files: {
                    'js/modernizr.min.js': ['bower_components/modernizr/modernizr.js']
                }
            }
        },

        sass: {
            options: {
                includePaths: ['bower_components/foundation/scss']
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceComments: 'none'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            },
            dev: {
                options: {
                    outputStyle: 'nested',
                    sourceComments: 'none'
                },
                files: {
                    '_site/css/app.css': 'scss/app.scss'
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    'css/app.css': ['css/app.css']
                }
            }
        },

        autoprefixer: {
            dist: {
                src: 'css/app.css',
                dest: 'css/app.css'
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },

            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass:dev']
            }
        },

        concurrent: {
            dev: {
                tasks: [
                    'watch:sass', 'jekyll'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['uglify:dist', 'sass:dist', 'autoprefixer:dist', 'cssmin:dist']);
    grunt.registerTask('publish', ['build', 'jekyll:dist']);
    grunt.registerTask('default', ['build', 'concurrent:dev']);
};