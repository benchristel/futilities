'use strict';

var _require = require('ava');

var test = _require.test;

var _require2 = require('./index.js');

var map = _require2.map;
var reduce = _require2.reduce;
var take = _require2.take;
var drop = _require2.drop;
var compose = _require2.compose;
var identity = _require2.identity;


var addOne = function addOne(n) {
  return n + 1;
};

var add = function add(a, b) {
  return a + b;
};

test(function testMap(t) {
  t.deepEqual(map(addOne)([1, 2, 3]), [2, 3, 4]);
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