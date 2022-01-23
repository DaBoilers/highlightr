let page = document.getElementById("test");
let selectedClassName = "current";
const presetButtonColors = ["#f2ff00", "#00a8db", "#ff00a2", "#ff5100"];

function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });

  setPageBackgroundColor();
}

function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;

    // Create a button for every color
    for (let buttonColor of buttonColors) {
      
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      page.appendChild(button);

      // When the button is clicked, inject handleButtonClick into current page
      button.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: handleButtonClick,
        });
      });
    }
  });
}

constructOptions(presetButtonColors);

// The body of this function will be execuetd as a content script inside the current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
