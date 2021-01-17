var fs = require('fs');
var ejs = require('ejs');
var root = __dirname + '/../';


module.exports = function setUri(uri) {
  var file = ejs.render(fs.readFileSync(root + 'templates/connection-config.ejs', 'utf-8'), { uri });
  fs.writeFileSync('db/connection-config.js', file);
}