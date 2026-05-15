import globals from 'globals';
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin';
import pluginSecurity from 'eslint-plugin-security';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    pluginSecurity.configs.recommended,
    eslintConfigPrettier,
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'module',
            globals: { ...globals.node },
            ecmaVersion: 'latest',
        },
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            eqeqeq: 'error',
            'no-console': 'off',
        },
    },
    {
        ignores: ['dist/**'],
    },
];
