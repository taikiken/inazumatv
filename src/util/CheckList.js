/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 17:28
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( inazumatv ){
    "use strict";

    /**
     * 複数の処理が終了しているのかを管理するときなどに使用します
     * @class CheckList
     * @param {Array.<String>} list [key:String...]
     * @constructor
     */
    function CheckList ( list ) {
        /**
         *
         * check用list
         * @property _checkList
         * @type {null|{}}
         * @private
         */
        this._checkList = null;
        this.reset( list );
    }

    var p = CheckList.prototype;

    /**
     * 管理用配列を再生成します
     * @method reset
     * @param {Array.<String>} list [key:String...]
     */
    p.reset = function ( list ) {
        var checkList = {},
            i = 0,
            limit = list.length;

        for ( ; i < limit; i++ ) {

            checkList[ list[ i ] ] = false;
        }

        this._checkList = checkList;
    };

    /**
     * 引数keyの値をtrueにし、全てtrueかどうかを返します
     * @method clear
     * @param {string} key
     * @return {Boolean} true: 全てtrue, false: falseが含まれている
     */
    p.clear = function ( key ) {
        var checkList = this._checkList;

        // keyがなければ処理しない
        if ( checkList.hasOwnProperty( key ) ) {

            checkList[ key ] = true;
            return this._isAllClear();
        } else {
            return false;
        }
    };

    /**
     * 全てtrueかどうかを調べます
     * @method _isAllClear
     * @return {boolean} true: 全てtrue, false: falseが含まれている
     * @private
     */
    p._isAllClear = function (){
        var checkList = this._checkList,
            result = true;

        for ( var key in checkList ) {

            if ( checkList.hasOwnProperty( key ) ) {

                result = checkList[ key ];

                if ( !result ) {
                    // falseが見つかれば処理しない
                    break;
                }
            }
        }

        // valueが全てtrueの時は処理済み: true
        return result;
    };

    inazumatv.CheckList = CheckList;

}( this.inazumatv ) );