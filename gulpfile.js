//-----------------------------------ПЛАГИНЫ---------------------------------
import pkg from "gulp";
const { src, dest, parallel, series, watch } = pkg;
import sass from "sass";
import gulpSass from "gulp-sass";
const scss = gulpSass(sass);
import TerserPlugin from "terser-webpack-plugin";
import concat from "gulp-concat";
import gulpIf from "gulp-if";
import browserSync from "browser-sync";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import autoPrefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import del from "del";
import fileInclude from "gulp-file-include";
import webp from "gulp-webp";
import svgSprite from "gulp-svg-sprite";
import newer from "gulp-newer";
import htmlmin from "gulp-htmlmin";
//-----------------------------------ПЛАГИНЫ---------------------------------
//-----------------------------------ПУТИ------------------------------------
const srcFolder = "./src";
const buildFolder = "./build";
const path = {
  src: {
    htmlFiles: `${srcFolder}/**/*.html`,
    scssFiles: `${srcFolder}/scss/**/*.scss`,
    jsFiles: `${srcFolder}/js/**/*.js`,
    fontsFiles: `${srcFolder}/fonts/**/*`,
    svgFiles: `${srcFolder}/img/**/*.svg`,
    imgFiles: `${srcFolder}/img/**/*.{jpg,jpeg,png}`,
    styleSCSSFile: `${srcFolder}/scss/style.scss`,
    mainJSFile: `${srcFolder}/js/main.js`,
    scssFolder: `${srcFolder}/scss`,
    jsLibsFolder: `${srcFolder}/js/libs`,
    resourceFolder: `${srcFolder}/resources`,
  },
  build: {
    imgFolder: `${buildFolder}/img`,
    cssFolder: `${buildFolder}/css`,
    jsFolder: `${buildFolder}/js`,
    fontsFolder: `${buildFolder}/fonts`,
  },
};
//-----------------------------------ПУТИ------------------------------------

let isDevelop = false;

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: buildFolder,
    },
    notify: false,
  });
};

const cleanBuild = () => {
  return del(buildFolder);
};

const html = () => {
  return src([path.src.htmlFiles, `!${srcFolder}/html/_*.html`])
    .pipe(gulpIf(isDevelop, htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(fileInclude())
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src(path.src.styleSCSSFile, { sourcemaps: !isDevelop })
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoPrefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest(path.build.cssFolder, { sourcemaps: "." }))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src(path.src.mainJSFile)
    .pipe(
      webpackStream({
        mode: "production",
        output: {
          filename: "main.min.js",
        },
        performance: { hints: false },
        optimization: {
          minimize: true,
          minimizer: [new TerserPlugin()],
        },
        plugins: [
          new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
          }),
        ],
        target: ["web", "es5"],
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(dest(path.build.jsFolder))
    .pipe(browserSync.stream());
};

const libsCSS = () => {
  return src(["node_modules/slick-carousel/slick/slick.css", "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css"])
    .pipe(concat("_libs.scss"))
    .pipe(dest(path.src.scssFolder))
    .pipe(browserSync.stream());
};

const libsJS = () => {
  return src([
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    "node_modules/jquery.maskedinput/src/jquery.maskedinput.js",
    "node_modules/jquery-validation/dist/jquery.validate.min.js",
    "node_modules/jquery-validation/dist/additional-methods.js",
  ])
    .pipe(dest(path.src.jsLibsFolder))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(path.src.imgFiles)
    .pipe(newer(path.build.imgFolder))
    .pipe(
      gulpIf(
        isDevelop,
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 90, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
        ])
      )
    )
    .pipe(dest(path.build.imgFolder));
};

const webpImages = () => {
  return src(path.src.imgFiles).pipe(newer(path.build.imgFolder)).pipe(webp()).pipe(dest(path.build.imgFolder));
};

const svgSprites = () => {
  return src(path.src.svgFiles)
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest(path.build.imgFolder));
};

const watching = () => {
  watch(path.src.htmlFiles, html);
  watch(path.src.scssFiles, styles);
  watch(path.src.jsFiles, scripts);
  watch(path.src.svgFiles, svgSprites);
  watch(path.src.imgFiles, parallel(images, webpImages));
};

const develop = (ready) => {
  isDevelop = true;
  ready();
};

const favicon = () => {
  return src(`${srcFolder}/favicon.ico`).pipe(dest(buildFolder));
};

export { html };
export { styles };
export { scripts };
export { libsCSS };
export { libsJS };
export { svgSprites };
export { images };
export { webpImages };

export default parallel(html, styles, scripts, favicon, libsCSS, libsJS, svgSprites, images, webpImages, browsersync, watching);

export const build = series(cleanBuild, develop, parallel(html, styles, scripts, favicon, libsCSS, libsJS, svgSprites, images, webpImages));
