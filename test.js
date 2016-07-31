'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [threeThings].map(_regenerator2.default.mark);

var _require = require('ava');

var test = _require.test;

var _require2 = require('./index.js');

var map = _require2.map;
var reduce = _require2.reduce;
var take = _require2.take;
var drop = _require2.drop;
var compose = _require2.compose;
var identity = _require2.identity;
var array = _require2.array;


var addOne = function addOne(n) {
  return n + 1;
};

var add = function add(a, b) {
  return a + b;
};

var naturalNumbers = _regenerator2.default.mark(function naturalNumbers() {
  var n;
  return _regenerator2.default.wrap(function naturalNumbers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          n = 1;

        case 1:
          if (!1) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return n++;

        case 4:
          _context.next = 1;
          break;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, naturalNumbers, this);
});

test(function testMap(t) {
  t.deepEqual(map(addOne)([1, 2, 3]), [2, 3, 4]);
});

test(function testMapWithGenerator(t) {
  var squaresOf = map(function (x) {
    return x * x;
  });

  t.deepEqual(take(3)(squaresOf(naturalNumbers)), [1, 4, 9]);
});

test(function testMapWithFiniteGenerator(t) {
  var squaresOf = map(function (x) {
    return x * x;
  });

  t.deepEqual(array(squaresOf(threeThings)), [1, 4, 9]);
});

test(function testReduceEmpty(t) {
  var sum = reduce(add)(0);
  t.is(sum([]), 0);
});

test(function testReduce(t) {
  var sum = reduce(add)(0);
  t.is(sum([1, 2, 3]), 6);
});

test(function testReduceInitialState(t) {
  var sum = reduce(add)(10);
  t.is(sum([1, 2, 3]), 16);
});

test(function testTake(t) {
  t.deepEqual(take(2)([1, 2, 3]), [1, 2]);
});

test(function testTakeWhenNIsGreaterThanArrayLength(t) {
  t.deepEqual(take(3)([1, 2]), [1, 2]);
});

test(function testTakeCalledWithGenerator(t) {
  t.deepEqual(take(3)(naturalNumbers), [1, 2, 3]);
});

test(function testDrop(t) {
  t.deepEqual(drop(2)([1, 2, 3, 4, 5]), [3, 4, 5]);
  t.deepEqual(drop(1)([1, 2, 3, 4, 5]), [2, 3, 4, 5]);
});

test(function testDropWhenNIsEqualToArrayLength(t) {
  t.deepEqual(drop(2)([1, 2]), []);
});

test(function testDropWhenNIsGreaterThanArrayLength(t) {
  t.deepEqual(drop(3)([1, 2]), []);
});

test(function testDropWhenNIsZero(t) {
  t.deepEqual(drop(0)([1, 2]), [1, 2]);
});

test(function testDropWhenNIsNegative(t) {
  t.deepEqual(drop(-1)([1, 2]), [1, 2]);
});

test(function testDropCalledWithGenerator(t) {
  t.deepEqual(take(3)(drop(2)(naturalNumbers)), [3, 4, 5]);
});

function threeThings() {
  return _regenerator2.default.wrap(function threeThings$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return 1;

        case 2:
          _context2.next = 4;
          return 2;

        case 4:
          _context2.next = 6;
          return 3;

        case 6:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[0], this);
}

test(function testDropWithGeneratorWhenNIsEqualToNumberOfItems(t) {
  t.deepEqual(array(drop(3)(threeThings)), []);
});

test(function testDropWithGeneratorWhenNIsGreaterThanNumberOfItems(t) {
  t.deepEqual(array(drop(4)(threeThings)), []);
});

test(function testArray(t) {
  t.deepEqual(array([1, 2]), [1, 2]);
});

test(function testArray(t) {
  t.deepEqual(array(threeThings), [1, 2, 3]);
});

// TODO:
// dropWhile
// takeWhile
// dropUntil
// takeUntil
// not(predicate)
// both(predicate, predicate)
// either(predicate, predicate)
// neither(predicate, predicate)
// all(predicate)(iter)
// any(predicate)(iter)
// none(predicate)(iter)
// compose
// intersperse
// intercalate (doesn't flatten result)
// join (_does_ flatten result, like Haskell's intercalate)
// cat2(iterable, iterable)
// cat(iterables)
// zip(binaryFunc)(iter1)(iter2)
// repeat(iter): infinite iterator
// always(constant): infinite iterator
// filter
// transpose
// replicate(n)(list)


var applyCoupon = function applyCoupon(price) {
  return price - 5;
};
var addTax = function addTax(price) {
  return price * 1.1;
};
var addTip = function addTip(price) {
  return price + 3;
};

test(function testCompose(t) {
  var finalPrice = compose(addTax, addTip);
  t.is(finalPrice(10), 14);
});

test(function pipelineExample(t) {
  var pipeline = reduce(compose)(identity);
  var finalPrice = pipeline([applyCoupon, addTax, addTip]);
  t.is(finalPrice(10), 8.5);
});

test(function usingAnIteratorTwice(t) {
  var squares = map(function (x) {
    return x * x;
  })(naturalNumbers);

  t.deepEqual(take(3)(squares), [1, 4, 9]);
  t.deepEqual(take(3)(squares), [1, 4, 9]);
});