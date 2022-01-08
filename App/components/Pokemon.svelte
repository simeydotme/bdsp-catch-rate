<script>
  import Type from "p/Type.svelte";
  import Difficulty from "p/Difficulty.svelte";

  import Select from "svelte-select";
  import pokemons from "l/pokemon-data.js";

  export let pokemon = pokemons[150];
  export let listOpen = true;
</script>


<section class="pokemon">
  <div class="selector" class:listOpen>
    <Select 
      items={pokemons}
      bind:value="{pokemon}"
      optionIdentifier="value"
      getSelectionLabel={(item) => item.name}
      getOptionLabel={(item) => item.label}
      containerClasses="autopoke"
      noOptionsMessage="This Pokemon may be in another region."
      isClearable="{false}"
      isVirtualList
      bind:listOpen
    />
  </div>

  <Difficulty difficulty={pokemon.catch_rate} />

  <div class="sprite">
    <img class="sprite__image" src="{pokemon.sprite}" 
      alt="animated image of the pokemon: {pokemon.name}" />
  </div>

  <div class="data">
    <table>
      <tr>
        <th>Number:</th>
        <td>#{pokemon.number}</td>
      </tr>
      <tr>
        <th>Species:</th>
        <td>{pokemon.species} Pokemon</td>
      </tr>
      <tr>
        <th>Type:</th>
        <td>
          <Type type="{pokemon.type1}" />
          <Type type="{pokemon.type2}" />
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
    grid-template-columns: repeat(4, 1fr);
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
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sprite__image {
    transform: scaleX(-1);
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