<script>
  export let difficulty = 255;

  let diffColor = "white";
  $: diffPercent = ((255 - difficulty) / 255) * 100;
  $: {
    if (diffPercent <= 10) {
      diffColor = "green";
    } else if (diffPercent <= 25) {
      diffColor = "yellow";
    } else if (diffPercent <= 50) {
      diffColor = "orange";
    } else {
      diffColor = "red";
    }
  }
</script>


<div class="difficulty">
  <div class="difficulty__bar" 
    style="--diff: {diffPercent}%; --diff-color: {diffColor};"></div>
</div>


<style>
  .difficulty {
    height: 3px;
    background: rgba(0, 0, 0, 0.5);
    margin: 2px 0;
  }

  .difficulty__bar {
    height: 1px;
    position: relative;
    top: 1px;
    min-width: 5px;
    width: var(--diff, 10%);
    background: var(--diff-color, white);
    transition: all 0.3s ease;
  }
</style>