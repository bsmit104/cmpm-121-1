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
let upgradeCost = 10;
let lastTimestamp = 0;

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
  const decIncrease = 1 / 60;

  const increment = secondsElapsed * decIncrease;
  counter += increment;

  // update counter display
  counterText.textContent = `${counter.toFixed(2)} boops`;

  lastTimestamp = timestamp;

  // Request the next animation frame
  requestAnimationFrame(Dec_Counter);
}

// avoiding nested loop
function initializeAnimation() {
  requestAnimationFrame(Dec_Counter);
}

function updateCounter() {
  //update_Color();
  if (counter >= upgradeCost - 1) {
    upgradeButton.classList.remove("disabled-tint");
    upgradeButton.classList.add("enabled-tint");
  }
  if (counter == 0) {
    initializeAnimation();
  }
  //   // Initialize the animation loop only on the first click
  //   if (counter == 0) {
  //     // Function for frame counter
  //     function Dec_Counter(timestamp: number) {
  //       if (!lastTimestamp) {
  //         lastTimestamp = timestamp;
  //       }

  //       // Conversion to seconds
  //       const secondsElapsed = (timestamp - lastTimestamp) / 1000;
  //       // 60 frames per second
  //       const decIncrease = 1 / 60;

  //       const increment = secondsElapsed * decIncrease;
  //       counter += increment;

  //       // update counter display
  //       counterText.textContent = `${counter.toFixed(2)} boops`;

  //       lastTimestamp = timestamp;

  //       // Request the next animation frame
  //       requestAnimationFrame(Dec_Counter);
  //     }

  //     // Start the animation loop
  //     requestAnimationFrame(Dec_Counter);
  //   }

  // Increment the counter for each click
  counter++;
  counterText.textContent = `${counter} boops`;
}

// click event for button
button.addEventListener("click", updateCounter);

// counter button
app.append(button, counterText);

// Upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.className = "upgrade-button";
upgradeButton.type = "button";
upgradeButton.classList.add("disabled-tint");
upgradeButton.textContent = `Persuade harder? (${upgradeCost} boops)`;

app.append(upgradeButton);

function purchaseUpgrade() {
  if (counter >= upgradeCost) {
    counter -= upgradeCost;
    upgradeButton.classList.remove("enabled-tint");
    upgradeButton.classList.add("disabled-tint");
    //counter = 0;
    upgradeCost += 10;
    upgradeButton.textContent = `Persuade harder? (${upgradeCost} boops)`;
    updateCounter();
  }
}

// Add a click event to the upgrade button
upgradeButton.addEventListener("click", purchaseUpgrade);

// frog inspo Joan Stark https://www.asciiart.eu/animals/frogs
// got examples of count requesting animation frame from chatgpt to build off of
