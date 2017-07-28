var path = require('path');
var jsonfile = require('jsonfile');

var file = path.resolve(__dirname, '../../saneconsole.log');

module.exports = {
  write: function(obj) {
    jsonfile.writeFile(file, obj, {flag: 'a'}, function (err) {
      if (err) console.error(err);
    });
  }
}
