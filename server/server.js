// THIS SERVER USES NODE.JS
// All required packages have already been downloaded in ./node_modules

// server infos
var IP = "http://127.0.0.1"   // {String} this server's IP
var PORT = 1337               // {Integer} this process' port number


// required packages
var http = require('http');
var express = require('express');
var util = require('util');
var bind = require('bind')
var url = require('url');
var bodyParser = require('body-parser');
var db = require("./database/dbcontrol.js");
var fs = require('fs');

var app = express();

// initializing database options
var OPT = require('./database/DBOptions.json');
var MAX_ID = OPT.max_id;
var db = require('./database/database.json');
dbInit("./template-js/options.json");

// variable is set to false after the first server request
var firstStart = true;

// POST
app.use(bodyParser.urlencoded({ extended: false }));

//JSON POST
app.use(bodyParser.json());

//specifying root directory
app.use(express.static(__dirname));

// specifying access port
app.set('port', (process.env.PORT || 1337));

app.get('/', function(req, res) {
  // user wants to search by ID;
  // if ID is empty, an empty template will be returned.

  // parsing request URL
  var query = url.parse(req.url, true).query
  var _ID = parseInt(query.id);
  // console.log("GET:\nurl = " + req.url);
  // console.log("id = " + _ID);

  if (req.url == "/" || _ID == NaN) {
    firstStart = true;
  }

  var _name;
  var _surname;
  var _level;
  var _salary;
  var _hidden = "";
  if (firstStart) {
    _hidden = "hidden";
    firstStart = false;
  }

  var emp = search(_ID);

  _ID = "'" + emp.id + "''";
  _name = emp.name;
  _surname = emp.surname;
  _level = emp.level;
  _salary = "'" + emp.salary + "''";
  // console.log("search result: ID= " + emp.id + "\nname= " + emp.name);

  bind.toFile('./templates/search.tpl',
    {
      hidden: _hidden,
      IDrange: IDrange(),
      ID: _ID,
      name: _name,
      surname: _surname,
      level: _level,
      salary: _salary
    },
    function(data) {
      // writing HTML header
      res.writeHead(200, { 'Content-Type': 'text/html' });
      // sending page data
      res.end(data);
    });
  });

app.get('/del/', function(req, res) {
  // user wants to delete id; an empty template will be returned.

  // parsing request URL
  var query = url.parse(req.url, true).query
  var _ID = parseInt(query.id);
  // console.log("GET:\nurl = " + req.url);
  // console.log("id = " + _ID);

  if (req.url == "/" || _ID == NaN) {
    firstStart = true;
  }

  // deleting entry from database
  var emp = DBdelete(_ID);

  // preparing response
  var _hidden = "";
  if (firstStart) {
    _hidden = "hidden";
    firstStart = false;
  }

  _ID = "'" + emp.id + "'";
  _name = emp.name;
  _surname = emp.surname;
  _level = emp.level;
  _salary = "'" + emp.salary + "''";

  bind.toFile('./templates/search.tpl',
    {
      hidden: _hidden,
      IDrange: IDrange(),
      ID: _ID,
      name: _name,
      surname: _surname,
      level: _level,
      salary: _salary
    },
    function(data) {
      // writing HTML header
      res.writeHead(200, { 'Content-Type': 'text/html' });
      // sending page data
      res.end(data);
    });

});

app.listen(1337, '127.0.0.1');
console.log("server started");

function IDrange() {
  var rangestring = "'0 to " + (MAX_ID - 1).toString() + "'";
  return rangestring;
}

// database functions
function empty() {
  return {id: "",  name: "",  surname: "",  level: "",  salary: ""};
}

function DBempty(id) {
  if (typeof(id) == "number" || id % 1 == 0)
    return {id: id,  name: "",  surname: "",  level: "",  salary: ""};
  return empty();
}

function dbInit(path) {
  var fd = fs.openSync(path, 'w');
  var nr = fs.writeSync(fd, "{ \"MAX_ID\": " + MAX_ID + " }", 0, encoding='utf8');
  fs.close(fd);
  return nr;
}

function search(empID) {
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

function set(empID, obj) {
  if(empID >= MAX_ID) {

  }
  db[empID] = obj
  return search(empID);
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

function DBrestoreDefaults() {
  var def = require("./database/database-default.json");
  var fdb = fs.openSync("./database/database.json", 'w');
  fs.writeSync(fdb, JSON.stringify(def), encoding='utf8');
  fs.close(fdb);

  var opts = require("./database/DBOptions_default.json");
  var fop = fs.openSync("./database/DBOptions.json", 'w');
  fs.writeSync(fop, JSON.stringify(opts), encoding='utf8');
  fs.close(fop);
}
