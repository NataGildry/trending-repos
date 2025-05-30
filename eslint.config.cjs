const nx = require('@nx/eslint-plugin');
const stylistic = require('@stylistic/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@stylistic': stylistic,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: [],
          depConstraints: [
            {
              sourceTag: 'app',
              onlyDependOnLibsWithTags: ['domain:*', 'layer:shell'],
            },
            {
              sourceTag: 'layer:utils',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'layer:domain',
              onlyDependOnLibsWithTags: ['layer:utils'],
            },
            {
              sourceTag: 'layer:ui',
              onlyDependOnLibsWithTags: ['layer:utils'],
            },
            {
              sourceTag: 'layer:feature',
              onlyDependOnLibsWithTags: ['layer:domain', 'layer:ui', 'layer:utils'],
            },
            {
              sourceTag: 'layer:shell',
              onlyDependOnLibsWithTags: ['layer:feature', 'layer:domain', 'layer:ui', 'layer:utils'],
            },
            {
              sourceTag: 'domain:shared',
              onlyDependOnLibsWithTags: ['domain:shared'],
            },
            {
              sourceTag: 'domain:trending-repos',
              onlyDependOnLibsWithTags: ['domain:trending-repos', 'domain:shared'],
            },
          ],
        },
      ],
      eqeqeq: ['error', 'smart'],
      'no-console': ['warn'],
      '@stylistic/lines-around-comment': [
        'error',
        {
          allowArrayStart: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowEnumStart: true,
          allowInterfaceStart: true,
          allowModuleStart: true,
          allowObjectStart: true,
          allowTypeStart: true,
        },
      ],
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      '@stylistic/spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: eslintPluginImport,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'signature',
            ['decorated-field', 'get', 'set'],
            'field',
            'constructor',
            'decorated-method',
            'method',
          ],
        },
      ],
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': ['warn', { ignoreParameters: true }],
      '@typescript-eslint/no-unsafe-member-access': ['error'],
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
    },
    settings: {
      'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      'import/resolver': {
        typescript: true,
      },
    },
  },
];
