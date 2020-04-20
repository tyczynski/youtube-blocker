import { Storage } from '@src/shared/types';
import { browser } from 'webextension-polyfill-ts';

/**
 * Set the data in the browser.storage.local
 */
const importData = async (data: Storage): Promise<void> => {
  try {
    await browser.storage.local.set({
      channels: data.channels,
      theme: data.theme,
      quickblock: data.quickblock,
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default importData;
