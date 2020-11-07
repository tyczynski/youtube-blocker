import { ExportedData } from '@src/shared/types'
import { isJSON } from '@src/shared/validator'
import { importData } from '@popup/store'
import { readFile, filterData } from './utils'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.js-form') as HTMLFormElement
  const input = document.querySelector('.js-file') as HTMLInputElement

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const file = input.files[0]

    if (file instanceof File) {
      try {
        const data = await readFile(file)

        if (isJSON(data)) {
          const parsed = JSON.parse(data) as ExportedData
          const filtered = filterData(parsed)
          await importData(filtered)
        }
      } catch (error) {
        // do nothing
      } finally {
        form.reset()
      }
    }
  })
})
