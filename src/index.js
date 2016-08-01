const map = exports.map =
  fn => iterable => {
    if (isArray(iterable)) {
      let results = []
      for (let i = 0; i < iterable.length; i++) {
        results.push(fn(iterable[i]))
      }
      return results
    } else if (typeof iterable.map === 'function') {
      return iterable.map(fn)
    } else {
      return function *() {
        for (let item of iterable()) {
          yield fn(item)
        }
      }
    }
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
    if (isArray(iterable)) {
      return iterable.slice(0, n)
    }

    let i = 0, item, results = [];
    for (item of iterable()) {
      if (i++ === n) {
        break
      }
      results.push(item)
    }
    return results
  }

const drop = exports.drop =
  n => iterable => {
    if (n < 0) {
      return iterable
    }

    if (isArray(iterable)) {
      return iterable.slice(n)
    }

    return function *() {
      let iterator = iterable()
      for (let i = 0; i < n; i++) {
        iterator.next()
      }
      yield *iterator
    }
  }

const array = exports.array =
  iterable => 
    isArray(iterable) ? iterable : [...iterable()]

const compose = exports.compose =
  (f, g) => x =>
    g(f(x))

const identity = exports.identity =
  x => x

// private functions

const max2 = (a, b) => a > b ? a : b
const min2 = (a, b) => a < b ? a : b

function isArray(allegedArray) {
  return Object.prototype.toString.call(allegedArray) === '[object Array]'
}

