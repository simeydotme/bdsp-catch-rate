<script>
  import Ball from "p/Ball.svelte";
  import Type from "p/Type.svelte";
  import Difficulty from "p/Difficulty.svelte";

  import Select from "svelte-select";
  // import Svelecte from "Svelecte";

  export let defaultMonster = 24;
  export let list = [];
  export let pokemon = { ...list[ defaultMonster ] };
  export let listOpen = true;

  let selected = { ...pokemon };
  let spriteLoading = true;

  $: pokemon = (selected && selected.name) ? selected : { ...list[ defaultMonster ] };

  $: pokemon.sprite && ( async () => {
    spriteLoading = true;
    const img = await fetch( pokemon.sprite );
    const res = await img;
    spriteLoading = false;
  })();

</script>

<section class="pokemon">
  <div class="selector" class:listOpen>

    <Select
      items={ list }
      bind:value={ selected }
      optionIdentifier="value"
      getSelectionLabel={(item) => item.name}
      getOptionLabel={(item) => item.label }
      containerClasses="autopoke"
      noOptionsMessage="This Pokemon may be in another region."
      listPlacement="bottom"
      isClearable={ false }
      isVirtualList
      bind:listOpen
    />

  </div>

  <Difficulty difficulty={pokemon.catch_rate} />

  <div class="sprite">
    <div class="number">
      #{pokemon.number}
    </div>
    {#if spriteLoading}
      <Ball ball="poke" anim="rock" />
    {:else}
      <img
        class="sprite__image"
        src={ pokemon.sprite }
        loading="lazy"
        alt="animated image of the pokemon: {pokemon.name}"
      />
    {/if}
  </div>

  <div class="data">
    <table>
      <tr>
        <th>Species:</th>
        <td>{pokemon.species} Pokemon</td>
      </tr>
      <tr>
        <th>Type:</th>
        <td>
          <Type type={pokemon.type1} />
          <Type type={pokemon.type2} />
        </td>
      </tr>
      <tr>
        <th>Catch Rate:</th>
        <td>{pokemon.catch_rate} </td>
      </tr>
    </table>
  </div>
</section>

<style>
  .pokemon {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
    background: var(--bg);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15),
      inset 0 -5px 25px rgba(255, 255, 255, 0.05);
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px 10px 5px;
    z-index: 5;
  }

  @supports (backdrop-filter: blur) {
    .pokemon {
      background: #333844da;
      backdrop-filter: blur(5px);
    }
  }

  .selector,
  :global(.selector + .difficulty) {
    grid-column: 1/-1;
  }

  .selector.listOpen {
    background: var(--bg);
    position: fixed;
    inset: 0;
    padding: 10px;
    z-index: 22;
  }

  @supports (backdrop-filter: blur) {
    .selector.listOpen {
      background: #333844da;
      backdrop-filter: blur(5px);
    }
  }

  .sprite {
    grid-row: 3/5;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-height: 90px;
  }
  .sprite__image {
    transform: scaleX(-1);
  }

  .number {
    position: absolute;
    top: 3px;
    left: 3px;
    font-size: 16px;
  }

  .data {
    grid-column: 2/-1;
    grid-row: 3/5;
    place-self: center;
  }

  .data th {
    font-weight: normal;
    text-align: right;
    padding-right: 5px;
    color: rgba(255, 255, 255, 0.66);
  }

  .data tr > * {
    height: 20px;
  }
</style>
