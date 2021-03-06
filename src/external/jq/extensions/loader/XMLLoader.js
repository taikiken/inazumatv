/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/15 - 3:07
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
    EventObject = inazumatv.EventObject,
    AjaxEvent = inazumatv.AjaxEvent,
    /**
     * jQuery alias
     * @property $
     * @type {jQuery}
     * @private
     * @static
     */
    $;

  /**
   * jQuery.ajax を使用しています。
   * 別途 jQuery を読み込んでください。<br><br>
   * ExternalJQ.import を使用し参照を取得します。
   *
   *      var XMLLoader = ExternalJQ.imports( "XMLLoader" );
   *      var xmlLoader = new XMLLoader( "path/to/example.xml" );
   *      function onComplete ( eventObject ) {
     *      }
   *      function onError ( eventObject ) {
     *      }
   *      xmlLoader.addEventListener( AjaxEvent.COMPLETE, onComplete );
   *      xmlLoader.addEventListener( AjaxEvent.ERROR, onError );
   *      xmlLoader.start();
   *
   * @class XMLLoader
   * @extends AjaxEvent
   * @param {String} url 指定URLのXMLを読込みます。
   * @param {Boolean|*} [nocache] no cache: true, default: true
   * @default true
   * @constructor
   */
  function XMLLoader ( url, nocache ) {
    if ( typeof url === "undefined" || url === null ) {
      // url undefined
      throw new Error( "url required" );
    }

    AjaxEvent.call( this );

    if ( typeof nocache === 'undefined' || nocache === null ) {
      // cache するかしないか
      nocache = true;
    }

    this._nocache = !!nocache;

    /**
     * @property _url
     * @type {String}
     * @protected
     */
    this._url = url;
    /**
     * @property _type
     * @type {string}
     * @protected
     */
    this._type = "xml";
    /**
     * @property _option
     * @type {{}}
     * @protected
     */
    this._option = {};
  }

  inazumatv.extend( AjaxEvent, XMLLoader );

  /**
   * XMLLoader へ jQuery object を設定。XMLLoader を使用する前に実行する必要があります。<br>
   * ExternalJQ.imports から実行されます。
   *
   * @method activate
   * @param {jQuery} jQuery object
   * @static
   */
  XMLLoader.activate = function ( jQuery ){
    $ = jQuery;
  };

  var p = XMLLoader.prototype;

  p.constructor = XMLLoader;

  /**
   * 外部ファイル type 設定
   * @method setType
   * @param {String} type
   */
  p.setType = function ( type ){
    if ( typeof type === "undefined" || type === null ) {
      // type defined
      return;
    }

    this._type = type;
  };

  /**
   * url 設定
   * @method setURL
   * @param {String} url
   */
  p.setURL = function ( url ){
    if ( typeof url === "undefined" || url === null ) {
      // type defined
      return;
    }

    this._url = url;
  };

  /**
   * Ajax option 設定, 除く url, dataType
   * @method setOption
   * @param {Object} option
   */
  p.setOption = function ( option ){
    if ( typeof option === "undefined" || option === null ) {
      // type defined
      return;
    }

    this._option = option;
  };

  /**
   * load 開始
   * <br>instead of load()
   * @method start
   * @deprecated
   */
  p.start = function (){
    this.load();
  };
  /**
   * load 開始
   * @method load
   */
  p.load = function () {
    var
      _this = this,
      url = _this._url,
      option = _this._option;

    if ( _this._nocache ) {
      //url +=  "?" + new Date().getTime();
      option.cache = false;
    }

    option.timeout = 1000 * 10;
    option.url = url;
    option.dataType = _this._type;

    $.ajax( option ).
      done( function ( data, textStatus, jqXHR ){
        // success
        _this.dispatchEvent( new EventObject( AjaxEvent.COMPLETE, [ data, jqXHR ] ), _this );
      } ).
      fail(function ( jqXHR, textStatus, errorThrown ){
        // error
        _this.dispatchEvent( new EventObject( AjaxEvent.ERROR, [ jqXHR, textStatus ] ), _this );
        console.warn( "load error, " + jqXHR + ", " + errorThrown );
      } );
  };

    inazumatv.jq.XMLLoader = XMLLoader;

}( this.inazumatv ) );