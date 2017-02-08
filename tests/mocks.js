const path = require('path')
const fixtureFile = path.join(__dirname, 'fixture-files/hi.md');

module.exports = function(dialog) {
  dialog.showOpenDialog = () => {
    return [fixtureFile];
  };
};
