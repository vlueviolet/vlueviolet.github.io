var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');    //javascript minify
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith-multi');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var del = require('del');
var watch = require('gulp-watch');
var wait = require('gulp-wait');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create(); //브라우저 새로고침

var bases = {
    src: './src/',
    dest: './dist',
    present : './'
};

var paths = {
    scss: bases.src + 'scss/**/*.scss',
    images: bases.src + 'img/**/*.*',
    js: bases.dist + 'js/apps/**/*.js',
    html: bases.dist + '**/*.html',
    sprites: bases.src + 'img/sp/**/*.*'
};

gulp.task('html', function() {
    return gulp.src([paths.html, '!./node_modules/**/*.*'])
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-js', ['clean-min-js-files'], function() {
    return gulp.src(paths.js)
        .pipe(concat('gulp_test.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(bases.present + 'js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', function() {
    return gulp.src(paths.scss)
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(gulp.dest(bases.dist + 'css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('minify-css', function() {
    gulp.src([bases.dist + '/css/**/*.css', '!./css/**/*.min.css'])
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(bases.dist + 'css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(bases.dist + 'img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sprites', function() {
    var opts = {
        spritesmith: function(options, sprite, icons) {
            options.imgPath = `../img/sp/${options.imgName}`;
            options.cssName = `${sprite}.css`;
            options.cssTemplate = null;
            options.cssSpritesheetName = sprite;
            options.padding = 4;
            options.cssVarMap = function(sp) {
                sp.name = `${sprite}-${sp.name}`;
            };
            return options;
        }
    };
    var spriteData = gulp.src('./src/img/sp/**/*.png').pipe(spritesmith(opts)).on('error', function(err) {
        console.log(err);
    });

    var imgStream = spriteData.img.pipe(gulp.dest('./img/sp'));
    var cssStream = spriteData.css.pipe(gulp.dest('./css/sp'));

    return merge(imgStream, cssStream);
});

gulp.task('sprites-css-concat', function() {
    return gulp.src(bases.dist + 'css/sp/**/*.css')
        .pipe(concatCss("sp.css"))
        .pipe(gulp.dest(bases.dist + 'css/sp'));
});

gulp.task('clean-img-files', function() {
    return del(bases.dist + 'img/**/*.*');
});

gulp.task('clean-css-files', function() {
    return del(bases.dist + 'css/**/*.*');
});

gulp.task('clean-min-js-files', function() {
    return del(bases.present + 'js/*.min.js');
});

gulp.task('generate-sass', function() {
    runSequence('clean-css-files', 'sprites', 'sass', 'sprites-css-concat', 'minify-css');
});

gulp.task('generate-images-sprites', function() {
    runSequence('clean-css-files', 'clean-img-files', 'images', 'sprites', 'sass', 'sprites-css-concat', 'minify-css');
});

gulp.task('watch', function() {
    watch([paths.scss], function() {
        gulp.start('generate-sass');
    });
    gulp.watch(paths.js, ['minify-js']);
    watch([paths.images], function() {
        gulp.start('generate-images-sprites');
    });
    gulp.watch(paths.html, ['html']);
});

gulp.task('init-resources', function() {
    gulp.start('minify-js');
    gulp.start('generate-images-sprites');
    gulp.start('html');
});

gulp.task('server',['init-resources', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: bases.dist
        },
        port: 7070
    });
});

gulp.task('default', ['server']);
