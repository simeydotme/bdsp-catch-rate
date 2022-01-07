<script>
  import { selectedMon } from "./stores/pokemon.js";
  import { selectedBall, health, level } from "./stores/data.js";

  // import tooltip from "./lib/tooltips.js";
  import Pokemon from "./components/Pokemon.svelte";
  import Pokeballs from "./components/Pokeballs.svelte";
  import CatchStats from "./components/CatchStats.svelte";

</script>

<main>
  <Pokemon bind:pokemon={$selectedMon} />
  <input type="range" bind:value={$health} min={1} max={100} />
  <input type="range" bind:value={$level} min={1} max={100} />
  <Pokeballs bind:ball={$selectedBall} />

  <CatchStats ball={$selectedBall} pokemon={$selectedMon} health={$health} />
</main>

<style>
  main {
    max-width: 400px;
    margin: 0 auto 50px;
  }
</style>
