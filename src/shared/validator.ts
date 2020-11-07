/**
 * Check if the argument passed is a string
 *
 * @param {string} value
 * @returns {boolean}
 */
export const isString = (value: any): boolean => typeof value === 'string'

/**
 * Check if the argument passed is a JSON
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isJSON = (value: any): boolean => {
  if (isString(value)) {
    try {
      const obj = JSON.parse(value)
      return !!obj && typeof obj === 'object'
    } catch (e) {
      /* do nothing */
    }
  }

  return false
}
