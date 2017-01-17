# out: ./gulpfile.js
gulp = require 'gulp'
del = require 'del'

imagemin = require 'imagemin' #图片压缩
# imagemin = require 'gulp-image' #图片压缩
pngquant = require 'imagemin-pngquant'
# pngcrush = require 'imagemin-pngcrush'
imageminJpegtran = require('imagemin-jpegtran');
# optipng = require 'imagemin-optipng'
cleancss = require 'gulp-clean-css' #css压缩
uglify = require 'gulp-uglify' #js压缩
concat = require 'gulp-concat' #文件合并
rename = require 'gulp-rename' #文件更名
notify = require 'gulp-notify' #提示信息

rev = require 'gulp-rev'
revCollector = require 'gulp-rev-collector'

gulp.task 'clean', (cb) ->
  del './html/', cb

gulp.task 'cssmin',['clean'], () ->
  gulp.src './css/!(reset)*.css'
    # .pipe concat 'style.min.css'
    .pipe cleancss()
    .pipe gulp.dest './html/css'
  gulp.src './css/reset.css'
    .pipe cleancss()
    .pipe gulp.dest './html/css'
    .pipe notify(
      message: 'css zip task ok'
    )

gulp.task 'jsmin', ['clean'],() ->
  gulp.src './js/!(script)*.js'
    # .pipe concat 'asset.min.js'
    .pipe uglify()
    .pipe gulp.dest './html/js'
  gulp.src './js/script.js'
    .pipe uglify()
    .pipe gulp.dest './html/js'
    .pipe notify(
      message: 'css zip task ok'
    )



gulp.task 'imagemin', ['clean'],() ->

  # imagemin ['./img/*.jpg'], './html/img',{
  #   progressive:false
  #   quality:0.3
  #   use:[imageminJpegtran(
  #     quality:'low'
  #   )]
  # }

  imagemin ['./img/*'], './html/img',{
    progressive:false
    quality:7
    use: [pngquant (
      quality: '65-80'
    )]
  }
    .then () ->
      console.log 'files ok'

  # gulp.src './img/*.*(png|jpg|svg)'
  #   .pipe imagemin()
  #   .pipe gulp.dest './html/img'
  #   .pipe notify(
  #     message: 'img task ok'
  #   )

gulp.task 'html',['clean'], () ->
  gulp.src './*.+(html|php)'
    .pipe gulp.dest './html'
    .pipe notify(
      message: 'html task ok'
    )

gulp.task 'addrev',()->
  gulp.src ['./rev/*.json', './html/(*.+(html|php))|css/*.css']
    .pipe revCollector()
    .pipe gulp.dest './html';

gulp.task 'default', ['clean','html', 'cssmin','jsmin','imagemin'], ()->
  console.log 'finish'
