var gulp = require('gulp')
var babel = require('gulp-babel')
var ava = require('gulp-ava')
var watch = require('gulp-sane-watch')

gulp.task('default', gulp.series(build, test))

gulp.task('watch', function() {
  watch('src/**/*.js', function() {
    gulp.series(build, test)()
  })
})

function build() {
  return gulp.src('src/*.js')
    .pipe(babel({presets: ['es2015'], plugins: ['transform-runtime']}))
    .pipe(gulp.dest('.'))
}

function test() {
  return gulp.src('test.js').pipe(ava())
}
