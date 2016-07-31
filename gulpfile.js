var gulp = require('gulp')
var babel = require('gulp-babel')
var ava = require('gulp-ava')
var watch = require('gulp-sane-watch')
var gutil = require('gulp-util')

gulp.task('default', gulp.series(build, test))

gulp.task('watch', function() {
  watch('src/**/*.js', function() {
    build()
  })
})

function build() {
  console.log('running build')
  return gulp.src('src/*.js')
    .pipe(babel({presets: ['es2015'], plugins: ['transform-runtime']}))
    .on('error', gutil.log)
    .pipe(gulp.dest('.'))
}

function test() {
  return gulp.src('test.js').pipe(ava())
}
