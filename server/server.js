// THIS SERVER USES NODE.JS
// All required packages have already been downloaded in ./node_modules
var http = require('http');
var express = require('express');
var util = require('util');
var bind = require('bind');
var url = require('url');
var bodyParser = require('body-parser');
var db = require("./database/dbcontrol.js");
var fs = require('fs');

// creating app
var app = express();

// initializing database options
var OPT = require('./database/DBOptions.json');
var MAX_ID = OPT.max_id;
var LOW_AV_ID = MAX_ID;     // lowest available ID
var db = require('./database/database.json');

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

/* SEARCH ENTRY */
app.get('/', function(req, res) {
  // user wants to search by ID;
  // if ID is empty, an empty template will be returned.

  // parsing request URL
  var query = url.parse(req.url, true).query;
  var _ID = parseInt(query.id);
  // console.log("GET:\nurl = " + req.url);
  // console.log("id = " + _ID);

  if(firstStart && req.url != '/') {
    // user requested a query without accessing the starting page
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end("<header><h1>403 - Forbidden</h1></header>\n\n Please open <a href='" + "http://127.0.0.1:1337" + "'>the main page</a> before sending this request.");
  } else {

    if (req.url == "/" || isNaN(_ID)) {
      // user accessing the application for the first time
      firstStart = true;
    }

    var _name;
    var _surname;
    var _level;
    var _salary;
    var _hidden = "";

    if (firstStart) {
      // preparing empty module
      _ID = ""
      name = "";
      surname = "";
      level = "";
      salary = "";
      hidden = "";
      _hidden = "hidden";
      firstStart = false;
    } else {
      // searching for a match in the database
      var emp = search(_ID);

      _ID = "'" + emp.id + "'";
      _name = emp.name;
      _surname = emp.surname;
      _level = emp.level;
      _salary = "'" + emp.salary + "''";
    }

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
    }
  });

