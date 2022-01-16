<script>
  import { healthRates } from "s/rates.js";

  export let ball = {};
  export let pokemon = {};
  export let health = [50];
  export let lvl = 50;

  $: hp = health[0];
  $: isOpen = !!ball.name && !!pokemon.name;
  $: rate = $healthRates.filter(( r ) => { return r.hp === hp }).at(0);

  const toggle = () => {
      isOpen = !isOpen;
  }
  const close = () => {
      isOpen = false;
  }
  const open = () => {
      isOpen = true;
  }
</script>

<footer class:isOpen on:click={close}>

  {#if ball.type !== "master"}
    
    <h2>
      You have ~<span>{rate.success_percent.toFixed(2)}%</span> chance to capture
      <span>{pokemon.name}</span> with a <span>{ball.name}</span> @ <span>{hp}%</span> hp!
    </h2>

    <div class="hps">
      {#each $healthRates as healthRate}
        <div class="hp" class:focus="{hp === healthRate.hp}" data-hp="{healthRate.hp}">
          <div class="success" style="height: {healthRate.success_percent}%;"></div>
          <div class="w4" style="height: {healthRate.wobbles_percent[3]}%;"></div>
          <div class="w3" style="height: {healthRate.wobbles_percent[2]}%;"></div>
          <div class="w2" style="height: {healthRate.wobbles_percent[1]}%;"></div>
          <div class="w1" style="height: {healthRate.wobbles_percent[0]}%;"></div>
          <p class="stats" class:special="{[1,20,50,100].includes(healthRate.hp)}">{healthRate.success_percent.toFixed(1)}%</p>
        </div>
      {/each}
    </div>

  {:else}

    <h2>It's a <span>Master Ball</span>... it has <span>100% success rate</span>... <br>
      it catches any wild Pokémon without fail. <br><br>
      <span>It. Never. Misses.</span></h2>

  {/if}
</footer>

{#if isOpen}
    <div class="buffer"></div>
{/if}

<style>

  :global(:root) {
    --footer-height: 200px;
  }
  
  footer {
    padding: 10px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--footer-height);
    background: var(--bg);
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.15),
      inset 0 5px 25px rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.9, 0.03, 0.69, 0.22);
    transform: translateY(100%);

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-evenly;
  }

  .hps {
    width: 300px;
    display: flex;
    margin: 10px auto;
    position: relative;
    opacity: 1;
  }

  .hp {
    width: 3px;
    height: 100px;
    flex: 0 0 3px;
    display: flex;
    flex-direction: column;
    opacity: 0.66;
    transition: all 0.33s ease;
    position: relative;
  }

  .hp:hover,
  .hp.focus,
  .hp:hover .stats,
  .hp.focus .stats {
    opacity: 1;
    transition-duration: 0ms;
  }

  .success, .w1, .w2, .w3, .w4 {
    width: 100%;
    height: 50%;
    align-self: flex-end;
    background:grey;
    transition: all 0.2s ease;
  }
  .success {
    background: #7effba;
  }

  .w1 {
    background: #fb1d46;
  }
  .w2 {
    background: #fb1d46d0;
  }
  .w3 {
    background: #fb1d46b0;
  }
  .w4 {
    background: #fb1d4690;
  }

  h2 {
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 100;
    margin: 0;
    text-align: center;
  }

  h2 span {
    font-weight: 700;
  }

  .stats {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    user-select: none;
    pointer-events: none;
    z-index: 4;
    width: 50px;
    text-align: center;
    margin: 0;
  }

  .hp[data-hp = "1"] .stats,
  .hp[data-hp = "20"] .stats,
  .hp[data-hp = "50"] .stats,
  .hp[data-hp = "100"] .stats {
    opacity: 1;
    bottom: -1.25em;
  }

  .hp[data-hp = "1"] .stats {
    left: 0;
    text-align: left;
    transform: none;
  }
  .hp[data-hp = "100"] .stats {
    right: 0;
    left: auto;
    text-align: right;
    transform: none;
  }

  footer.isOpen {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform: translateY(0);
  }

  .buffer {
    height: var(--footer-height);
  }
</style>
