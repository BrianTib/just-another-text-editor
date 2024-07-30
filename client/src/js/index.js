import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
    main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
    loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}
