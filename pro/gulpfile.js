var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer =require('gulp-autoprefixer'),
    concat=require('gulp-concat'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    runSequence = require('run-sequence')

gulp.task('minCss',function(){
    return gulp.src(['Public/css/**/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove:true
        }))
        .pipe(cleanCss({
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest('static/css'))
})
gulp.task('revcss',function () {
    return gulp.src(['Public/css/**/*.css'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('static/css'));
})
gulp.task('minJs',function(){
     // gulp.src(['assets/js/private/index/index.js','assets/js/private/comm/comm.js'])
     //     .pipe(concat('index.js')).pipe(uglify({ mangle: { toplevel: true }})).pipe(gulp.dest('static/js/private/index'));
    return gulp.src(['Public/js/**/*.js', '!Public/js/lib/**/*.js'])
         .pipe(uglify())
         .pipe(gulp.dest('static/js'));
})
gulp.task('revjs',function () {
    return gulp.src(['Public/js/**/*.js', '!Public/js/lib/**/*.js'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('static/js'));
})
gulp.task('imgMin',function(){
    return gulp.src(['Public/images/**/*.{png,jpg,gif,ico,jpeg}'])
        .pipe(imagemin())
        .pipe(gulp.dest('static/images'))
})
gulp.task('revProduct',function () {
    return gulp.src(['static/**/*.json','View/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('templates/')); //html更换css,js文件版本，更改完成之后保存的地址
})
// gulp.task('htmlMin',function(){
// 	gulp.src(['templatess/**/*.html'])
// 		.pipe(htmlmin({collapseWhitespace: true}))
// 		.pipe(gulp.dest('templates'))
// })

gulp.task('watch',function(){
    gulp.watch(['assets/**/*','html/**/*'],['default'])
})
gulp.task('default',function (done) {
    runSequence(
        'minCss',
        'minJs',
        // 'imgMin',
        'revcss',
        'revjs',
        'revProduct',
        done)
})
