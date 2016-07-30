"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = exports.map = function (fn) {
  return function (array) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
      results.push(fn(array[i]));
    }
    return results;
  };
};

var reduce = exports.reduce = function (fn) {
  return function (initial) {
    return function (array) {
      var result = initial;
      for (var i = 0; i < array.length; i++) {
        result = fn(result, array[i]);
      }
      return result;
    };
  };
};

var take = exports.take = function (n) {
  return function (iterable) {
    var i = 0,
        item = void 0,
        results = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(iterable), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        item = _step.value;

        if (i++ === n) {
          break;
        }
        results.push(item);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return results;
  };
};

var drop = exports.drop = function (n) {
  return function (array) {
    if (n >= array.length) {
      return [];
    } else if (n < 0) {
      return array;
    }

    if (array instanceof Array) {
      return array.slice(n);
    }

    return _regenerator2.default.mark(function _callee() {
      var i;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              for (i = 0; i < n; i++) {
                array.next();
              }
              return _context.delegateYield(array, "t0", 2);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })();
  };
};

var array = exports.array = function (iterable) {
  return [].concat((0, _toConsumableArray3.default)(iterable));
};

var compose = exports.compose = function (f, g) {
  return function (x) {
    return g(f(x));
  };
};

var identity = exports.identity = function (x) {
  return x;
};

// private functions

var max2 = function max2(a, b) {
  return a > b ? a : b;
};
var min2 = function min2(a, b) {
  return a < b ? a : b;
};