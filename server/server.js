// THIS SERVER USES NODE.JS
// All required packages have already been downloaded in ./node_modules

// required packages
var http = require('http');
var util = require('util');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

// POST
app.use(bodyParser.urlencoded({ extended: false }));

//JSON POST
app.use(bodyParser.json());

// specifying access port
app.set('port', (process.env.PORT || 1337));
