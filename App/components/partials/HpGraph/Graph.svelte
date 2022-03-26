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
  <span class="hp-percent min">1% hp</span>
  <span class="hp-percent half">50% hp</span>
  <span class="hp-percent max">100% hp</span>
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
    bottom: -13px;
    text-align: left;
    font-size: 11px;
    opacity: 0.4;
  }

  .hp-percent.max {
    left: auto;
    right: 2px;
    text-align: right;
  }

  .hp-percent.half {
    left: 50%;
    transform: translateX(-50%);
    text-align: right;
  }
</style>
