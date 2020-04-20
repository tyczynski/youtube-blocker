import { browser } from 'webextension-polyfill-ts';
import Content from './Content';
import { hop } from '@src/shared/utils';

const instance = new Content();

browser.storage.local.get(['channels', 'quickblock']).then(({ channels, quickblock }) => {
  const items = Array.isArray(channels) ? channels : [];
  const settings = {
    quickblock: quickblock === undefined ? true : quickblock,
  };

  instance.mount(items, settings);
});

browser.storage.onChanged.addListener(changes => {
  const channels = hop(changes, 'channels') ? changes.channels.newValue : null;
  const quickblock = hop(changes, 'quickblock') ? changes.quickblock.newValue : null;

  instance.update(channels, quickblock);
});
