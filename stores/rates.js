import { writable, derived } from "svelte/store";
import { selectedMon } from "s/pokemon.js";
import { health, lvl, status, selectedBall } from "s/data.js";
import { ballRate, healthRate } from "l/calculator.js";
import pokeballs from "l/pokeball-data.js";

const ballRates = derived(
  [selectedMon, health, lvl, status],
  ([$pkmn, $hp, $lvl, $status]) => {

    return pokeballs.map((ball) => {

      const rate = ballRate($pkmn, ball, $hp, $lvl, $status);
      return { ...ball, ...rate };

    });
  }
);

const healthRates = derived(
  [selectedMon, selectedBall, lvl, status],
  ([$pkmn, $ball, $lvl, $status]) => {

    return healthRate($pkmn, $ball, $lvl, $status);

  }
);

export { ballRates, healthRates };
