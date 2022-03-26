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

const ball_rate = (pkmn, ball, lvl, turn) => {
  let rate = ball.rate || 1;
  switch (ball.type) {
    case "master":
      rate = 9999;
      break;
    case "nest":
      if (lvl.them < 30) {
        rate = (41 - lvl.them) / 10;
      }
      break;
    case "net":
      if (["bug", "water"].some((e) => [pkmn.type1, pkmn.type2].includes(e))) {
        rate = 3.5;
      }
      break;
    case "timer":
      rate = Math.min(4, 1 + (turn - 1) * 1229/4096);
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

const catch_check = (
  pkmn,
  mod = { low_level: 1, status: 1, difficulty: 1 },
  hp = 100
) => {
  const MAX = 100;
  return (
    (((3 * MAX - 2 * hp) * mod.grass * pkmn.catch_rate * mod.ball) /
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

const ballRate = (pkmn, ball, hp, lvl, status = 1, turn = 1) => {
  const mod = {
    difficulty: difficulty(lvl.us, lvl.them),
    low_level: level_check(lvl.them),
    status: status,
    grass: 1,
    ball: ball_rate(pkmn, ball, lvl, turn),
  };
  const catch_chance = catch_check(pkmn, mod, hp);
  const rough_chance = (catch_chance / 255) * 100;
  const shake_prob = shake_check(catch_chance);
  const shake_chance = shake_prob / PROB;
  const catch_percent = power(shake_chance, 4);
  const shakes_percent = shakes(shake_chance);

  return {
    modifiers: { ...mod },
    rough: clamp(fixed(rough_chance)),
    success: catch_percent,
    success_percent: clamp(fixed(catch_percent * 100)),
    wobbles: shakes_percent.map((v) => clamp(v, 0, 1)),
    wobbles_percent: shakes_percent.map((v) => clamp(fixed(v * 100))),
  };
};

const healthRate = (pkmn, ball, lvl, status = 1, turn = 1) => {
  return Array.from({ length: 100 }).map((_, hp) => {
    const rate = ballRate(pkmn, ball, hp + 1, lvl, status, turn);
    return { hp: hp + 1, lvl: lvl.them, ...rate };
  });
};

export { ballRate, healthRate, round, floor, power, fixed, clamp };
