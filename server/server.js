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
  // if ID is empty, a new empty template will be returned.

  // parsing request URL
  var query = url.parse(req.url, true).query
  var id = parseInt(query.id);
/**/console.log("GET:\nurl = " + req.url);
/**/console.log("id = " + id);
  if(id == NaN || id == "") {
    // employee not found - sending basic start page page
    id = "";
    bind.toFile(
      './templates/home.tpl',       // template
      {
        ID: id,
        IDrange: "0 - " + (MAX_ID - 1),
        address: IP + ":" + PORT
      },                          // object
      function(data) {            // function
/**/    console.log("using home.tpl")
        // writing HTML header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // sending page data
        res.end(data);
      });

  } else {

    var emp = search(id);
  /**/console.log("search result: ID= " + emp.id + "\nname= " + emp.name);
    // employee found - sending search results
    var empFound = false;
    var initialFunction = "'init()'"
    var form_hidden = "'true'";

    bind.toFile('./templates/search.tpl',
      {
        ID: emp.id,
        name: emp.name,
        surname: emp.surname,
        level: emp.level,
        salary: emp.salary
      },
      function(data) {
/**/    console.log("using home.tpl")
        // writing HTML header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // sending page data
        res.end(data);
      });

  }

});

app.listen(1337, '127.0.0.1');
console.log("server started");

// database functions
function empty() {
  return {id: "",  name: "",  surname: "",  level: "",  salary: ""};
}

function dbInit(path) {
  var fd = fs.openSync(path, 'a');
  var nr = fs.writeSync(fd, "{ 'MAX_ID': " + MAX_ID + " }", 0, encoding='utf8');
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
