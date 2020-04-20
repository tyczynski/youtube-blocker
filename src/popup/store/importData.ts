import { ExportedData } from '@src/shared/types';
import { browser } from 'webextension-polyfill-ts';

/**
 * Set the data in the browser.storage.local
 *
 * @param {ExportedData} data
 * @returns {Promise<void>}
 */
const importData = async (data: ExportedData): Promise<void> => {
  try {
    await browser.storage.local.set({ channels: data.channels, theme: data.theme });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default importData;
