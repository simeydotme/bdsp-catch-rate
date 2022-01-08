<script>
  import Ball from "p/Ball.svelte";
  import Doughnut from "p/Doughnut.svelte";
  import Arrow from "p/Arrow.svelte";
  import { rates } from "s/rates.js";

  export let ball = {};

</script>

  <section class="balls" class:selected={!!ball.type}>
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
  .balls {
    --size: 90px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }
  .balls label {
    position: relative;
    border-radius: var(--size);
    display: grid;
    box-shadow: inset 0 -12px 6px -10px transparent;
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
    transition: opacity 0.3s ease, filter 1s ease;
  }
  .chart {
    width: var(--size);
    height: var(--size);
  }
  .balls > label:not(.selected) :global(.ball) {
    opacity: 0.9;
  }
  .balls > label:not(.selected) :global(.chart) {
    opacity: 0.5;
    filter: saturate(0.5);
  }
</style>