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
( function ( inazumatv ){
    "use strict";
    var XMLLoader = inazumatv.jq.XMLLoader,
        $;

    /**
     * 指定URLのTXTを読込みます
     * @class TXTLoader
     * @extends XMLLoader
     * @param {String} url
     * @param {Boolean|*} [nocache] no cache: true, default: true
     * @constructor
     */
    function TXTLoader ( url, nocache ) {
        XMLLoader.call( this, url, nocache );
        this._type = "text";
    }

    TXTLoader.prototype.constructor = TXTLoader;

    inazumatv.extend( XMLLoader, TXTLoader );

    /**
     * TXTLoader へ jQuery object を設定。TXTLoader を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    TXTLoader.activate = function ( jQuery ){
        $ = jQuery;
    };

    inazumatv.jq.TXTLoader = TXTLoader;
}( this.inazumatv ) );