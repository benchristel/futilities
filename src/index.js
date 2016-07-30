const map = exports.map =
  fn => array => {
    let results = []
    for (let i = 0; i < array.length; i++) {
      results.push(fn(array[i]))
    }
    return results
  }

const reduce = exports.reduce =
  fn => initial => array => {
    let result = initial
    for (let i = 0; i < array.length; i++) {
      result = fn(result, array[i])
    }
    return result
  }

const take = exports.take =
  n => iterable => {
    let i = 0, item, results = [];
    for (item of iterable) {
      if (i++ === n) {
        break
      }
      results.push(item)
    }
    return results
  }

const drop = exports.drop =
  n => array => {
    if (n >= array.length) {
      return []
    } else if (n < 0) {
      return array
    }

    if (array instanceof Array) {
      return array.slice(n)
    }

    return (function *() {
      for (let i = 0; i < n; i++) {
        array.next()
      }
      yield *array
    })()
  }

const array = exports.array =
  iterable => [...iterable]

const compose = exports.compose =
  (f, g) => x =>
    g(f(x))

const identity = exports.identity =
  x => x

// private functions

const max2 = (a, b) => a > b ? a : b
const min2 = (a, b) => a < b ? a : b

