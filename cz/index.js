var fs = require('fs');

module.exports = {

  prompter: function(cz, commit) {
    const promise = cz.prompt([{
      type: 'rawlist',
      name: 'type',
      message: 'Select the type of change that you\'re committing:',
      choices: [{
        name: 'feat:     A new feature',
        value: 'feat'
      }, {
        name: 'fix:      A bug fix',
        value: 'fix'
      }, {
        name: 'test:     Adding missing tests or modifying existing ones',
        value: 'test'
      }, {
        name: 'refactor: A code change that neither fixes a bug or adds a feature',
        value: 'refactor'
      }, {
        name: 'style:    Changes that do not affect the meaning of the code',
        value: 'style'
      }, {
        name: 'docs:     Documentation only changes',
        value: 'docs'
      }, {
        name: 'chore:    Changes to the build process or auxiliary tools',
        value: 'chore'
      }, {
        name: 'perf:     A code change that improves performance',
        value: 'perf'
      }]
    }, {
      type: 'input',
      name: 'scope',
      message: 'What is the scope of this change (e.g. component or file name)? (press enter to skip)\n',
    }, {
      type: 'input',
      name: 'subject',
      message: 'Write a short description of the change:\n',
      validate: function(input) {
        if (input && input.length > 0) {
          return true;
        } else {
          return 'You need to provide a short description'
        }
      }
    }], executeCommit);

    if (promise) promise.then(executeCommit);

    function executeCommit(answers) {
      var maxLineWidth = 120;

      // parentheses are only needed when a scope is present
      var scope = answers.scope.trim();
      scope = scope ? '(' + answers.scope.trim() + ')' : '';

      // Hard limit this line
      var head = (answers.type + scope + ': ' + answers.subject.trim());
      if (head.length > maxLineWidth) {
        //resize subject to ensure that OS number wont be truncated
        var subjectLen = answers.subject.length + (maxLineWidth - (head.length + 6)) //+6 to allow [...]
        head = (answers.type + scope + ': ' + answers.subject.trim().slice(0, subjectLen) + '[...]' + osnumber);
      }

      commit(head);
    }
  }
}