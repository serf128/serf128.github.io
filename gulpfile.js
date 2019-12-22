let gulp = require("gulp");
let babel = require("gulp-babel");
let concat = require('gulp-concat');
let autoprefixer = require('autoprefixer');
let uglify = require('gulp-uglify');
let postcss = require("gulp-postcss");
let cssnano = require("cssnano");
let plumber = require("gulp-plumber");
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const jsFiles = [
    'src/js/main.js'
];
const cssLibFiles = [
    'node_modules/normalize.css/normalize.css',
    'src/scss/lib.scss',
    //'node_modules/owl.carousel/dist/assets/owl.carousel.css',
    //'node_modules/owl.carousel/dist/assets/owl.theme.default.css',
    //'node_modules/animate.css/animate.css'
    // 'src/css/animate.css',
    // 'src/css/jquery.fancybox.min.css',
    // 'src/css/fontello.css',

];

const jsLibFiles = [
    //'node_modules/jquery/dist/jquery.js',
    //'node_modules/owl.carousel/dist/owl.carousel.js',
    'node_modules/@fortawesome/fontawesome-free/js/all.js'
    // 'src/js/jquery.maskedinput.min.js',
    // 'src/js/bootstrap.min.js',
    // 'src/js/wow.min.js',
    // 'src/js/jquery.fancybox.min.js'
];

function css() {
    return gulp
        .src('src/scss/imports.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.min.css'))
        // .pipe(postcss([
        //     autoprefixer(),
        //     cssnano()
        // ]))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
}

function js() {
    return gulp
        .src(jsFiles)
        .pipe(plumber())
        // .pipe(babel({
        //     presets: ['env']
        // }))
        .pipe(concat('main.min.js'))
        // .pipe(uglify({
        //     toplevel: true
        // }))
        .pipe(gulp.dest('./dist/js/'));
}
function cssLibs() {
    return gulp
        .src(cssLibFiles)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('libs.min.css'))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest('./dist/css/'));
}

function jsLibs() {
    return gulp
        .src(jsLibFiles)
        .pipe(plumber())
        // .pipe(babel({
        //     presets: ['env']
        // }))
        .pipe(concat('libs.min.js'))
        // .pipe(uglify({
        //     toplevel: true
        // }))
        .pipe(gulp.dest('./dist/js/'));
}

function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        logPrefix: 'si',
        port: 5000,
        notify: false
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    gulp.watch('src/scss/**/*.scss', css);
    gulp.watch(jsFiles, js);
    gulp.watch('./dist/**/*', browserSyncReload);
    gulp.watch('./*.html', browserSyncReload);
}

gulp.task('build', gulp.parallel(cssLibs, jsLibs, js, css));
gulp.task('watch', gulp.series(cssLibs, jsLibs, js, css, browserSyncInit, watchFiles));
gulp.task('default', gulp.series('watch'));
