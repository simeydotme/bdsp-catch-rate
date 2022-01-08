<script>
  import { selectedMon } from "s/pokemon.js";
  import { selectedBall, health } from "s/data.js";

  // import tooltip from "./lib/tooltips.js";
  import Pokemon from "c/Pokemon.svelte";
  import Pokeballs from "c/Pokeballs.svelte";
  import Levels from "c/Levels.svelte";
  import CatchStats from "c/CatchStats.svelte";

</script>

<main>
  <Pokemon bind:pokemon={$selectedMon} />
  <Levels />
  <Pokeballs bind:ball={$selectedBall} />

  <CatchStats ball={$selectedBall} pokemon={$selectedMon} health={$health} />
</main>

<style>
  main {
    max-width: 400px;
    margin: 0 auto 100px;
  }
</style>
