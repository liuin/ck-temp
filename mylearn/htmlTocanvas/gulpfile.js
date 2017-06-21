var gulp = require("gulp");
var watchify = require('watchify');
var browserify = require("browserify");
var sourcemaps = require("gulp-sourcemaps");
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');

// 在这里添加自定义 browserify 选项
var customOpts = {
  entries: ['./src/myindex.js'],
  debug: false
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// 在这里加入变换操作
// 比如： b.transform(coffeeify);

gulp.task('js', bundle); // 这样你就可以运行 `gulp js` 来编译文件了
b.on('update', bundle); // 当任何依赖发生改变的时候，运行打包工具
b.on('log', gutil.log); // 输出编译日志到终端

function bundle(){
  return b.bundle()
    // 如果有错误发生，记录这些错误
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('script.js'))
    // 可选项，如果你不需要缓存文件内容，就删除
    .pipe(buffer())
    // 可选项，如果你不需要 sourcemaps，就删除
    .pipe(sourcemaps.init({
      loadMaps: false
    })) // 从 browserify 文件载入 map
    // 在这里将变换操作加入管道
//    .pipe(sourcemaps.write('./')) // 写入 .map 文件
    .pipe(gulp.dest('./js'));
}


//gulp.task("brow", function() {
//  b = browserify({
//    entries: "./src/main.js",
//    debug: false
//  });
//
//  return b.bundle()
//    .pipe(source("script.js"))
//    .pipe(buffer())
//    //        .pipe(sourcemaps.init({loadMaps: false}))
//    //        .pipe(sourcemaps.write("."))
//    .pipe(gulp.dest("./js"));
//});