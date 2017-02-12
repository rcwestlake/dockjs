const path = require('path')
const fixtureFile = path.join(__dirname, 'fixture-files/upload.js');

module.exports = function(dialog) {
  dialog.showOpenDialog = () => {
    return [fixtureFile];
  };
};
