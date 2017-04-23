
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
    it('should serve es5 version if no UA', function (done) {
      request(server)
        .get('/todo.txt')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es2015 version if Chrome 49', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36')
        .expect(200, 'es2015-todos', done);
    });
  });
  describe('should serve correct versions to correct versions of Chrome', function () {
    let server;
    before(function () {
      server = createServerWithMiddlewareNoOpts();
    });
    it('should serve es5 version if Chrome 48', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2623.112 Safari/537.36')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es5 version if Chrome running on iOS 9', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es5 version if Chrome 48 running on Android', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/48.0.1025.133 Mobile Safari/535.19')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es5 version if Android Ice Cream Sandwich webview', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Linux; U; Android 4.1.1; en-gb; Build/KLP) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es5 version if Chrome 48 running on Android Kitkat webview', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.0.0 Mobile Safari/537.36')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es5 version if Chrome 48 running on Android Lollipop webview', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2357.65 Mobile Safari/537.36')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es2015 version if Chrome 49', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36')
        .expect(200, 'es2015-todos', done);
    });
    it('should serve es2015 version if Chrome running on iOS 10', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1')
        .expect(200, 'es2015-todos', done);
    });
    it('should serve es2015 version if Chrome 49 running on Android', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/49.0.1025.133 Mobile Safari/535.19')
        .expect(200, 'es2015-todos', done);
    });
    it('should serve es2015 version if Chrome 49 running on Android Kitkat webview', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/49.0.0.0 Mobile Safari/537.36')
        .expect(200, 'es2015-todos', done);
    });
    it('should serve es2015 version if Chrome 49 running on Android Lollipop webview', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/49.0.2357.65 Mobile Safari/537.36')
        .expect(200, 'es2015-todos', done);
    });
  });
  describe('should serve correct versions to correct versions of Safari', function () {
    let server;
    before(function () {
      server = createServerWithMiddlewareNoOpts();
    });
    it('should serve es5 version if Safari 9', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/9.3.2 Safari/537.75.14')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es5 version if Safari on iOS 9', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_1 like Mac OS X; en-us) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.3.1 Mobile/13E238 Safari/601.1,gzip(gfe)')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es2015 version if Safari 10', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30')
        .expect(200, 'es2015-todos', done);
    });
    it('should serve es2015 version if Safari on iOS 10', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1')
        .expect(200, 'es2015-todos', done);
    });
  });
  describe('should serve correct versions to correct versions of Firefox', function () {
    let server;
    before(function () {
      server = createServerWithMiddlewareNoOpts();
    });
    it('should serve es5 version if Firefox 50', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:50.0) Gecko/20100101 Firefox/50.0')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es2015 version if Firefox 51', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:51.0) Gecko/20100101 Firefox/51.0')
        .expect(200, 'es2015-todos', done);
    });
  });
  describe('should serve correct versions to correct versions of Edge', function () {
    let server;
    before(function () {
      server = createServerWithMiddlewareNoOpts();
    });
    it('should serve es5 version if Edge 13', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/13.0')
        .expect(200, 'es5-todos', done);
    });
    it('should serve es2015 version if Edge 14', function (done) {
      request(server)
        .get('/todo.txt')
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36 Edge/14.14332')
        .expect(200, 'es2015-todos', done);
    });
  });
});

function createServerWithMiddleware (dir, opts, fn) {
  dir = dir || fixtures;

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
  dir = dir || fixtures;

  let _serve = serveStatic(dir, opts, [differentialServeMiddleware()]);

  return http.createServer(function (req, res) {
    fn && fn(req, res);
    _serve(req, res, function (err) {
      res.statusCode = err ? (err.status || 500) : 404;
      res.end(err ? err.stack : 'sorry!');
    });
  });
}