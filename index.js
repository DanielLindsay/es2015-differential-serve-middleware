const uaParser = require('ua-parser');

/** 
 * Parse a user-agent and return the base-directory 
 * @param ua - the user agent header to parse
 * @param es2015dir - the directory name/path for es2015 code (from base path)
 * @param es5dir - the directory name/path for es5 code (from base path)
 * @private 
 */
function parseUA(ua, es2015dir, es5dir) {
  let uaParsed = uaParser.parseUA(ua);
  const browser = uaParsed.family;
  const majorVersion = uaParsed.major;
  const supportsES2015 = (browser === 'Chrome' && majorVersion >= 49) ||
    (browser === 'Safari' && majorVersion >= 10) ||
    (browser === 'Edge' && majorVersion >= 14) ||
    (browser === 'Firefox' && majorVersion >= 51);
  return supportsES2015 ? '/' + es2015dir : '/' + es5dir;
}

/** 
 * Construct a user-agent parsing  middleware given two strings
 * @param es2015dir - the directory name/path for es2015 code (from base path)
 * @param es5dir - the directory name/path for es5 code (from base path)
 */
module.exports = function (es2015dir = 'es2015', es5dir = 'es5') {
  return function (request, response, next, options) {
    options.root = options.root + parseUA(req.headers['user-agent'], es2015dir, es5dir);
  }
};