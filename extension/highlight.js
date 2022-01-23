var text = "";
if( document.readyState !== 'loading' ) {
  text = document.body.innerText;

  text = text.replace(/[^0-9a-zA-Z .,?!]/gi, '')
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
            console.log("1")
            for (const sentence of json["sentences"]) {
              // var elements = document.getElementsByTagName('p')
              // var elements = document.body.innerText.split(".")
              // // console.log(elements)
              var instance = new Mark(document.body)
              // // instance.mark("help")
              // for (var i = 0; i < elements.length; i++) {
              //     console.log("Sentence: " + sentence)
              //     console.log("element: " + elements[i])
              //     var element = elements[i]
              //     var comparisonElement = elements[i].replace(/[^0-9a-zA-Z .]/gi, '')
              //     if (comparisonElement.indexOf(sentence) !== -1) {
              //         console.log('Match');
              //         console.log("element: " + elements[i])
              //         instance.mark(element, {"separateWordSearch" : false})
              //         // console.log(document.body.innerHTML)
              //         // document.body.innerHTML = document.body.innerHTML.split(element).join("BLSH")
              //         // "<mark>" + element + "</mark>"
              //         // console.log(document.body.innerHTML)
              //         break;
              //     }
              // }
              var element = document.body.innerText
              // while(rng.findText(sentence))
              var comparisonElement = element.replace(/[^0-9a-zA-Z .,?!]/gi, '')
              // if (document.body.textContent.indexOf(sentence) !== -1) {
              //   instance.markRanges([{
              //         start: document.body.textContent.indexOf(sentence),
              //         length: sentence.length + 1
              //       }])
              // }
              if (comparisonElement.indexOf(sentence) !== -1) {
                var str = comparisonElement.substring(comparisonElement.indexOf(sentence), comparisonElement.indexOf(sentence) + sentence.length + 1)
                instance.markRanges([{
                  start: comparisonElement.indexOf(sentence),
                  length: sentence.length + 1
                }])
                console.log(str)
              }
            }
          });
      } else {
        throw new Error("Failed to fetch ranked sentences")
      }
    });
  
} else {
  document.addEventListener('DOMContentLoaded', async function () {
    console.log("2")
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
