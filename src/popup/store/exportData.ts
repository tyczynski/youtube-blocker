import dayjs from 'dayjs';
import { browser } from 'webextension-polyfill-ts';
import { PossibleExportedData } from '@src/shared/types';
import { filterChannels, filterTheme } from '@src/shared/filter';

/**
 * Prepare data from storage to export
 *
 * @param {PossibleExportedData} data
 * @returns {string}
 */
const prepareData = (data: PossibleExportedData): string => {
  return encodeURIComponent(
    JSON.stringify({
      channels: filterChannels(data),
      theme: filterTheme(data),
      quickblock: Boolean(data.quickblock),
    }),
  );
};

/**
 * Create JSON file with data to download
 *
 * @returns {Promise}
 */
const exportData = async () => {
  try {
    const data = await browser.storage.local.get(['channels', 'theme', 'quickblock']);

    const config = {
      filename: `youtube_blocker_export_${dayjs().format('YYYY-MM-DD_HHmmss')}`,
      data: `data:text/json;charset=utf-8,${prepareData(data)}`,
    };

    const anchorNode = document.createElement('a');
    anchorNode.setAttribute('href', config.data);
    anchorNode.setAttribute('download', `${config.filename}.json`);

    document.body.appendChild(anchorNode); // required for firefox

    anchorNode.click();
    anchorNode.remove();

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default exportData;
