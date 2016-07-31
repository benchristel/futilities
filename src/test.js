const {test} = require('ava')
const {
  map,
  reduce,
  take,
  drop,
  compose,
  identity,
  array
} = require('./index.js')

const addOne = n => n + 1

const add = (a, b) => a + b

const naturalNumbers = function *() {
  let n = 1
  while (1) yield n++
}

test(function testMap(t) {
  t.deepEqual(map(addOne)([1, 2, 3]), [2, 3, 4])
})

test(function testMapWithGenerator(t) {
  let squaresOf = map(x => x * x)

  t.deepEqual(take(3)(squaresOf(naturalNumbers)), [1, 4, 9])
})

test(function testMapWithFiniteGenerator(t) {
  let squaresOf = map(x => x * x)

  t.deepEqual(array(squaresOf(threeThings)), [1, 4, 9])
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

test(function testTakeCalledWithGenerator(t) {
  t.deepEqual(take(3)(naturalNumbers), [1, 2, 3])
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

test(function testDropCalledWithGenerator(t) {
  t.deepEqual(take(3)(drop(2)(naturalNumbers)), [3, 4, 5])
})

function *threeThings() {
  yield 1
  yield 2
  yield 3
}

test(function testDropWithGeneratorWhenNIsEqualToNumberOfItems(t) {
  t.deepEqual(array(drop(3)(threeThings)), [])
})

test(function testDropWithGeneratorWhenNIsGreaterThanNumberOfItems(t) {
  t.deepEqual(array(drop(4)(threeThings)), [])
})

test(function testArray(t) {
  t.deepEqual(array([1,2]), [1, 2])
})

test(function testArray(t) {
  t.deepEqual(array(threeThings), [1, 2, 3])
})

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

test(function usingAnIteratorTwice(t) {
  let squares = map(x => x * x)(naturalNumbers)

  t.deepEqual(take(3)(squares), [1, 4, 9])
  t.deepEqual(take(3)(squares), [1, 4, 9])
})

