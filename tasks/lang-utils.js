/**
 * lang-utils
 *
 * Created by lukaszblacha on 08/01/15.
 */

'use strict';

var amdLoader = require('amd-loader');

function getTranslationKeys( transFile ) {
    var keys,
        content = require( process.cwd() + transFile );
    
    keys = Object.keys( content );
    console.log( "KEYS:", keys );
    return keys;
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

    console.log({
        remainingKeys: remainingKeys,
        foundKeys: foundKeys
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
