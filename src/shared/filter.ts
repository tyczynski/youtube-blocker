import { PossibleExportedData, Theme, Channel } from '@src/shared/types'
import { modes, themes, defaultTheme } from '@src/shared/data'
import { hop } from '@src/shared/utils'
import { isString } from '@src/shared/validator'

/**
 * Check if the data is proper Channel
 */
const checkChannels = (channels: Channel[]) => {
  return channels.filter(
    (channel) =>
      isString(channel.value) &&
      modes.includes(channel.mode) &&
      channel.modifiers.constructor === Object
  )
}

/**
 * Format passed object to the correct Channel
 */
const formatChannel = (channel: Channel): Channel => ({
  value: channel.value,
  mode: channel.mode,
  modifiers: {
    caseInsensitive: Boolean(channel.modifiers.caseInsensitive),
    global: Boolean(channel.modifiers.global),
  },
})

/**
 * Filter invalid Channel objects
 */
export const filterChannels = (data: PossibleExportedData): Channel[] => {
  return hop(data.storage, 'channels') && Array.isArray(data.storage.channels)
    ? checkChannels(data.storage.channels).map((channel) =>
        formatChannel(channel)
      )
    : []
}

/**
 * Filter invalid Theme string
 */
export const filterTheme = (data: PossibleExportedData): Theme => {
  return hop(data.storage, 'theme') &&
    themes.includes(data.storage.theme as Theme)
    ? (data.storage.theme as Theme)
    : defaultTheme
}
