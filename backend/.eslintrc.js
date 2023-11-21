module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            env: {
                node: true,
                jest: true
            },
            files: ['.eslintrc.{js,cjs}', '*.test.js', '*.spec.js'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {},
    globals: {
        process: 'readonly'
    }
}
