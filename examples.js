#!/usr/bin/env node

var exec = require('child_process').exec;

var configs = [
  ['-s', '-i', 'petstore_expanded.yml', '-o', 'examples/default.html'],
  ['-s', '--theme-full-width', '--theme-variables', 'slate', '-i', 'petstore_expanded.yml', '-o', 'examples/slate_wide.html'],
  ['-s', '--theme-full-width', '--theme-variables', 'streak', '-i', 'petstore_expanded.yml', '-o', 'examples/streak_wide.html'],
  ['-s', '--theme-variables', 'flatly', '--theme-template', 'triple', '-i', 'petstore_expanded.yml', '-o', 'examples/flatly_triple.html'],
  ['-s', '--theme-variables', 'slate', '--theme-template', 'triple', '-i', 'petstore_expanded.yml', '-o', 'examples/slate_triple.html'],
]

configs.forEach(function (config) {
  exec('node index.js ' + config.join(' '), function (error, stdout, stderr) {
    if (error) console.error(error);
    if (stderr) console.error(stderr);
  });
});