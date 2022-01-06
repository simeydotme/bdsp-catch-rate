<script>
  import Ball from "./partials/Ball.svelte";
  import Doughnut from "./partials/Doughnut.svelte";
  import Arrow from "./partials/Arrow.svelte";
  import pokeballs from "../lib/pokeball-data.js";
  import { rates } from "../stores/rates.js";
  export let ball = pokeballs[0];
</script>

  <section class="balls">
    {#each $rates as ballRate}
      <label class:selected={ball === ballRate}>
        <Ball ball="{ballRate}" anim={ball === ballRate ? 'open' : 'side'} />
        <input type="radio" name="selectedBall" bind:group={ball} value={ballRate} />
        {#if ball === ballRate}
          <Arrow />
        {/if}
        <div class="chart">
          <Doughnut {ballRate} />
        </div>
      </label>
    {/each}
  </section>


<style>
  .chart {
    width: 100px;
    height: 100px;
  }
  .balls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }
  .balls label {
    position: relative;
    border-radius: 100px;
    display: grid;
    box-shadow: inset 0 -12px 6px -10px transparent;
    transition: all 1s ease;
  }
  .balls input {
    opacity: 0;
    position: absolute;
  }
  .balls :global(.ball) {
    top: 5px;
    place-self: center;
  }
  .balls > :global(label .ball),
  .balls > :global(label .chart) {
    grid-column: 1;
    grid-row: 1;
  }
</style>