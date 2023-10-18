import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "JSTN's game";
document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1
const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🦍";
app.append(button);

// Step 2
let counter: number = 0;

const counterDisplay: HTMLDivElement = document.createElement("div");
counterDisplay.innerHTML = `${counter} ${getUnitLabel()}`;
app.append(counterDisplay);

function getUnitLabel(): string {
  return "Recruited Monkeys";
}

// Step 3
// button.addEventListener("click", updateCounter);

setInterval(() => {
  counter++;
  counterDisplay.innerHTML = `${counter} ${getUnitLabel()}`;
}, 1000);

// Step 4
let lastTimestamp: number = 0;

function updateCounter(timestamp: number) {
  // Calculate the time elapsed since the last frame
  const timeElapsed = timestamp - lastTimestamp;

  // Calculate the fractional amount to increase the counter
  const fractionalIncrease = (timeElapsed / 1000) * (1 / 60);

  // Update the counter
  counter += fractionalIncrease;

  // Update the display
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${getUnitLabel()}`;

  lastTimestamp = timestamp;

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

button.addEventListener("click", () => {
    counter++;
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${getUnitLabel()}`;
});

requestAnimationFrame(updateCounter);