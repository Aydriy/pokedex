import axios from "axios";

const step = 12;

export const pokemonStore = {
  count: 0,
  next: `https://pokeapi.co/api/v2/pokemon/?limit=${step}`,
  previous: null,
  pokemons: []
};

export const getMore = async function(updatePokemons) {
  const {
    data: { count, results, next }
  } = await axios.get(pokemonStore.next);
  pokemonStore.count = count;
  pokemonStore.next = next;
  pokemonStore.pokemons = [...pokemonStore.pokemons, ...results];

  updatePokemons(pokemonStore.pokemons);
};
