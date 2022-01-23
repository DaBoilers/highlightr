var text = "";

if( document.readyState !== 'loading' ) {
  text = document.body.innerText;

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
          .then((json) => {
            for (const sentence of json["sentences"]) {
              var elements = document.getElementsByTagName('paragraph')
              console.log(elements)
              for (var i = 0; i < elements.length; i++) {
                  console.log(sentence)
                  console.log(elements[i].innerHTML)
                  if (elements[i].innerHTML.indexOf(sentence) !== -1) {
                      alert('Match');
                      break;
                  }
              }
            }
          });
      } else {
        throw new Error("Failed to fetch ranked sentences")
      }
    });
  
} else {
  document.addEventListener('DOMContentLoaded', async function () {
    text = document.body.innerText;
    let sentences = sendToApi(text);
    for (sentence in sentences) {
      var xpath = "//a[text()='" + sentence + "']";
      console.log(xpath);
      var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      console.log(matchingElement);
      matchingElement.style.backgroundColor = "#FDFF47";
    }
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

  return fetch(request)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
          .then((sentences) => {
            return sentences
          });
      } else {
        throw new Error("Failed to fetch ranked sentences")
      }
    });
}
