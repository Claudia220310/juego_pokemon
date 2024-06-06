import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export default {
  async getPokemons(offset = 0, limit = 20) {
    const response = await axios.get(`${API_URL}?offset=${offset}&limit=${limit}`);
    return response.data;
  },
  async getPokemonDetail(name) {
    const response = await axios.get(`${API_URL}/${name}`);
    return response.data;
  },
  async getPokemonsByUrl(url) {
    const response = await axios.get(url);
    return response.data;
  }
};
