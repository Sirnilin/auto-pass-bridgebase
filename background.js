let isClicking = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getState') {
    sendResponse({ isClicking: isClicking });
  } else if (message.action === 'setState') {
    isClicking = message.isClicking;
    sendResponse({ success: true });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  isClicking = false;
  console.log('Auto Clicker extension installed');
});
