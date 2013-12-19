/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2013/12/17 - 14:26
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
     * @class FitWindowHeight
     * @param {jQuery} $element jQuery object, 対象エレメント
     * @param {Number} [minHeight] default 0
     * @constructor
     */
    function FitWindowHeight ( $element, minHeight ) {
        if ( !isNumeric( minHeight ) ) {
            minHeight = 0;
        }

        this._watch = WatchWindowSize.getInstance();
        this._$element = $element;
        this._minHeight = minHeight;

        this._elementHeight = parseInt( $element.height(), 10 );
    }
    /**
     * FitWindowHeight へ jQuery object を設定。FitWindowHeight を使用する前に実行する必要があります。<br>
     * ExternalJQ.imports から実行されます。
     *
     * @method activate
     * @param {jQuery} jQuery object
     * @static
     */
    FitWindowHeight.activate = function ( jQuery ){
        $ = jQuery;
        WatchWindowSize = inazumatv.jq.WatchWindowSize;
        WatchWindowSize.activate( jQuery );
    };

    var p = FitWindowHeight.prototype;

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
     * @method setMinHeight
     * @param {Number} h Minimum height
     */
    p.setMinHeight = function ( h ){
        if ( isNumeric( h ) ) {
            this._minHeight = h;
        }
    };

    /**
     * Event Handler, Window width or height resize
     * @method _onResize
     * @param {EventObject} eventObject
     * @protected
     */
    p._onResize = function ( eventObject ){
        var params = eventObject.params[ 0 ],
            h = params.height
        ;

        this._$element.height( Math.max( h, this._minHeight ) );
    };

    inazumatv.jq.FitWindowHeight = FitWindowHeight;
}( this.inazumatv ) );