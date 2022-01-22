var text = "";

if( document.readyState !== 'loading' ) {
  text = document.body.innerText;
  sendToApi(text)
} else {
  document.addEventListener('DOMContentLoaded', async function () {
    text = document.body.innerText;
    sendToApi(text)
  });
}

// Send sentences to api
function sendToApi(text) {
  text = text.replace(/[^0-9a-zA-Z .]/gi, '')
  const request = new Request("http://localhost:5000/ranked", {
    headers: {'Content-Type': 'application/json'},
    method: "POST",
    body: '{"content": "' + text + '"}',
  });

  fetch(request)
    .then((response) => {
      if (response.status === 200) {
        response.json()
          .then((data) => {
            console.log(data)
          });
      } else {
        throw new Error("Failed to fetch ranked sentences")
      }
    });
}

// Search for returned sentences

// Add <mark> tag to returned sentences
