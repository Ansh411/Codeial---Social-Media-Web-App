const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rev = require('gulp-rev');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const del = require('del');

// 🧹 Clean public/assets
gulp.task('clean:assets', function () {
  console.log('🧹 Cleaning old assets...');
  return del(['./public/assets']);
});

// 🧵 Compile SCSS → Minified CSS
gulp.task('sass', function () {
  console.log('🧵 Compiling SCSS → CSS...');
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('./assets/css'));
});

// ⚡ Minify JS
gulp.task('js', function () {
  console.log('⚡ Minifying JS...');
  return gulp.src('./assets/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./assets/js'));
});

// 🖼️ Optimize images
gulp.task('images', function () {
  console.log('🖼️ Optimizing images...');
  return gulp.src('./assets/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ plugins: [{ removeViewBox: false }, { cleanupIDs: false }] })
    ]))
    .pipe(gulp.dest('./assets/images'));
});

// 🔁 Revision all assets and create manifest with correct prefixes
gulp.task('rev', function () {
  console.log('🔁 Revisioning CSS, JS, and images...');
  return gulp.src([
    './assets/css/**/*.css',
    './assets/js/**/*.js',
    './assets/images/**/*.{png,jpg,jpeg,gif,svg}'
  ], { base: './assets' })
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      path: 'rev-manifest.json',
      merge: true,
      transformer: {
        stringify: (manifest) => {
          const newManifest = {};
          for (let key in manifest) {
            // Ensure keys include subfolder prefixes
            if (key.startsWith('css/')) newManifest[key] = manifest[key];
            else if (key.startsWith('js/')) newManifest[key] = manifest[key];
            else if (key.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
              newManifest['images/' + key.split('/').pop()] = 'images/' + manifest[key].split('/').pop();
            } else {
              newManifest['css/' + key] = 'css/' + manifest[key];
            }
          }
          return JSON.stringify(newManifest, null, 2);
        }
      }
    }))
    .pipe(gulp.dest('./public/assets'));
});

// 🏗️ Full Build Sequence
gulp.task('build', gulp.series(
  'clean:assets',
  gulp.parallel('sass', 'js', 'images'),
  'rev',
  function (done) {
    console.log('✅ All assets built successfully!');
    done();
  }
));
