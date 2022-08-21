import { createTreasure, getLoot } from "./treasure-service";
import { showLoot, submitHandler, lootHandler } from "./dom";

createTreasure();
showLoot(getLoot());

document.addEventListener("submit", submitHandler);
document.addEventListener("treasure:gold", lootHandler);
document.addEventListener("treasure:silver", lootHandler);
document.addEventListener("treasure:bronze", lootHandler);
