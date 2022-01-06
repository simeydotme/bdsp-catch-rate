import { writable } from "svelte/store";
import pokemons from "../lib/pokemon-data.js";

export const selectedMon = writable(pokemons[0]);
