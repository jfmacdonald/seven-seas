import TreasureChest from "./TreasureChest.js";

// singleton treasure
let treasure = null;
const localStorageKey = "ss-treasure";

/**
 * Create new treasure instance
 * @return {Constructor} A new TreasureChest instance
 */
function createTreasure() {
  // console.log("createTreasure");
  // Get any saved loot from localStorage
  const savedLoot = JSON.parse(localStorage.getItem(localStorageKey));

  // Create new Treasure Chest instance
  if (!treasure) treasure = new TreasureChest(savedLoot);
  return treasure;
}

/**
 * Save loot to localStorage
 * @param  {object} { gold, silver, bronze}
 */
function saveLoot() {
  // Create the treasure object

  if (treasure) {
    const gold = treasure.getGold();
    const silver = treasure.getSilver();
    const bronze = treasure.getBronze();
    // Save it to localStorage
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        gold,
        silver,
        bronze,
      })
    );
  }
}

/**
 * Add loot to treasure
 * @param {object} { gold, silver, bronze}
 */
function addLoot({ gold, silver, bronze }) {
  if (treasure && Number(gold) > 0) treasure.addGold(Number(gold));
  if (treasure && Number(silver) > 0) treasure.addSilver(Number(silver));
  if (treasure && Number(bronze) > 0) treasure.addBronze(Number(bronze));
}

/**
 * get loot report
 */
function getLoot() {
  return treasure ? treasure.getLoot() : "No loot!";
}

export { createTreasure, saveLoot, addLoot, getLoot };
