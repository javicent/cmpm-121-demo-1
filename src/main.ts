import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName: string = "JSTN's game";
document.title = gameName;

const header: HTMLHeadingElement = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

const counterDisplay: HTMLDivElement = document.createElement("div");
counterDisplay.innerHTML = `${counter} ${getUnitLabel()}`;
app.append(counterDisplay);

function getUnitLabel(): string {
  return "Recruited Monkeys";
}

let lastTimestamp: number = 0;

const button: HTMLButtonElement = document.createElement("button");
app.append(button);
button.innerHTML = "🦍";

button.addEventListener("click", () => {
  counter++;
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${getUnitLabel()}`;
});

requestAnimationFrame(updateCounter);

let totalGrowthRate: number = 0;

const itemCounts: Record<string, number> = {};

const growthRateDisplay: HTMLDivElement = document.createElement("div");
app.append(growthRateDisplay);

const itemCountsDisplay: HTMLDivElement = document.createElement("div");
app.append(itemCountsDisplay);

function updateCounter(timestamp: number) {
  const timeElapsed = timestamp - lastTimestamp;

  // Calculate the total growth rate based on items purchased
  const totalGrowthRate = calculateTotalGrowthRate();

  // Calculate the fractional increase based on the total growth rate
  const fractionalIncrease = (timeElapsed / 1000) * totalGrowthRate;
  counter += fractionalIncrease;

  // Update the counter display
  counterDisplay.innerHTML = `${counter.toFixed(2)} ${getUnitLabel()}`;

  // Update the growth rate display
  growthRateDisplay.innerHTML = `${totalGrowthRate.toFixed(1)} ${getUnitLabel()}/sec`;

  // Update the item counts display
  itemCountsDisplay.innerHTML = generateItemCountsDisplay();

  lastTimestamp = timestamp;
  requestAnimationFrame(updateCounter);
}

// Define the available items
interface Item {
  name: string;
  cost: number;
  rate: number;
  costMultiplier: number; // Add costMultiplier property
}

const availableItems: Item[] = [
  { name: "Private Gorilla", cost: 10, rate: 0.1, costMultiplier: 1.15 },
  { name: "Lieutenant Macaque", cost: 100, rate: 2.0, costMultiplier: 1.15 },
  { name: "Captain Dryomomys", cost: 1000, rate: 50.0, costMultiplier: 1.15 },
];

function calculateTotalGrowthRate(): number {
  let totalRate = 0;
  for (const item in itemCounts) {
    const selectedItem = availableItems.find((i) => i.name === item);
    if (selectedItem) {
      totalRate += itemCounts[item] * selectedItem.rate;
    }
  }
  return totalRate;
}

function purchaseUpgrade(itemName: string) {
  const selectedItem = availableItems.find((item) => item.name === itemName);

  if (selectedItem && counter >= selectedItem.cost) {
    counter -= selectedItem.cost;
    totalGrowthRate += selectedItem.rate;
    if (itemCounts[itemName] === undefined) {
      itemCounts[itemName] = 1;
    } else {
      itemCounts[itemName]++;
    }
    selectedItem.cost *= selectedItem.costMultiplier;
  }
}

function generateItemCountsDisplay(): string {
  let displayText = "Items Purchased: ";
  for (const item of availableItems) {
    const itemCount = itemCounts[item.name] || 0;
    displayText += `${item.name}(${itemCount}), `;
  }
  return displayText.slice(0, -2);
}

// Buttons to purchase upgrades
for (const item of availableItems) {
  const button: HTMLButtonElement = document.createElement("button");
  const cost = item.cost.toFixed(2);
  button.innerHTML = `Level Up ${item.name} (${cost} units, ${item.rate.toFixed(2)} ${getUnitLabel()}/sec)`;
  app.append(button);
  button.addEventListener("click", () => {
    purchaseUpgrade(item.name);
    button.innerHTML = `Level Up ${item.name} (${item.cost.toFixed(2)} units, ${item.rate.toFixed(2)} ${getUnitLabel()}/sec)`;
  });
}
