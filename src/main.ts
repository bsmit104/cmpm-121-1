import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName =
  "If you press a broken button enough times does it do something??";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
