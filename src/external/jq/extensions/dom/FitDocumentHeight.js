/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/15 - 22:13
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
      WatchDocumentHeight,
      _max = Math.max,
        /**
         * jQuery alias
         * @property $
         * @type {jQuery}
         * @private
         * @static
         */
            $
        ;
    /**
     * jQuery Object の高さを document へあわせます
     * @class FitDocumentHeight
     * @param {jQuery} $element jQuery Object
     * @param {Number} [minHeight] 最小高さ、default: 0
     * @constructor
     */
    function FitDocumentHeight ( $element, minHeight ) {
        if ( !inazumatv.isNumeric( minHeight ) ) {
            minHeight = 0;
        }

        /**
         * @property _watch
         * @type {WatchDocumentHeight}
         * @private
         */
        this._watch = WatchDocumentHeight.getInstance();
        /**
         * @property _$element
         * @type {jQuery}
         * @private
         */
        this._$element = $element;
        /**
         * @property _minHeight
         * @type {Number}
         * @private
         */
        this._minHeight = minHeight;
        /**
         * @property _boundOnResize
         * @type {function(this:FitDocumentHeight)|*}
         * @private
         */
        this._boundOnResize = this._onResize.bind( this );
    }

    /**
     * FitDocumentHeight へ jQuery object を設定。FitDocumentHeight を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    FitDocumentHeight.activate = function ( jQuery ){
        $ = jQuery;
        WatchDocumentHeight = inazumatv.jq.WatchDocumentHeight;
        WatchDocumentHeight.activate( jQuery );
    };

    var p = FitDocumentHeight.prototype;

    p.constructor = inazumatv.FitDocumentHeight;

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
     * @return {WatchWindowSize|*|FitDocumentHeight._watch}
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

        watch.addEventListener( WatchDocumentHeight.RESIZE, this._boundOnResize );
        watch.start();
    };

    /**
     * 監視を止めます
     * @method abort
     */
    p.abort = function (){
        this._watch.removeEventListener( WatchDocumentHeight.RESIZE, this._boundOnResize );
    };

    /**
     * Event Handler, Document height resize
     * @method _onResize
     * @param {EventObject} eventObject
     * @private
     */
    p._onResize = function ( eventObject ){
        var params = eventObject.params[ 0 ],
            h = params.height;

        this._$element.height( _max( h, this._minHeight ) );
    };

    inazumatv.jq.FitDocumentHeight = FitDocumentHeight;

}( this.inazumatv ) );