import TreasureChest from "./TreasureChest.js";
import { saveLoot, addLoot } from "./treasure-service.js";

/**
 * Display the amount of loot in the UI
 */
export function showLoot(message) {
  // console.log("showLoot");
  let loot = document.querySelector("#loot");
  if (!loot) return;
  loot.textContent = message;
}

/**
 * Handle treasure submit events
 * @param  {Event} event The event object
 */
export function submitHandler(event) {
  // Get the coin type
  // Only run on [data-treasure] forms
  let coin = event.target.getAttribute("data-treasure");
  if (!coin) return;

  // Stop the form from reloading the page
  event.preventDefault();

  // Get coin value
  let val = parseFloat(event.target.querySelector('[type="number"]').value);
  if (!val) return;

  // Add the correct loot
  if (["gold", "silver", "bronze"].includes(coin)) addLoot({ [coin]: val });
}

export function lootHandler(event) {
  if (event.target?.detail instanceof TreasureChest) {
    saveLoot();
    showLoot(event.target.detail.getLoot());
  }
}
