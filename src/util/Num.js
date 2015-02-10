/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2015/02/06 - 16:01
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * Number utility
 */
( function ( window ){
  "use strict";
  var inazumatv = window.inazumatv;

  inazumatv.Num = ( function (){

    /**
     * @class Num
     * @constructor
     */
    function Num () {
      throw new Error( "Num can't create instance." );
    }

    var p = Num.prototype;

    p.constructor = Num;

    /**
     * 3桁毎にカンマ(,)を挿入します
     * @method comma
     * @static
     * @param {number|string} n
     * @return {string} カンマ挿入後の文字列を返します
     */
    Num.comma = function ( n ) {

      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    /**
     * 範囲指定乱数生成
     * <br>inazumatv.random alias
     * @method random
     * @static
     * @param {Number} min 最小値
     * @param {Number} [max] 最大値 optional
     * @return {Number} min ~ max 間の乱数(Float)を発生させます
     */
    Num.random = function ( min, max ) {
      return inazumatv.random( min, max );
    };
    /**
     * 数値チェック
     * <br>inazumatv.isNumeric alias
     * @method is
     * @static
     * @param {*} obj
     * @return {boolean} true: Number, false: not Number
     */
    Num.is = function ( obj ) {
      return inazumatv.isNumeric( obj );
    };

    return Num;
  }() );
}( window ) );