// Collect all <p> tags

// Strip <p> tag from sentences

// Send sentences to api
const content = [""];
const request = new Request("http://localhost:5000/ranked", {
  method: "POST",
  body: '{"content": "' + content + '"}',
});

fetch(request).then((response) => {
  if (response.status === 200) {
    // TODO: do something with the response
    response.json();
  } else {
    throw new Error("Failed to fetch ranked sentences");
  }
});

// Search for returned sentences

// Add <mark> tag to returned sentences
