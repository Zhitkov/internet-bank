module.exports = function (wallaby) {
    return {
        files: [
            'src/modules/data/**/*.js',
            'src/modules/paymentServicesHelpers.js',
            'src/components/forms/fieldsNormalizers/**/*.js',
            '!src/**/*.test.js'
        ],

        tests: [
            'src/**/*.test.js'
        ],

        env: {
            type: 'node'
        },

        testFramework: 'mocha',

        compilers: {
            '**/*.js': wallaby.compilers.babel()
        }
    };
};