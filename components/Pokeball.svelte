<script>
  import Ball from "./partials/Ball.svelte";
  import pokeballs from "../lib/pokeball-data.js";

  export let ball = pokeballs[0];
  // pokeballs.sort((a, b) => {
  //   return a.rate > b.rate;
  // });
</script>

  <section class="balls">
    {#each pokeballs as ballType}
      <label class:selected={ball === ballType}>
        <Ball ball="{ballType}" anim={ball === ballType ? 'open' : 'side'} />
        <input type="radio" name="selectedBall" bind:group={ball} value={ballType} />
        {#if ball === ballType}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172">
            <path d="M40.94317,95.2665l40.033,-40.033c2.80217,-2.80217 7.33867,-2.80217 10.13367,0l40.033,40.033c4.515,4.515 1.31867,12.2335 -5.06683,12.2335h-80.066c-6.3855,0 -9.58183,-7.7185 -5.06683,-12.2335z"></path>
          </svg>
        {/if}
      </label>
    {/each}
  </section>


<style>
  .balls {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
  }
  .balls label {
    position: relative;
    border-radius: 100px;
    display: flex;
    box-shadow: inset 0 -12px 6px -10px transparent;
    transition: all 1s ease;
  }
  .balls input {
    opacity: 0;
    position: absolute;
  }
  :global(.balls .ball) {
    top: 0px;
  }
  label.selected {
    /* background: rgba(255,255,255,0.05); */
    /* box-shadow: inset 0 -5px 2px -4px rgba(255, 255, 255, 0.4),
            inset 0 -20px 12px -12px rgba(255, 255, 255, 0.25); */
  }
  svg {
    fill: white;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
  }
</style>