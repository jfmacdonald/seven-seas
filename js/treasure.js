(function () {
  'use strict';

  class TreasureChest {
    #bronze;
    #silver;
    #gold;
    #loot;

    /**
     * Create the constructor object
     * @param {Object} options User settings
     */
    constructor(options = {}) {
      // Merge options into defaults
      let { bronze, silver, gold, loot } = Object.assign(
        {
          bronze: 0,
          silver: 0,
          gold: 0,
          loot: `You have {{gold}} gold, {{silver}} silver, and {{bronze}} bronze.`,
        },
        options
      );

      // Set instance properties
      this.#bronze = bronze;
      this.#silver = silver;
      this.#gold = gold;
      this.#loot = loot;
    }

    /**
     * Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     * @param  {Array} array The array to shuffle
     * @return {Array}       The shuffled array
     */
    static #shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    /**
     * Emit a custom event
     * @param  {String} type   The event type
     * @param  {*}      detail Any details to pass along with the event
     */
    #emit(type, detail) {
      // Create a new event
      let event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail,
      });

      // Dispatch the event
      return document.dispatchEvent(event);
    }

    /**
     * Add bronze to the treasure chest
     * @param {Number} n The amount to add
     */
    addBronze(n) {
      this.#bronze += n;
      this.#emit("treasure:bronze", this);
      return this;
    }

    /**
     * Add silver to the treasure chest
     * @param {Number} n The amount to add
     */
    addSilver(n) {
      this.#silver += n;
      this.#emit("treasure:silver", this);
      return this;
    }

    /**
     * Add gold to the treasure chest
     * @param {Number} n The amount to add
     */
    addGold(n) {
      this.#gold += n;
      this.#emit("treasure:gold", this);
      return this;
    }

    /**
     * Get the total amount of loot as a string
     * @return {String} The total amount of loot
     */
    getLoot() {
      return this.#loot
        .replace("{{gold}}", this.#gold)
        .replace("{{silver}}", this.#silver)
        .replace("{{bronze}}", this.#bronze);
    }

    /**
     * Get the amount of bronze
     * @return {Number} The amount
     */
    getBronze() {
      return this.#bronze;
    }

    /**
     * Get the amount of silver
     * @return {Number} The amount
     */
    getSilver() {
      return this.#silver;
    }

    /**
     * Get the amount of gold
     * @return {Number} The amount
     */
    getGold() {
      return this.#gold;
    }

    /**
     * Generate random treasure
     * @return {Object} The amount and type of loot found
     */
    static random() {
      // Amount and type
      let amount = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      ];
      let type = ["bronze", "silver", "gold"];

      // Randomize the amounts
      this.#shuffle(amount);
      this.#shuffle(type);

      // Return the random loot
      return {
        amount: amount[0],
        type: type[0],
      };
    }
  }

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

  /**
   * Display the amount of loot in the UI
   */
  function showLoot(message) {
    // console.log("showLoot");
    let loot = document.querySelector("#loot");
    if (!loot) return;
    loot.textContent = message;
  }

  /**
   * Handle treasure submit events
   * @param  {Event} event The event object
   */
  function submitHandler(event) {
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

  function lootHandler(event) {
    if (event.target?.detail instanceof TreasureChest) {
      saveLoot();
      showLoot(event.target.detail.getLoot());
    }
  }

  createTreasure();
  showLoot(getLoot());

  document.addEventListener("submit", submitHandler);
  document.addEventListener("treasure:gold", lootHandler);
  document.addEventListener("treasure:silver", lootHandler);
  document.addEventListener("treasure:bronze", lootHandler);

})();
