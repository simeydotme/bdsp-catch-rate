<script>
  import HpGraph from "p/HpGraph/Graph.svelte";
  import HpBar from "p/HpGraph/Bar.svelte";
  import { selectedMon } from "s/pokemon.js";
  import { lvl } from "s/data.js";
  import { healthRate } from "l/calculator.js";
  import { ballRates as rates } from "s/rates.js";

  export let hp = 50;
  export let success_percent;
  export let wobbles_percent;

  $: quickBall = $rates.filter( b => b.type === "poke" );
  $: subsequentRates = healthRate( $selectedMon, quickBall, $lvl );

</script>


<section class="graphs">

  <div class="first-throw">
    <HpBar hp="{100}" {success_percent} {wobbles_percent} />
  </div>
  <HpGraph {hp} hpGraph="{ subsequentRates }" />

</section>


<style>
  
  .graphs {
    display: flex;
  }

  .first-throw {
    width: 50px;
    padding-right: 20px;
  }

  .first-throw :global(.hp) {
    width: 100%!important;
  }

</style>