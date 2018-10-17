const serverHost = "http://10.7.30.109:4545";
const serverRoot = "http://10.7.30.109:4546";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button"),
    text = document.getElementById("insert"),
    textArea = document.getElementById("textarea");

  button.addEventListener("click", () => {
    let form = { command: text.value };
    let resp = null;
    execute(form);
  });

  const graphicButton = document.getElementById("sendGraphic"),
    graphicText = document.getElementById("insertGraphic");

  graphicButton.addEventListener("click", () => {
    let form = { command: `DISPLAY=:0.0 ${graphicText.value}` };
    let resp = null;

    execute(form);
  });

  const rootButton = document.getElementById("sendRoot"),
    rootText = document.getElementById("insertRoot");

  rootButton.addEventListener("click", () => {
    let form = { command: `${rootText.value}` };
    execute(form, serverRoot);
  });

  function execute(body, server) {
    let opts = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {},
    };
  
    return fetch( server || serverHost, opts)
      .then(response => {
        return response.text();
      })
      .then(body => {
        textArea.value = body;
      })
      .catch(e => {
        console.log(e);
      });
  }

});


