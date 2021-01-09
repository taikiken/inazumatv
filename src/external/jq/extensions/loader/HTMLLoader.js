/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/15 - 17:47
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function( inazumatv ) {
  'use strict';
  var XMLLoader = inazumatv.jq.XMLLoader,
    $;

  /**
     * 指定URLのHTMLを読込みます
     * @class HTMLLoader
     * @extends XMLLoader
     * @param {String} url
     * @param {Boolean|*} [nocache] no cache: true, default: true
     * @constructor
     */
  function HTMLLoader( url, nocache ) {
    XMLLoader.call( this, url, nocache );
    /**
         * @property _type
         * @type {string}
         * @protected
         */
    this._type = 'html';
  }

  HTMLLoader.prototype.constructor = HTMLLoader;

  inazumatv.extend( XMLLoader, HTMLLoader );

  /**
     * HTMLLoader へ jQuery object を設定。HTMLLoader を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
  HTMLLoader.activate = function( jQuery ) {
    $ = jQuery;
  };

  inazumatv.jq.HTMLLoader = HTMLLoader;
}( this.inazumatv ) );
