import { writable, derived } from "svelte/store";
import { selectedMon } from "s/pokemon.js";
import { health, lvl, status } from "s/data.js";
import pokeballs from "l/pokeball-data.js";

const BASE = 4096;
const PROB = 65536;

const round = (n) => {
  return Math.round(n * BASE) / BASE;
};

const floor = (n) => {
  return Math.floor(round(n));
};

const power = (n, ex) => {
  return Math.pow(n, ex);
};

const fixed = (n, d = 3) => {
  return parseFloat(n.toFixed(round(d)));
};

const clamp = (n, min = 0, max = 100) => {
  return Math.max(min, Math.min(n, max));
};

const ball_rate = (ball, lvl) => {
  let rate = 1;
  switch (ball.type) {
    case "master":
      rate = 9999;
      break;
    case "nest":
      if (lvl < 30) {
        rate = (41 - lvl) / 10;
      }
      break;
  }
  return rate;
};

const difficulty = (mylvl, lvl) => {
  if (mylvl < lvl) {
    return 410 / BASE;
  }
  return 1;
};

const level_check = (lvl) => {
  if (lvl < 21) {
    return (30 - lvl) / 10;
  }
  return 1;
};

const catch_check = (pokemon, mod, hp = 100) => {
  const MAX = 100;
  return (
    (((3 * MAX - 2 * hp) * mod.grass * pokemon.catch_rate * mod.ball) /
      (3 * MAX)) *
    mod.low_level *
    mod.status *
    mod.difficulty
  );
};

const shake_check = (chance) => {
  return floor(round(PROB / round(power(round(255 / chance), 0.1875))));
};

const shakes = (chance) => {
  return [
    1 - chance,
    chance * (1 - chance),
    power(chance, 2) * (1 - chance),
    power(chance, 3) * (1 - chance),
  ];
};

const rates = derived(
  [selectedMon, health, lvl, status],
  ([$pokemon, $hp, $lvl, $status]) => {

    const mod = {};
    mod.difficulty = difficulty($lvl.us, $lvl.them);
    mod.low_level = level_check($lvl.them);
    mod.status = $status;
    mod.grass = 1;

    return pokeballs.map((ball) => {
      mod.ball = ball_rate(ball, $lvl);
      const catch_chance = catch_check($pokemon, mod, $hp);
      const rough_chance = (catch_chance / 255) * 100;
      const shake_prob = shake_check(catch_chance);
      const shake_chance = shake_prob / PROB;
      const catch_percent = power(shake_chance, 4);
      const shakes_percent = shakes(shake_chance);

      return {
        ...ball,
        modifiers: { ...mod },
        rough: rough_chance,
        success: catch_percent,
        success_percent: clamp(fixed(catch_percent * 100)),
        wobbles: shakes_percent.map((v) => clamp(v, 0, 1)),
        wobbles_percent: shakes_percent.map((v) => clamp(fixed(v * 100))),
      };
    });
  }
);

export { rates };
