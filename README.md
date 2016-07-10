# Swagger to Aglio API Documentation

Converts a Swagger API description into the API Blueprint format and then to Aglio documentation.

Currently supports Swagger version 2.0.

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

## License

Copyright (c) 2016 Paul Sastrasinh