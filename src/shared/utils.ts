/**
 * Abbreviated call to Object.prototype.hasOwnProperty
 *
 * @param {object} object
 * @param {string} key
 * @returns {boolean}
 */
export const hop = (obj: any, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, key)
