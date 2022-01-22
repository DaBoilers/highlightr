// Initialize buttons with users's prefered color
let yellowButton = document.getElementById("yellowButton");
let blueButton = document.getElementById("blueButton");
let pinkButton = document.getElementById("pinkButton");
let orangeButton = document.getElementById("orangeButton");

const buttons = {yellowButton, blueButton, pinkButton, orangeButton};

for(let i = 0; i < 4; i++) {
  chrome.storage.sync.get("color", ({ color }) => {
    buttons[i].style.backgroundColor = color;
  });

  // When the yellowButton is clicked, inject setPageBackgroundColor into current page
  buttons[i].addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
}

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
