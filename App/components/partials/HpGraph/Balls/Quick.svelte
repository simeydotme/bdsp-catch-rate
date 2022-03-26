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

  $: rate = $healthRates.filter(( r ) => { return r.hp === hp }).at(0);
  $: quickBall = $rates.filter( b => b.type === "poke" );
  $: subsequentRates = healthRate( $selectedMon, quickBall, lvl, $status );

</script>


<h2>
  The <span>{ball.name}</span> has a ~<span>{$healthRates[99].success_percent.toFixed(1)}%</span> chance to capture a 
  <span>Lv{lvl.them} {pokemon.name}</span> on <span>the first turn of the battle!</span>
</h2>

<section class="graphs">

  <div class="first-throw">

    <HpBar hp="{100}" 
      success_percent={$healthRates[99].success_percent} 
      wobbles_percent={$healthRates[99].wobbles_percent} />

  </div>

  <HpGraph {hp} hpGraph="{ subsequentRates }" />

</section>


<style>
  
  .graphs {
    display: flex;
  }

  .first-throw {
    width: 60px;
    padding-right: 15px;
  }

  .first-throw :global(.hp) {
    width: 100%!important;
  }

  .first-throw :global(.hp .stats) {
    width: auto!important;
    left: 0!important;
    right: 0!important;
    text-align: center!important;
  }

</style>