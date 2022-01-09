<script>
  import RangeSlider from "svelte-range-slider-pips";
  import { health, status } from "s/data.js";

</script>

<section class="health-slider" class:medium="{$health <= 50}" class:low="{$health <= 20}">
  <RangeSlider
    min={1}
    max={100}
    range="min"
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
  }

  .health-slider > :global(*) {
    align-self: center;
  }
</style>
