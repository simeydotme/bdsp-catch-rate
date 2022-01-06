// import forms from "./pokemon-forms.json";
// import names from "./pokemon-names.json";

import forms from "../node_modules/pokemondb/data/pokemon-forms.yaml";
import names from "../node_modules/pokemondb/data/pokemon.yaml";

let pkmns = [];

const sprite = (id) => {
  return `https://img.pokemondb.net/sprites/black-white/anim/normal/${id}.gif`;
  // return `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${id}.png`
};

const icon = (id) => {
  // return `https://play.pokemonshowdown.com/sprites/bwicons/${id}.png`;
  return `https://img.pokemondb.net/sprites/sword-shield/icon/${id}.png`;
};

const formeName = (mon) => {
  if (mon.formname) {
    return `${mon.name} (${mon.formname})`;
  }
  return mon.name;
};

const label = (id, mon) => {
  const name = formeName(mon);
  const img = icon(id);
  return `<img src="${img}"> ${name}`;
};

Object.keys(forms).forEach((id, key) => {
  const thisMon = {
    ...names[forms[id].pokemonid],
    ...forms[id]
  };
  if (thisMon.gen < 5) {
    let iconId = thisMon.national;
    if (thisMon.formid) {
      iconId = `${thisMon.national}-${thisMon.formid}`;
    }
    pkmns.push({
      iconId,
      value: formeName(thisMon),
      number: thisMon.national,
      icon: icon(id),
      sprite: sprite(id),
      label: label(id, thisMon),
      catch_rate: thisMon["catch-rate"],
      ...thisMon
    });
  }
});

export default pkmns;
