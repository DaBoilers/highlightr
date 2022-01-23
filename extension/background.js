let color = '#f2ff00';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %c', `color: ${color}`);
});
