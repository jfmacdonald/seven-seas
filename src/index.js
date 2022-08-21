import { createTreasure, getLoot } from "./treasure-service";
import { showLoot } from "./dom";

createTreasure();
showLoot(getLoot());
