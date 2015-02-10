/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2014/06/18 - 19:08
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
    var inazumatv = window.inazumatv;

    inazumatv.List = ( function (){
      var
        _shuffle = inazumatv.shuffle,

        _maxValue = inazumatv.maxValue;

        /**
         * Array ヘルパー
         * @class List
         * @constructor
         */
        function List () {
            throw new Error( "List can't create instance" );
        }

        var l = List;

        // http://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
        // http://jsperf.com/zerofill-2d-array
        /**
         * word で埋められた配列を length 分作成します
         * @method word
         * @static
         * @param {int} length
         * @param {int|string} word
         * @return {Array}
         */
        l.word = function ( length, word ) {
            var arr = [], i;

            for ( i = 0; i < length; i++ ) {
                arr[ i ] = word;
            }

            return arr;
        };

        /**
         * 0 で埋められた配列を length 分作成します
         * @method zero
         * @static
         * @param {int} length
         * @return {Array}
         */
        l.zero = function ( length ) {
            return this.word( length, 0 );
        };

        /**
         * 配列をシャッフルします
         * <br>inazumatv.shuffle alias
         * @method shuffle
         * @static
         * @param {Array} array
         * @return {Array} シャッフル後の配列を返します
         */
        l.shuffle = function ( array ) {
            return _shuffle( array );
        };

        /**
         * 配列内の最大数値を返します
         * <br>inazumatv.maxValue alias
         * @method max
         * @static
         * @param {Array} arr 検証対象の配列、内部は全部数値 [Number, [Number]]
         * @return {number} 配列内の最大数値を返します
         */
        l.max = function ( arr ) {
            _maxValue( arr );
        };

        return List;
    }() );

}( window ) );