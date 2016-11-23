// this library does not work!!!

var OPT = require('./DBOptions.json');
var MAX_ID = OPT.max_id;
var db = require('./database.json');

module.exports = {
  fs: function() {return require('fs')},

  empty: function() {
    return {id: "",  name: "",  surname: "",  level: "",  salary: ""};
  },

  init: function(path) {
    path = "../" + path;
    var fd = fs.openSync(path, 'a');
    var nr = fs.writeSync(fd, "{ 'MAX_ID': " + MAX_ID + " }", 0, encoding='utf8');
    fs.close(fd);
    return nr;
  },

  search: function(empID) {
    for(i=0; i<MAX_ID; i++) {
      var val = db[i];
      if (val.id == empID) {
        return val;
      }
    }
    return empty();
  },

  set: function(empID, obj) {
    if(empID >= MAX_ID) {

    }
    db[empID] = obj
    return search(empID);
  },

};
