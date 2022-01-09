<script>
  import { Chart, registerables } from "chart.js";
  import { onMount, afterUpdate } from "svelte";
  import { debounce } from "l/helpers.js";
  import { config } from "l/cfg/chart.js";

  export let ballRate = {};
  export let index = 0;
  
  Chart.register(...registerables);

  let canvas;
  let myChart;
  
  $: data = [...ballRate.wobbles_percent, ballRate.success_percent];

  // have to debounce this, as having many charts updating
  // synchronously with every data change costs much performance
  const updateChart = debounce(() => {
    myChart.data.datasets[0].data = [...data];
    myChart.update();
  },100 + (index*33));

  onMount(() => {
    myChart = new Chart(canvas, config);
  });

  afterUpdate(updateChart);
</script>


<canvas bind:this={canvas}></canvas>
