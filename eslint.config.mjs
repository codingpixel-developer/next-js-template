import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    files: ['app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'JSXAttribute[name.name="type"][value.value=/^(date|time|datetime-local)$/]',
          message:
            'Use the shared DatePicker or TimePicker. Native date/time inputs are forbidden.',
        },
        {
          selector:
            'JSXAttribute[name.name="type"] > JSXExpressionContainer > Literal[value=/^(date|time|datetime-local)$/]',
          message:
            'Use the shared DatePicker or TimePicker. Native date/time inputs are forbidden.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-datepicker',
              message:
                'Use the shared DatePicker or TimePicker; package imports belong inside their wrappers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'app/**/components/ui/datePicker/**',
      'app/**/components/ui/timePicker/**',
      'app/**/components/ui/dateTimePicker/**',
    ],
    rules: { 'no-restricted-imports': 'off' },
  },
]);

export default eslintConfig;
