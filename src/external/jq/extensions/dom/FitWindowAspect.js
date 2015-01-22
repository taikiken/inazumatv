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
    var
      isNumeric = inazumatv.isNumeric,
      _int = parseInt,
      _ceil = Math.ceil,
      _max = Math.max,
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
     * @param {Number} [offsetTop] default 0
     * @constructor
     */
    function FitWindowAspect ( $element, minWidth, minHeight, offsetLeft, offsetTop ) {
        if ( !isNumeric( minWidth ) ) {
            minWidth = 0;
        }
        if ( !isNumeric( minHeight ) ) {
            minHeight = 0;
        }
        if ( !isNumeric( offsetLeft ) ) {
            offsetLeft = 0;
        }
        if ( !isNumeric( offsetTop ) ) {
            offsetTop = 0;
        }
        /**
         * @property _watch
         * @type {WatchWindowSize}
         * @private
         */
        this._watch = WatchWindowSize.getInstance();
        /**
         * @property _$element
         * @type {jQuery}
         * @private
         */
        this._$element = $element;
        /**
         * @property _minWidth
         * @type {Number}
         * @private
         */
        this._minWidth = minWidth;
        /**
         * @property _minHeight
         * @type {Number}
         * @private
         */
        this._minHeight = minHeight;
        /**
         * @property _offsetLeft
         * @type {Number}
         * @private
         */
        this._offsetLeft = offsetLeft;
        /**
         * @property _offsetTop
         * @type {Number}
         * @private
         */
        this._offsetTop = offsetTop;
        /**
         * @property _elementWidth
         * @type {Number}
         * @private
         */
        this._elementWidth = _int( $element.width(), 10 );
        /**
         * @property _elementHeight
         * @type {Number}
         * @private
         */
        this._elementHeight = _int( $element.height(), 10 );
        /**
         * @property _boundOnResize
         * @type {function(this:FitWindowAspect)|*}
         * @private
         */
        this._boundOnResize = this._onResize.bind( this );
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

    p.constructor = inazumatv.FitWindowAspect;

    /**
     * @deprecated
     * @method getWatchWindowSize
     * @return {WatchWindowSize} WatchWindowSize instance
     */
    p.getWatchWindowSize = function (){
        console.warn( "getWatchWindowSize deprecated, instead watch" );
        return this.watch();
    };
    /**
     * @method watch
     * @return {WatchWindowSize}
     */
    p.watch = function () {
      return this._watch;
    };

    /**
     * 監視を開始します
     * @method listen
     * @return {FitWindowAspect}
     */
    p.listen = function (){
        var watch = this._watch;
        watch.addEventListener( WatchWindowSize.RESIZE, this._boundOnResize );
        watch.start();

        return this;
    };

    /**
     * 監視を止めます
     * @method abort
     * @return {FitWindowAspect}
     */
    p.abort = function (){
        this._watch.removeEventListener( WatchWindowSize.RESIZE, this._boundOnResize );

        return this;
    };

    /**
     * @method setElementWidth
     * @param {Number} w DOMElement width
     * @return {FitWindowAspect}
     */
    p.setElementWidth = function ( w ){
        if ( isNumeric( w ) ) {
            this._elementWidth = w;
        }

        return this;
    };

    /**
     * @method setElementHeight
     * @param {Number} h DOMElement height
     * @return {FitWindowAspect}
     */
    p.setElementHeight = function ( h ){
        if ( isNumeric( h ) ) {
            this._elementHeight = h;
        }

        return this;
    };

    /**
     * @method setMinHeight
     * @param {Number} h Minimum height
     * @return {FitWindowAspect}
     */
    p.setMinHeight = function ( h ){
        if ( isNumeric( h ) ) {
            this._minHeight = h;
        }

        return this;
    };

    /**
     * @method setMinWidth
     * @param {Number} w Minimum width
     * @return {FitWindowAspect}
     */
    p.setMinWidth = function ( w ){
        if ( isNumeric( w ) ) {
            this._elementWidth = w;
        }

        return this;
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
            h = params.height - this._offsetTop,
            aw,
            ah,
            aspect;

        w = _max( w, this._minWidth );
        h = _max( h, this._minHeight );
        aw = w / ew;
        ah = h / eh;
        aspect = _max( aw, ah );

        this._$element.width( _ceil( ew * aspect ) ).height( _ceil( eh * aspect ) );
    };

    inazumatv.jq.FitWindowAspect = FitWindowAspect;
}( this.inazumatv ) );