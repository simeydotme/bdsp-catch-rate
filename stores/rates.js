import { writable, derived } from "svelte/store";
import pokeballs from "../lib/pokeball-data.js";
import { selectedMon } from "./pokemon.js";

export const rates = derived(selectedMon, ($selectedMon) => {
  return pokeballs.map((ball) => {
    return {
      ...ball,
      success: $selectedMon.catch_rate * ball.rate,
      wobbles: [40, 30, 20, 10]
    };
  });
});
