/**
 * license inazumatv.com
 * author (at)taikiken / htp://inazumatv.com
 * date 2013/12/12 - 17:25
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
    var navigator = window.navigator,
        ua = navigator.userAgent,

        ie6 = !!ua.match(/msie [6]/i),
        ie7 = !!ua.match(/msie [7]/i),
        ie8 = !!ua.match(/msie [8]/i),
        ie9 = !!ua.match(/msie [9]/i),
        ie10 = !!ua.match(/msie [10]/i),
        ie11 = !!ua.match(/trident\/[7]/i) && !!ua.match(/rv:[11]/i),
        ie = !!ua.match(/msie/i) || ie11,
        legacy = ie6 || ie7|| ie8,

        ipad = !!ua.match(/ipad/i),
        ipod = !!ua.match(/ipod/i),
        iphone = !!ua.match(/iphone/i) && !ipad && !ipod,
        ios = ipad || ipod || iphone,

        android = !!ua.match(/android/i),
        mobile = ios || android,

        chrome = !!ua.match(/chrome/i),
        firefox = !!ua.match(/firefox/i),
        safari = !!ua.match(/safari/i) && !chrome,

        touch = typeof window.ontouchstart !== "undefined",

        fullScreen = typeof navigator.standalone !== "undefined",

        android_phone = false,
        android_tablet = false,
        ios_version = -1,
        android_version = -1,
        android_version_major = -1,
        android_version_num = -1,

        _ios_versions,
        _android_versions
    ;

    if ( android ) {
        android_phone = !!ua.match(/mobile/i);

        if ( !android_phone ) {
            android_tablet = true;
        }
    }
    // private
    // iOS version
    // http://stackoverflow.com/questions/8348139/detect-ios-version-less-than-5-with-javascript
    /**
     * iOS version detection
     * @returns {Array} iOS version 配列 3桁
     * @private
     */
    function _iosVersion () {
        var v, versions = [ -1, 0, 0 ];
        if ( ios ) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            ios_version = versions;
        }

        return versions;
    }
    _ios_versions = _iosVersion();

    // Android version
    /**
     * Android version detection
     * @returns {Array} Android version 配列 2桁~3桁
     * @private
     */
    function _androidVersion () {
        var ua_lower = ua.toLowerCase(),
            version,
            versions = [ -1, 0, 0 ];

        if ( android && !firefox ) {

            version = ua_lower.substr( ua_lower.indexOf( "android" ) + 8, 5 ).split( "." );
            versions = [
                parseInt( version[ 0 ], 10 ),
                parseInt( version[ 1 ], 10 ),
                parseInt( version[ 2 ], 10 )
            ];

            android_version_major = versions[ 0 ];

            var a_num = versions[ 0 ] + "." + versions[ 1 ];

            if ( versions[ 2 ] ) {
                // has small version
                a_num += versions[ 2 ];
            }

            android_version_num = parseFloat( a_num );

            android_version = versions;
        }
        return versions;
    }
    _android_versions = _androidVersion();

    /**
     * Browser 情報を管理します
     * @class Browser
     * @constructor
     */
    var Browser = function () {
        throw "Browser cannot be instantiated";
    };

    /**
     *
     * @type {{iOS: {is: Function, number: Function, major: Function, version: Function}, Android: {is: Function, number: Function, major: Function, version: Function}, IE: {is: Function, version: Function}, Chrome: {is: Function}, Safari: {is: Function}, Firefox: {is: Function}, ie: Function, ie6: Function, ie7: Function, ie8: Function, ie9: Function, ie10: Function, ie11: Function, chrome: Function, firefox: Function, safari: Function, legacy: Function, mobile: Function, ios: Function, ios_version: Function, android_version: Function, android_version_major: Function, android_version_num: Function, android: Function, iphone: Function, ipad: Function, ipod: Function, hideURLBar: Function}}
     */
    Browser = {
        // new version
        /**
         * iOS に関する情報
         * @for Browser
         * @property iOS
         * @type Object
         * @static
         */
        iOS: {
            /**
             * @for Browser.iOS
             * @method is
             * @returns {boolean} iOS か否かを返します
             * @static
             */
            is: function (){
                return ios;
            },
            /**
             * @for Browser.iOS
             * @method number
             * @returns {Array} iOS version number を返します [ major, minor, build ]
             * @static
             */
            number: function (){
                return _ios_versions;
            },
            /**
             * @for Browser.iOS
             * @method major
             * @returns {Number} iOS major version number を返します
             * @static
             */
            major: function (){
                return _ios_versions[ 0 ];
            },
            /**
             * @for Browser.iOS
             * @method version
             * @returns {Number} iOS version を返します 9.99
             * @static
             */
            version: function (){
                return parseFloat( _ios_versions[ 0 ] + "." + _ios_versions[ 1 ] + _ios_versions[ 2 ] );
            },
            /**
             * @for Browser.iOS
             * @method iPhone
             * @returns {Boolean} iPhone か否かを返します
             * @static
             */
            iPhone: function (){
                return iphone;
            },
            /**
             * @for Browser.iOS
             * @method iPad
             * @returns {Boolean} iPad か否かを返します
             * @static
             */
            iPad: function (){
                return ipad;
            },
            /**
             * @for Browser.iOS
             * @method iPod
             * @returns {Boolean} iPod か否かを返します
             * @static
             */
            iPod: function (){
                return ipod;
            },
            /**
             * @for Browser.iOS
             * @method fullScreen
             * @returns {boolean} standalone mode か否かを返します
             * @static
             */
            fullScreen: function (){
                return fullScreen;
            }
        },
        /**
         * Android に関する情報
         * @for Browser
         * @property Android
         * @type Object
         * @static
         */
        Android: {
            /**
             * @for Browser.Android
             * @method is
             * @returns {boolean} Android か否かを返します
             * @static
             */
            is: function (){
                return android;
            },
            /**
             * @for Browser.Android
             * @method number
             * @returns {Array} Android version number を返します [ major, minor, build ]
             * @static
             */
            number: function (){
                return _android_versions;
            },
            /**
             * @for Browser.Android
             * @method major
             * @returns {Number} Android major version number を返します
             * @static
             */
            major: function (){
                return android_version_major;
            },
            /**
             * @for Browser.Android
             * @method version
             * @returns {Number} Android version を返します 9.99
             * @static
             */
            version: function (){
                return android_version_num;
            },
            /**
             * @for Browser.Android
             * @method phone
             * @returns {boolean} Android Phone か否かを返します
             * @static
             */
            phone: function (){
                return android_phone;
            },
            /**
             * @for Browser.Android
             * @method tablet
             * @returns {boolean} Android Tablet か否かを返します
             * @static
             */
            tablet: function (){
                return android_tablet;
            }
        },
        /**
         * IE に関する情報
         * @for Browser
         * @property IE
         * @type Object
         * @static
         */
        IE: {
            /**
             * @for Browser.IE
             * @method is
             * @returns {boolean} IE か否かを返します
             * @static
             */
            is: function (){
                return ie;
            },
            /**
             * @for Browser.IE
             * @method is6
             * @returns {boolean} IE 6 か否かを返します
             */
            is6: function (){
                return ie6;
            },
            /**
             * @for Browser.IE
             * @method legacy
             * @returns {boolean} IE 6 or 7 or 8 か否かを返します
             */
            legacy: function (){
                return legacy;
            },
            /**
             * @for Browser.IE
             * @method version
             * @returns {Number} IE version を返します int 6 ~ 11, IE 6 ~ IE 11 でない場合は -1 を返します
             * @static
             */
            version: function (){
                var v = -1;
                if ( ie11 ) {
                    v = 11;
                } else if ( ie10 ) {
                    v = 10;
                } else if ( ie9 ) {
                    v = 9;
                } else if ( ie8 ) {
                    v = 8;
                } else if ( ie7 ) {
                    v = 7;
                } else if ( ie6 ) {
                    v = 6;
                }
                return v;
            }
        },
        /**
         * Chrome に関する情報
         * @for Browser
         * @property Chrome
         * @type Object
         * @static
         */
        Chrome: {
            /**
             * @for Browser.Chrome
             * @method is
             * @returns {boolean} Chrome か否かを返します
             * @static
             */
            is: function (){
                return chrome;
            }
        },
        /**
         * Safari に関する情報
         * @for Browser
         * @property Safari
         * @type Object
         * @static
         */
        Safari: {
            /**
             * @for Browser.Safari
             * @method is
             * @returns {boolean} Safari か否かを返します
             * @static
             */
            is: function (){
                return safari;
            }
        },
        /**
         * Firefox に関する情報
         * @for Browser
         * @property Firefox
         * @type Object
         * @static
         */
        Firefox: {
            /**
             * @for Browser.Firefox
             * @method is
             * @returns {boolean} Firefox か否かを返します
             * @static
             */
            is: function (){
                return firefox;
            }
        },
        /**
         * Touch action に関する情報
         * @for Browser
         * @property Touch
         * @type Object
         * @static
         */
        Touch: {
            /**
             * @for Browser.Touch
             * @method is
             * @returns {boolean} Touch 可能か否かを返します
             * @static
             */
            is: function (){
                return touch;
            }
        },
        /**
         * iPhone, Android phone. URL bar 下へスクロールさせます。<br>
         * window.onload 後に実行します。
         * iOS 7 では動作しません。
         *
         *     function onLoad () {
         *          window.removeEventListener( "load", onLoad );
         *          Browser.hideURLBar();
         *     }
         *     window.addEventListener( "load", onLoad, false );
         *
         * @for Browser
         * @method hideURLBar
         */
        hideURLBar : function (){
            setTimeout( function (){ scrollTo( 0, 1 ); }, 0);
        },
        // below for compatibility older version of inazumatv.util
        ie: function (){
            return ie;
        },
        ie6: function (){
            return ie6;
        },
        ie7: function (){
            return ie7;
        },
        ie8: function (){
            return ie8;
        },
        ie9: function (){
            return ie9;
        },
        ie10: function (){
            return ie10;
        },
        ie11: function (){
            return ie11;
        },
        chrome: function (){
            return chrome;
        },
        firefox: function (){
            return firefox;
        },
        safari: function (){
            return safari;
        },
        legacy: function (){
            return legacy;
        },
        mobile: function() {
            return mobile;
        },
        ios: function (){
            return ios;
        },
        ios_version: function (){
            return ios_version;
        },
        android_version: function (){
            return android_version;
        },
        android_version_major: function (){
            return android_version_major;
        },
        android_version_num: function (){
            return android_version_num;
        },
        android: function (){
            return android;
        },
        iphone: function (){
            return iphone;
        },
        ipad: function (){
            return ipad;
        },
        ipod: function (){
            return ipod;
        }
    };

    inazumatv.Browser = Browser;
    // below for compatibility older version of inazumatv.util
    inazumatv.browser = Browser;
}( window, this.inazumatv ) );