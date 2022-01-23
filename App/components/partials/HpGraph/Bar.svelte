<script>
  export let focus = false;
  export let hp;
  export let success_percent;
  export let wobbles_percent;
</script>

<div class="hp" class:focus data-hp={hp}>
  <div class="success" style="height: {success_percent}%;" />
  <div class="w4" style="height: {wobbles_percent[3]}%;" />
  <div class="w3" style="height: {wobbles_percent[2]}%;" />
  <div class="w2" style="height: {wobbles_percent[1]}%;" />
  <div class="w1" style="height: {wobbles_percent[0]}%;" />
  <p class="stats" class:special={[1, 20, 50, 100].includes(hp)}>
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
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    user-select: none;
    pointer-events: none;
    z-index: 4;
    width: 50px;
    text-align: center;
    margin: 0;
  }

  .hp[data-hp="1"] .stats,
  .hp[data-hp="20"] .stats,
  .hp[data-hp="50"] .stats,
  .hp[data-hp="100"] .stats {
    opacity: 1;
    bottom: -1.25em;
  }

  .hp[data-hp="1"] .stats {
    left: 0;
    text-align: left;
    transform: none;
  }
  .hp[data-hp="100"] .stats {
    right: 0;
    left: auto;
    text-align: right;
    transform: none;
  }
</style>
