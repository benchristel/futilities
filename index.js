"use strict";

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
  return function (array) {
    var i = 0,
        item = void 0,
        results = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(array), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

    return array.slice(n);

    var i = 0,
        item = void 0,
        results = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(array), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        item = _step2.value;

        if (i++ < n) {
          continue;
        }
        results.push(item);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return results;
  };
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