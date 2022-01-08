// import forms from "./pokemon-forms.json";
// import names from "./pokemon-names.json";

import forms from "../node_modules/pokemondb/data/pokemon-forms.yaml";
import names from "../node_modules/pokemondb/data/pokemon.yaml";

let pkmns = [];

const form = (mon) => {
  if (mon.national === 201) {
    return `-${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`;
  } else if (mon.formid && mon.formid !== "normal") {
    return `-${mon.formid}`;
  }
  return "";
};

const sprite = (mon) => {
  // return `https://img.pokemondb.net/sprites/black-white/anim/normal/${mon.national + form(mon)}.gif`;
  return `/sprites/animated/${mon.national + form(mon)}.gif`;
  // return `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${id}.png`
};

const icon = (mon) => {
  // return `https://play.pokemonshowdown.com/sprites/bwicons/${id}.png`;
  return `/sprites/icons/${mon.national + form(mon)}.png`;
  // return `https://img.pokemondb.net/sprites/sword-shield/icon/${mon.pokemonid + form(mon)}.png`;
};

const formeName = (mon) => {
  if (mon.formname) {
    return `${mon.name} (${mon.formname})`;
  }
  return mon.name;
};

const label = (mon) => {
  const name = formeName(mon);
  const img = icon(mon);
  return `<img src="${img}"> ${name}`;
};

Object.keys(forms).forEach((id, key) => {
  const thisMon = {
    ...names[forms[id].pokemonid],
    ...forms[id],
  };
  if (thisMon.gen < 5) {
    pkmns.push({
      value: formeName(thisMon),
      number: thisMon.national,
      icon: icon(thisMon),
      sprite: sprite(thisMon),
      label: label(thisMon),
      catch_rate: thisMon["catch-rate"],
      ...thisMon,
    });
  }
});

export default pkmns;
