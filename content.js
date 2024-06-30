chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'setState') {
      if (message.isClicking) {
        window.clickerInterval = setInterval(() => {
          clickPassButton();
        }, 1000);
      } else {
        clearInterval(window.clickerInterval);
      }
    }
  });
  
  function clickPassButton() {
    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
      if (button.textContent.trim() === 'Pass') {
        button.click();
        console.log('Pass button clicked!');
        return;
      }
    }
    console.log('Pass button not found!');
  }
  