<script>
  import { allMonsters, selectedMon, defaultMonster } from "s/pokemon.js";
  import { selectedBall, health, lvl } from "s/data.js";

  // import tooltip from "./lib/tooltips.js";
  import Pokemon from "c/Pokemon.svelte";
  import Pokeballs from "c/Pokeballs.svelte";
  import Levels from "c/Levels.svelte";
  import Health from "c/Health.svelte";
  import CatchStats from "c/CatchStats.svelte";
  import Ball from "p/Ball.svelte";

  $: {
    if ( !$allMonsters.loading && !$allMonsters.error ) {
      if ( !$selectedMon.name ) {
        $selectedMon = { ...$allMonsters.list[ defaultMonster ] };
      }
    }
  }

</script>

<main>

  {#if $allMonsters.loading}

    <div class="loading">
      <Ball type="master" anim="bounce" />
      <p>Loading...</p>
    </div>

  {:else if $allMonsters.error}

    Error... {$allMonsters.message}

  {:else}

    <Pokemon list={$allMonsters.list} bind:pokemon={$selectedMon} {defaultMonster} />
    <Levels />
    <Health />
    <Pokeballs bind:ball={$selectedBall} />

    <CatchStats ball={$selectedBall} pokemon={$selectedMon} health={$health} lvl={$lvl} />

  {/if}

</main>

<style>
  main {
    max-width: 400px;
    margin: 0 auto 20px;
  }

  .loading {
    display: flex;
    flex-direction: column;
    place-items: center;
    place-content: center;
    position: fixed;
    inset: 0;
  }

  .loading p {
    font-size: 22px;
    margin: 20px auto;
  }
</style>
