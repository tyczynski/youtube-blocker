import dayjs from 'dayjs';
import { browser } from 'webextension-polyfill-ts';
import { EXTENSION_VERSION } from '@src/shared/constants';
import { PossibleExportedData, Storage } from '@src/shared/types';
import { filterChannels, filterTheme } from '@src/shared/filter';

/**
 * Prepare data from storage to export
 */
const prepareData = (data: PossibleExportedData): string => {
  return encodeURIComponent(
    JSON.stringify({
      version: data.version,
      storage: {
        channels: filterChannels(data),
        theme: filterTheme(data),
        quickblock: Boolean(data.storage.quickblock),
      },
    }),
  );
};

/**
 * Create JSON file with data to download
 */
const exportData = async () => {
  try {
    const storage = await browser.storage.local.get(['channels', 'theme', 'quickblock']);
    const data = {
      version: EXTENSION_VERSION,
      storage: storage,
    };

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
