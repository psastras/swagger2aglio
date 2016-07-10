#!/usr/bin/env node

var express = require('express')
var fs = require('fs');
var http = require('http')
var path = require('path')
var reload = require('reload')
var logger = require('morgan')
var watch = require('watch');
var app = express()
var directory = require('serve-index');
var static = require('serve-static');
var exec = require('child_process').exec;

var examplesDir = path.join(__dirname, 'examples')
var templatesDir = path.join(__dirname, 'templates')

app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))

app.use(directory(examplesDir, { icons: true }));
app.use(static(examplesDir))

var server = http.createServer(app)

// Reload code here 
var reloadServer = reload(server, app)
watch.watchTree(templatesDir, { interval: 1 }, function (f, curr, prev) {
  var cmd = 'npm run examples';
  exec(cmd, function (error, stdout, stderr) {
    // command output is in stdout
    if (error) console.error(error);
    if (stderr) console.error(stderr);
    try {
      reloadServer.reload();
    } catch (err) { }
  });
});

server.listen(app.get('port'), function () {
  console.log("Web server listening on port " + app.get('port'));
});