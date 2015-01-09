/**
 * lang-utils
 *
 * Created by lukaszblacha on 08/01/15.
 */

'use strict';

var amdLoader = require('amd-loader');

function getTranslationKeys( transFile ) {
    var content = require( process.cwd() + transFile );
    return Object.keys( content );
}

function findKeys( template, keys ) {
    var regex = "translate\\s*\\(\\s*['|\"](#)['|\"]\\s*\\)",
        remainingKeys = [], foundKeys = [];

    keys.forEach( function( key ) {
        var reg = new RegExp( regex.replace( '#', key ), 'g' );
        if( reg.test( template ) ) {
            foundKeys.push( key );
        } else {
            remainingKeys.push( key );
        }
    });

    return {
        remainingKeys: remainingKeys,
        foundKeys: foundKeys
    };
}

module.exports = {
    findKeys: findKeys,
    getTranslationKeys: getTranslationKeys

};
