/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2013/12/17 - 14:10
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
    var isNumeric = inazumatv.isNumeric,
        WatchWindowSize,
        /**
         * jQuery alias
         * @property $
         * @type {jQuery}
         * @private
         * @static
         */
        $;

    /**
     *
     * @class FitWindowAspect
     * @param {jQuery} $element jQuery object, 対象エレメント
     * @param {Number} [minWidth] default 0
     * @param {Number} [minHeight] default 0
     * @param {Number} [offsetLeft] default 0
     * @constructor
     */
    function FitWindowAspect ( $element, minWidth, minHeight, offsetLeft ) {
        if ( !isNumeric( minWidth ) ) {
            minWidth = 0;
        }
        if ( !isNumeric( minHeight ) ) {
            minHeight = 0;
        }
        if ( !isNumeric( offsetLeft ) ) {
            offsetLeft = 0;
        }

        this._watch = WatchWindowSize.getInstance();
        this._$element = $element;
        this._minWidth = minWidth;
        this._minHeight = minHeight;
        this._offsetLeft = offsetLeft;

        this._elementWidth = parseInt( $element.width(), 10 );
        this._elementHeight = parseInt( $element.height(), 10 );
    }

    /**
     * FitWindowAspect へ jQuery object を設定。FitWindowAspect を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    FitWindowAspect.activate = function ( jQuery ){
        $ = jQuery;
        WatchWindowSize = inazumatv.jq.WatchWindowSize;
        WatchWindowSize.activate( jQuery );
    };

    var p = FitWindowAspect.prototype;

    /**
     *
     * @method getWatchWindowSize
     * @returns {WatchWindowSize} WatchWindowSize instance
     */
    p.getWatchWindowSize = function (){
        return this._watch;
    };

    /**
     * 監視を開始します
     * @method listen
     */
    p.listen = function (){
        this._boundOnResize = this._onResize.bind( this );
        this._watch.addEventListener( WatchWindowSize.RESIZE, this._boundOnResize );
        this._watch.start();
    };

    /**
     * 監視を止めます
     * @method abort
     */
    p.abort = function (){
        this._watch.removeEventListener( WatchWindowSize.RESIZE, this._boundOnResize );
    };

    /**
     * @method setElementWidth
     * @param {Number} w DOMElement width
     */
    p.setElementWidth = function ( w ){
        if ( isNumeric( w ) ) {
            this._elementWidth = w;
        }
    };

    /**
     * @method setElementHeight
     * @param {Number} h DOMElement height
     */
    p.setElementHeight = function ( h ){
        if ( isNumeric( h ) ) {
            this._elementHeight = h;
        }
    };

    /**
     * @method setMinHeight
     * @param {Number} h Minimum height
     */
    p.setMinHeight = function ( h ){
        if ( isNumeric( h ) ) {
            this._minHeight = h;
        }
    };

    /**
     * @method setMinWidth
     * @param {Number} h Minimum width
     */
    p.setMinWidth = function ( w ){
        if ( isNumeric( w ) ) {
            this._elementWidth = w;
        }
    };

    /**
     * Event Handler, Window width or height resize
     * @method _onResize
     * @param {EventObject} eventObject
     * @protected
     */
    p._onResize = function ( eventObject ){
        var ew = this._elementWidth,
            eh = this._elementHeight,
            params = eventObject.params[ 0 ],
            w = params.width - this._offsetLeft,
            h = params.height,
            aw,
            ah,
            aspect;

        w = Math.max( w, this._minWidth );
        h = Math.max( h, this._minHeight );
        aw = w / ew;
        ah = h / eh;
        aspect = Math.max( aw, ah );

        this._$element.width( Math.ceil( ew * aspect ) ).height( Math.ceil( eh * aspect ) );
    };

    inazumatv.jq.FitWindowAspect = FitWindowAspect;
}( this.inazumatv ) );