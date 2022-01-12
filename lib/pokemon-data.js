const fetchData = Promise.all([ 
  import("../node_modules/pokemondb/data/pokemon.yaml"), 
  import("../node_modules/pokemondb/data/pokemon-forms.yaml") 
]);

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
  return `<img src="${img}" width="68" height="56" loading="lazy"> ${name}`;
};

const pkmns = () => {
  
  return new Promise((resolve, reject) => {

    console.log( "fetching..." );

    fetchData.then((([ n, f ]) => {

      let data = [];
      let names = n.default;
      let forms = f.default;

      Object.keys(forms).forEach((id, key) => {
        const thisMon = {
          ...names[forms[id].pokemonid],
          ...forms[id],
        };
        if (thisMon.gen < 5) {
          data.push({
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

      console.log( "fetched already" );
    
      // debug
      setTimeout( resolve, 2000, data )

    })).catch((error) => {

      reject( new Error( error ) );

    });

  });

}

export default pkmns;
