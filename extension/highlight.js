console.log("Test")
var text = "";

if( document.readyState !== 'loading' ) {
  text = document.body.innerText;
  sendToApi(text)
  // console.log("x: " + text);
} else {
  document.addEventListener('DOMContentLoaded', function () {
    text = document.body.innerText;
    sendToApi(text)
    // console.log("x: " + text);
  });
}

// Send sentences to api
function sendToApi(text) {
  const content = text.split(".");
  console.log(content)
  var toSend = '{"content": "' + content + '"}'
  console.log(toSend)
  const request = new Request("http://localhost:5000/ranked", {
    method: "POST",
    body: toSend,
  });

  fetch(request).then((response) => {
    if (response.status === 200) {
      // TODO: do something with the response
      response.json();
    } else {
      throw new Error("Failed to fetch ranked sentences");
    }
  });
}


// Search for returned sentences

// Add <mark> tag to returned sentences
