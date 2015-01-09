/*
 * stp-translation-checker
 * 
 *
 * Copyright (c) 2015 Łukasz Blacha
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    stp_translation_checker: {
      simple: {
        options: {
          transFile: '/test/fixtures/lang.js', // with leading /
          templates: [ 'test/fixtures/simple.html' ] // without leading /
        }
      },
      complex: {
        options: {
          transFile: '/test/fixtures/lang.js',
          templates: ['test/fixtures/complex.html']
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['stp_translation_checker', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
