//在你的项目根目录下创建gulpfile.js，代码如下：

// 引入 gulp
var gulp = require('gulp');
var options = process.argv;
var browserSync = require('browser-sync').create();

//build
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
  imagemin = require('gulp-imagemin'), //图片压缩
  pngcrush = require('imagemin-pngcrush'),
  pngquant = require('imagemin-pngquant'),
  minifycss = require('gulp-minify-css'), //css压缩
  //jshint = require('gulp-jshint'), //js检测
  //uglify = require('gulp-uglify'), //js压缩
  //concat = require('gulp-concat'), //文件合并
  //rename = require('gulp-rename'), //文件更名
  notify = require('gulp-notify'); //提示信息

var smushit = require('gulp-smushit');



// 压缩html

// gulp.task('html', function() {
//   return gulp.src('src/*.html')
//     .pipe(htmlmin({
//       collapseWhitespace: true
//     }))
//     .pipe(gulp.dest('./dest'))
//     .pipe(notify({
//       message: 'html task ok'
//     }));
//
// });


// 压缩图片
gulp.task('img', function() {
  return gulp.src(options[4]+'/*+(.jpg|.png)')
//  return gulp.src('E:/xampp/htdocs/tlbb/img/'+'/shabk.png')
//    .pipe(imagemin({
//      progressive: false,
//      optimizationLevel: 3,
//      use: [pngcrush()]
//    }))

//  .pipe(imagemin({
//            optimizationLevel: 0, //类型：Number  默认：3  取值范围：0-7（优化等级）
//            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//        }))

  
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('smushit-dist'))

//    .pipe(gulp.dest('E:/xampp/htdocs/tlbb/img/images/'))
    .pipe(gulp.dest(options[4] + '/images/'))
//    .pipe(notify({
//      message: 'img task ok'
//    }));
});

// 合并、压缩、重命名css
// gulp.task('css', function() {
//  return gulp.src('src/css/*.css')
//    .pipe(concat('main.css'))
//    .pipe(gulp.dest('dest/css'))
//  .pipe(rename({
//    suffix: '.min'
//  }))
//    .pipe(minifycss())
//.pipe(gulp.dest('dest/css'))
//  .pipe(notify({
//    message: 'css task ok'
//  }));
//});

// 检查js
/*
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({
      message: 'lint task ok'
    }));
});
*/
// 合并、压缩js文件
/*
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dest/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'))
    .pipe(notify({
      message: 'js task ok'
    }));
});
*/
// 默认任务
//gulp.task('default', function() {
//  gulp.run('img');
//  // 监听html文件变化
//  //gulp.watch('src/*.html', function() {
//  //gulp.run('html');
//  //});
//
//  // Watch .css files
//  //  gulp.watch('src/css/*.css', ['css']);
//
//  // Watch .js files
//  //  gulp.watch('src/js/*.js', ['lint', 'js']);
//
//  // Watch image files
//  //gulp.watch('src/images/*', ['img']);
//});



// 静态服务器
gulp.task('sync1', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// 代理1
var syncLink = "";
if (options[4].indexOf('xampp\\htdocs\\') > -1) {
  syncLink = options[4].split('xampp\\htdocs\\')[1]
}


// 静态服务器
gulp.task('sync1', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('sync2', function() {
  browserSync.init({
    proxy: "http://localhost/" + syncLink
  });
  gulp.watch(options[4] + "/**").on('change', browserSync.reload);
});

//build
gulp.task('build', function() {
    var b = browserify({
        entries: "./javascripts/src/main.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./javascripts/dist"));
});




