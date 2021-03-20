const gulp = require("gulp");
const gulpIf = require("gulp-if");
const del = require("del");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const uglifycss = require("gulp-uglifycss");
const concat = require("gulp-concat");
const ts = require("gulp-typescript");

const getPresets = (env) => {
    return [
        [
            "@babel/env",
            {
                loose: true,
                modules: env === "es" ? false : "commonjs"
            }
        ],
        "@babel/react"
    ];
}

const getPlugins = () => {
    return ["@babel/plugin-proposal-class-properties"];
}

gulp.task("clean:cjs", async () => {
    return del
        .sync(["index.js", "octadground.js"]);
});

gulp.task("clean:es", async () => {
    return del
        .sync("es/**");
});

gulp.task("clean:dist", async () => {
    return del
        .sync("dist/**");
});

gulp.task("compile:cjs", () => {
    const tsProject = ts.createProject("tsconfig.json");
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(
            babel({
                presets: getPresets("cjs"),
                plugins: getPlugins()
            })
        )
        .pipe(gulp.dest("."));
});

gulp.task("compile:es", () => {
    const tsProject = ts.createProject("tsconfig.json");
    return tsProject
        .src()
        .pipe(tsProject())
        .js.pipe(
            babel({
                presets: getPresets("es"),
                plugins: getPlugins()
            })
        )
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulp.dest("./es"));
});

gulp.task("build:css", () => {
    return gulp
        .src("src/styles/**/*.css")
        .pipe(uglifycss())
        .pipe(concat("octadground.css"))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("build:img", () => {
    return gulp
        .src("src/images/**/*")
        .pipe(cache(imagemin()))
        .pipe(gulp.dest("dist/images"));
});

gulp.task("clean", gulp.series("clean:cjs", "clean:es", "clean:dist"));
gulp.task("compile", gulp.series("compile:cjs", "compile:es"));
gulp.task("build", gulp.series("build:css", "build:img"))

gulp.task("default", gulp.series("clean", "compile", "build"));
