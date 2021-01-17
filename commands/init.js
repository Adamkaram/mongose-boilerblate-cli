var fs = require('fs');
var root = __dirname + '/../';

// build up the directory structure
module.exports = function init() {
  var dir = fs.readdirSync('./');
  var modelDir = dir.indexOf('db');
  if (modelDir !== -1) return;
  fs.mkdirSync('./db');
  fs.mkdirSync('./db/models');
  fs.mkdirSync('./db/seeders');
  fs.mkdirSync('./db/migrations');
  this.setUri('');
  fs.createReadStream(root + 'templates/repl.js').pipe(fs.createWriteStream('db/repl.js'));
  fs.createReadStream(root + 'templates/all-models.js').pipe(fs.createWriteStream('db/index.js'));
}