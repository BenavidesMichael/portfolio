module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nouvelle fonctionnalité
        'fix', // Correction de bug
        'docs', // Documentation
        'style', // Formatage, sans changement de code
        'refactor', // Refactoring
        'perf', // Amélioration de performance
        'test', // Ajout de tests
        'build', // Changements du système de build
        'ci', // Changements CI/CD
        'chore', // Tâches diverses
        'revert', // Annulation de commit
      ],
    ],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-max-length': [2, 'always', 100],
  },
};
