/**
 * lang-utils
 *
 * Created by lukaszblacha on 08/01/15.
 */

'use strict';

var fs = require('fs'),
    path = require('path');

function getTranslationKeys( transFile ) {
    var regex = /\n\s*([^:]*):*/g,
        langData;

    fs.readFile( transFile, 'utf8', function( err, data ) {
        if( err ) throw err;
        langData = data.match( regex ).map( function( key ) {
            return key.trim().replace( /^'|'$|^"|"$/gm, '' );
        } );
    } );
    return langData;
}

function findKeys( template, keys ) {
    var regex = "translate\\s*\(\\s*['|\"]#['|\"]\\s*\)",
        remainingKeys = [], foundKeys = [];

    if( typeof keys === 'string' ) keys = getLangKeys( keys );

    keys.forEach( function( idx, key ) {
        if( new RegExp(regex.replace( '#', key ).test( template ) ) ) {
            foundKeys.push( key );
        } else {
            remainingKeys.push( key );
        }
    });

    return {
        remainingKeys: remainingKeys,
        foundKeys: foundKeys
    };
};

module.exports = {
    findKeys: findKeys,
    getTranslationKeys: getTranslationKeys

};
