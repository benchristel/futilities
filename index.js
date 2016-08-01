'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = exports.map = function (fn) {
  return function (iterable) {
    if (isArray(iterable)) {
      var results = [];
      for (var i = 0; i < iterable.length; i++) {
        results.push(fn(iterable[i]));
      }
      return results;
    } else if (typeof iterable.map === 'function') {
      return iterable.map(fn);
    } else {
      return _regenerator2.default.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = (0, _getIterator3.default)(iterable());

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 12;
                  break;
                }

                item = _step.value;
                _context.next = 9;
                return fn(item);

              case 9:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 18:
                _context.prev = 18;
                _context.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 21:
                _context.prev = 21;

                if (!_didIteratorError) {
                  _context.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context.finish(21);

              case 25:
                return _context.finish(18);

              case 26:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      });
    }
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
    if (n < 0) {
      return [];
    }

    if (isArray(iterable)) {
      return iterable.slice(0, n);
    }

    var i = 0,
        item = void 0,
        results = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = (0, _getIterator3.default)(iterable()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        item = _step2.value;

        if (i++ === n) {
          break;
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

var drop = exports.drop = function (n) {
  return function (iterable) {
    if (n < 0) {
      return iterable;
    }

    if (isArray(iterable)) {
      return iterable.slice(n);
    }

    return _regenerator2.default.mark(function _callee2() {
      var iterator, i;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              iterator = iterable();

              for (i = 0; i < n; i++) {
                iterator.next();
              }
              return _context2.delegateYield(iterator, 't0', 3);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    });
  };
};

var array = exports.array = function (iterable) {
  return isArray(iterable) ? iterable : [].concat((0, _toConsumableArray3.default)(iterable()));
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

function isArray(allegedArray) {
  return Object.prototype.toString.call(allegedArray) === '[object Array]';
}