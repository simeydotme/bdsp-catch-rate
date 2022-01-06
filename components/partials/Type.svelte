<script>
  export let type = undefined;
</script>

{#if type}
  <span class="type {type}" title="{type}">
    {type}
  </span>
{/if}