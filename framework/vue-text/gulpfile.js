(function() {
  var cleancss, concat, del, gulp, imagemin, imageminJpegtran, notify, pngquant, rename, rev, revCollector, uglify;

  gulp = require('gulp');

  del = require('del');

  imagemin = require('imagemin');

  pngquant = require('imagemin-pngquant');

  imageminJpegtran = require('imagemin-jpegtran');

  cleancss = require('gulp-clean-css');

  uglify = require('gulp-uglify');

  concat = require('gulp-concat');

  rename = require('gulp-rename');

  notify = require('gulp-notify');

  rev = require('gulp-rev');

  revCollector = require('gulp-rev-collector');

  gulp.task('clean', function(cb) {
    return del('./html/', cb);
  });

  gulp.task('cssmin', ['clean'], function() {
    gulp.src('./css/!(reset)*.css').pipe(cleancss()).pipe(gulp.dest('./html/css'));
    return gulp.src('./css/reset.css').pipe(cleancss()).pipe(gulp.dest('./html/css')).pipe(notify({
      message: 'css zip task ok'
    }));
  });

  gulp.task('jsmin', ['clean'], function() {
    gulp.src('./js/!(script)*.js').pipe(uglify()).pipe(gulp.dest('./html/js'));
    return gulp.src('./js/script.js').pipe(uglify()).pipe(gulp.dest('./html/js')).pipe(notify({
      message: 'css zip task ok'
    }));
  });

  gulp.task('imagemin', ['clean'], function() {
    return imagemin(['./img/*'], './html/img', {
      progressive: false,
      quality: 7,
      use: [
        pngquant({
          quality: '65-80'
        })
      ]
    }).then(function() {
      return console.log('files ok');
    });
  });

  gulp.task('html', ['clean'], function() {
    return gulp.src('./*.+(html|php)').pipe(gulp.dest('./html')).pipe(notify({
      message: 'html task ok'
    }));
  });

  gulp.task('addrev', function() {
    return gulp.src(['./rev/*.json', './html/(*.+(html|php))|css/*.css']).pipe(revCollector()).pipe(gulp.dest('./html'));
  });

  gulp.task('default', ['clean', 'html', 'cssmin', 'jsmin', 'imagemin'], function() {
    return console.log('finish');
  });

}).call(this);
