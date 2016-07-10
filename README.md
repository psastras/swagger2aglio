# Swagger to Aglio API Documentation

[![Build Status](https://travis-ci.org/psastras/swagger2aglio.svg?branch=master)](https://travis-ci.org/psastras/swagger2aglio)
[![Coverage Status](https://coveralls.io/repos/github/psastras/swagger2aglio/badge.svg?branch=master)](https://coveralls.io/github/psastras/swagger2aglio?branch=master)
[![npm version](https://badge.fury.io/js/swagger2aglio.svg)](https://badge.fury.io/js/swagger2aglio)
[![Dependency Status](https://david-dm.org/psastras/swagger2aglio.svg)](https://david-dm.org/psastras/swagger2aglio)
[![devDependency Status](https://david-dm.org/psastras/swagger2aglio/dev-status.svg)](https://david-dm.org/psastras/swagger2aglio#info=devDependencies)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Converts a Swagger API description into the API Blueprint format and then to Aglio documentation.

Currently supports Swagger version 2.0.

## Example Output

Example output is generated from the Swagger Petstore Expanded example

- [Default two column theme](https://rawgit.com/psastras/swagger2aglio/master/examples/default.html)

  `swagger2aglio -i petstore_expanded.yml -o examples/default.html`

- [Streak two column wide theme](https://rawgit.com/psastras/swagger2aglio/master/examples/streak_wide.html)

  `swagger2aglio -i petstore_expanded.yml --theme-full-width -o examples/streak_wide.html`

- [Slate two column wide theme](https://rawgit.com/psastras/swagger2aglio/master/examples/slate_wide.html)

  `swagger2aglio -i petstore_expanded.yml --theme-full-width -o examples/slate_wide.html`

- [Flatly three column theme](https://rawgit.com/psastras/swagger2aglio/master/examples/flatly_triple.html)

  `swagger2aglio -i petstore_expanded.yml --theme-variables flatly --theme-template triple -o examples/flatly_triple.html`

- [Slate three column theme](https://rawgit.com/psastras/swagger2aglio/master/examples/slate_triple.html)

  `swagger2aglio -i petstore_expanded.yml --theme-variables slate --theme-template triple -o examples/slate_triple.html`

## Installation and Usage

There are two ways to use swagger2aglio: as an executable or as a library for Node.js.

### Executable

Install swagger2aglio via NPM. You need Node.js installed.

```shell
npm install -g swagger2aglio
```

Then, start generating HTML.

```shell
# Default theme
swagger2aglio -i input.yml -o output.html

# Use three-column layout
swagger2aglio -i input.yml --theme-template triple -o output.html

# Built-in color scheme
swagger2aglio --theme-variables slate -i input.yml -o output.html

# Customize a built-in style
swagger2aglio --theme-style default --theme-style ./my-style.less -i input.yml -o output.html
```

### Node.js Library

You can also use swagger2aglio as a library. First, install and save it as a dependency:

```shell
npm install --save swagger2aglio
```

Then, convert some Swagger to HTML:

```js
var swagger2aglio = require('swagger2aglio');
var options = {
  input: './petstore_expanded.yml',
  themeVariables: 'default'
}
swagger2aglio.convert(options, function (err, html) {
    if (err) return console.log(err);

    console.log(html);
});
```

#### Reference

##### swagger2aglio.convert (options, callback)

Render a Swagger file to HTML. Available options are:

| Option      | Type   | Default       | Description                           |
| ----------- | ------ | ------------- | ------------------------------------- |
| input       | string |               | The input Swagger definition file     |
| theme       | string | `'default'`   | Theme name to load for rendering      |

In addition, the [default theme](https://github.com/danielgtaylor/aglio/tree/olio-theme) provides the following options:

| Option           | Type   | Default   | Description                                  |
| ---------------- | ------ | --------- | -------------------------------------------- |
| themeVariables   | string | `default` | Built-in color scheme or path to LESS or CSS |
| themeCondenseNav | bool   | `true`    | Condense single-action navigation links      |
| themeFullWidth   | bool   | `false`   | Use the full page width                      |
| themeTemplate    | string |           | Layout name or path to custom layout file    |
| themeStyle       | string | `default` | Built-in style name or path to LESS or CSS   |

## Development

For development, first clone the repository.  Then install dependencies:

```shell
npm install
```

To start the development hot reload server, run:

```shell
npm run start
```

Then, in a browser go to [http://localhost:3000](http://localhost:3000) and select an example.
Changes made to any of the Jade templates will be automatically reloaded and displayed in the browser.

## License

Copyright (c) 2016 Paul Sastrasinh