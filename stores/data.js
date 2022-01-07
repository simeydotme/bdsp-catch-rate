import { writable } from "svelte/store";

export const selectedBall = writable({});
export const health = writable(100);
export const level = writable(20);
export const player = writable(20);
export const status = writable(1);
