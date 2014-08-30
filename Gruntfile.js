module.exports = function (grunt) {

    grunt.initConfig({

        mochaTest: {
            e2e: {
                options: {
//                    require: [
//                        'test/e2e/globals/globals.js'
//                    ],
                    reporter: 'spec'
                },
                src: ['test/e2e/**/*.js']
            },
            unit: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/unit/*.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('e2e', ['mochaTest:e2e']);
    grunt.registerTask('unit', ['mochaTest:unit']);
    grunt.registerTask('test', ['mochaTest:unit','mochaTest:e2e']);

    grunt.registerTask('default', ['test']);
};