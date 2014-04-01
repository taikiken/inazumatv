/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
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
        _ua = navigator.userAgent,

        _ie6 = !!_ua.match(/msie [6]/i),
        _ie7 = !!_ua.match(/msie [7]/i),
        _ie8 = !!_ua.match(/msie [8]/i),
        _ie9 = !!_ua.match(/msie [9]/i),
        _ie10 = !!_ua.match(/msie [10]/i),
        _ie11 = !!_ua.match(/trident\/[7]/i) && !!_ua.match(/rv:[11]/i),
        _ie = !!_ua.match(/msie/i) || _ie11,
        _legacy = _ie6 || _ie7|| _ie8,

        _ipad = !!_ua.match(/ipad/i),
        _ipod = !!_ua.match(/ipod/i),
        _iphone = !!_ua.match(/iphone/i) && !_ipad && !_ipod,
        _ios = _ipad || _ipod || _iphone,

        _android = !!_ua.match(/android/i),
        _mobile = _ios || _android,

        _chrome = !!_ua.match(/chrome/i),
        _firefox = !!_ua.match(/firefox/i),
        _safari = !!_ua.match(/safari/i) && !_chrome,

        _touch = typeof window.ontouchstart !== "undefined",

        _fullScreen = typeof navigator.standalone !== "undefined" ? navigator.standalone : false,

        _android_phone = false,
        _android_tablet = false,
        _ios_version = -1,
        _android_version = -1,
        _android_version_major = -1,
        _android_version_num = -1,
        _safari_version = -1,

        _safari_versions = [ -1, 0, 0 ],
        _ios_versions,
        _android_versions,

        _canvas = !!window.CanvasRenderingContext2D,

        _transition
    ;

    if ( _android ) {
        _android_phone = !!_ua.match(/mobile/i);

        if ( !_android_phone ) {
            _android_tablet = true;
        }
    }
    // private
    // iOS version
    // http://stackoverflow.com/questions/8348139/detect-_ios-version-less-than-5-with-javascript
    /**
     * iOS version detection
     * @returns {Array} iOS version 配列 3桁
     * @private
     */
    function _iosVersion () {
        var v, versions = [ -1, 0, 0 ];
        if ( _ios ) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            _ios_version = parseFloat( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );
        }

        return versions;
    }
    _ios_versions = _iosVersion();

    /**
     * Android version detection
     * @returns {Array} Android version 配列 3桁
     * @private
     */
    function _get_androidVersion () {
        var v, versions = [ -1, 0, 0 ];
        if ( _android ) {
            v = (navigator.appVersion).match(/Android (\d+)\.(\d+)\.?(\d+)?/);
            versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
            _android_version = parseFloat( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );
        }

        return versions;
    }
    _android_versions = _get_androidVersion();

    // Safari version
    /**
     * Safari version detection
     * @returns {Array} Safari version 配列 2桁~3桁
     * @private
     */
    function _safariVersion () {
        var v, versions;

        v = (navigator.appVersion).match(/Version\/(\d+)\.(\d+)\.?(\d+)?/);
        versions = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        _safari_version = parseFloat( versions[ 0 ] + "." + versions[ 1 ] + versions[ 2 ] );
        return versions;
    }

    if ( _safari && !_mobile ) {
        // not _mobile and _safari
        _safari_versions = _safariVersion();
    }

    // -------------------------------------
    // css3 transition
    _transition = ( function ( window ){
        var document = window.document,
            s = document.createElement('p').style;

        return  'transition' in s ||
            'WebkitTransition' in s ||
            'MozTransition' in s ||
            'msTransition' in s ||
            'OTransition' in s;
    }( window ) );

    /**
     * Browser 情報を管理します
     * @class Browser
     * @constructor
     */
    var Browser = function () {
        throw "Browser cannot be instantiated";
    };

    /**
     * iOS に関する情報
     * @for Browser
     * @property iOS
     * @type {{is: is, number: number, major: major, version: version, iPhone: iPhone, iPad: iPad, iPod: iPod, fullScreen: fullScreen}}
     */
    Browser.iOS = {
        /**
         * @for Browser.iOS
         * @method is
         * @returns {boolean} iOS か否かを返します
         * @static
         */
        is: function (){
            return _ios;
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
            return _ios_version;
        },
        /**
         * @for Browser.iOS
         * @method iPhone
         * @returns {Boolean} iPhone か否かを返します
         * @static
         */
        iPhone: function (){
            return _iphone;
        },
        /**
         * @for Browser.iOS
         * @method iPad
         * @returns {Boolean} iPad か否かを返します
         * @static
         */
        iPad: function (){
            return _ipad;
        },
        /**
         * @for Browser.iOS
         * @method iPod
         * @returns {Boolean} iPod か否かを返します
         * @static
         */
        iPod: function (){
            return _ipod;
        },
        /**
         * @for Browser.iOS
         * @method fullScreen
         * @returns {boolean} standalone mode か否かを返します
         * @static
         */
        fullScreen: function (){
            return _fullScreen;
        }
    };

    /**
     * Android に関する情報
     * @for Browser
     * @property Android
     * @type {{is: is, number: number, major: major, version: version, phone: phone, tablet: tablet}}
     */
    Browser.Android = {
        /**
         * @for Browser.Android
         * @method is
         * @returns {boolean} Android か否かを返します
         * @static
         */
        is: function (){
            return _android;
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
            return _android_versions[ 0 ];
        },
        /**
         * @for Browser.Android
         * @method version
         * @returns {Number} Android version を返します 9.99
         * @static
         */
        version: function (){
            return _android_version;
        },
        /**
         * @for Browser.Android
         * @method phone
         * @returns {boolean} Android Phone か否かを返します
         * @static
         */
        phone: function (){
            return _android_phone;
        },
        /**
         * @for Browser.Android
         * @method tablet
         * @returns {boolean} Android Tablet か否かを返します
         * @static
         */
        tablet: function (){
            return _android_tablet;
        }
    };

    /**
     * IE に関する情報
     * @for Browser
     * @property IE
     * @type {{is: is, is6: is6, is7: is7, is8: is8, is9: is9, is10: is10, is11: is11, legacy: legacy, version: version}}
     */
    Browser.IE = {
        /**
         * @for Browser.IE
         * @method is
         * @returns {boolean} IE か否かを返します
         * @static
         */
        is: function (){
            return _ie;
        },
        /**
         * @for Browser.IE
         * @method is6
         * @returns {boolean} IE 6 か否かを返します
         */
        is6: function (){
            return _ie6;
        },
        /**
         * @for Browser.IE
         * @method is7
         * @returns {boolean} IE 7 か否かを返します
         */
        is7: function (){
            return _ie7;
        },
        /**
         * @for Browser.IE
         * @method is8
         * @returns {boolean} IE 8 か否かを返します
         */
        is8: function (){
            return _ie8;
        },
        /**
         * @for Browser.IE
         * @method is9
         * @returns {boolean} IE 9 か否かを返します
         */
        is9: function (){
            return _ie9;
        },
        /**
         * @for Browser.IE
         * @method is10
         * @returns {boolean} IE 10 か否かを返します
         */
        is10: function (){
            return _ie10;
        },
        /**
         * @for Browser.IE
         * @method is11
         * @returns {boolean} IE 11 か否かを返します
         */
        is11: function (){
            return _ie11;
        },
        /**
         * @for Browser.IE
         * @method _legacy
         * @returns {boolean} IE 6 or 7 or 8 か否かを返します
         */
        legacy: function (){
            return _legacy;
        },
        /**
         * @for Browser.IE
         * @method version
         * @returns {Number} IE version を返します int 6 ~ 11, IE 6 ~ IE 11 でない場合は -1 を返します
         * @static
         */
        version: function (){
            var v = -1;
            if ( _ie11 ) {
                v = 11;
            } else if ( _ie10 ) {
                v = 10;
            } else if ( _ie9 ) {
                v = 9;
            } else if ( _ie8 ) {
                v = 8;
            } else if ( _ie7 ) {
                v = 7;
            } else if ( _ie6 ) {
                v = 6;
            }
            return v;
        }
    };

    /**
     * Chrome に関する情報
     * @for Browser
     * @property Chrome
     * @type {{is: is}}
     */
    Browser.Chrome = {
        /**
         * @for Browser.Chrome
         * @method is
         * @returns {boolean} Chrome か否かを返します
         * @static
         */
        is: function (){
            return _chrome;
        }
    };

    /**
     * Safari に関する情報
     * @for Browser
     * @property Safari
     * @type {{is: is, number: number, major: major, version: version}}
     */
    Browser.Safari = {
        /**
         * @for Browser.Safari
         * @method is
         * @returns {boolean} Safari か否かを返します
         * @static
         */
        is: function (){
            return _safari;
        },
        /**
         * @for Browser.Safari
         * @method number
         * @returns {Array} Safari version number を返します [ major, minor, build ]
         * @static
         */
        number: function (){
            return _safari_versions;
        },
        /**
         * @for Browser.Safari
         * @method major
         * @returns {Number} Safari major version number を返します
         * @static
         */
        major: function (){
            return _safari_versions[ 0 ];
        },
        /**
         * @for Browser.Safari
         * @method version
         * @returns {Number} Safari version を返します 9.99
         * @static
         */
        version: function (){
            return _safari_version;
        }
    };

    /**
     * Firefox に関する情報
     * @for Browser
     * @property Firefox
     * @type {{is: is}}
     */
    Browser.Firefox = {
        /**
         * @for Browser.Firefox
         * @method is
         * @returns {boolean} Firefox か否かを返します
         * @static
         */
        is: function (){
            return _firefox;
        }
    };

    /**
     * Touch action に関する情報
     * @for Browser
     * @property Touch
     * @type {{is: is}}
     */
    Browser.Touch = {
        /**
         * @for Browser.Touch
         * @method is
         * @returns {boolean} Touch 可能か否かを返します
         * @static
         */
        is: function (){
            return _touch;
        }
    };

    /**
     * Mobile action に関する情報
     * @for Browser
     * @property Mobile
     * @type {{is: is, hideURLBar: hideURLBar, phone: phone, tablet: tablet}}
     */
    Browser.Mobile = {
        /**
         * @for Browser.Mobile
         * @method is
         * @returns {boolean} mobile(smart phone) か否かを返します
         * @static
         */
        is: function (){
            return _mobile;
        },
        /**
         * iPhone, Android phone. URL bar 下へスクロールさせます。<br>
         * window.onload 後に実行します。<br>
         * iOS 7 mobile Safari, Android Chrome and iOS Chrome では動作しません。
         *
         *     function onLoad () {
             *          window.removeEventListener( "load", onLoad );
             *          Browser.Mobile.hideURLBar();
             *     }
         *     window.addEventListener( "load", onLoad, false );
         *
         * @for Browser.Mobile
         * @method hideURLBar
         * @static
         */
        hideURLBar : function (){
            setTimeout( function (){ scrollBy( 0, 1 ); }, 0);
        },
        /**
         * @for Browser.Mobile
         * @method phone
         * @returns {boolean} Smart Phone(include iPod)か否かを返します
         * @static
         */
        phone: function (){
            return _ipod || _iphone || _android_phone;
        },
        /**
         * @for Browser.Mobile
         * @method tablet
         * @returns {boolean} tablet か否かを返します
         * @static
         */
        tablet: function (){
            return _ipad || _android_tablet;
        }
    };

    /**
     * Canvas に関する情報
     * @for Browser
     * @property Canvas
     * @type {{is: is, webgl: webgl}}
     */
    Browser.Canvas = {
        /**
         * @for Browser.Canvas
         * @method is
         * @returns {boolean} canvas 2D が使用可能か否かを返します
         * @static
         */
        is: function (){
            return _canvas;
        },
        /**
         * @for Browser.Canvas
         * @method webgl
         * @returns {boolean} canvas webgl 使用可能か否かを返します
         * @static
         */
        webgl: function (){
            if ( !_canvas ) {
                return false;
            }

            try {
                return !!window.WebGLRenderingContext && !!document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
            } catch( e ) {
                return false;
            }
        }
    };

    /**
     * CSS3 に関する情報
     * @for Browser
     * @property CSS3
     * @type {{transition: transition}}
     */
    Browser.CSS3 = {
        /**
        *  @for Browser.CSS3
         * @method transition
         * @returns {boolean} css3 transition 使用可能か否かを返します
         * @static
        */
        transition: function (){
            return _transition;
        }
    };

    // below for compatibility older version of inazumatv.util
    Browser = {
        ie: function (){
            return _ie;
        },
        ie6: function (){
            return _ie6;
        },
        ie7: function (){
            return _ie7;
        },
        ie8: function (){
            return _ie8;
        },
        ie9: function (){
            return _ie9;
        },
        ie10: function (){
            return _ie10;
        },
        ie11: function (){
            return _ie11;
        },
        chrome: function (){
            return _chrome;
        },
        firefox: function (){
            return _firefox;
        },
        safari: function (){
            return _safari;
        },
        legacy: function (){
            return _legacy;
        },
        mobile: function() {
            return _mobile;
        },
        ios: function (){
            return _ios;
        },
        ios_version: function (){
            return _ios_version;
        },
        android_version: function (){
            return _android_version;
        },
        android_version_major: function (){
            return _android_version_major;
        },
        android_version_num: function (){
            return _android_version_num;
        },
        android: function (){
            return _android;
        },
        iphone: function (){
            return _iphone;
        },
        ipad: function (){
            return _ipad;
        },
        ipod: function (){
            return _ipod;
        }
    };

    inazumatv.Browser = Browser;

    // below for compatibility to older version of inazumatv.util
    inazumatv.browser = Browser;
}( window, this.inazumatv || {} ) );