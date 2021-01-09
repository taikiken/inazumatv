const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const replace = require('gulp-replace-task');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const size = require('gulp-size');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

const pkg = require('./package.json');

const version = pkg.version;
const url = pkg.repository.url;
const patterns = [
  {
    match: 'buildTime',
    replacement: new Date().toLocaleString()
  },
  {
    match: 'year',
    replacement: new Date().getFullYear()
  },
  {
    match: 'version',
    replacement: version
  },
  {
    match: 'url',
    replacement: url
  }
];
const dir = {
  src: './src',
  libs: './libs',
}
const libName = 'inazumatv.util.js';
const scripts = [
  "./src/inazumatv.js",
  "./src/version.js",

  "./src/browser/Browser.js",
  "./src/browser/CookieUtil.js",

  "./src/events/EventDispatcher.js",
  "./src/events/EventObject.js",
  "./src/events/AjaxEvent.js",

  "./src/net/QuerySearch.js",

  "./src/net/LoadImage.js",
  "./src/net/BulkLoader.js",

  "./src/util/CheckList.js",
  "./src/util/LoopManager.js",
  "./src/util/PollingManager.js",
  "./src/util/FPSManager.js",

  "./src/util/List.js",
  "./src/util/Kana.js",
  "./src/util/Num.js",

  "./src/motion/ShuffleText.js",

  "./src/external/jq/ExternalJQ.js",

  "./src/external/jq/plugins/Easing.js",
  "./src/external/jq/plugins/SmoothScroll.js",

  "./src/external/jq/extensions/loader/XMLLoader.js",
  "./src/external/jq/extensions/loader/TXTLoader.js",
  "./src/external/jq/extensions/loader/HTMLLoader.js",

  "./src/external/jq/extensions/dom/WatchDocumentHeight.js",
  "./src/external/jq/extensions/dom/FitDocumentHeight.js",

  "./src/external/jq/extensions/dom/WatchWindowSize.js",
  "./src/external/jq/extensions/dom/FitWindow.js",
  "./src/external/jq/extensions/dom/FitWindowAspect.js",
  "./src/external/jq/extensions/dom/FitWindowAspectCenter.js",
  "./src/external/jq/extensions/dom/FitWindowHeight.js"
];

// ---
// empty libs
gulp.task('script:del', () => {
  return del(
    [
      `${dir.libs}/*`
    ],
    {
      base: process.cwd(),
      dot: true,
      force: true,
    },
    (err, deletedFiles) => {
      console.log(`script:del: ${deletedFiles.length}`)
      console.log(`${deletedFiles.join('\n')}`)
    }
  )
})

// make
gulp.task('script:make', () => {
  return gulp.src(scripts)
    .pipe(concat(libName))
    .pipe(replace({ patterns }))
    .pipe(gulp.dest(dir.libs))
    .pipe(rename((path) => {
      path.basename = `${path.basename}-${version}`
    }))
    .pipe(gulp.dest(dir.libs))
    .pipe(uglify({
      output: {
        comments: 'some',
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(dir.libs))
    .pipe(rename((path) => {
      path.basename = path.basename.replace(`-${version}`, '')
    }))
    .pipe(gulp.dest(dir.libs))
    .pipe(size({ title: '*** script:make ***' }))
})

// lint
gulp.task('script:lint', () => {
  return gulp.src('./src/**/*.js')
    .pipe(eslint({
      useEslintrc: false,
      configFile: './eslint.es5.yml'
    }))
    .pipe(eslint.format())
    .pipe(size({ title: '*** script:lint ***' }))
})

// build
gulp.task('build', () => (
  runSequence(
    // 'script:lint',
    'script:del',
    'script:make',
  )
))