import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName =
  "If you press a broken button enough times does it do something??";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create the button element
const button = document.createElement("button");
button.className = "favorite styled ascii-art";
button.type = "button";

// Append the button element
app.append(button);