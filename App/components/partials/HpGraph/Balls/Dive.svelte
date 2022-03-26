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
  $: waterPokemonRates = healthRate( $selectedMon, ball, lvl, $status );
  $: landPokemonRates = healthRate( $selectedMon, pokeBall, lvl, $status );

</script>


<h2>
  <em>If the <span>{pokemon.name}</span> is caught while swimming/fishing;</em> <br>
  There's a ~<span>{rate.success_percent.toFixed(1)}%</span> chance to 
  capture it at <span>Lv{lvl.them}</span> (@ <span>{hp}%</span> hp) with a <span>{ball.name}</span>!
</h2>

<section class="graphs">

  <div class="dive-throw">
    <h3>While Swimming/Fishing</h3>
    <HpGraph {hp} hpGraph="{ waterPokemonRates }" />
  </div>

  <div class="regular-catch">
    <h3>Elsewhere</h3>
    <HpGraph {hp} hpGraph="{ landPokemonRates }" />
  </div>

</section>


<style>
  
  .graphs :global(.hp) {
    height: 75px!important;
  }

  .regular-catch,
  .dive-throw {
    display: flex;
    align-items: center;
  }

  .regular-catch  {
    margin-top: 20px;
    opacity: 0.8;
  }

  h3 {
    width: 130px;
    font-weight: normal;
  }

  .dive-throw :global(.hp-percent) {
    bottom: -15px!important;
  }

  .regular-catch :global(.hp-percent) {
    display: none!important;
  }

</style>