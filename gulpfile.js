var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var del = require("del");

/* Tasks cached */
gulp.task("cache:css", function () {
	del("./../bootstrap-certification/css/style.css", {
		force: true
	});
});

gulp.task("cache:js", function () {
	del("./../bootstrap-certification/js/**/*", {
		force: true
	})
});

/* Task compile scss to css */
gulp.task("sass", ['cache:css'], function () {
	return gulp.src("./src/scss/style.scss")
		.pipe(sass({
			outPutStyle: 'compressed'
		}))
		.on('error', notify.onError({
			title: "erro scss",
			message: "<%= error.message %>"
		}))
		.pipe(gulp.dest("./../bootstrap-certification/css"))
		.pipe(browserSync.stream());
});

/* Task minify html */
gulp.task("html", function () {
	return gulp.src("./src/index.html")
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest("./../bootstrap-certification"))
		.pipe(browserSync.stream());
});

/* Task create app.js */
gulp.task("main-js", ['cache:js'], function () {
	return gulp.src("./src/js/**/*")
		.pipe(uglify())
		.pipe(concat("main.min.js"))
		//.pipe(gulp.dest("./dist/js"))
		.pipe(gulp.dest("./../bootstrap-certification/js"))
		.pipe(browserSync.stream());
});

/* Task create main.js */
gulp.task("vendors-js", function () {
	return gulp.src([
			'./src/components/jquery/dist/jquery.js',
			'./src/components/tether/dist/js/tether.js',
			'./src/components/bootstrap/dist/js/bootstrap.js'
		])
		.pipe(uglify())
		.pipe(concat("vendors.min.js"))
		//.pipe(gulp.dest("./dist/js"))
		.pipe(gulp.dest("./../bootstrap-certification/js"))
});

/* Task server local */
gulp.task("server", ["sass", "html", "main-js", "vendors-js"], function () {
	browserSync.init({
		server: {
			baseDir: "./../bootstrap-certification"
		}
	});

	/* Watch */
	gulp.watch("./src/scss/**/*.scss", ['sass']);
	gulp.watch("./src/components/bootstrap/scss/**/*.scss", ['sass']);
	gulp.watch("./src/js/**/*.js", ['main-js']);
	gulp.watch("./src/index.html", ['html']);
});

gulp.task("publish", ["sass", "html", "main-js", "vendors-js"], function () {});