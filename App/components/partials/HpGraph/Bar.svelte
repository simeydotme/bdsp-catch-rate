<script>
  export let focus = false;
  export let hp;
  export let success_percent;
  export let wobbles_percent;
  export let show_marker = true;
</script>

<div 
  class="hp" 
  class:focus  
  class:marker={show_marker && [1, 50, 100].includes(hp)} 
  class:high={success_percent >= 50}
  style="--success: {success_percent}%"
  data-hp={hp}
>

  <div class="success" />
  <div class="w4" style="height: {wobbles_percent[3]}%;" />
  <div class="w3" style="height: {wobbles_percent[2]}%;" />
  <div class="w2" style="height: {wobbles_percent[1]}%;" />
  <div class="w1" style="height: {wobbles_percent[0]}%;" />
  <p class="stats">
    {success_percent.toFixed(1)}%
  </p>

</div>

<style>
  .hp {
    width: 1%;
    flex: 0 0 1%;
    height: 100px;
    display: flex;
    flex-direction: column;
    opacity: 0.66;
    transition: all 0.33s ease;
    position: relative;
  }

  .hp:hover,
  .hp.focus,
  .hp:hover .stats,
  .hp.focus .stats {
    opacity: 1;
    transition-duration: 0ms;
  }

  .hp:hover .stats,
  .hp:focus .stats {
    background: #ffffffbd;
    color: black;
  }

  .hp.marker {
    opacity: 1;
  }

  .success,
  .w1,
  .w2,
  .w3,
  .w4 {
    width: 100%;
    height: 50%;
    align-self: flex-end;
    background: grey;
    transition: all 0.2s ease;
  }
  .success {
    height: var(--success);
    transition: all 0.2s ease;
    background: #7effba;
  }

  .w1 {
    background: #fb1d46;
  }
  .w2 {
    background: #fb1d46d0;
  }
  .w3 {
    background: #fb1d46b0;
  }
  .w4 {
    background: #fb1d4690;
  }

  .stats {
    position: absolute;
    top: var(--success);
    left: 50%;
    transform: translateX(-50%) translateY(10%);
    opacity: 0;
    user-select: none;
    pointer-events: none;
    width: auto;
    text-align: center;
    margin: 0;
    padding: 1px 3px;
    border-radius: 3px;
    z-index: 4;
  }

  .hp.marker .stats {
    opacity: 0.75;
  }

  .hp[data-hp="1"] .stats,
  .hp[data-hp="100"] .stats {
    transform: translateY(20%);
  }

  .hp[data-hp="1"] .stats {
    left: 0;
    text-align: left;
  }
  .hp[data-hp="100"] .stats {
    right: 0;
    left: auto;
    text-align: right;
  }

  .high .stats {
    transform: translateX(-50%) translateY(-110%);
    color: black;
  }
  .hp[data-hp="100"].high .stats,
  .hp[data-hp="1"].high .stats {
    transform: translateX(0%) translateY(-110%);
  }

</style>
