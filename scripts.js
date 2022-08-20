import RollDice from "./js/RollDice.js";
import { createTreasure, showLoot, lootListeners } from "./js/treasure.js";

//
// Inits & Event Listeners
//

if ("customElements" in window && !customElements.get("roll-dice")) {
  customElements.define("roll-dice", RollDice);
}

createTreasure();
showLoot();
lootListeners();
