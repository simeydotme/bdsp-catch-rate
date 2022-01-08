import { writable } from "svelte/store";
import pokemons from "l/pokemon-data.js";

export const selectedMon = writable(pokemons[0]);
