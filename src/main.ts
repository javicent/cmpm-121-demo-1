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

function updateCounter() {
  counter++;
  counterDisplay.innerHTML = `${counter} ${getUnitLabel()}`;
}

// Step 3
button.addEventListener("click", updateCounter);

setInterval(() => {
  counter++;
  counterDisplay.innerHTML = `${counter} ${getUnitLabel()}`;
}, 1000);