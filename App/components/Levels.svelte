<script>
  import RangeSlider from "svelte-range-slider-pips";
  import { levels, lvl } from "s/data.js";
  import { selectedMon } from "s/pokemon.js";

  const path = (p) => {
    return `https://www.pokencyclopedia.info/sprites/overworlds/o_hgss/o_hs_${p}1.png`;
  };

  const image = (n) => {
    let number = n.toString().padStart(3, "0");
    switch (n) {
      case 201:
        number += `-${String.fromCharCode(
          97 + Math.floor(Math.random() * 26)
        )}`;
    }
    return `url(${path(number + "_")}), url(${path(number + "_m-")})`;
  };

  $: pokeImg = image($selectedMon.number);

  const handle = () => "";
</script>

<section class="level-slider" style="--handle-img-poke: {pokeImg};">
  <p class="level level--poke">Poké<span>Lv{$lvl.them}</span></p>
  <RangeSlider
    min={1}
    max={100}
    bind:values={$levels}
    float
    handleFormatter={handle}
    spingValues={{ stiffness: 1, damping: 1 }}
  />
  <p class="level level--us">Our<span>Lv{$lvl.us}</span></p>
</section>

<style>
  .level-slider {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
  }

  .level-slider .level span {
    display: block;
  }

  .level-slider .level {
    text-align: center;
  }

  .level-slider > :global(*) {
    align-self: center;
  }
</style>
