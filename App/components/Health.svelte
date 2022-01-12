<script>
  import RangeSlider from "svelte-range-slider-pips";
  import { health, status } from "s/data.js";

</script>

<section class="health-slider" class:medium="{$health <= 50}" class:low="{$health <= 20}">

  <RangeSlider
    min={1}
    max={100}
    range="min"
    float
    formatter={ (v) => v + "% hp" }
    bind:values={$health}
    spingValues={{ stiffness: 1, damping: 1 }}
  />

  <select bind:value="{ $status }">
    <option value="{1}">Normal</option>
    <option value="{1.5}">Paralyzed, Poisoned, Burnt</option>
    <option value="{2.5}">Asleep, Frozen</option>
  </select>

</section>

<style>
  .health-slider {
    display: grid;
    grid-template-columns: 1fr 80px;
    padding: 10px 20px 10px 10px;
    position: sticky;
    top: 162px;
    z-index: 2;
    background: var(--bg);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15), 
      inset 0 -10px 10px rgba(255, 255, 255, 0.05)
  }

  .health-slider > :global(*) {
    align-self: center;
  }

  .health-slider select {
    appearance: none;
    border: 1px solid rgb(82, 88, 100);
    border-radius: 4px;
    background: rgb(39, 43, 52);
    color: white;
    padding: 4px 2px;
  }
</style>
