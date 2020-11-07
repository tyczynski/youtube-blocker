import { isString, isJSON } from '../validator'

describe('`isString` tests', () => {
  test('Pass string', () => {
    expect(isString('Hello World')).toBeTruthy()
  })

  test('Pass number', () => {
    expect(isString(1970)).toBeFalsy()
  })

  test('Pass array', () => {
    expect(isString([])).toBeFalsy()
  })

  test('Pass object', () => {
    expect(isString({})).toBeFalsy()
  })

  test('Pass symbol', () => {
    expect(isString(Symbol('Hello World'))).toBeFalsy()
  })

  test('Pass function', () => {
    expect(isString(() => 'Hello World')).toBeFalsy()
  })

  test('Pass null', () => {
    expect(isString(null)).toBeFalsy()
  })

  test('Pass undefined', () => {
    expect(isString(undefined)).toBeFalsy()
  })
})

describe('`isJSON` tests', () => {
  test('Pass JSON', () => {
    expect(isJSON('{"hello": "world"}')).toBeTruthy()
  })

  test('Pass invalid JSON', () => {
    expect(isJSON('{"hello": "world"')).toBeFalsy()
  })

  test('Pass string', () => {
    expect(isJSON('Hello World')).toBeFalsy()
  })

  test('Pass number', () => {
    expect(isJSON(1970)).toBeFalsy()
  })

  test('Pass array', () => {
    expect(isJSON([])).toBeFalsy()
  })

  test('Pass object', () => {
    expect(isJSON({})).toBeFalsy()
  })

  test('Pass symbol', () => {
    expect(isJSON(Symbol('Hello World'))).toBeFalsy()
  })

  test('Pass function', () => {
    expect(isJSON(() => 'Hello World')).toBeFalsy()
  })

  test('Pass null', () => {
    expect(isJSON(null)).toBeFalsy()
  })

  test('Pass undefined', () => {
    expect(isJSON(undefined)).toBeFalsy()
  })
})