/* DELETE ENTRY */
app.post('/del/', function(req, res){

  if(firstStart) {
    firstStart = false;
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end("<header><h1>403 - Forbidden</h1></header>\n\n -* Please open <a href='" + "http://127.0.0.1:1337" + "'>the main page</a> before sending this request. *-");
  } else {
    var _ID = req.body.id;
    var emp = DBdelete(_ID);
    _ID = "'" + emp.id + "'";
    var _name = emp.name;
    var _surname = emp.surname;
    var _level = emp.level;
    var _salary = "'" + emp.salary + "''";

    bind.toFile('./templates/search.tpl',
      {
        hidden: "",
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
  }
});

// /* [OLD] DELETE ENTRY */
// app.get('/del/', function(req, res) {
//   // user wants to delete id; an empty template will be returned.
//
//   // parsing request URL
//   var query = url.parse(req.url, true).query;
//   var _ID = parseInt(query.id);
//   // console.log("GET:\nurl = " + req.url);
//   // console.log("id = " + _ID);
//
//   if (req.url == "/" || isNaN(_ID)) {
//     firstStart = true;
//   }
//
//   // deleting entry from database
//   var emp = DBdelete(_ID);
//
//   // preparing response
//   var _hidden = "";
//   if (firstStart) {
//     _hidden = "hidden";
//     firstStart = false;
//   }
//
//   _ID = "'" + emp.id + "'";
//   var _name = emp.name;
//   var _surname = emp.surname;
//   var _level = emp.level;
//   var _salary = "'" + emp.salary + "''";
//
//   bind.toFile('./templates/search.tpl',
//     {
//       hidden: _hidden,
//       IDrange: IDrange(),
//       ID: _ID,
//       name: _name,
//       surname: _surname,
//       level: _level,
//       salary: _salary
//     },
//     function(data) {
//       // writing HTML header
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       // sending page data
//       res.end(data);
//     });
//
// });

/* ADD ENTRY */
app.post('/', function(req, res) {

  if(firstStart) {
    firstStart = false;
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end("<header><h1>403 - Forbidden</h1></header>\n\n -* Please open <a href='" + "http://127.0.0.1:1337" + "'>the main page</a> before sending this request. *-");
  } else {
    var body = req.body;

    var _ID = body.id;
    var _name = body.name;
    var _surname = body.surname;
    var _level = body.level;
    var _salary = body.salary;
    var _message = "";

    if (body && body.name != "" && body.surname != "" && body.level != "" && body.salary != "") {
      // all the fields have been set
      _ID = set(_ID, {
          id: _ID,
          name: _name,
          surname: _surname,
          level: _level,
          salary: _salary
        });

      var emp = search(_ID);  // should find the newly added item
      _ID = "'" + _ID + "'";
      _name = emp.name;
      _surname = emp.surname;
      _level = emp.level;
      _salary = "'" + emp.salary + "''";
    } else {
      // one or more fields are missing
      var _message = "Please fill in the following fields:";
      for(value in body) {
        if (body[value] == "") {
          _message += "<br>" + value.toString();
        }
      }
    }

    bind.toFile('./templates/search.tpl',
      {
        hidden: "",
        IDrange: IDrange(),
        ID: _ID,
        name: _name,
        surname: _surname,
        level: _level,
        salary: _salary,
        message: _message
      },
      function(data) {
        // writing HTML header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // sending page data
        res.end(data);
      }
    );
  }
});

// /* [OLD] ADD ENTRY */
// app.get('/add/', function(req, res) {
//   // adds to DB the specified object
//
//   // parsing request URL
//   var query = url.parse(req.url, true).query
//   var _ID = parseInt(query.id);
//   var _name = query.name;
//   var _surname = query.surname;
//   var _level = query.level;
//   var _salary = parseInt(query.salary);
//   var _hidden = "";
//
//   if (req.url == "/" || _ID == NaN) {
//     firstStart = true;
//   }
//
//   if (!firstStart) {
//     // adding entry
//     var obj = {
//       id: _ID,
//       name: _name,
//       surname: _surname,
//       level: _level,
//       salary: _salary
//     };
//
//     if(_ID == "") {
//       _ID = set(-1, obj);
//     } else {
//       _ID = set(_ID, obj);
//     }
//
//   } else {
//     _hidden = "hidden";
//     firstStart = false;
//   }
//
//   // preparing response
//   bind.toFile('./templates/search.tpl',
//     {
//       hidden: _hidden,
//       IDrange: IDrange(),
//       ID: _ID,
//       name: _name,
//       surname: _surname,
//       level: _level,
//       salary: _salary
//     },
//     function(data) {
//       // writing HTML header
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       // sending page data
//       res.end(data);
//     });
//
// });

app.listen(1337, '127.0.0.1');
console.log("server started");

/**
 *  Computes and returns the string which is shown as a placeholder for
 *  the ID field in the form.
 *  @return {String} the placeholder telling which IDs currently exist in the database
 */
function IDrange() {
  var rangestring = "'0 to " + (MAX_ID - 1).toString() + "'";
  return rangestring;
}

/* database functions */

/**
 *  This function is not used, and it is shown only as comparison with
 *  the November 23rd submission
 *  @deprecated
 */
function empty() {
  return {id: "",  name: "",  surname: "",  level: "",  salary: ""};
}

/**
 *  Sets up an empty Object in the format used by the database. If the specified
 *  ID is valid, the empty object will have the ID set.
 *  @param {number} id if this is a valid ID, the function will set it as a value for 'id' in the object
 *  @return {Object} an empty object, eventually with the 'id' value set to the number passed as a parameter
 */
function DBempty(id) {
  var retID = "";
  if (typeof(id) == "number" || id % 1 === 0) {
    retID = id;
  }
  return {id: retID,  name: "",  surname: "",  level: "",  salary: ""};
}

/**
 *  This function is not used, and it is shown only as comparison with
 *  the November 23rd submission
 *  @deprecated
 */
function dbInit(path) {
  var fd = fs.openSync(path, 'w');
  var nr = fs.writeSync(fd, "{ \"MAX_ID\": " + MAX_ID + " }", 0, encoding='utf8');
  fs.close(fd);
  return nr;
}

/**
 *  Looks for an entry with the specified ID and returns it. if the entry
 *  is not found, returns an empty object with the specified ID.
 *  @param {number} empID the ID of the entry to find in the database
 *  @return {Object} an entry with an ID equal to empID
 */
function search(empID) {
  if (empID != "NaN") {
    for(i=0; i<MAX_ID; i++) {
      var val = db[i];
      if (val.id == empID) {
        return val;
      }
    }
  }
  return DBempty(empID);
}

/**
 *  Assigns a new object to the database entry with id = empID, according to
 *  the project task: if no ID is specified, empID shall be -1, in that case
 *  the entry will be added in the lowest db entry which is empty. Otherwise,
 *  the entry with the specified ID will be overwritten. Finally, if
 *  empID > MAX_ID a new entry with id = MAX_ID + 1 will be appended to
 *  the database.
 *  @param {number} empID the ID of the entry to save the object in
 *  @param {Object} obj the new employee's informations
 *  @return {number} the actual ID of the inserted object
 */
function set(empID, obj) {
  var newID;                // the ID where the new object has been added
  var maxIncreased = false; // 'true' if maximum ID has been increased
  if(empID < MAX_ID && empID >= 0) {
    // the selected ID is already in the database
    db[empID] = obj;
    newID = empID;
  } else if(empID < 0) {
    // user specified no ID; adding informations in the lowest available ID
    db[LOW_AV_ID] = obj;
    newID = LOW_AV_ID;

    if(LOW_AV_ID == MAX_ID) {
      // No lower IDs were available; increased db size by 1 and set MAX_ID
      // as the lowest available ID
      MAX_ID ++;
      maxIncreased = true;
      LOW_AV_ID = MAX_ID;
    } else {
      // finding new lowest available id
      for(i=LOW_AV_ID; i < MAX_ID; i++) {

        if (db[i] == DBempty(i)) {
          LOW_AV_ID = i;
          i = MAX_ID;     // exit from 'for' cycle
        } else {
          LOW_AV_ID = MAX_ID;
        }
      }
    }
  } else {
    // User inserted higher ID than MAX_ID; since IDs must be sequential for
    // this database to work, the function will assign the current max ID to
    // the new entry.
    db[MAX_ID] = obj;
    newID = MAX_ID;
    MAX_ID += 1;
    maxIncreased = true;
  }
  db[newID].id = newID;
  // updating database file
  var fdb = fs.openSync("./database/database.json", 'w');
  fs.writeSync(fdb, JSON.stringify(db), encoding='utf8');
  fs.close(fdb);
  // updating DBoptions file with the new MAX_ID
  if (maxIncreased) {
    var fop = fs.openSync("./database/DBOptions.json", 'w');
    OPT.max_id ++;
    fs.writeSync(fop, JSON.stringify(OPT), encoding='utf8');
    fs.close(fop);
  }
  return newID;
}

/**
 *  Looks for the entry with the specified ID in the database and replaces it
 *  with an empty object. Then, it updates the value of LOW_AV_ID
 *  @param {number} id the ID of the object to be deleted
 *  @return {number} an empty object which will be used to update the template. If ID is in range, the 'id' field of this object will be the same as the 'id' parameter
 */
function DBdelete(id) {
  if (id > MAX_ID) {
    return DBempty();
  }
  db[id] = DBempty(id);
  db[id].id = id;
  var fdb = fs.openSync("./database/database.json", 'w');
  fs.writeSync(fdb, JSON.stringify(db), encoding='utf8');
  fs.close(fdb);
  // updating minimum available ID
  if (id < LOW_AV_ID) {
    LOW_AV_ID = id;
  }
  return db[id];
}
