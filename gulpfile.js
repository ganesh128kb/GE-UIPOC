var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

var sourceLess = './bower_components/bootstrap/less';
var targetCss = './bower_components/bootstrap/css';

gulp.task('less', function () {
    gulp.src([sourceLess + '/bootstrap.less'])
        .pipe(less())
        .pipe(gulp.dest(targetCss));
});
