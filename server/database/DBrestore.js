// restores the original DB
var fs = require('fs');

var def = require("./database_default.json");
var fdb = fs.openSync("./database/database.json", 'w');
fs.writeSync(fdb, JSON.stringify(def), encoding='utf8');
fs.close(fdb);

var opts = require("./DBOptions_default.json");
var fop = fs.openSync("./database/DBOptions.json", 'w');
fs.writeSync(fop, JSON.stringify(opts), encoding='utf8');
fs.close(fop);
