/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 21:12
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

    inazumatv.jq = inazumatv.jq || {};
    var ExternalJQ = inazumatv.jq.ExternalJQ  = inazumatv.jq.ExternalJQ || {};

    /**
     * jQuery Object 設定します。<br>
     * imports, exports を行う前に実行します。
     *
     *     inazumatv.jq.ExternalJQ.save( jQuery );
     *
     * @for jq.ExternalJQ
     * @method save
     * @param {jQuery} jQuery global jQuery Object
     * @static
     */
    ExternalJQ.save = function ( jQuery ){
        if ( typeof jQuery === "undefined" || jQuery === null ) {
            // jQuery defined
            throw "set first global jQuery object";
        } else {
            this._$ = jQuery;
            inazumatv.eventStop = eventStop;
        }
    };

    /**
     * jQuery Object を取得します。
     *
     *     var $ = inazumatv.jq.ExternalJQ.exports();
     *
     * @for jq.ExternalJQ
     * @method exports
     * @return {jQuery} jQuery Object
     * @static
     */
    ExternalJQ.exports = function (){
        return this._$;
    };

    /**
     * jQuery plugin を活性化させます。<br>
     *
     *     inazumatv.jq.ExternalJQ.save( jQuery );
     *     inazumatv.jq.ExternalJQ.install( "Easing" );
     *
     *     // あるいは
     *     inazumatv.jq.ExternalJQ.install( "Easing", jQuery );
     *
     * @for jq.ExternalJQ
     * @method install
     * @param {String} pluginName プラグイン名称
     * @param {jQuery} [jQuery] jQuery Object
     * @static
     */
    ExternalJQ.install = function ( pluginName, jQuery ){
        if ( typeof jQuery !== "undefined" && jQuery !== null ) {
            //  defined
            this.save( jQuery );
        }
        inazumatv.jq[ pluginName ].activate( this._$ );
    };

    /**
     * 拡張機能を取得します。<br>
     *
     *     inazumatv.jq.ExternalJQ.save( jQuery );
     *     var FitWindowHeight = inazumatv.jq.ExternalJQ.imports( "FitWindowHeight" );
     *
     *     // あるいは
     *     var FitWindowHeight = inazumatv.jq.ExternalJQ.imports( "FitWindowHeight", jQuery );
     *
     * @for jq.ExternalJQ
     * @method imports
     * @param {String} extensionName 拡張機能名称(Class名)
     * @param {jQuery} [jQuery] jQuery Object
     * @return {*} 拡張機能を返します
     * @static
     */
    ExternalJQ.imports = function ( extensionName, jQuery ){
        if ( typeof jQuery !== "undefined" && jQuery !== null ) {
            //  defined
            this.save( jQuery );
        }
        var extension = inazumatv.jq[ extensionName ];
        extension.activate( this._$ );
        return extension;
    };

    /**
     * event バブリングと伝播を止めます。<br>
     * <strong style="color:red;">注意</strong> jQuery Object を save 後に使用できます。
     *
     *      ExternalJQ.save( jQuery )
     *
     *      // preventDefault() && topPropagation()
     *      function eventHandler ( e ) {
     *          inazumatv.eventStop( e );
     *      }
     *
     *      // preventDefault()
     *      function eventHandler ( e ) {
     *          inazumatv.eventStop( e, false );
     *      }
     *
     * @for inazumatv
     * @method eventStop
     * @param {Event} e jQuery event instance
     * @param {*\Boolean} [propagation] optional, default true
     */
    function eventStop ( e, propagation ){
        if ( typeof propagation === 'undefined' || propagation === null ) {
            // undefined or null
            propagation = true;
        }

        e.preventDefault();

        if ( propagation ) {
            e.stopPropagation();
        }
    }

    inazumatv.jq.ExternalJQ = ExternalJQ;

}( this.inazumatv ) );