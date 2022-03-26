<script>
  import HpGraph from "p/HpGraph/Graph.svelte";
  import HpBar from "p/HpGraph/Bar.svelte";
  import { status } from "s/data.js";
  import { selectedMon } from "s/pokemon.js";
  import { healthRates } from "s/rates.js";
  import { healthRate } from "l/calculator.js";
  import { ballRates as rates } from "s/rates.js";

  export let hp = 50;
  export let lvl = 50;
  export let ball = {};
  export let pokemon = {};

  $: turns = Array.from({ length: 10 }, (v, i) => { return healthRate( $selectedMon, ball, lvl, $status, i+1 ) })
  $: turnN = healthRate( $selectedMon, ball, lvl, $status, 11 );

  $: console.log(turns);

</script>


<h2>
  The <span>{ball.name}</span> has a ~<span>{turnN[hp-1].success_percent.toFixed(1)}%</span> chance to capture a 
  <span>Lv{lvl.them} {pokemon.name}</span> on <span>the 11th turn on onwards!</span>
</h2>

<section class="graphs">

  <div class="first-throws">

    <h3>Turn 1-10<br> ({hp}% hp)</h3>

    {#each turns as turn, i}

      <div class="throw throw-{i}">

        <HpBar {hp}
          show_marker={false}
          success_percent={turn[hp-1].success_percent} 
          wobbles_percent={turn[hp-1].wobbles_percent} />
      
      </div>

    {/each}
    
  </div>

  <div class="regular-catch">
    <h3>Turn 11+<br> (hp graph)</h3>
    <HpGraph {hp} hpGraph="{ turnN }" />
  </div>


</section>


<style>
  
  .graphs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .first-throws,
  .regular-catch {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .throw {
    flex: 1 1 10%;
  }

  .graphs :global(.hp) {
    height: 75px!important;
  }

  .first-throws :global(.hp) {
    width: 100%!important;
  }

  .first-throws :global(.hp .stats) {
    width: auto!important;
    left: 0!important;
    right: 0!important;
    text-align: center!important;
  }

  
  .regular-catch :global(.hps) {
    margin: 0!important;
  }

  h3 {
    flex: 0 0 75px;
    font-weight: normal;
  }

</style>