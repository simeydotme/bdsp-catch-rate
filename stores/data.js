import { writable, derived } from "svelte/store";

export const selectedBall = writable({});
export const health = writable(100);
export const status = writable(1);

// for the rangeSlider
export const levels = writable([ 40, 60 ]);
// for the ui/rates
export const lvl = derived(levels, ($lvl) => {
    return { them: $lvl[0], us: $lvl[1]  }
});