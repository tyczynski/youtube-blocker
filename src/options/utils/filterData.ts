import { ExportedData, Storage } from '@src/shared/types';
import { filterChannels, filterTheme } from '@src/shared/filter';

/**
 * Filter data from imported object
 *
 * @param {ExportedData} data
 * @returns {ExportedData}
 */
const filterData = (data: ExportedData): Storage => ({
  theme: filterTheme(data),
  channels: filterChannels(data),
  quickblock: Boolean(data.storage.quickblock),
});

export default filterData;
