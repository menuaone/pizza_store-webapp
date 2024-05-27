module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'indent': ['warn', 4],
        // 'react/jsx-indent': ['warn', 4, { 'checkAttributes': true }],
        'react/react-in-jsx-scope': 'off',
        'react/destructuring-assignment': 'off',
        'no-nested-ternary': 'warn',
        'semi': ['error', 'always', { 'omitLastInOneLineBlock': false }],
        // 'comma-dangle': ['error', 'never'],
        // qoutes: ['error', 'single'],
        'react/props-types': [0],
    },
};
