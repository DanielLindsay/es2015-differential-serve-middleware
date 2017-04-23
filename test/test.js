
const assert = require('assert');
const http = require('http');
const path = require('path');
const request = require('supertest');
const serveStatic = require('serve-static-middleware');
const differentialServeMiddleware = require('..');

let fixtures = path.join(__dirname, '/fixtures');

describe('integration', function () {

});

describe('integration', function () {
  describe('when custom middleware is added and options specified', function () {
    let server;
    before(function () {
      server = createServerWithMiddleware();
    });
    it('should serve es5 version if unsupported browser', function (done) {
      request(server)
        .get('/todo.txt')
        .expect(200, 'es5-old-todos', done);
    });
    it('should serve es2015 version if supported browser', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36')
        .expect(200, 'es2015-new-todos', done);
    });
  });
  describe('when custom middleware is added and no dir options specified', function () {
    let server;
    before(function () {
      server = createServerWithMiddlewareNoOpts();
    });
    it('should serve es5 version if unsupported browser', function (done) {
      request(server)
        .get('/todo.txt')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es2015 version if chrome 49', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36')
        .expect(200, 'es2015-todos', done);
    });
  });
});

function createServerWithMiddleware (dir, opts, fn) {
  dir = dir || fixtures

  let _serve = serveStatic(dir, opts, [differentialServeMiddleware('new', 'old')]);

  return http.createServer(function (req, res) {
    fn && fn(req, res);
    _serve(req, res, function (err) {
      res.statusCode = err ? (err.status || 500) : 404;
      res.end(err ? err.stack : 'sorry!');
    });
  });
}

function createServerWithMiddlewareNoOpts (dir, opts, fn) {
  dir = dir || fixtures

  let _serve = serveStatic(dir, opts, [differentialServeMiddleware()]);

  return http.createServer(function (req, res) {
    fn && fn(req, res);
    _serve(req, res, function (err) {
      res.statusCode = err ? (err.status || 500) : 404;
      res.end(err ? err.stack : 'sorry!');
    });
  });
}