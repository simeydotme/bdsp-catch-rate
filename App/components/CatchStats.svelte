<script>
  import { healthRates } from "s/rates.js";

  export let ball = {};
  export let pokemon = {};
  export let health = [50];
  export let lvl = 50;

  $: isOpen = !!ball.name && !!pokemon.name;
  $: rate = $healthRates.filter(( e ) => { return e.hp === health[0] }).at(0);

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
  <h1>
    <span>{rate.success_percent}%</span> chance to capture
    <span>{pokemon.name}</span>
    @ <span>{health}%</span> health!
  </h1>

  <div class="hps">
    {#each $healthRates as hp}
      <div class="hp" data-hp="{hp.hp}">
        <div class="success" style="height: {hp.success_percent}%;"></div>
        <div class="w4" style="height: {hp.wobbles_percent[3]}%;"></div>
        <div class="w3" style="height: {hp.wobbles_percent[2]}%;"></div>
        <div class="w2" style="height: {hp.wobbles_percent[1]}%;"></div>
        <div class="w1" style="height: {hp.wobbles_percent[0]}%;"></div>
      </div>
    {/each}
    <div class="target" style="left: {health[0] * 3}px;"></div>
  </div>
</footer>

{#if isOpen}
    <div class="buffer"></div>
{/if}

<style>

  :global(:root) {
    --footer-height: 200px;
  }
  
  footer {
    padding: 20px;
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
  }

  @supports (backdrop-filter: blur) {
    footer {
      background: #333844da;
      backdrop-filter: blur(5px);
    }
  }

  .hps {
    width: 300px;
    display: flex;
    margin: auto;
    position: relative;
    overflow: hidden;
    opacity: 0.75;
  }

  .hp {
    width: 3px;
    height: 100px;
    flex: 0 0 3px;
    display: flex;
    flex-direction: column;
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

  .target {
    width: 5px;
    border: 1px solid var(--bg);
    position: absolute;
    left: 50%;
    top: -1px;
    bottom: -1px;
    transform: translateX(-4px);
  }

  h1 {
    font-family: "Open Sans";
    font-weight: 100;
    margin: 0;
  }

  h1 span {
    font-weight: 700;
  }

  footer.isOpen {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform: translateY(0);
  }

  .buffer {
    height: var(--footer-height);
  }
</style>
