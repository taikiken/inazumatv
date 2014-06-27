/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
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
     * window幅に比率を保ち拡大縮小し、常に中央を表示します。
     *
     * @class FitWindowAspectCenter
     * @param {jQuery} $element jQuery object, 対象エレメント
     * @param {Number} [minWidth] default 0
     * @param {Number} [minHeight] default 0
     * @constructor
     */
    function FitWindowAspectCenter ( $element, minWidth, minHeight ) {
        if ( !isNumeric( minWidth ) ) {
            minWidth = 0;
        }
        if ( !isNumeric( minHeight ) ) {
            minHeight = 0;
        }

        this._watch = WatchWindowSize.getInstance();
        this._$element = $element;
        this._minWidth = minWidth;
        this._minHeight = minHeight;

        this._elementWidth = parseInt( $element.width(), 10 );
        this._elementHeight = parseInt( $element.height(), 10 );
    }

    /**
     * FitWindowAspectCenter へ jQuery object を設定。FitWindowAspectCenter を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    FitWindowAspectCenter.activate = function ( jQuery ){
        $ = jQuery;
        WatchWindowSize = inazumatv.jq.WatchWindowSize;
        WatchWindowSize.activate( jQuery );
    };

    var p = FitWindowAspectCenter.prototype;

    p.constructor = FitWindowAspectCenter;

    /**
     *
     * @method getWatchWindowSize
     * @return {WatchWindowSize} WatchWindowSize instance
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
            window_w = Math.ceil( params.width ),
            window_h = Math.ceil( params.height ),
            w,
            h,
            aspect_w,
            aspect_h,
            aspect;

        w = Math.max( window_w, this._minWidth );
        h = Math.max( window_h, this._minHeight );
        aspect_w = w / ew;
        aspect_h = h / eh;
        aspect = Math.max( aspect_w, aspect_h );

        // 計算後のwidth, height
        var after_w = Math.ceil( ew * aspect ),
            after_h = Math.ceil( eh * aspect ),
            sub_w = (window_w - after_w) * 0.5,
            sub_h = (window_h - after_h) * 0.5;

        this._$element.width( after_w ).height( after_h ).css( { left: sub_w + "px", top: sub_h + "px" } );
    };

    inazumatv.jq.FitWindowAspectCenter = FitWindowAspectCenter;

}( this.inazumatv ) );