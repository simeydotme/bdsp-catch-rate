<script>
  export let anim = false;
  export let ball = undefined;
  export let type = "poke";
  export let title = "";

  if (ball) {
    type = ball.type;
    title = ball.name + ", " + ball.flavour;
  }
</script>

<span class="ball {type} {anim}" {title}>
</span>