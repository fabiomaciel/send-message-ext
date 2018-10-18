"use strict";

const server = {
  host: "124",
  get hostURL() {
    return `http://10.7.30.${this.host}:4545`;
  },

  get rootURL() {
    return `http://10.7.30.${this.host}:4546`;
  },
};

function setHost() {
  server.host = document.querySelector("input[name='host']:checked").value;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input[name='host']").forEach(el =>
    el.addEventListener("click", event => {
      setHost();
    }),
  );

  const button = document.getElementById("button"),
    text = document.getElementById("insert"),
    textArea = document.getElementById("textarea");

  button.addEventListener("click", () => {
    let form = { command: text.value };
    execute(text.value);
  });

  const graphicButton = document.getElementById("sendGraphic"),
    graphicText = document.getElementById("insertGraphic");

  graphicButton.addEventListener("click", () => {
    execute(`DISPLAY=:0.0 ${graphicText.value}`);
  });

  const rootButton = document.getElementById("sendRoot"),
    rootText = document.getElementById("insertRoot");

  rootButton.addEventListener("click", () => {
    execute(rootText.value, server.rootURL);
  });

  document.getElementById("desbloquear").addEventListener("click", () => {
    execute("loginctl unlock-sessions", server.rootURL);
  });

  const xvideosButton = document.getElementById("sendXvideos"),
    xvideosText = document.getElementById("xvideos");

  xvideosButton.addEventListener("click", () => {
    execute(
      `DISPLAY=:0.0 google-chrome xvideos.com/?k=${encodeURI(
        xvideosText.value,
      )}`,
    );
  });

  const chromeButton = document.getElementById("sendChrome"),
    chromeText = document.getElementById("chrome");

  chromeButton.addEventListener("click", () => {
    execute(`DISPLAY=:0.0 google-chrome ${encodeURI(chromeText.value)}`);
  });

  function execute(command, serverURL) {
    let body = { command };
    serverURL = serverURL || server.hostURL;
    let opts = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {},
    };

    console.log(
      `trying to reach host ${serverURL} with data ${JSON.stringify(opts)}`,
    );

    return fetch(serverURL, opts)
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
