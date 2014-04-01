/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2013/12/13 - 13:57
 *
 * Copyright (c) 2011-2013 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
( function ( window, inazumatv ){
    "use strict";
    var document = window.document;

    /**
     * @class CookieUtil
     * @constructor
     * @static
     */
    var CookieUtil = function () {
        throw "CookieUtil cannot be instantiated";
    };

    /**
     *
     * @type {{getItem: Function, setItem: Function, removeItem: Function, hasItem: Function, keys: Function}}
     * https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
     */
    CookieUtil = {
        /**
         * Cookie 取得
         * @for CookieUtil
         * @method getItem
         * @param {String} sKey
         * @returns {string|null} Cookie 値を返します。取得できない場合はnullを返します。
         * @static
         */
        getItem: function (sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        /**
         * Cookie 保存
         * @for CookieUtil
         * @method setItem
         * @param {String} sKey Cookie key
         * @param {String} sValue Cookie value
         * @param {String} [vEnd] Cookie 期限, [ second, Date.toUTCString ]
         * @param {String} [sPath] Cookie path
         * @param {String} [sDomain] Cookie Domain
         * @param {String} [bSecure] Cookie secure
         * @returns {boolean} 保存に成功したかの真偽値を返します
         * @static
         */
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        /**
         * Cookie 削除
         * @for CookieUtil
         * @method removeItem
         * @param {String} sKey Cookie key
         * @param {String} [sPath] Cookie path
         * @param {String} [sDomain] Cookie Domain
         * @returns {boolean} 削除に成功したかの真偽値を返します
         * @static
         */
        removeItem: function (sKey, sPath, sDomain) {
            if (!sKey || !this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
            return true;
        },
        /**
         * Cookie Key が存在するかを調べる
         * @for CookieUtil
         * @method hasItem
         * @param sKey Cookie key
         * @returns {boolean} true / false
         * @static
         */
        hasItem: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        /**
         * Cookie key 列挙
         * @for CookieUtil
         * @method keys
         * @returns {Array} Cookie key 配列を返します
         * @static
         */
        keys: /* optional method: you can safely remove it! */ function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };

    inazumatv.CookieUtil = CookieUtil;
}( window, this.inazumatv ) );