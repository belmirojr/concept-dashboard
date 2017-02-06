const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const watch          = require('gulp-watch');
const svg_sprite     = require('gulp-svg-sprite');
const color          = require('gulp-color');



// - Sprites Generator
// - Icons
const configSvg = {
    mode: {
        symbol: {
            dest: 'sprite',
            sprite: 'svg_sprite.svg',
            example: true
        }
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false
    },
    variables   : {
        now     : +new Date(),
        png     : function() {
            return function(sprite, render) {
                return render(sprite).split('.svg').join('.png');
            }
        }
    }
};

gulp.task('sprites', function(){
    return watch('./icons/svg/**/*.svg', { ignoreInitial: false }, function () {
      gulp.src('./icons/svg/**/*.svg')
      .pipe(svg_sprite(configSvg))
      .pipe(gulp.dest('./icons'))
      console.log(color('[SVG-ICON _sprite generated]', 'GREEN'));
    });
});

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./**.*").on('change', browserSync.reload);
});


gulp.task('default', ['serve', 'sprites']);