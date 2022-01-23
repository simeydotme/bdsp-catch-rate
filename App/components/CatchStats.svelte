<script>
  import HpGraph from "p/HpGraph/Graph.svelte";
  import QuickBall from "p/HpGraph/Balls/Quick.svelte";
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
      <span>Lv{lvl.them} {pokemon.name}</span> with a <span>{ball.name}</span> @ <span>{hp}%</span> hp!
    </h2>

    {#if ball.type === "quick"}

      <QuickBall 
        {hp}
        success_percent="{$healthRates[99].success_percent}" 
        wobbles_percent="{$healthRates[99].wobbles_percent}" 
      />
      
    {:else}

      <HpGraph {hp} />

    {/if}


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
    padding: 10px 20px 20px;
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

  h2 {
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 100;
    margin: 0 auto 10px;
    text-align: center;
  }

  h2 span {
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
