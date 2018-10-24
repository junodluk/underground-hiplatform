var fs = require('fs');

module.exports = {

  prompter: function(cz, commit) {
    var COMPONENTS_FILE = 'src/data/components.json';
    var componentsFile = fs.existsSync(COMPONENTS_FILE) ? JSON.parse(fs.readFileSync(COMPONENTS_FILE, 'utf8')) : null;

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
        name: 'docs:     Documentation only changes',
        value: 'docs'
      }, {
        name: 'style:    Changes that do not affect the meaning of the code',
        value: 'style'
      }, {
        name: 'refactor: A code change that neither fixes a bug or adds a feature',
        value: 'refactor'
      }, {
        name: 'perf:     A code change that improves performance',
        value: 'perf'
      }, {
        name: 'test:     Adding missing tests',
        value: 'test'
      }, {
        name: 'chore:    Changes to the build process or auxiliary tools',
        value: 'chore'
      }]
    }, {
      type: 'input',
      name: 'OSNumber',
      message: 'Service Order Number (OS):\n',
      validate: function(input) {
        input = input || input.trim();
        if (!input.length) {
          return true;
        }
        if (/^[0-9]+$/g.test(input)) {
          return true;
        } else {
          return 'Only numbers are allowed.'
        }
      }
    }, {
      type: 'input',
      name: 'scope',
      message: 'Denote the component changed on this commit (Event, Button, DBPanel, MDetail, etc.):\n',
      validate: function(input) {
        input = input || input.trim();
        if (!input.length) {
          return true;
        }
        if (!componentsFile) {
          return true;
        }
        var found = false;
        var lower = input.toLowerCase();
        componentsFile.components.forEach(function(component) {
          if (component.id === lower) {
            found = true;
          }
        });

        if (!found) {
          return 'Components not found, must be available on src/data/components.json file.'
        } else {
          return true;
        }
      }
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
      var maxLineWidth = 100;

      // parentheses are only needed when a scope is present
      var scope = answers.scope.trim();
      var osnumber = answers.OSNumber.trim();

      osnumber = osnumber ? ' [SO-' + answers.OSNumber.trim() + ']' : '';
      scope = scope ? '(' + answers.scope.trim() + ')' : '';

      // Hard limit this line
      var head = (answers.type + scope + ': ' + answers.subject.trim() + osnumber);
      if (head.length > maxLineWidth) {
        //resize subject to ensure that OS number wont be truncated
        var subjectLen = answers.subject.length + (maxLineWidth - (head.length + 6)) //+6 to allow [...]
        head = (answers.type + scope + ': ' + answers.subject.trim().slice(0, subjectLen) + '[...]' + osnumber);
      }

      commit(head);
    }
  }
}