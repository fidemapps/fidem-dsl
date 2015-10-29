'use strict';

module.exports = function () {
    return {
        files: [
            'package.json',
            'index.js',
            'test/helper.js',
            'dsl/**/*.pegjs',
            'lib/**/*.js'
        ],
        tests: [
            'test/**/*.js',
            {pattern: 'test/helper.js', ignore: true}
        ],
        env: {
            type: 'node',
            params: {
                env: 'NODE_ENV=test'
            }
        }
    };
};
