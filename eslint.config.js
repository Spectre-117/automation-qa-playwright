import js from '@eslint/js';
import globals from 'globals';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: {js},
        extends: ['js/recommended'],
        languageOptions: {globals: globals.node},
        rules: {
            semi: 'error',
            'prefer-const': 'error',
            'quotes': [
                'warn',
                'single',
                {'avoidEscape': true, 'allowTemplateLiterals': true}
            ],
            'prefer-arrow-callback': [
                'error',
                {allowNamedFunctions: true}
            ],
            'max-len': ['error', {
                code: 100, // Maximum characters for code lines
                tabWidth: 2, // Character width for tab characters
                comments: 120, // Maximum characters for comment lines
                ignoreUrls: true, // Ignore URLs when calculating line length
                ignoreStrings: true, // Ignore string literals
                ignoreTemplateLiterals: true, // Ignore template literals
                ignoreRegExpLiterals: true, // Ignore regular expression literals
            }],
        },
        ignores: [
            'node_modules/',
            '.idea/'
        ]
    },
])
;
