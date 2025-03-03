export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
        'feat',
        'refactor',
        'fix',
        'docs',
        'config',
        'style',
        'test',
        'chore',
        'ci',
        'perf',
        'revert',
        'build',
        'vercel',
      ],
    ],
  },
};
