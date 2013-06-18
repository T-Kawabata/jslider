module.exports = function(grunt) {

  var cssMin = {
      src: 'dist/<%= pkg.name %>.css',
      dest: 'dist/<%= pkg.name %>.min.css'
    },
    jsOrder = [
      'js/jshashtable-2.1_src.js',
      'js/tmpl.js',
      'js/jquery.dependClass-0.1.js',
      'js/jquery.numberformatter-1.2.3.js',
      'js/draggable-0.2.js',
      'js/jquery.slider.js'
    ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    build: {main: {}, css: {}},
    concat: {
      main: {
        src: ['templates/package_header.js'].concat(jsOrder).concat(['templates/package_footer.js']),
        dest: 'dist/<%= pkg.name %>.js'
      },
      css: {
        src: ['css/jquery.slider.css', 'css/*.css'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    cssmin: {
      main: {
        files:{
          'dist/<%= pkg.name %>.min.css':'dist/<%= pkg.name %>.css'
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        mangle: false
      },
      main: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },
    imagemin: {
      main: {
        options: {
          optimizationLevel: 3
        },
        files: {
          'dist/slider-background.png': 'css/slider-background.png',
          'dist/slider-pointer.png': 'css/slider-pointer.png'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', function() {
      grunt.task.run(['build:main']);
    });
  grunt.registerMultiTask('build', '',
     function() {
        var parts = ['concat', 'uglify', 'cssmin' ,'imagemin'], i;
        for (i=0; i<parts.length; i+=1) {
            parts[i] = parts[i] + ':' + this.target;
        }
        grunt.task.run(parts);
     });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

};
