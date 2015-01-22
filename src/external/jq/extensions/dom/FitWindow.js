/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/17 - 13:57
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
     * @class FitWindow
     * @param {jQuery} $element jQuery object, 対象エレメント
     * @param {Number} [minWidth] default 0
     * @param {Number} [minHeight] default 0
     * @param {Number} [offsetLeft] default 0
     * @constructor
     */
    function FitWindow ( $element, minWidth, minHeight, offsetLeft ) {
        if ( !isNumeric( minWidth ) ) {
            minWidth = 0;
        }
        if ( !isNumeric( minHeight ) ) {
            minHeight = 0;
        }
        if ( !isNumeric( offsetLeft ) ) {
            offsetLeft = 0;
        }
        /**
         * @property _watch
         * @type {WatchDocumentHeight}
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
         * @property _boundOnResize
         * @type {function(this:FitWindow)|*}
         * @private
         */
        this._boundOnResize = this._onResize.bind( this );
    }

    /**
     * FitWindow へ jQuery object を設定。FitWindow を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    FitWindow.activate = function ( jQuery ){
        $ = jQuery;
        WatchWindowSize = inazumatv.jq.WatchWindowSize;
        WatchWindowSize.activate( jQuery );
    };

    var p = FitWindow.prototype;

    p.constructor = inazumatv.FitWindow;

    /**
     * @deprecated
     * @method getWatchWindowSize
     * @return {WatchWindowSize} WatchWindowSize instance
     */
    p.getWatchWindowSize = function (){
        //return this._watch;
        console.warn( "deprecated, use watch()" );
        return this.watch();
    };

    /**
     * @method watch
     * @return {WatchWindowSize|*|FitWindow._watch}
     */
    p.watch = function () {

        return this._watch;
    };

    /**
     * 監視を開始します
     * @method listen
     */
    p.listen = function (){
        var watch = this._watch;

        watch.addEventListener( WatchWindowSize.RESIZE, this._boundOnResize );
        watch.start();
    };

    /**
     * 監視を止めます
     * @method abort
     */
    p.abort = function (){
        this._watch.removeEventListener( WatchWindowSize.RESIZE, this._boundOnResize );
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
     * Event Handler, Document height resize
     * @method _onResize
     * @param {EventObject} eventObject
     * @protected
     */
    p._onResize = function ( eventObject ){
        var params = eventObject.params[ 0 ],
            w = params.width - this._offsetLeft,
            h = params.height;

        this._$element.width( _max( w, this._minWidth ) ).height(_max( h, this._minHeight ) );
    };

    inazumatv.jq.FitWindow = FitWindow;

}( this.inazumatv ) );