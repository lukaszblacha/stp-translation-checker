/*
 * stp-translation-checker
 * 
 *
 * Copyright (c) 2015 Łukasz Blacha
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var langUtils = require('lang-utils.js');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('stp_translation_checker', 'Checks translation files against templates and views. Then lists unused phrases', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var keys,
        options = this.options({
          transFile: 'public/js/data/lang.js'
        });

      keys = langUtils.getTranslationKeys( options.transFile );

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      });

      // Write the destination file.
      // grunt.file.write( f.dest, src );

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
