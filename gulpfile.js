var gulp = require("gulp");
var less = require("gulp-less");
var nano = require("gulp-cssnano");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var autoprefixer = require("gulp-autoprefixer");
var sync = require("browser-sync").create();
var imagemin = require('gulp-imagemin');

var isDevelopment = true;

gulp.task("js:own", function() {
	return gulp.src("src/js/main.js")
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(uglify())
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest("dist/js"));
		
});

gulp.task("js:vendor", function() {
	return gulp.src([
		"node_modules/jquery/dist/jquery.js",
		"node_modules/bootstrap/dist/js/bootstrap.js",
		"node_modules/datatables.net/js/jquery.dataTables.js",
		"node_modules/jquery-validation/dist/jquery.validate.min.js",
		"node_modules/toastr/toastr.js",
		"node_modules/toastr/build/toastr.min.js"

		])
		.pipe(concat("vendor.js"))
		.pipe(gulpIf(!isDevelopment,uglify()))
		.pipe(gulp.dest("dist/js"));
});


gulp.task("css:vendor", function() {
	return gulp.src([
		"node_modules/bootstrap/dist/css/bootstrap.css",
		"node_modules/toastr/build/toastr.min.css",
		"node_modules/font-awesome/css/font-awesome.css"
		])
		.pipe(gulpIf(!isDevelopment,nano()))
		.pipe(concat("vendor.css"))
		.pipe(gulp.dest("dist/css"));
});

gulp.task("css:own", function() {
	return gulp.src("src/css/main.less")
		.pipe(gulpIf(isDevelopment,sourcemaps.init()))
		.pipe(less())
		.pipe(autoprefixer("last 2 versions"))
		// .pipe(nano())
		.pipe(gulpIf(isDevelopment,sourcemaps.write()))
		.pipe(gulp.dest("dist/css"))
		.pipe(sync.stream());
});

gulp.task("html", function() {
	return gulp.src("src/*.html")
		.pipe(gulp.dest("dist"));
		
});



gulp.task("css", ["css:own", "css:vendor"]);
gulp.task("js", ["js:own", "js:vendor"]);

gulp.task("watch", ["build", "imagemin", "fonts","json"], function(){
	sync.init({
		server: "dist"
	});
	gulp.watch("src/css/**/*.less", ["css:own"]);
	gulp.watch("src/js/*.js", ["js:own"]);
	gulp.watch("dist/js/*.js").on("change", sync.reload);
	gulp.watch("src/*.html", ["html"]);
	gulp.watch("dist").on("change", sync.reload);
});

gulp.task("imagemin", function(){ 
    return gulp.src("src/img/*")
        .pipe(gulpIf(!isDevelopment,imagemin()))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("fonts", function(){ 
    return gulp.src("src/fonts/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task("json", function(){ 
    return gulp.src("src/data.json")
        .pipe(gulp.dest("dist/"));
});



gulp.task("build", ["html", "css", "js"]);
gulp.task("default", ["build", "imagemin", "fonts","json","watch" ]);