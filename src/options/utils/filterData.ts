import { ExportedData } from '@src/shared/types';
import { filterChannels, filterTheme } from '@src/shared/filter';

/**
 * Filter data from imported object
 *
 * @param {ExportedData} data
 * @returns {ExportedData}
 */
const filterData = (data: ExportedData): ExportedData => ({
  theme: filterTheme(data),
  channels: filterChannels(data),
  quickblock: Boolean(data.quickblock),
});

export default filterData;
