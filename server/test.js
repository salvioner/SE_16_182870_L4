var OPT = require('./database/DBOptions.json');
var MAX_ID = OPT.max_id;
var db = require('./database/database.json');

function empty() {
  return {id: "",  name: "",  surname: "",  level: "",  salary: ""};
}

function search(empID) {
  console.log(empID);
  if (empID != "NaN") {
    for(i=0; i<MAX_ID; i++) {
      var val = db[i];
      if (val.id == empID) {
        return val;
      }
    }
  }
  return empty();
}
