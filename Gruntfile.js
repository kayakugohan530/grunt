module.exports = function(grunt){
  
  grunt.initConfig({
    uglify: {
      compile: {
        files: [{
          expand: true,
          cwd: 'assets/js/',
          src: ['**/*.js', '!**/*min.js'],
          dest: 'assets/js/',
          ext: '.min.js'
        }]
      },
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: 'hoge/'
      },
      compile: {
        files: [{
          expand: true,
          cwd: 'coffee/',
          src: ['**/*.coffee'],
          dest: 'assets/js/',
          ext: '.js'
        }]
      },
    },
    sass: {
      compile: {
        files: [{
          expand: true,
          cwd: 'sass/',
          src: ['**/*.sass'],
          dest: 'assets/css/',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      compile: {
        files: [{
          expand: true,
          cwd: 'assets/css/',
          src: ['**/*.css', '!**/*min.css'],
          dest: 'assets/css/',
          ext: '.min.css'
        }]
      },
    },
    watch: {
      sass: {
        files: ['sass/**/*.sass'],
        tasks: 'sass'
      },
      coffee: {
        files: ['coffee/**/*.coffee'],
        tasks: 'coffee'
      },
      uglify :{
        files: ['assets/**/*.js', '!**/*min.js'],
        tasks: 'uglify'
      },
      cssmin :{
        files: ['assets/**/*.css', '!**/*min.css'],
        tasks: 'cssmin'
      },
    }
  });
  
  var taskName, pkg = grunt.file.readJSON('package.json');
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }
  
  grunt.registerTask('default',  ['watch', 'sass', 'cssmin', 'coffee', 'uglify']);
}