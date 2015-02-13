/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/02/15 - 21:04
 *
 * Copyright (c) 2011-2014 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window ){
    "use strict";
    var
      inazumatv = window.inazumatv,
      _decode = window.decodeURIComponent;

    /**
     * get parameter を取得します
     * @class QuerySearch
     * @constructor
     */
    function QuerySearch () {
        throw new Error( "QuerySearch cannot be instantiated" );
    }

  QuerySearch.prototype.constructor = QuerySearch;

    var q = QuerySearch;

    /**
     * 指定Keyの値を取得します。
     * @for QuerySearch
     * @method search
     * @param {string} key_name 取得したいkey name
     * @return {string} search value
     * @static
     */
    q.search = function ( key_name ){
        var query = window.location.search.substring( 1 ),
            vars = query.split( '&' ),
            result = "";

        for ( var i = 0, limit = vars.length; i < limit; i++ ) {
            var pair = vars[ i ].split( '=' );
            if ( _decode( pair[ 0 ] ) === key_name ) {
                result =  _decode( pair[ 1 ] );
                break;
            }
        }

        return result;
    };

    /**
     * get parameter を全て取得します。
     * ＊key=value形式のみです。
     *
     * @for QuerySearch
     * @method searchAll
     * @return {object} key: value
     * @static
     */
    q.searchAll = function (){
        var query = window.location.search.substring( 1 ),
            vars = query.split( '&' ),
            result = {};

        for ( var i = 0, limit = vars.length; i < limit; i++ ) {
            var pair = vars[ i ].split( '=' );

            result[ _decode( pair[ 0 ] ) ] = _decode( pair[ 1 ] );
        }

        return result;
    };

    inazumatv.QuerySearch = QuerySearch;
//
//    window.inazumatv.QuerySearch = {
//        /**
//         * 指定Keyの値を取得します。
//         * @for QuerySearch
//         * @method search
//         * @param {string} key_name 取得したいkey name
//         * @return {string} search value
//         * @static
//         */
//        search: function ( key_name ){
//            var query = window.location.search.substring( 1 ),
//                vars = query.split( '&' ),
//                result = "";
//
//            for ( var i = 0, limit = vars.length; i < limit; i++ ) {
//                var pair = vars[ i ].split( '=' );
//                if ( decodeURIComponent( pair[ 0 ] ) === key_name ) {
//                    result =  decodeURIComponent( pair[ 1 ] );
//                    break;
//                }
//            }
//
//            return result;
//        },
//        /**
//         * get parameter を全て取得します。
//         * ＊key=value形式のみです。
//         *
//         * @for QuerySearch
//         * @method searchAll
//         * @return {object} key: value
//         * @static
//         */
//        searchAll: function (){
//            var query = window.location.search.substring( 1 ),
//                vars = query.split( '&' ),
//                result = {};
//
//            for ( var i = 0, limit = vars.length; i < limit; i++ ) {
//                var pair = vars[ i ].split( '=' );
//
//                result[ decodeURIComponent( pair[ 0 ] ) ] = decodeURIComponent( pair[ 1 ] );
//            }
//
//            return result;
//        }
//    };
}( window ) );