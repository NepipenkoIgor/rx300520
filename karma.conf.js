module.exports = (config) => {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        plugins: [
            require('karma-jasmine'),
            require('karma-typescript'),
            require('karma-chrome-launcher'),
            require('karma-mocha-reporter'),
        ],
        files: [
            {
                pattern: './src/**/!(index).ts'
            }
        ],
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        reporters: ['mocha', 'karma-typescript'],
        browsers: ['ChromeHeadless'],
        logLevel: config.LOG_INFO,
        singleRun: true,
        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json',
            reports: {
                html: 'coverage',
                text: ''
            }
        }
    })
}
