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

/* Not needed anymore
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
*/

// Step 6
let totalGrowthRate: number = 0;

let itemCounts: Record<string, number> = {
    A: 0,
    B: 0,
    C: 0,
};

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
    itemCountsDisplay.innerHTML = `Items Purchased: A(${itemCounts.A}), B(${itemCounts.B}), C(${itemCounts.C})`;
  
    lastTimestamp = timestamp;
    requestAnimationFrame(updateCounter);
}

const upgradeItems: Record<string, { cost: number; growthRate: number; costMultiplier: number}> = {
    A: { cost: 10, growthRate: 0.1, costMultiplier: 1.15 },
    B: { cost: 100, growthRate: 2.0, costMultiplier: 1.15 },
    C: { cost: 1000, growthRate: 50.0, costMultiplier: 1.15 },
};

  function calculateTotalGrowthRate(): number {
    let totalRate = 0;
    for (const item in itemCounts) {
      totalRate += itemCounts[item] * upgradeItems[item].growthRate;
    }
    return totalRate;
}

function purchaseUpgrade(itemName: string) {
    if (counter >= upgradeItems[itemName].cost) {
        counter -= upgradeItems[itemName].cost;
        totalGrowthRate += upgradeItems[itemName].growthRate;
        itemCounts[itemName]++;
        upgradeItems[itemName].cost *= upgradeItems[itemName].costMultiplier;
    }
}

// Step 7
for (const item in upgradeItems) {
    const button: HTMLButtonElement = document.createElement("button");
    const cost = upgradeItems[item].cost.toFixed(2);
    button.innerHTML = `Purchase ${item} (${cost} units, ${upgradeItems[item].growthRate.toFixed(2)} ${getUnitLabel()}/sec)`;
    app.append(button);
    button.addEventListener("click", () => {
      purchaseUpgrade(item);
      button.innerHTML = `Purchase ${item} (${upgradeItems[item].cost.toFixed(2)} units, ${upgradeItems[item].growthRate.toFixed(2)} ${getUnitLabel()}/sec)`;
    });
}