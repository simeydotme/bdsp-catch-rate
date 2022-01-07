<script>
  import { Chart, registerables } from "chart.js";
  import { onMount, afterUpdate } from "svelte";
  Chart.register(...registerables);

  export let ballRate = {};

  let canvas;
  let myChart;
  $: data = [...ballRate.wobbles_percent, ballRate.success_percent];

  let config = {
    type: "doughnut",
    data: {
      circumference: 90,
      datasets: [
        {
          circumference: 270,
          rotation: 225,
          data,
          backgroundColor: ["#fb1d46", "#e5465b", "#ce6e70", "#b6ac9f", "#7effba"]
        }
      ]
    },
    options: {
      layout: {
        padding: 10
      },
      elements: {
        arc: {
          borderWidth: 1,
          borderColor: "#333844"
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      cutout: "80%"
    }
  };

  onMount(() => {
    myChart = new Chart(canvas, config);
  });

  afterUpdate(() => {
    myChart.data.datasets[0].data = [...data];
    myChart.update();
  });
</script>


<canvas bind:this={canvas}></canvas>
