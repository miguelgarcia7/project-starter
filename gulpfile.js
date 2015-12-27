var elixir = require('laravel-elixir');
var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
// Base path for bower and node
var paths = {
    'bower': './vendor/bower_components/',
    'node': './node_modules/',
}
// Path to each of the libraries
var libs = {
    'bootstrap': paths.node + 'bootstrap-sass/assets/',
    'greensock': paths.bower + 'gsap/src/uncompressed/'
}
// sample task to minify html
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('./resources/views/static/*.php')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./public/'));
});

elixir(function(mix) {
    mix.sass(['app.scss'], 'public/css/app.min.css')
        .copy(libs.bootstrap + 'fonts/bootstrap/**', 'public/fonts')
        .scripts(
            [
                libs.greensock + 'TweenLite.js',
                './resources/assets/js/app.js'
            ],
            'public/js/app.min.js',
            './'
        )
       .task('minify-html');
});
