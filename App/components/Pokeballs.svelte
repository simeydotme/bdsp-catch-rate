<script>
  import Ball from "p/Ball.svelte";
  import Doughnut from "p/Doughnut.svelte";
  import Arrow from "p/Arrow.svelte";
  import { ballRates as rates } from "s/rates.js";

  export let ball = {};

  let isSelected = (b,r) => {
    return b.type === r.type;
  }

  const scrollTo = (e) => {
    const el = e.target.parentElement;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

</script>

  <section class="balls" class:selected={!!ball.type}>
    {#each $rates as ballRate, i (ballRate.type)}

      <label 
        class:selected={isSelected(ball,ballRate)}
        title="{ballRate.flavour}">

        <Ball ball="{ballRate}" anim={isSelected(ball,ballRate) ? 'open' : 'side'} />
        <input type="radio" name="selectedBall" bind:group={ball} value={ballRate} on:change={scrollTo} />
        
        {#if isSelected(ball,ballRate)}
          <Arrow />
        {/if}

        <div class="chart">
          <Doughnut {ballRate} index={i} />
        </div>

        <!-- <p class="rate">~{Math.round(ballRate.success_percent)}%</p> -->
        <p class="name">{ballRate.name}</p>

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
    top: 15px;
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
    opacity: 1;
  }
  .balls > label:not(.selected) :global(.chart) {
    opacity: 0.5;
    filter: saturate(0.5);
  }
  .balls label .name,
  .balls label .rate {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1.5em;
    text-align: center;
  }
  .balls label .rate {
    bottom: 40px;
  }
</style>