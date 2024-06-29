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
  
  clickPassButton();
  