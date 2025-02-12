import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName =
  "How many boops til the great ascii frog wizard offers wisdom?";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// make button
const button = document.createElement("button");
button.className = "ascii-art";
button.type = "button";

// vars
let firstclick = true;
let counter = 0;
let upgradeRate = 0;
let globalUpgradeRate = 0;
let frames = performance.now();
let lastTimestamp = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;
  description: string;
}

// Upgrade button interface with rates
const upgrades: Item[] = [
  {
    name: "Persuade harder",
    cost: 10,
    rate: 0.25,
    amount: 0,
    description: "You add some more flare to your poke",
  },
  {
    name: "Irritate",
    cost: 100,
    rate: 1,
    amount: 0,
    description: "Ascii frog grumbles",
  },
  {
    name: "kiss",
    cost: 150,
    rate: 3,
    amount: 0,
    description: "hehe",
  },
  {
    name: "pet",
    cost: 200,
    rate: 2,
    amount: 0,
    description: "cold and slimy",
  },
  {
    name: "Nudge forcefully",
    cost: 1000,
    rate: 5,
    amount: 0,
    description: "The frog is immovable, a stone wall",
  },
];

// div to display the counter
const counterText = document.createElement("div");
counterText.id = "counterText";

// Display the counter two decimal places
counterText.textContent = `${counter.toFixed(2)} boops`;

// Function to increment count every second
function increment_every_second() {
  counter++;
  counterText.textContent = `${counter} boops`;
}

// Function for frame counter
function Dec_Counter(timestamp: number) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  frames = 1000 / (performance.now() - lastTimestamp);
  for (let i = 0; i < upgrades.length; i += 1) {
    if (upgrades[i].amount > 0) {
      const increment = upgradeRate / frames;
      counter += increment;
      // update counter display
      counterText.textContent = `${counter.toFixed(2)} boops`;
    }
  }
  lastTimestamp = performance.now();
  frames = 0;

  // // Request the next animation frame
  requestAnimationFrame(Dec_Counter);
}

// Avoiding nested loop
function initializeAnimation() {
  requestAnimationFrame(Dec_Counter);
}

function updateCounter() {
  if (firstclick) {
    // setInterval to call increment_every_second function
    setInterval(increment_every_second, 1000);
    firstclick = false;
  }
  initializeAnimation();
  // Increment the counter for each click
  counter++;
  counterText.textContent = `${counter} boops`;
  changecolor();
}

button.addEventListener("click", updateCounter);

// counter button
app.append(button, counterText);

// store references to itemUpgradeButton elements
const itemButtons: HTMLButtonElement[] = [];

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
    item.cost *= 1.15;
    item.amount += 1;
    upgradeButton.textContent = `${item.name} (${item.cost.toFixed(
      2,
    )} boops) (${item.amount})`;
    counterText.textContent = `${counter} boops`;
    upgradeRate += item.rate;
    updateGlobalRate(upgradeRate);
    changecolor();
    showNotification(`${item.description}`);
  }
}

// add itemUpgradeButton to upgrades interface
for (const item of upgrades) {
  const upgradeButton = document.createElement("button");
  upgradeButton.className = "upgrade-button";
  upgradeButton.type = "button";
  upgradeButton.dataset.itemId = item.name; // Set data-itemid attribute
  upgradeButton.textContent = `${item.name} (${item.cost.toFixed(2)} boops)`;

  // event listener for each button
  upgradeButton.addEventListener("click", () => {
    purchaseUpgrade(item, upgradeButton);
  });

  // reference to the itemUpgradeButton
  itemButtons.push(upgradeButton);
  app.append(upgradeButton);
}

// initialize upgrade color to red
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

// declare the upgradeNotification element
let upgradeNotification: HTMLDivElement | null = null;

// Function to show upgrade notifications
function showNotification(message: string) {
  if (!upgradeNotification) {
    upgradeNotification = document.createElement("div");
    upgradeNotification.id = "upgradeNotification";
    upgradeNotification.className = "hidden";
    document.body.appendChild(upgradeNotification);
  }

  // show the notification
  upgradeNotification.textContent = message;
  upgradeNotification.classList.remove("hidden");

  // hide the notification after 2 seconds
  setTimeout(() => {
    if (upgradeNotification) {
      upgradeNotification.classList.add("hidden");
    }
  }, 2000);
}

// // frog inspo Joan Stark https://www.asciiart.eu/animals/frogs
// // got examples of count requesting animation frame and examples of other functions from chatgpt as documentation to learn
