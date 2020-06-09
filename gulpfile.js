const gulp = require("gulp");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');//instalujemy żeby w debuggerze pokazywało sie odwołanie do pliku scss a nie css
const autoprefixer = require('gulp-autoprefixer');//narzędzie które dodaje prefixy (wykorzystuje do tego browserslist)
const browserSync = require('browser-sync').create();//syncgroniczne przeglądanie - przeglądam na jednym urządzeniu a pokazuje się na kilku
const notifier = require('node-notifier');
const csso = require('gulp-csso');

sass.compiler = require('node-sass');

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    cb();
}

function myError(error) {
    console.log(error.formatted)
    notifier.notify({
        title: 'Błąd',
        message: error.formatted
    });
}


//funkcja zamiany  scss na css
function css() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded"//nested, expanded, compact, compressedgulp
        }).on('error', myError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))//ścieżka relatywna do pliku css gdzie ma zapisać plik z mapą, nowy plik a w pliku main tylko ścieżka
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());

}

//funkcja aktualizująca zmiany w pliach scss
function watch(cb) {
    gulp.watch('./scss/**/*.scss', gulp.series(css))
    gulp.watch("./*.html").on('change', browserSync.reload);
    cb();
}

//gulp.watch('./scss/**/*.scss', gulp.parallel())
//}

exports.css = css;
exports.watch = watch;
exports.default = gulp.series(server, css, watch);


