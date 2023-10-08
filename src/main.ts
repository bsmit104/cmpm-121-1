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

// counter
let counter = 0;

// div to display the counter
const counterText = document.createElement("div");
counterText.id = "counterText";

// Function to update and display the counter
function updateCounter() {
  counter++;
  counterText.textContent = `${counter} boops`;
}

// click event for button
button.addEventListener("click", updateCounter);

// Append the button with counter
app.append(button, counterText);

////////////////////////////////////////////////////
// INCREMENT BY SECONDS
////////////////////////////////////////////////////
// // Function to increment count every second
// function increment_every_second() {
//   counter++;
//   counterText.textContent = `${counter} boops`;
// }

// // setInterval to call increment_every_second function
// setInterval(increment_every_second, 1000);
////////////////////////////////////////////////////

// last for requestAnimationFrame
let lastTimestamp = 0; // Timestamp of the last frame

// Function to update the counter based on time elapsed from the last frame
function update_decimal_counter(timestamp: number) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  // conversion to seconds
  const secondsElapsed = (timestamp - lastTimestamp) / 1000;
  // 60 frames per second
  const decIncrease = 1 / 60;

  // Calculate the increment
  const increment = secondsElapsed * decIncrease;

  // increment counter
  counter += increment;

  // Display the counter two decimal places
  counterText.textContent = `${counter.toFixed(2)} boops`;

  lastTimestamp = timestamp;

  // Request the next animation frame
  requestAnimationFrame(update_decimal_counter);
}

// Start the animation loop
requestAnimationFrame(update_decimal_counter);
