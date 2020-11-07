/**
 * Read file with imported data
 *
 * @param {File} file
 * @returns {string}
 */
import { isString } from '@src/shared/validator'

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (isString(reader.result)) {
        resolve(reader.result as string)
      }

      resolve('')
    }

    reader.onerror = reject

    reader.readAsText(file)
  })
}

export default readFile
