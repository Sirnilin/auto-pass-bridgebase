document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle');
    const statusDisplay = document.getElementById('status');
    let isClicking = false;
  
    chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
      isClicking = response.isClicking;
      updateUI();
    });
  
    toggleButton.addEventListener('click', () => {
      isClicking = !isClicking;
      chrome.runtime.sendMessage({ action: 'setState', isClicking: isClicking });
      updateUI();
      
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs[0]) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: toggleClicking,
            args: [isClicking]
          }, () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            }
          });
        } else {
          console.error('No active tab found');
        }
      });
    });
  
    function updateUI() {
      statusDisplay.textContent = `STATUS: ${isClicking ? 'KLIKAEM' : 'STOPAEM'}`;
      toggleButton.textContent = isClicking ? 'STOPAY' : 'STARTUY';
    }
  });
  
  function toggleClicking(isClicking) {
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
  
    if (isClicking) {
      window.clickerInterval = setInterval(() => {
        clickPassButton();
      }, 1000);
    } else {
      clearInterval(window.clickerInterval);
    }
  }
  