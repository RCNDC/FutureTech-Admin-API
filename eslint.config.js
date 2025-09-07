  // .eslintrc.js
    module.exports = {
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: ['@typescript-eslint'],
      env: {
        node: true, // Enable Node.js global variables
        es2021: true,
        eslint_use_flat_config: false,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        // Add or override specific rules here
        
      },
    };