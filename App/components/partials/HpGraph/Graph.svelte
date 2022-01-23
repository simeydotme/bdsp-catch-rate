<script>
  import HpBar from "./Bar.svelte";
  import { healthRates } from "s/rates.js";

  export let hp = 50;
  export let hpGraph;

  $: graph = hpGraph || $healthRates;
</script>

<div class="hps">
  {#each graph as hpRate}
    <HpBar 
      hp="{hpRate.hp}" 
      success_percent="{hpRate.success_percent}" 
      wobbles_percent="{hpRate.wobbles_percent}" 
      focus={hp === hpRate.hp}
    />
  {/each}
  <span class="hp-percent min">1% health</span>
  <span class="hp-percent max">100% health</span>
</div>

<style>
  .hps {
    width: 300px;
    display: flex;
    position: relative;
    margin: auto;
  }

  .hp-percent {
    position: absolute;
    left: 2px;
    top: calc( 50% - 6px );
    text-align: left;
    font-size: 11px;
  }

  .hp-percent.max {
    left: auto;
    right: 2px;
    text-align: right;
  }
</style>
