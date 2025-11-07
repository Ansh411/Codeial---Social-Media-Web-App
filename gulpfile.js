const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rev = require('gulp-rev');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const del = require('del');

// Compile SCSS → Minified CSS
gulp.task('sass', function () {
  console.log('🧵 Compiling and minifying SCSS → CSS...');
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('./assets/css'));
});

// Revision (cache busting)
gulp.task('revCSS', function () {
  console.log('🔁 Adding revision hashes to CSS...');
  return gulp.src('./assets/css/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('css', gulp.series('sass', 'revCSS'));

// Minifying JS
gulp.task('css', gulp.series('sass', 'revCSS'));

gulp.task('js', function () {
  console.log('⚡ Minifying & revisioning JS...');
  return gulp.src('./assets/**/*.js')   
    .pipe(terser())                     
    .pipe(rev())                        
    .pipe(gulp.dest('./public/assets/js')) 
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets')); 
});

// Optimizing images
gulp.task('images', function () {
  console.log('🖼️ Compressing images...');

  return gulp.src('./assets/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

// Empty the public/assets directory
gulp.task('clean:assets', function () {
  console.log('🧹 Cleaning old assets...');
  return del(['./public/assets']);
});

// Building overall gulp
gulp.task('build', gulp.series('clean:assets', 'css', gulp.parallel('js', 'images'), function (done) {
    console.log('✅ All assets built successfully!');
    done();
  }
));
