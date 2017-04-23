# es2015-differential-serve-middleware

[![NPM Version][npm-image]][npm-url]
[![Linux Build][travis-image]][travis-url]

A differential serving middleware for express-static-middleware. Allows you to serve ES2015 to those who support it &amp; ES5 to those who don't.

Quite useful for WebComponent projects, as with the V1 spec you must differentially serve ES5 and ES2015 to browsers that support each.

This is a middleware add-on for the Express serve-static-middleware module:

https://www.npmjs.com/package/serve-static-middleware

## Installation

```bash
npm install --save es2015-differential-serve-middleware
```

## Usage

```javascript
// Import MiddlewareBuilder
const differentialServeMiddleware = require('es2015-differential-serve-middleware');

/*
  Pass within array of static-middleware by calling imported function
  and passing two parameters (es2015 directory name, es5 directory name)
  the parameters are optional.
  
  e.g.
/*
serveStatic(dir, opts, [differentialServeMiddleware('es2015', 'es5')])
```

## API

The module exposes a function as below.

### differentialServeMiddleware(es2015dir, es5dir)

This function is a middleware factory, and returns a customised 
middleware which will differentially serve files from either the 
es2015 or the es5 directories provided - depending on the request
browser.

Default values (if not specified) for both parameters are: 'es2015' and 'es5' respectively.

## Supported Browsers

We serve ES2015 to all of the below browsers, ES5 to all others.

 - Chrome (Desktop/Android) 49+
 - iOS (All Browsers) iOS 10+
 - Safari (Desktop) 10+ 
 - Firefox 51+ 
 - Edge 14+ 

[npm-image]: https://img.shields.io/npm/v/serve-static.svg
[npm-url]: https://www.npmjs.com/package/es2015-differential-serve-middleware
[travis-image]: https://img.shields.io/travis/daniel-cotton/serve-static-middleware/master.svg?label=linux
[travis-url]: https://travis-ci.org/daniel-cotton/es2015-differential-serve-middleware
