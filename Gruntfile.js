'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assets: {},
    mochaTest: {
      single: {
        options: {
          grep: grunt.option('test'),
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },
    shell: {
      'pegjs-challenge-rules': {
        command: 'pegjs ./dsl/challenge-rules-parser.pegjs ./lib/challenge-rules-parser.js'
      },
      'pegjs-challenge-availability-rules': {
        command: 'pegjs ./dsl/challenge-availability-rules-parser.pegjs ./lib/challenge-availability-rules-parser.js'
      },
      'pegjs-reaction-actions': {
        command: 'pegjs ./dsl/reaction-actions-parser.pegjs ./lib/reaction-actions-parser.js'
      },
      'pegjs-reaction-trigger-conditions': {
        command: 'pegjs ./dsl/reaction-trigger-conditions-parser.pegjs ./lib/reaction-trigger-conditions-parser.js'
      },
      'pegjs-smartlist-member-conditions': {
        command: 'pegjs ./dsl/smartlist-member-conditions-parser.pegjs ./lib/smartlist-member-conditions-parser.js'
      }
    },
    uglify: {
      default: {
        options: {
          preserveComments: 'some',
          sourceMap: 'dist/fidem-dsl.min.map',
          sourceMappingURL: 'dist/fidem-dsl.min.map'
        },
        files: {
          'dist/fidem-dsl.min.js': 'dist/fidem-dsl.js'
        }
      }
    },
    browserify: {
      main: {
        src: 'index.js',
        dest: 'dist/fidem-dsl.js',
        options: {
          browserifyOptions: {
            standalone: 'fidemdsl'
          }
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['browserify', 'uglify']);
  grunt.registerTask('single-test', ['mochaTest:single']);
  grunt.registerTask('pegjs', ['shell:pegjs-challenge-rules', 'shell:pegjs-challenge-availability-rules', 'shell:pegjs-reaction-actions', 'shell:pegjs-reaction-trigger-conditions', 'shell:pegjs-smartlist-member-conditions']);

};
