'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {}
    },
    // default watch configuration
    regarde: {
      compass: {
        files: [
          'app/styles/**/*.{scss,sass}',
          'app/scripts/**/*.js',
          'app/*.html'
        ],
        tasks: ['compass','cssmin','livereload']
      }
    },

    // concat css/**/*.css files, inline @import, output a single minified css
    cssmin: {
      my_target: {
            src: 'app/styles/index.css',
            dest: 'app/styles/index.min.css'
        }
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9001,
          base: 'app',
          hostname:''
        }
      }
    }

  });

  // Load the plugin that provides task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');;
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-regarde');

  // Default task(s).
  grunt.registerTask('default', ['jshint','compass']);
  grunt.registerTask('run', ['compass','regarde']);
  grunt.registerTask('server', ['livereload-start','connect','regarde']);

};