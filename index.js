#!/usr/bin/env node

var aglio = require('aglio');
var colors = require('colors');
var fs = require('fs');
var minify = require('html-minifier').minify;
var path = require('path');
var prettyjson = require('prettyjson');
var program = require('commander');
var refparser = require('json-schema-ref-parser');
var swag2blue = require('swag2blue');

// true if being run from the command line, false if included from script
var isMain = require.main === module

if (isMain) {
  // Define program arguments
  program
    .version('1.0.0')
    .option('-i, --input <file>', 'set the input Swagger file (required)')
    .option('-o, --output <file>', 'set the output HTML file')
    .option('--theme-template <template name>', 'sets the theme template (ex. triple)')
    .option('--theme-full-width', 'renders the HTML as full width instead of confined to a max width')
    .option('--theme-variables <variables>', 'adjust theme variables such as color (ex. slate)')
    .option('--no-theme-condense', 'disable condensing navigation links')
    .option('--theme-style <less/css file>', 'specify a custom theme style file')
    .option('--no-minify', 'disable html minification')
    .option('-s, --server', 'enable live reloading script for development')
    .parse(process.argv);

  // Check input
  check_input(program.input, 'Input is required');

  // Run conversion
  convert(program);
}

// End program

/**
 * Helper functions
 */

function convert(program, callback) {

  // define no-op callback
  if (!callback) {
    callback = function (err, blueprint) { }
  }

  // Read in the file
  refparser.parse(program.input, function (err, schema) {
    if (err) isMain ? halt(err) : callback(err);
    // Read in aglio options
    var options = {
      themeTemplate: (program.themeTemplate === 'triple' || program.themeTemplate === 'index' || !program.themeTemplate) ?
        path.resolve(__dirname, 'templates/' + (program.themeTemplate || 'index') + '.jade') :
        themeTemplate,
      themeVariables: program.themeVariables,
      themeFullWidth: program.themeFullWidth,
      noThemeCondense: program.noThemeCondense,
      themeStyle: program.themeStyle,
      locals: {
        livePreview: program.server,
        host: ((schema.schemes && schema.schemes.length > 0 && schema.host) ? 
          (schema.schemes[0] || 'https') 
          : 'https') 
          + '://' + schema.host + (schema.basePath || '')
      }
    };

    swag2blue.run({ '_': [program.input] }, function (err, blueprint) {
      if (err) isMain ? halt(err) : callback(err);
      aglio.render(blueprint, options, function (err, html, warnings) {
        if (err) isMain ? halt(err) : callback(err);

        // If we had warnings and not outputting to console, print them out and continue.
        if (warnings && !program.output && isMain) {
          warn('Encountered ' + warnings.length + ' warnings: \n');
          warnings.forEach(function (warning) {
            warn("\n");
            warn(prettyjson.render(warning, { noColor: true }));
          });
          warn("\n");
        }

        if (!program.noMinify) {
          html = minify(html, {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            useShortDoctype: true
          });
        }

        // If output is specified, write to file.  Otherwise write to console.
        if (program.output) {
          fs.writeFile(program.output, html, function (err) {
            if (err) isMain ? halt(err) : callback(err);
            success("Success! Output written to: " + program.output);
            callback(null, html);
          });
        } else {
          if (isMain) console.log(html);
          callback(null, html);
        }
      });
    });
  });
}

/**
 * Checks that the given input is defined.  If it is defined, this is a no-op.  Else
 * this prints the error message and halts the program with exit code 1.
 * @param {input} input - The input to check
 * @param {message} txt - The text to display if the check fails
 */
function check_input(input, message) {
  if (!input) {
    error('\n  Error: ' + message);
    program.outputHelp(colors.red);
    process.exit(1);
  }
}

/**
 * Prints error text
 * @param {string} txt - The text to display
 */
function error(txt) {
  return console.error(colors.red(txt));
}

/**
 * Prints warn text
 * @param {string} txt - The text to display
 */
function warn(txt) {
  return console.warn(colors.yellow(txt));
}

/**
 * Prints successwarn text
 * @param {string} txt - The text to display
 */
function success(txt) {
  return console.warn(colors.green(txt));
}

/**
 * Prints error text and halts the program with exit code 1
 * @param {string} txt - The text to display before exiting
 */
function halt(txt) {
  error(txt);
  process.exit(1);
}

// Used for testing or for including this in other projects
exports.convert = convert