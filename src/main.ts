import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "How many boops til the great ascii frog offers wisdom?";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// make button
const button = document.createElement("button");
button.className = "favorite styled ascii-art";
button.type = "button";

// vars
let counter = 0;
let upgradeRate = 0;
let globalUpgradeRate = 0;
let lastTimestamp = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
}

// Upgrade button interface with rates
const upgrades: Item[] = [
  { name: "Persuade harder", cost: 10, rate: 0.25 },
  { name: "Irritate", cost: 100, rate: 1 },
  { name: "Nudge forcefully", cost: 1000, rate: 5 },
];

// div to display the counter
const counterText = document.createElement("div");
counterText.id = "counterText";

// Display the counter two decimal places
counterText.textContent = `${counter.toFixed(2)} boops`;

// Function for frame counter
function Dec_Counter(timestamp: number) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  // Conversion to seconds
  const secondsElapsed = (timestamp - lastTimestamp) / 1000;
  // 60 frames per second
  const decIncrease = upgradeRate / 60; //const decIncrease = 1 / 60;

  const increment = secondsElapsed * decIncrease;
  counter += increment;

  // update counter display
  counterText.textContent = `${counter.toFixed(2)} boops`;

  lastTimestamp = timestamp;

  // Request the next animation frame
  requestAnimationFrame(Dec_Counter);
}

// Avoiding nested loop
function initializeAnimation() {
  requestAnimationFrame(Dec_Counter);
}

function updateCounter() {
  initializeAnimation();
  // Increment the counter for each click
  counter++;
  counterText.textContent = `${counter} boops`;
  changecolor();
}

button.addEventListener("click", updateCounter);

// counter button
app.append(button, counterText);

const itemButtons: HTMLButtonElement[] = []; // store references to itemUpgradeButton elements

function changecolor() {
  for (const item of upgrades) {
    const upgradeButton = itemButtons.find(
      (button) => button.dataset.itemId === item.name,
    );
    if (upgradeButton) {
      if (counter >= item.cost) {
        upgradeButton.classList.remove("disabled-tint");
        upgradeButton.classList.add("enabled-tint");
      } else {
        upgradeButton.classList.remove("enabled-tint");
        upgradeButton.classList.add("disabled-tint");
      }
    }
  }
}

function purchaseUpgrade(item: Item, upgradeButton: HTMLButtonElement) {
  if (counter >= item.cost) {
    counter -= item.cost;
    item.cost *= 2; // Double item cost
    upgradeButton.textContent = `${item.name} (${item.cost} boops)`;
    counterText.textContent = `${counter} boops`;
    upgradeRate += item.rate;
    updateGlobalRate(upgradeRate);
    changecolor();
  }
}

// add itemUpgradeButton to upgrades interface
for (const item of upgrades) {
  const upgradeButton = document.createElement("button");
  upgradeButton.className = "upgrade-button";
  upgradeButton.type = "button";
  upgradeButton.dataset.itemId = item.name; // Set data-itemid attribute
  upgradeButton.textContent = `${item.name} (${item.cost} boops)`;

  // event listener for each button
  upgradeButton.addEventListener("click", () => {
    purchaseUpgrade(item, upgradeButton);
  });

  itemButtons.push(upgradeButton); // reference to the itemUpgradeButton
  app.append(upgradeButton);
}

changecolor();

// display global update rate
const globalRateText = document.createElement("div");
globalRateText.id = "globalRateText";
app.append(globalRateText);

// Function to update the global upgrade rate
function updateGlobalUpgradeRate() {
  const globalRateText = document.getElementById("globalRateText");

  if (globalRateText) {
    globalRateText.textContent = `Convincing Rate: ${globalUpgradeRate.toFixed(
      2,
    )} persuasions/sec`;
  }
}

// function to call when updated rate
function updateGlobalRate(upgradeRate: number) {
  globalUpgradeRate = upgradeRate;
  updateGlobalUpgradeRate();
}

// start at 0
updateGlobalUpgradeRate();

// // frog inspo Joan Stark https://www.asciiart.eu/animals/frogs
// // got examples of count requesting animation frame from chatgpt to build off of
