/*
 * stp-translation-checker
 * 
 *
 * Copyright (c) 2015 Łukasz Blacha
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var langUtils = require('./lang-utils.js');
    var glob = require('glob');
    var fs = require('fs');

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('stp_translation_checker',
        'Checks translation files against templates and views. Then lists unused phrases',
        function() {
            // Merge task-specific and/or target-specific options with these defaults.
            var keys,
                options = this.options({
                    transFile: 'public/js/data/lang.js'
                }),
                sourceFiles = [];

            keys = langUtils.getTranslationKeys( options.transFile );

            options.templates.forEach( function(tpl) {
                sourceFiles = sourceFiles.concat(
                    glob.sync( tpl, {
                        dot: true,
                        matchBase: true
                    })
                );
            });
            grunt.log.writeln( "Checking these files: \n", sourceFiles );

            // Iterate over all specified file groups.
            var src = sourceFiles.map( function( file ) {
                return fs.readFileSync( file, { encoding: 'utf8', flag: 'r' } )
            }).join( "\n" );

            var result = langUtils.findKeys( src, keys );

            if( result.remainingKeys.length ) {
                result.remainingKeys.forEach( function( key ) {
                    grunt.log.warn( 'Unused phrase "' + key + '"' );
                });
            } else {
                grunt.log.writeln("OK. All translation phrases are currently in use.");
            }
        }
    );

};
