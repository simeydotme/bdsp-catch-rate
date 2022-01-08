<script>
  import Ball from "p/Ball.svelte";
  import { rates } from "s/rates.js";
  export let ball = rates[0];

  let catch_percent = "35.19";
  let wobbles = [22.98, 17.699, 13.632, 10.499];
</script>

  <section class="balls">
    {#each $rates as ballRate}
      <label class:selected={ball === ballRate}>
        <Ball ball="{ballRate}" anim={ball === ballRate ? 'rock' : 'side'} />
        <div class="percent">{ballRate.success}%</div>
        <input type="radio" name="selectedBall" bind:group={ball} value={ballRate} />
        {#if ball === ballRate}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172">
            <path d="M40.94317,95.2665l40.033,-40.033c2.80217,-2.80217 7.33867,-2.80217 10.13367,0l40.033,40.033c4.515,4.515 1.31867,12.2335 -5.06683,12.2335h-80.066c-6.3855,0 -9.58183,-7.7185 -5.06683,-12.2335z"></path>
          </svg>
        {/if}
        <div class="bar">
          <span class="capture" style="--w: {ballRate.success}%" ></span>
          <span class="w3" style="--w: {ballRate.wobbles[3]}%" ></span>
          <span class="w2" style="--w: {ballRate.wobbles[2]}%" ></span>
          <span class="w1" style="--w: {ballRate.wobbles[1]}%" ></span>
          <span class="w0" style="--w: {ballRate.wobbles[0]}%" ></span>
        </div>
      </label>
    {/each}
  </section>


<style>
  .balls {
    display: grid;
    grid-template-columns: 1fr;
  }
  .balls label {
    position: relative;
    border-radius: 100px;
    display: grid;
    grid-template-columns: 50px 50px 1fr;
    box-shadow: inset 0 -12px 6px -10px transparent;
    transition: all 1s ease;
    height: 30px;
    place-content: center;
  }
  .balls input {
    opacity: 0;
    position: absolute;
  }
  .balls :global(.ball) {
    top: -15px;
    left: 0px;
    position: absolute;
  }
  .balls > label :global(.ball),
  .balls > label .percent {
    grid-column: 1;
    grid-row: 1;
    place-content: center;
  }
  .balls > label .percent {
    grid-column: 2/3;
    display: grid;
    height: 100%;
  }
  /* .balls > label:nth-child(even) :global(.ball) {
                            grid-column: 3;
                          } */

  * {
    box-sizing: border-box;
  }

  .w0 {
    --clr: #fb1d46;
  }
  .w1 {
    --clr: #e5465b;
  }
  .w2 {
    --clr: #ce6e70;
  }
  .w3 {
    --clr: #b6ac9f;
  }
  .capture {
    --clr: #7effba;
  }

  .bar {
    --w: 20%;
    --clr: orange;
    height: 12px;
    display: flex;
    flex: 0 0 100%;
    overflow: hidden;
    grid-column: 3/4;
  }
  .bar > span {
    display: block;
    width: var(--w);
    flex: 0 0 var(--w);
    background-color: var(--clr);
    border: 1px solid var(--bg);
    border-left: none;
    transition: all 0.2s ease;
  }

  svg {
    position: absolute;
  }
</style>