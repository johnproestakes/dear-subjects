var gulp = require("gulp"),
  ts = require("gulp-typescript"),
  concat = require("gulp-concat"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require('gulp-connect'),
  sass = require("gulp-sass");


gulp.task("updatelibs", function(){
  var master = {
    "scripts/js/libs" : [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/jquery/dist/jquery.min.js.map",
      "node_modules/semantic-ui/dist/semantic.min.js",
      "node_modules/angular/angular.min.js",
      "node_modules/angular/angular.min.js.map",
      "node_modules/angular-route/angular-route.min.js",
      "node_modules/angular-route/angular-route.min.js.map",
      "node_modules/angular-sanitize/angular-sanitize.min.js",
      "node_modules/angular-sanitize/angular-sanitize.min.js.map"
    ],
    "scripts/css/libs":[
      "node_modules/semantic-ui/dist/semantic.min.css",
    ]
  };

  var keys = Object.keys(master);
  for(var i=0;i<keys.length;i++){
    gulp.src(master[keys[i]]).pipe(gulp.dest(keys[i]));
  }
});

gulp.task("ts", function(){
  gulp.src(['scripts/app/routes.ts'])
  .pipe(sourcemaps.init())
  .pipe(ts())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));

  gulp.src(['scripts/ts/*.ts'])
  .pipe(sourcemaps.init())
  .pipe(ts())
  .pipe(concat('DearSubjects.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));

  gulp.src(['scripts/ts/intelligence/*.ts'])
  .pipe(sourcemaps.init())
  .pipe(ts())
  .pipe(concat('DearSubjects-intelligence.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));

  gulp.src(['scripts/app.js','scripts/app/**/*.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
});


gulp.task('sass',function(){
  gulp.src(["scripts/sass/main.scss"])
  .pipe(sass())
  .pipe(gulp.dest('scripts/css'));
});

gulp.task("watch", function(){
  connect.server({port:7778});
  gulp.watch(["scripts/app/**/*.js","scripts/app/**/*.ts","scripts/**/*.ts"], ['ts']);
  gulp.watch(["scripts/sass/**/*.scss"], ['sass']);
});
