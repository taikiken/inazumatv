inazumatv.util
=========

JavaScript library of my private projects

# はじめに
おれおれJavaScriptライブラリ inazumatv.util はオレが必要なものを寄せ集めたり新たに作成したユーティリティす。

今のところ便利に使っています。

間違いなどあればご指摘下さい。リクエストなどもお知らせ下さい、お約束はできませんがかなりがんばってお応えすると思います。

# 構成
jQueryに依存するものとそうでないものがあります。

jQuery依存機能を使わないのであればjquery.jsを読み込まずに使用できます。その代わりjQuery依存機能を使用する場合は少しめんどくさいと思う手順が必要になったりします。

# 機能
以下の関数をpolyfill実装しました。
非対応ブラウザでも使用可能です。

* requestAnimationFrame

* cancelAnimationFrame

* Array.isArray

* Array.indexOf

* Array.forEach

* Object.create

* Function.prototype.bind

## jQuery 非依存(関数)

### extend
Class継承に使用します。

### isNumeric
数値型判定を行います。

### random
範囲指定乱数（整数）を発生させます。

### maxValue
配列内の最大数値を返します。

### logAbort
console method を無効化します。

## jQuery 非依存(Class)

### Browser
userAgentからブラウザ情報判定を行います。
iOS, AndroidはOSバージョンを表示可能です。

### CookieUtil
MDNのCookie関数を移植し変更を加えています。

### EventDispatcher
CreateJS 6系のEventDispatcherを移植し変更を加えています。

### EventObject
EventDispatcherで使用するevent objectです。

### CheckList
複数の非同期処理完了後に次の処理に移行したいときに使用する管理ツールです。

### LoopManager
内部でrequestAnimationFrameを使用しENTER_FRAMEイベントを発生させます。

### QuerySearch
location.searchをparseします。

### PollingManager
一定間隔（秒）で処理を行うときに使用します。

### FPSManager
フレームレートを設定しfps毎に処理を行いたいときに使用します。

### LoadManager
複数画像ロードするときに使用します。@clockmaker氏のLoadManagerを移植し変更を加えています。

### ImageLoader
LoadManagerのヘルパーです。START, COMPLETE, ERRORのeventが発生します。

### ShuffleText
テキストをシャッフルし表示します。@clockmaker氏のShuffleTextを移植し変更を加えています。

### AjaxEvent
Ajax Event Class.

## jQuery 依存(Plugin)
jQueryプラグインsmoothScroll, easingを移植し変更を加えています。

### Easing
活性化し使用します。

    inazumatv.jq.ExternalJQ.install( "Easing", jQuery );

### SmoothScroll
活性化し使用します。

    inazumatv.jq.ExternalJQ.install( "SmoothScroll", jQuery );

    $( "selector" ).smoothScroll();

## jQuery 依存(関数)

### eventStop
グローバル関数です。jQueryオブジェクトをセット後に使用可能です。

    inazumatv.jq.ExternalJQ.save( jQuery );

## jQuery 依存(Class)
inazumatv.jq.ExternalJQ.imports を使用します。

    var XMLLoader = ExternalJQ.imports( "XMLLoader", jQuery );

### XMLLoader
XMLファイルを取得します。

### HTMLLoader
HTMLファイルを取得します。

### TXTLoader
TXTファイルを取得します。

### WatchWindowSize
window幅・高を監視し変わるとイベント通知します。

### WatchDocumentHeight
document高を監視し変わるとイベント通知します。

### FitWindow
指定jQuery Objectを常にwindowの幅・高と同じにします。

### FitWindowHeight
指定jQuery Objectを常にwindowの高と同じにします。

### FitWindowAspect
指定jQuery Objectの縦横非を保ち常にwindowの幅・高と同じにします。

### FitWindowAspectCenter
指定jQuery Objectの縦横非を保ち常にwindowの幅・高と同じにし縦横中央に配置します。

### FitDocumentHeight
指定jQuery Objectを常にdocumentの高と同じにします。