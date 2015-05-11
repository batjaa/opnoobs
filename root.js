var path = require('path');

global.rootdir = __dirname;

// Returns a path relative to the project root, no matter what file it's called from.
global.projpath = function (relativePath) {
  return path.join(rootdir, relativePath);
}

// Requires a module in the project based on a path relative to the project root.
global.prequire = function (modulePath) {
  return require(projpath(modulePath));
}

// Set up some very common and widely used requires as globals
// global.util = require('util');
global._ = require('lodash');
// global.Q = require('q');
// global.logger = prequire('server/utils/logger');

// Require mixins
// prequire('common/underscore.fieldbook')

// Proto extensions
// prequire('common/proto/index');
