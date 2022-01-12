import { writable, readable } from "svelte/store";
import fetchPokemon from "l/pokemon-data.js";


const defaultMonster = 150;
const initialState = { loading: true, error: false };

const unsubAll = () => {
    console.log("got zero");
}

const subAll = (set) => {
    fetchPokemon().then((r) => {
        set({ loading: false, error: false, list: r });
    }).catch(e => {
        set({ loading: false, error: true, message: e });
    })
    return unsubAll;
};

const allMonsters = readable({ ...initialState, list: [] }, subAll );
const selectedMon = writable({ ...initialState });

// pokemons.then(r => {
//     selectedMon.set(r);
// }).catch(e => {
//     selectedMon.set({ loading: false, error: true });
// });

export { allMonsters, selectedMon, defaultMonster };
