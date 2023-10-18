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

button.addEventListener("click", () => {
    counter++;
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${getUnitLabel()}`;
});

requestAnimationFrame(updateCounter);

// Step 5
let growthRate: number = 0;

const upgradeButton: HTMLButtonElement = document.createElement("button");
upgradeButton.innerHTML = "Deploy 10 Monkeys for upgrade";
app.append(upgradeButton);

upgradeButton.disabled = true;

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate++;
    upgradeButton.disabled = true;
  }
});

function updateCounter(timestamp: number) {
    const timeElapsed = timestamp - lastTimestamp;
    const fractionalIncrease = (timeElapsed / 1000) * (1 / 60) * (1 + growthRate);
    counter += fractionalIncrease;
    counterDisplay.innerHTML = `${counter.toFixed(2)} ${getUnitLabel()}`;
    lastTimestamp = timestamp;
  
    // Enable the upgrade button when the player has at least 10 units
    if (counter >= 10) {
      upgradeButton.disabled = false;
    }
  
    requestAnimationFrame(updateCounter);
  }
  
  requestAnimationFrame(updateCounter);