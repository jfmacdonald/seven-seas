import RollDice from "./RollDice.js";

if ("customElements" in window && !customElements.get("roll-dice")) {
  customElements.define("roll-dice", RollDice);
}
