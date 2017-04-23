const uaParser = require('ua-parser');
const debug = require('debug')('differential-serve');

const edgeUAParse = /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)(\d+)/;

/** 
 * Parse a user-agent and return the base-directory 
 * @param ua - the user agent header to parse
 * @param es2015dir - the directory name/path for es2015 code (from base path)
 * @param es5dir - the directory name/path for es5 code (from base path)
 * @private 
 */
function parseUA(ua, es2015dir, es5dir) {
  let edgeUA = ua.match(edgeUAParse);
  if (edgeUA) {
    edgeUA = edgeUA[0].split('/');
  }
  let uaParsed = uaParser.parseUA(ua);
  let osParsed = uaParser.parseOS(ua);
  const browser = uaParsed.family;
  const majorVersion = uaParsed.major;
  const supportsES2015 = (edgeUA && parseInt(edgeUA[1]) >= 14) ||
    (!edgeUA && ((browser === 'Chrome' && majorVersion >= 49) ||
    (browser === 'Chrome Mobile' && majorVersion >= 49) ||
    (browser === 'Safari' && majorVersion >= 10) ||
    (browser === 'Mobile Safari' && majorVersion >= 10) ||
    (browser === 'Edge' && majorVersion >= 14) ||
    (osParsed.family === 'iOS' && osParsed.major >= 10) ||
    (browser === 'Firefox' && majorVersion >= 51)));
  if (edgeUA) {
    debug("E:" + edgeUA[0] + " V:" + parseInt(edgeUA[1]));
  }
  debug("O:" + osParsed.family + " V:" +osParsed.major);
  debug("B:" + browser + " M:" +majorVersion);
  return supportsES2015 ? '/' + es2015dir : '/' + es5dir;
}

/** 
 * Construct a user-agent parsing  middleware given two strings
 * @param es2015dir - the directory name/path for es2015 code (from base path)
 * @param es5dir - the directory name/path for es5 code (from base path)
 */
module.exports = function (es2015dir = 'es2015', es5dir = 'es5') {
  return function (request, response, next, options) {
    options.root = options.root + parseUA(request.headers['user-agent'], es2015dir, es5dir);
  }
};