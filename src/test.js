const {test} = require('ava')
const {
  map,
  reduce,
  take,
  drop,
  compose,
  identity
} = require('./index.js')

const addOne = n => n + 1

const add = (a, b) => a + b

test(function testMap(t) {
  t.deepEqual(map(addOne)([1, 2, 3]), [2, 3, 4])
})

test(function testReduceEmpty(t) {
  let sum = reduce(add)(0)
  t.is(sum([]), 0)
})

test(function testReduce(t) {
  let sum = reduce(add)(0)
  t.is(sum([1, 2, 3]), 6)
})

test(function testReduceInitialState(t) {
  let sum = reduce(add)(10)
  t.is(sum([1, 2, 3]), 16)
})

test(function testTake(t) {
  t.deepEqual(take(2)([1, 2, 3]), [1, 2])
})

test(function testTakeWhenNIsGreaterThanArrayLength(t) {
  t.deepEqual(take(3)([1, 2]), [1, 2])
})

test(function testDrop(t) {
  t.deepEqual(drop(2)([1, 2, 3, 4, 5]), [3, 4, 5])
  t.deepEqual(drop(1)([1, 2, 3, 4, 5]), [2, 3, 4, 5])
})

test(function testDropWhenNIsEqualToArrayLength(t) {
  t.deepEqual(drop(2)([1, 2]), [])
})

test(function testDropWhenNIsGreaterThanArrayLength(t) {
  t.deepEqual(drop(3)([1, 2]), [])
})

test(function testDropWhenNIsZero(t) {
  t.deepEqual(drop(0)([1, 2]), [1, 2])
})

test(function testDropWhenNIsNegative(t) {
  t.deepEqual(drop(-1)([1, 2]), [1, 2])
})

let applyCoupon = price => price - 5
let addTax = price => price * 1.1
let addTip = price => price + 3

test(function testCompose(t) {
  let finalPrice = compose(addTax, addTip)
  t.is(finalPrice(10), 14)
})

test(function pipelineExample(t) {
  let pipeline = reduce(compose)(identity)
  let finalPrice = pipeline([applyCoupon, addTax, addTip])
  t.is(finalPrice(10), 8.5)
})
