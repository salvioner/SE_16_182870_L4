var OPT = require('./database/DBOptions.json');
var MAX_ID = OPT.max_id;
var db = require('./database/database.json');

function empty() {
  return {id: "",  name: "",  surname: "",  level: "",  salary: ""};
}

function DBempty(id) {
  if (typeof(id) == "number" || id % 1 == 0)
    return {id: id,  name: "",  surname: "",  level: "",  salary: ""};
  return empty();
}

function DBdelete(id) {
  if (id > MAX_ID) {
    return empty();
  }
  db[id] = DBempty(id);
  db[id].id = id;
  var fdb = fs.openSync("./database/database.json", 'w');
  fs.writeSync(fdb, JSON.stringify(db), encoding='utf8');
  fs.close(fdb);
  return db[id];
}
