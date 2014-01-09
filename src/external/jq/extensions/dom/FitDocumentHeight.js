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
    var WatchDocumentHeight,
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
        this._watch = WatchDocumentHeight.getInstance();
        this._$element = $element;
        this._minHeight = minHeight;
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

    /**
     *
     * @method getWatchDocumentHeight
     * @returns {WatchDocumentHeight} WatchDocumentHeight instance
     */
    p.getWatchDocumentHeight = function (){
        return this._watch;
    };

    /**
     * 監視を開始します
     * @method listen
     */
    p.listen = function (){
        this._watch.addEventListener( WatchDocumentHeight.RESIZE, this._boundOnResize );
        this._watch.start();
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

        this._$element.height( Math.max( h, this._minHeight ) );
    };

    inazumatv.jq.FitDocumentHeight = FitDocumentHeight;

}( this.inazumatv ) );