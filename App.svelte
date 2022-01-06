<script>
  import { selectedMon } from "./stores/pokemon.js";
  import { selectedBall } from "./stores/data.js";

  // import tooltip from "./lib/tooltips.js";
  import Pokemon from "./components/Pokemon.svelte";
  import Pokeballs from "./components/Pokeballs.svelte";
  import CatchStats from "./components/CatchStats.svelte";
</script>



<main>
  
  <Pokemon bind:pokemon={$selectedMon} />
  {$selectedBall.name} 
  <Pokeballs bind:ball={$selectedBall} />
  
  <CatchStats ball={$selectedBall} pokemon={$selectedMon} />

</main>









<style>
  main {
    max-width: 400px;
    margin: 0 auto 50px;
  }
</style>