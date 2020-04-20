import { PossibleExportedData, Theme, Channel } from '@src/shared/types';
import { modes, themes, defaultTheme } from '@src/shared/data';
import { hop } from '@src/shared/utils';
import { isString } from '@src/shared/validator';

/**
 * Check if the data is proper Channel
 *
 * @props {Channel[]}
 * @returns {Chennel[]} filtered array
 */
const checkChannels = (channels: Channel[]) => {
  return channels.filter(
    channel =>
      isString(channel.value) &&
      modes.includes(channel.mode) &&
      channel.modifiers.constructor === Object,
  );
};

/**
 * Format passed object to the correct Channel
 *
 * @param {Channel} channel
 * @returns {Channel}
 */
const formatChannel = (channel: Channel): Channel => ({
  value: channel.value,
  mode: channel.mode,
  modifiers: {
    caseInsensitive: Boolean(channel.modifiers.caseInsensitive),
    global: Boolean(channel.modifiers.global),
  },
});

/**
 * Filter invalid Channel objects
 *
 * @param {PossibleExportedData} data
 * @returns {Channel[]}
 */
export const filterChannels = (data: PossibleExportedData): Channel[] => {
  return hop(data, 'channels') && Array.isArray(data.channels)
    ? checkChannels(data.channels).map(channel => formatChannel(channel))
    : [];
};

/**
 * Filter invalid Theme string
 *
 * @param {PossibleExportedData} data
 * @returns {Theme}
 */
export const filterTheme = (data: PossibleExportedData): Theme => {
  return hop(data, 'theme') && themes.includes(data.theme as Theme)
    ? (data.theme as Theme)
    : defaultTheme;
};
