module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'no-use-before-define': 'error',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      }
    ],
    'no-shadow': 'error',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state']
      }
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true
      }
    ],
    'max-len': ['warn', { code: 120 }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-console': 'warn',
    'react/require-default-props': 'off',
    semi: 'off',
    'comma-dangle': 'off',
    'no-compare-neg-zero': 'on',
    'no-empty': 'on',
    'no-unreachable': 'on',
    'array-callback-return': 'on',
    'dot-location': 'on',
    'dot-notation': 'on',
    eqeqeq: 'on',
    'grouped-accessor-pairs': 'on',
    'guard-for-in': 'on',
    'no-caller': 'on',
    'no-case-declarations': 'on',
    'no-constructor-return': 'on',
    'no-else-return': 'on',
    'no-empty-function': 'on',
    'no-empty-pattern': 'on',
    'no-eq-null': 'on',
    'no-eval': 'on',
    'no-floating-decimal': 'on',
    'no-loop-func': 'on',
    'no-useless-concat': 'on',
    'vars-on-top': 'on'
  }
}
