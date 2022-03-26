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

  let pokeBall = $rates.filter( b => b.type === "poke" );

  $: rate = $healthRates.filter(( r ) => { return r.hp === hp }).at(0);
  $: repeatRates = healthRate( $selectedMon, ball, lvl, $status );
  $: firstTimeRates = healthRate( $selectedMon, pokeBall, lvl, $status );

</script>


<h2>
  <em>If you've registered a <span>{pokemon.name}</span> in your Pokédex;</em> <br>
  There's a ~<span>{rate.success_percent.toFixed(1)}%</span> chance to 
  capture it at <span>Lv{lvl.them}</span> with a <span>{ball.name}</span> @ <span>{hp}%</span> hp!
</h2>

<section class="graphs">

  <div class="repeat-throw">
    <h3>Repeat Catch</h3>
    <HpGraph {hp} hpGraph="{ repeatRates }" />
  </div>

  <div class="first-catch">
    <h3>First Time</h3>
    <HpGraph {hp} hpGraph="{ firstTimeRates }" />
  </div>

</section>


<style>
  
  .graphs :global(.hp) {
    height: 75px!important;
  }

  .first-catch,
  .repeat-throw {
    display: flex;
    align-items: center;
  }

  .first-catch  {
    margin-top: 20px;
    opacity: 0.8;
  }

  h3 {
    width: 100px;
    font-weight: normal;
  }

  .repeat-throw :global(.hp-percent) {
    bottom: -15px!important;
  }

  .first-catch :global(.hp-percent) {
    display: none!important;
  }

</style>